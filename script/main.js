var MainMap = null;

// Extent of the country boundary layer, for Burundi in lon,lat epsg 3857, standard for OpenLayers (Left, Bottom, Top, Right)
const bhextent = [3224925.65,-499644.91, 3437136.89, -258022.77];
const bhcenter = [3336467.78, -385622.80];
// Create a new feature for markets 
var marketsFeature = new ol.Feature();
marketsFeature.setStyle( 
    new ol.style.Style({ 
        image: new ol.style.Circle({
            radius: 10,
            fill: new ol.style.Fill({ 
                color: "#82368C", 
            }), 
            stroke: new ol.style.Stroke({ 
                color: "#fff", 
                width: 2, 
            }), 
        }), 
    }) 
);


/**
 This function create the mainMap
**/
function createMainMap(){
    // Define main Map View
    var mainView = new ol.View({
        extent: bhextent,
        center: bhcenter,
        minZoomm: 7,
        maxZoom:13,
        zoom:7
    });
// Initialize main map
mainMap = new ol.Map({
    controls: [],
    target: 'bigmap', /* Set the target to the ID of the mapDiv*/
    view: mainView,
    controls: ol.control.defaults({
    attribution: false
    }),
    });
// Create a base layer using our tiling service
var baseLayer = new ol.layer.Tile({
    source: new ol.source.TileImage({
    url: 'tiles/{z}/{x}/{y}.png'
    })
    });
// Add the base layer to the maps
mainMap.addLayer(baseLayer);
// Add settlements layer
var settlementStyle = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({ color: "black" }),
        stroke: new ol.style.Stroke({
            color: [255, 0, 0],
            width: 2,
            }),
        }),
    });
var settlementsLayer = new ol.layer.Vector({
    name: "Settlements",
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: "http://localhost/burundi/step1/services/search.py?format=geojson",
        }),
        style: settlementStyle,
    });
    mainMap.addLayer(settlementsLayer);
//GEOJSON look guide on the end
mainMap.addControl(
    new ol.control.Zoom());
    mainMap.addControl(
    new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(2)
    })
    );
    mainMap.addControl(
    new ol.control.ScaleLine());

    new ol.layer.Vector({ 
        map: mainMap, 
        source: new ol.source.Vector({ 
            features: [marketsFeature], 
        }), 
    });
mainMap.on("click", function (evt) {
    var coord =
        evt.coordinate[0].toString() + "," + evt.coordinate[1].toString();
    $.get(
        "http://localhost/burundi/step1/services/service_area.py?coord=" +
        coord +
        "&srid=3857",
        function (data) {
            if (data !== null) {
            var coords = [];
            for (var i = 0; i < data.length; i++) {
                coords.push(
                ol.proj.transform(
                    [data[i].coord[0], data[i].coord[1]],
                    "EPSG:4326",
                    "EPSG:3857"
                )
                );
            }
            var geom = new ol.geom.MultiPoint(coords);
            marketsFeature.setGeometry(geom);
        }
        }
        );
    });
}
// Ask about this updated lines Pag 10 Robert's guide
// create a market layer which is added to the map
function init(){
    createMainMap();
}
