const spots = [
    // db.spots.insertMany([
    { "loc": { "type": "Point", "coordinates": [-71.37751, 40.03509] }, _id: 1 },
    { "loc": { "type": "Point", "coordinates": [-114.42178, 40.89975] }, _id: 2 },
    { "loc": { "type": "Point", "coordinates": [-107.67667, 32.67681] }, _id: 3 },
    { "loc": { "type": "Point", "coordinates": [-102.96621, 39.9313] }, _id: 4 },
    { "loc": { "type": "Point", "coordinates": [-112.88185, 37.32311] }, _id: 5 },
    { "loc": { "type": "Point", "coordinates": [-119.42391, 34.20911] }, _id: 6 },
    { "loc": { "type": "Point", "coordinates": [-87.4193, 26.21882] }, _id: 7 },
    { "loc": { "type": "Point", "coordinates": [-91.8574, 49.03276] }, _id: 8 },
    { "loc": { "type": "Point", "coordinates": [-75.00277, 29.51049] }, _id: 9 },
    { "loc": { "type": "Point", "coordinates": [-77.71645, 42.51109] }, _id: 10 },
    { "loc": { "type": "Point", "coordinates": [-85.14597, 46.24409] }, _id: 11 },
    { "loc": { "type": "Point", "coordinates": [-101.32847, 31.27295] }, _id: 12 },
    { "loc": { "type": "Point", "coordinates": [-84.72436, 32.2157] }, _id: 13 },
    { "loc": { "type": "Point", "coordinates": [-112.14892, 38.91213] }, _id: 14 },
    { "loc": { "type": "Point", "coordinates": [-74.22137, 41.95965] }, _id: 15 },
    { "loc": { "type": "Point", "coordinates": [-101.77506, 33.90451] }, _id: 16 },
    { "loc": { "type": "Point", "coordinates": [-76.61425, 41.4761] }, _id: 17 },
    { "loc": { "type": "Point", "coordinates": [-81.6431, 47.44694] }, _id: 18 },
    { "loc": { "type": "Point", "coordinates": [-71.50336, 38.86058] }, _id: 19 },
    { "loc": { "type": "Point", "coordinates": [-112.82438, 28.4941] }, _id: 20 },
]
// );

const clusters = [
    { "_id": { "center": { "lat": 41.10276936541795, "lng": -78.70886730724156 }, "radius": 1355985.835674935 }, "points": [1, 8, 9, 10, 11, 13, 15, 17, 18, 19] },
    { "_id": { "center": { "lat": 36.00007511922753, "lng": -114.3560896237508 }, "radius": 1059613.368906528 }, "points": [2, 5, 6, 14, 20] },
    { "_id": { "center": { "lat": 32.99248716433303, "lng": -100.03086720149798 }, "radius": 1590865.9631739187 }, "points": [3, 4, 7, 12, 16] }
]

var map;

window.markers = {};
function setMarkers(points) {
    for (let point of points) {
        markers[point._id] = new google.maps.Marker({ position: { lat: point.loc.coordinates[1], lng: point.loc.coordinates[0] }, map: map })
    }
}

function clusterMarkers(clusters) {
    let i = 0
    for (let cluster of clusters) {
        i++;
        for (let pointId of cluster.points) {
            markers[pointId].setLabel(String(i));
        }
        console.log(cluster._id.center)
        markers['cluster' + i] = new google.maps.Marker({ position: cluster._id.center, icon: { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }, map: map })
    }
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 2
    });

    setMarkers(spots);
    clusterMarkers(clusters);
}

