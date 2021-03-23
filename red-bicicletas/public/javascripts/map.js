var mymap = L.map('main_map').setView([-34.540908,-58.4972602], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
}).addTo(mymap);

$.ajax({
    dataType:"json",
    url:"api/bicicletas",
    success: function(result){
        console.log(result);
        result.bicicletas.forEach(element => {
            var marker = L.marker(element.ubicacion).addTo(mymap);
        });
    }
})