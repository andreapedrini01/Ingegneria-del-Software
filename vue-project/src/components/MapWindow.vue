<template>
    <div class="head">
        <h1>Centri di raccolta materiali</h1>
    </div>
    <div id="map" style="height: 400px; width: 100%;"></div>
    <button @click="updateLocation">Aggiorna Posizione</button>
</template>

<script>
import { defineComponent } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

let map= null;
let userMarker = null;

export default {
  name: 'MapWindow',
  data() {
    return {
      map: null,
      userMarker: null,
      clientUrl: import.meta.env.VITE_CLIENT_URL
    };
  },
  methods: {
    updateLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          if (this.map) {
            this.map.setView([latitude, longitude], 13);
            if (this.userMarker) {
              this.map.removeLayer(this.userMarker);
            }
            this.userMarker = L.marker([latitude, longitude]).addTo(this.map);
          }
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    },
    async fetchData() {
        try{
            const response = await fetch(this.clientUrl + '/api/v1/crm', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            //console.log(data);
            data.forEach((location) => {
                L.marker([location.coordinates.longitudine, location.coordinates.latitudine]).addTo(this.map);
            });
        } catch (error) {
            console.error('An error occurred while fetching data:', error);
        }
    },
  },
  mounted() {
    console.log('Client URL:', this.clientUrl);
    this.map = L.map('map').setView([46.0665, 11.12], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);
    this.fetchData();
    this.updateLocation();
  },
};
</script>

<style scoped>

</style>