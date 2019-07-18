var map;

window.markers = {};
function setMarkers(points) {
    for (let point of points) {
        markers[point.loc.coordinates.toString()] = new google.maps.Marker({ position: { lat: point.loc.coordinates[1], lng: point.loc.coordinates[0] }, map: map })
    }
}

function clusterMarkers(clusters) {
    let i = 0
    for (let cluster of clusters) {
        i++;
        for (let point of cluster.points) {
            markers[point.coordinates.toString()].setLabel(String(i));
        }
        const center = {lat: cluster._id.center.x, lng: cluster._id.center.y}
        console.log(center)
        markers['cluster' + i] = new google.maps.Marker({ position: center, label: String(i), icon: { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }, map: map })
    }
}

function placeMarker(position, map) {
    var marker = new google.maps.Marker({
        position: position,
        map: map
    });
    markers[[position.lng(), position.lat()].toString()] = marker
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 2
    });
    
    map.addListener('click', function(e) {
        console.log(e.latLng);
        placeMarker(e.latLng, map);
        $.ajax({
            url: '/insert', 
            method: 'POST', 
            dataType: 'json', 
            processData: false, 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({'coords': [[e.latLng.lng(), e.latLng.lat()]]}),
        });
        // $.post('/insert', JSON.stringify({'coords': [[e.latLng.lng, e.latLng.lat]]}));
    });

    $.get('/points', (data) => setMarkers(data.points))

    $('#cluster').click(e => {
        console.log('ouch!')
        $.ajax({
            url: '/cluster', 
            method: 'POST', 
            dataType: 'json', 
            processData: false, 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({k: 4}),
            success: (data) => clusterMarkers(data.results)
        });
    })
    // setMarkers(spots);
    // clusterMarkers(clusters);
}