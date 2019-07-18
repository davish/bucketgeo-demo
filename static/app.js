var map;
const colors = ['gray', 'green', 'orange', 'purple', 'red', 'white', 'yellow', 'black', 'blue', 'brown']
const base_url = 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_'
const suffix = '.png'

function icon(i) {
    return base_url + colors[i % colors.length] + suffix
}


window.markers = {};
window.centerMarkers = []
function setMarkers(points) {
    markers = {};
    for (let point of points) {
        markers[point.loc.coordinates.toString()] = new google.maps.Marker({ position: { lat: point.loc.coordinates[1], lng: point.loc.coordinates[0] }, map: map })
    }
}

function clusterMarkers(clusters) {
    for (let clusterPoint of centerMarkers) {
        clusterPoint.setMap(null);
    }
    let i = 0
    for (let cluster of clusters) {
        i++;
        for (let point of cluster.points) {
            // markers[point.coordinates.toString()].setLabel(String(i));
            markers[point.coordinates.toString()].setIcon(icon(i))
        }
        const center = {lat: cluster._id.center.x, lng: cluster._id.center.y}
        centerMarkers.push(new google.maps.Marker({ position: center, label: String(i), icon: { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }, map: map }))
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
    });

    $.get('/points', (data) => setMarkers(data.points))

    $('#cluster-btn').click(e => {
        console.log('Starting demo with ' + $('#k').val() + ' clusters');
        $.ajax({
            url: '/cluster', 
            method: 'POST', 
            dataType: 'json', 
            processData: false, 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({k: $('#k').val()}),
            success: (data) => clusterMarkers(data.results)
        });
    });

    $('#num-clusters').text('Number of clusters: ' + $('#k').val()) 
    $("#k").on('input', e => {
        $('#num-clusters').text('Number of clusters: ' + e.target.value)
    })

    $('#drop-btn').click(e => {
        console.log('ouch2!');
        for(let marker of Object.values(markers)) {
            marker.setMap(null);
        }
        setMarkers([]);
        $.ajax({
            url: '/drop', 
            method: 'POST', 
            dataType: 'json', 
            processData: false, 
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({k: $('#k').val()}),
        });
    })
}