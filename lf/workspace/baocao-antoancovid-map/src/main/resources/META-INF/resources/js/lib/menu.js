$(document).ready(function() {
    // var mapLayer = 'province';
    // $(".side-nav .nav-item").hover(function (e) {
    //     e.preventDefault();
    //     $(".sub-panel").click(function(e) {
    //       e.stopPropagation();
    //     })
    //     $(this).find('.sub-panel').show();

    //   }, function (e) {
    //     e.preventDefault();
    //     $(".sub-panel").click(function(e) {
    //       e.stopPropagation();
    //     })
    //     $(this).find('.sub-panel').hide();
    //   }
    // );
    $(".side-nav .nav-item").click(function(e) {
        let width = $(this).width();
        $(".sub-panel").css('left', width);
        e.preventDefault();
        $(".sub-panel").click(function(e) {
            e.stopPropagation();
        })
        $('.sub-panel').hide()
        $(this).find('.sub-panel').toggle();
    });


    $(".side-nav .icon-close").click(function(e) {
        e.preventDefault();
        $(".sub-panel").hide();
    });


    $(".navbar-toggler-icon").click(function(e) {
        e.preventDefault();
        $(".sub-panel").hide();
    });




    window.resetMapProvince = (e) => {
        document.getElementById("commune").checked = false;
        document.getElementById("district").checked = false;
        document.getElementById("province").checked = true;
        // $("#commune").attr('checked', false);
        // $("#district").attr('checked', false);
        // $("#province").attr('checked','checked');
        var mapLayer = 'province';
        clicked_layer = 1;
        clicked_province = "";
        clicked_district = "";
        clicked_commune = "";
        if (clicked_province === "") {
            reset_adm1();
        }
    }

    window.resetMapDistrict = (e) => {
        document.getElementById("commune").checked = false;
        document.getElementById("district").checked = true;
        document.getElementById("province").checked = false;
        mapLayer = 'district';
        //console.log("huyen");
        // clicked_province = "";
        // clicked_district = "";
        //clicked_commune = "";
        clicked_layer = 2;
        if (clicked_province === "") {
            reset_adm2();
        } else if (clicked_province) {

            clean_map();
            adm2_layer = L.geoJson(mydata2, {
                style: style,
                filter: provinceFilter,
                onEachFeature: onEachFeature2
            });
            adm2_layer.addTo(Lmap);
        }

        if (clicked_district) {
            clean_map();
            adm2_layer = L.geoJson(mydata2, {
                style: style,
                filter: districtFilter2,
                onEachFeature: onEachFeature2
            });
            adm2_layer.addTo(Lmap);
        }
    }

    window.resetMapCommune = (e) => {
        console.log("Reset Commune")
        document.getElementById("commune").checked = true;
        document.getElementById("district").checked = false;
        document.getElementById("province").checked = false;
        mapLayer = 'commune';
        console.log(resetMapCommune)
            //console.log("huyen");
            // clicked_province = "";
            // clicked_district = "";
            //clicked_commune = "";
        clicked_layer = 3;
        if (clicked_province === "") {
            reset_adm3();
        } else
        if (clicked_province) {
            clean_map();
            adm3_layer = L.geoJson(mydata3, {
                style: style,
                filter: provinceFilter,
                onEachFeature: onEachFeature3
            });
            adm3_layer.addTo(Lmap);
        }
        if (clicked_district) {
            clean_map();
            adm3_layer = L.geoJson(mydata3, {
                style: style,
                filter: districtFilter,
                onEachFeature: onEachFeature3
            });
            adm3_layer.addTo(Lmap);
        }
    }

    window.toggleFMode = () => {
        isF0Mode = !isF0Mode;
        if (!isF0Mode) {
            listRegionControler.clearTotalF0LabelLayer();
        } else {
            if (clicked_province == '') {
                listRegionControler.addLabelProvincesMap();
            } else {
                if (clicked_district == '') {
                    listRegionControler.addLabelDistrictsMap(clicked_province);
                } else {
                    listRegionControler.addLabelWardsMap(clicked_province, clicked_district);
                }
            }
        }
    }
});

function showHanhChinh() {
    console.log('showHanhChinh');
    var str = '';
    fit_zoom_to_VN()
        // if (f0DiaPhuongController) str += f0DiaPhuongController.showInfo();
        // document.getElementById("thelist").innerHTML = str;
        // if (f0DiaPhuongController)
        //     f0DiaPhuongController.loadInfo(
        //         clicked_province,
        //         clicked_district,
        //         clicked_commune);
    return true;
}

function showCaNhiem(){
    str = caNhiemController.mount(clicked_province, clicked_district, clicked_commune);
    return true;
}
function showCaNhiem1(){

    var str = '';
    // thêm content vào cho str
    str = caNhiemController.show(clicked_province, clicked_district);

    console.log('showCaNhiem', str);

    document.getElementById("divCaNhiem").innerHTML = str;

    // cài đạt cấu hình cho chart
    caNhiemController.setup(clicked_province, clicked_district);
}

function showXetNghiem(){
    str = xetNghiemController.mount(clicked_province, clicked_district);
    return true;
}

// function showBaoCaoF0() {
//     let str = '';
//     str = baoCaoF0Controller.show(clicked_province, clicked_district, clicked_commune);
//     document.getElementById("bcf0-chart-area").innerHTML = str;
//     // baoCaoF0Controller.fillHTML(clicked_province, clicked_district, clicked_commune);
//     baoCaoF0Controller.setup(clicked_province, clicked_district, clicked_commune);
// }

function showBienDongCaNhiemMoi() {
    let str = '';
    str = bienDongCaNhiemMoiController.show(clicked_province, clicked_district, clicked_commune);
    document.getElementById("bcf0-chart-area").innerHTML = str;

    bienDongCaNhiemMoiController.setup(clicked_province, clicked_district, clicked_commune);
}



function changeSelectedBox(number) {
    let boxes = document.getElementsByClassName('bcf0-box');
    for (let i = 0; i < boxes.length; ++i) {
        boxes[i].style.backgroundColor = '#5B9BD5';
    }
    let selectedBox = document.getElementById('bcf0-' + number);
    selectedBox.style.backgroundColor = '#3776A6';
    document.getElementById("bcf0-chart-area").innerHTML = "";
    if (number == 1) {
        showBaoCaoF0();
    }
    // Các tab được chọn đc định nghĩa ở số thứ tự của tab.
    if (number == 2) {

        showBienDongCaNhiemMoi();
    }
}

function showTiemPhong() {


    var str = '';
    // thêm content vào cho str
    var tiemPhongController = new TiemPhongController();
    // tiemPhongController

    // document.getElementById("divCaNhiem").innerHTML = str;

    return true;
}