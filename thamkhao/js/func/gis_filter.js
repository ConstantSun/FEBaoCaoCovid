function provinceFilter(feature) {
    if (clicked_province === "") return true;
    if (feature.properties.name1 === clicked_province) return true;
}

function districtFilter(feature) {
    if (clicked_province === "" || clicked_district === "") return true;
    if (feature.properties.name1 === clicked_province && feature.properties.name2 === clicked_district) {
        return true;
    }
}

function districtFilter2(feature) {
    if (clicked_province === "" || clicked_district === "") return true;
    if (feature.properties.name1 === clicked_province && feature.properties.name === clicked_district) {
        return true;
    }
}

function communeFilter(feature) {
    if (clicked_province === "" || clicked_district === "" || clicked_commune === "") return true;
    if (feature.properties.name1 === clicked_province && feature.properties.name2 === clicked_district && feature.properties.name === clicked_commune) {
        return true;
    }
}