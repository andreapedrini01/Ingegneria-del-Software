

var map = L.map('map').setView([46.0665, 11.12], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([46.0665, 11.12]).addTo(map);
marker.bindPopup("<b>hello world</b><br>I am a popup.").openPopup();

fetch('api/v1/crm')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            var marker = L.marker([item.coordinates.longitudine, item.coordinates.latitudine]).addTo(map);
            marker.bindPopup(item.descrizione).openPopup();
        });
    })
    .catch(error => console.error('Error:', error));

