var mymap = L.map('map').setView([37.09, -97.71], 3);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: API_KEY
}).addTo(mymap);

let myurl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

d3.json(myurl, d => {
    console.log(d)
    d.features.forEach(m => {
        // console.log(m)
        let color1 = ""
        if (m.properties.mag < 1) {
            color1 = "yellow"
        } else if (m.properties.mag < 2) {
            color1 = "blue"
        } else if (m.properties.mag < 3) {
            color1 = "green"
        } else if (m.properties.mag < 4) {
            color1 = "red"
        } else if (m.properties.mag < 5) {
            color1 = "purple"
        } else if (m.properties.mag > 6) {
            color1 = "black"
        }
        L.circle([m.geometry.coordinates[1], m.geometry.coordinates[0]], {
            // color: "white",
            color: color1,
            fillColor: color1,
            fillOpacity: 0.75,
            radius: (m.properties.mag) * 1000
        }).bindPopup(`<h3>Earthquake magnitude. ${m.properties.mag}</h3><hr><h3>Place: ${m.properties.place}`).addTo(mymap)
    })

    var legend = L.control({ position: "bottomright" });

    legend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML += "<h4>Earthquake Magnitude</h4>";
        div.innerHTML += '<i style="background: yellow"></i><span>0-1</span><br>';
        div.innerHTML += '<i style="background: blue"></i><span>1-2</span><br>';
        div.innerHTML += '<i style="background: green"></i><span>2-3</span><br>';
        div.innerHTML += '<i style="background: red"></i><span>3-4</span><br>';
        div.innerHTML += '<i style="background: purple"></i><span>4-5</span><br>';
        div.innerHTML += '<i style="background: black"></i><span>+6</span><br>';


        return div;
    };

    legend.addTo(mymap);

});