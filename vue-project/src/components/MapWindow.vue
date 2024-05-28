<template>
    <div class="head">
        <h1>Welcome to SpazzaTN</h1>
    </div>
    <div id="map" style="height: 400px; width: 100%;"></div>
</template>

<script>
import { defineComponent } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default defineComponent({
    // il tuo codice qui
    mounted() {
        var map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);
    },
});
</script>

<style scoped>

</style>