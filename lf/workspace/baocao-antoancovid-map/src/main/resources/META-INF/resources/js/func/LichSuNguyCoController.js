class LichSuNguyCoController {
    constructor() {
        this.canhiem_province = clicked_province
        this.canhiem_district = clicked_district
        this.data = new Map();
    }
    mount(clicked_province, clicked_district) {
        this.canhiem_province = clicked_province
        this.canhiem_district = clicked_district
    }
    listener() {
        console.log("LichSuNguyCoController - listener")
    }
    setup() {

        if (this.canhiem_district) { // || currentZoom > 10
            hisNguyCoXaLoader.setup('Phường/Xã', this.canhiem_province, this.canhiem_district, '');
        }
        else {
            if (this.canhiem_province) { //|| (currentZoom > 6 && currentZoom <= 10)
                hisNguyCoHuyenLoader.setup(this.canhiem_province, '', '');
            }
            else {
                hisNguyCoTinhLoader.setup('', '', '');
            }
        }

        this.fillHTML(this.canhiem_province, this.canhiem_district)
    }
    fillHTML(province, district) {
        this.appendProvinces(province);
        $('#bcf0-select-province').select2({
            width: '100%',
            theme: "bootstrap"
        });
        if (province) {
            this.appendDistricts(province, district);
            $('#bcf0-select-district').select2({
                width: '100%',
                theme: "bootstrap"
            });
        }
    }
    appendProvinces(province) {
        console.log("appendProvinces ", province);
        let allProvinces = ATCOVID_PROVINCES;
        let selectPlace = $('#bcf0-select-province').empty();
        let defaultOpt = $("<option></option>").html("-- Chọn --");
        selectPlace.append(defaultOpt);
        for (let i = 0; i < allProvinces.length; ++i) {
            // console.log(allProvinces[i]);
            let opt
            if (allProvinces[i].name === province) {
                opt = $("<option selected></option>").html(allProvinces[i].name).attr('value', allProvinces[i].name);
            } else {
                opt = $("<option></option>").html(allProvinces[i].name).attr('value', allProvinces[i].name);
            }
            selectPlace.append(opt);
        }
    }
    appendDistricts(province, district) {
        console.log("appendDistricts ", province, district);
        let allDistricts = mapVN[province];
        console.log("🚀 ~ file: LichSuNguyCoController.js ~ line 65 ~ LichSuNguyCoController ~ appendDistricts ~ allDistricts", allDistricts)
        let selectPlace = $('#bcf0-select-district').empty();
        let defaultOpt = $("<option></option>").html("-- Chọn --");
        selectPlace.append(defaultOpt);
        for (let i = 0; i < allDistricts.length; ++i) {
            // console.log(allProvinces[i]);
            let opt
            if (allDistricts[i] === district) {
                opt = $("<option selected></option>").html(allDistricts[i]).attr('value', allDistricts[i]);
            } else {
                opt = $("<option></option>").html(allDistricts[i]).attr('value', allDistricts[i]);
            }
            selectPlace.append(opt);
        }
    }

    show() {
        let str = ` <div class="d-flex justify-content-center"">
        <form class="w-75 d-flex d-flex justify-content-start">
            <div class="col-4">
                <p class="bcf0-label">Chọn tỉnh/thành</p>
                <select name="place" class="form-control" id="bcf0-select-province">
                </select>
            </div>
            <div class="col-4">
                <p class="bcf0-label">Chọn huyện</p>
                <select name="place" class="form-control" id="bcf0-select-district">
                </select>
            </div>
        </form>
    </div>
    <hr>
    <div class="mt-4">
    `
        if (this.canhiem_district) { // || currentZoom > 10
            str += hisNguyCoXaLoader.show('Phường/Xã', this.canhiem_province, this.canhiem_district, '');
        }
        else {
            if (this.canhiem_province) { //|| (currentZoom > 6 && currentZoom <= 10)
                str += hisNguyCoHuyenLoader.show('Quận/Huyện', this.canhiem_province, '', '');
            }
            else {
                str += hisNguyCoTinhLoader.show('Tỉnh/Thành', '', '', '');
            }
        }
        str += `</div>`
        return str
    }
}


var lichSuNguyCoController = new LichSuNguyCoController();