const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

province = urlParams.get('p');


district = urlParams.get('d');


commune = urlParams.get('c');

var clicked_province = province !== null ? province : "";
var clicked_district = district !== null ? district : "";
var clicked_commune = commune !== null ? commune : "";

console.log('clicked_province', clicked_province);
console.log('clicked_district', clicked_district);
console.log('clicked_commune', clicked_commune);

var adm1_layer;
var adm2_layer;
var adm3_layer;

var Lmap = L.map('map', { zoomControl: false }).setView([16.0376435, 107.5341797], 5.5);

var selectedBox = 1;
// L.tileLayer('https://maps.vietmap.vn/api/tm/{z}/{x}/{y}.png?apikey=383a90729d0590f9e1074083a11791ff64767fb56c1d9c4f', {
//     attribution: 'Map data &copy; <a href="https://vimap.vn/">vimap</a>',
//     maxZoom: 18,
//     minZoom: 5,
//     id: 'mapbox/light-v9',
//     tileSize: 512,
//     zoomOffset: -1
// }).addTo(Lmap);
// doi vimap > googlemaps
L.tileLayer('https://maps.vnpost.vn/api/tm/{z}/{x}/{y}@2x.png?apikey={accessToken}', {
    attribution: 'Map data &copy; <a href="https://vmap.vn">Vmap</a>, <a href="http://openstreetmap.org">OSM Contributors</a>',
    maxZoom: 18,
    id: 'Vmap.streets',
    accessToken: '26f9804e1ff6d86f72a33ebd518f057e0aff542de23c724d'
}).addTo(Lmap);

Lmap.on('zoomend', function (e) {
    $("#zoomlevel").html(Lmap.getZoom());
    zoom_based_layerchange(true);
});

function clean_map() {
    Lmap.eachLayer(function (layer) {
        if (layer instanceof L.GeoJSON)
        //Do marker specific actions here
        {
            //layer._leaflet_id = null;
            Lmap.removeLayer(layer);
        }
        //console.log(layer);
    });
}

function reset_adm1() {
    clean_map();
    clicked_province = "";
    clicked_district = "";
    clicked_commune = "";
    adm1_layer = L.geoJson(mydata1, {
        style: style,
        onEachFeature: onEachFeature1
    }).addTo(Lmap);
}


function reset_adm2() {
    clean_map();
    // clicked_district = "";
    // clicked_commune = "";
    if (clicked_province != "") {
        adm2_layer = L.geoJson(mydata2, {
            style: style,
            filter: provinceFilter,
            onEachFeature: onEachFeature2
        });
    } else {
        adm2_layer = L.geoJson(mydata2, {
            style: style,
            // filter: provinceFilter,
            onEachFeature: onEachFeature2
        });
    }

    adm2_layer.addTo(Lmap);
}

function reset_adm3() {
    clean_map();
    if (clicked_district != "") {
        adm3_layer = L.geoJson(mydata3, {
            style: style,
            filter: districtFilter,
            onEachFeature: onEachFeature3
        });
    }
    else {
        adm3_layer = L.geoJson(mydata3, {
            style: style,
            filter: provinceFilter,
            onEachFeature: onEachFeature3
        });
    }

    adm3_layer.addTo(Lmap);
}


function reset_adm4() {
    clean_map();
    if (communeFilter != "") {
        adm3_layer = L.geoJson(mydata3, {
            style: style,
            filter: communeFilter,
            onEachFeature: onEachFeature3
        });
    } else {
        if (clicked_district != "") {
            adm3_layer = L.geoJson(mydata3, {
                style: style,
                filter: districtFilter,
                onEachFeature: onEachFeature3
            });
        }
        else {
            adm3_layer = L.geoJson(mydata3, {
                style: style,
                filter: provinceFilter,
                onEachFeature: onEachFeature3
            });
        }
    }

    adm3_layer.addTo(Lmap);
}
function reset_adm(layer) {
    console.log('reset_adm', layer);
    switch (layer) {
        case 1:
            reset_adm1();
            break;
        case 2:
            reset_adm2();
            break;
        case 3:
            reset_adm3();
            break;
        case 4:
            reset_adm4();
            break;
        default:
            reset_adm1();
    }
}

function zoom_based_layerchange(isZoom) {
    //console.log(map.getZoom());
    // $("#zoomlevel").html(Lmap.getZoom());
    // var currentZoom = Lmap.getZoom();
    //console.log(currentZoom);
    // if (currentZoom <= 6) {
    // $("#layername").html("Coors Field");
    // reset_adm1();
    // showInfoVietNam();
    // }
    console.log('clicked_province', clicked_province);
    console.log('clicked_district', clicked_district);
    console.log('clicked_commune', clicked_commune);

    if (clicked_commune != "") { // || currentZoom > 10
        fit_zoom_to3(clicked_province, clicked_district, clicked_commune, isZoom);
    } else {
        if (clicked_district != "") { // || currentZoom > 10
            fit_zoom_to2(clicked_province, clicked_district, isZoom);
        }
        else {
            if (clicked_province != "") { //|| (currentZoom > 6 && currentZoom <= 10)
                fit_zoom_to1(clicked_province, isZoom);
            }
            else {
                fit_zoom_to_VN(isZoom);
            }
        }
    }
}


function style(feature) {
    return {
        weight: 1,
        opacity: 1,
        color: 'gray',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColor(getScore(feature))
    };
}


function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.5
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature);
}

function resetHighlight(e) {
    if (adm1_layer) {
        adm1_layer.resetStyle(e.target);
    }
    if (adm2_layer) {
        adm2_layer.resetStyle(e.target);
    }
    if (adm3_layer) {
        adm3_layer.resetStyle(e.target);
    }
    info.update();
}

function zoomToFeature(e) {
    Lmap.fitBounds(e.target.getBounds());
}

function onEachFeature1(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });

    layer.on('click', function (e) {
        province = e.target.feature.properties.name;
        clicked_province = province;
        // clicked_layer = 0;
        showInfoTinh(province);
    });
}

function onEachFeature2(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });

    layer.on('click', function (e) {
        clicked_province = e.target.feature.properties.name1;
        clicked_district = e.target.feature.properties.name;
        province = e.target.feature.properties.name1;
        district = e.target.feature.properties.name;
        // clicked_layer = 0;
        showInfoHuyen(province, district);
    });
}

function onEachFeature3(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
    //layer._leaflet_id = feature.id;  
    layer.on('click', function (e) {

        commune = e.target.feature.properties.name;
        province = e.target.feature.properties.name1;
        district = e.target.feature.properties.name2;


        clicked_province = province;
        clicked_district = district;
        clicked_commune = commune;
        // clicked_layer = 0;
        showInfoXa(province, district, commune);
    });
}

Lmap.attributionControl.addAttribution('Data &copy; <a href="https://itrithuc.vn/">iTriThuc</a>');

$(window).on('load', function () {

    setInterval(function () {
        $('.collapse')
            .on('shown.bs.collapse', function () {
                $(this)
                    .parent()
                    .find(".fa-angle-down")
                    .removeClass("fa-angle-down")
                    .addClass("fa-angle-up");
            })
            .on('hidden.bs.collapse', function () {
                $(this)

                    .parent()
                    .find(".fa-angle-up")
                    .removeClass("fa-angle-up")
                    .addClass("fa-angle-down");
            });
    }, 500);

});