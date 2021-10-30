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

    }

    show() {
        let str = `
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