<template>
    <div class="head">
        <h1>Centri di raccolta materiali</h1>
    </div>
    <div id="map" style="height: 400px; width: 100%;"></div>
    <div class="aggiornaPosizione"><button @click="updateLocation">Centra Posizione</button></div>
</template>

<script>
import { defineComponent } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Importa le icone di Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Imposta il percorso delle icone di Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

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
          if (this.map) {
            this.map.setView([46.0665, 11.12], 13);
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
    button {
    background-color: #00ff00;
    color: #000;
    padding: 10px 20px;
    border: 2px solid #000;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #00cc00;
  }
</style>