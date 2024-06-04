<template>
    <div class="head">
        <h1>Welcome to SpazzaTN</h1>
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

export default defineComponent({
    name: 'MapWindow',
    methods: {
        updateLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const { latitude, longitude } = position.coords;
                    if (map) {
                        map.setView([latitude, longitude], 13);
                        if (userMarker) {
                            map.removeLayer(userMarker);
                        }
                        userMarker = L.marker([latitude, longitude]).addTo(map);
                    }
                });
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }
    },
    mounted() {
        map = L.map('map').setView([46.0665, 11.12], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);
        },

});
</script>

<style scoped>

</style>