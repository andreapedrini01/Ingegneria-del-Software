

var map = L.map('map').setView([46.0665, 11.12], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


fetch('api/v1/crm')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            var marker = L.marker([item.coordinates.longitudine, item.coordinates.latitudine]).addTo(map);
            marker.bindPopup(item.descrizione);
        });
    })
    .catch(error => console.error('Error:', error));

