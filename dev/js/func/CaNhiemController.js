class CaNhiemController {
    activeSubMenu = 'F0_MOI'
    subMenu = {
        F0_MOI: 'F0_MOI',
        BIEN_DONG_CA_NHIEM_MOI: 'BIEN_DONG_CA_NHIEM_MOI',
        SO_CA_F0_CONG_DON: 'SO_CA_F0_CONG_DON',
        BIEN_DONG_CA_NHIEM_CONG_DON: 'BIEN_DONG_CA_NHIEM_CONG_DON',
        LICH_SU_NGUY_CO: 'LICH_SU_NGUY_CO',
        DIEN_GIAI_NGUY_CO: 'DIEN_GIAI_NGUY_CO',
        THONG_KE_NHOM_BENH: 'THONG_KE_NHOM_BENH',
    }
    divMounted = 'divCaNhiem'
    constructor() {
        console.log('clicked_province', clicked_province);
        console.log('clicked_district', clicked_district);
        console.log('clicked_commune', clicked_commune);
        this.data = new Map();
        this.canhiem_province = clicked_province
        this.canhiem_district = clicked_district
        this.canhiem_commune = clicked_commune
        this.handleController = null
    }
    setup() {
        this.handleController.setup();
    }

    mount(canhiem_province, canhiem_district, canhiem_commune) {
        this.canhiem_province = canhiem_province
        this.canhiem_district = canhiem_district
        this.canhiem_commune = canhiem_commune
        let content = this.show()
        document.getElementById("divCaNhiem").innerHTML = content;
        this.setup()
        this.listener()
    }

    listener() {
        const self = this
        $('.ca-nhiem-sub-menu-item').click(function () {
            self.activeSubMenu = this.id
            self.mount(self.canhiem_province, self.canhiem_district, self.canhiem_commune)
        })
        this.handleController.listener();
    }

    show() {
        this.showContentSubMenu(this.activeSubMenu)
        return `
            <div class="row">
                <div class="col-3">${this.showSubMenu()}</div>
                <div class="col-9">${this.showContent()}</div>
            </div>
        `;
    }
    showSubMenu() {
        return `
        <ul class="list-group">
            <li class="list-group-item sub-menu-item ca-nhiem-sub-menu-item ${this.activeSubMenu == this.subMenu.F0_MOI ? 'sub-menu-item-active' : ''}" id="${this.subMenu.F0_MOI}">F0 MỚI TRONG NGÀY</li>
            <li class="list-group-item sub-menu-item ca-nhiem-sub-menu-item ${this.activeSubMenu == this.subMenu.BIEN_DONG_CA_NHIEM_MOI ? 'sub-menu-item-active' : ''}" id="${this.subMenu.BIEN_DONG_CA_NHIEM_MOI}">BIẾN ĐỘNG CA NHIỄM MỚI</li>
            <li class="list-group-item sub-menu-item ca-nhiem-sub-menu-item ${this.activeSubMenu == this.subMenu.SO_CA_F0_CONG_DON ? 'sub-menu-item-active' : ''}" id="${this.subMenu.SO_CA_F0_CONG_DON}">SỐ CA F0 CỘNG DỒN</li>
            <li class="list-group-item sub-menu-item ca-nhiem-sub-menu-item ${this.activeSubMenu == this.subMenu.BIEN_DONG_CA_NHIEM_CONG_DON ? 'sub-menu-item-active' : ''}" id="${this.subMenu.BIEN_DONG_CA_NHIEM_CONG_DON}">BIẾN ĐỘNG F0 CỘNG DỒN</li>
            <li class="list-group-item sub-menu-item ca-nhiem-sub-menu-item ${this.activeSubMenu == this.subMenu.LICH_SU_NGUY_CO ? 'sub-menu-item-active' : ''}" id="${this.subMenu.LICH_SU_NGUY_CO}">LỊCH SỬ NGUY CƠ</li>
            <li class="list-group-item sub-menu-item ca-nhiem-sub-menu-item ${this.activeSubMenu == this.subMenu.DIEN_GIAI_NGUY_CO ? 'sub-menu-item-active' : ''}" id="${this.subMenu.DIEN_GIAI_NGUY_CO}">DIỄN GIẢI NGUY CƠ</li>
            <li class="list-group-item sub-menu-item ca-nhiem-sub-menu-item ${this.activeSubMenu == this.subMenu.THONG_KE_NHOM_BENH ? 'sub-menu-item-active' : ''}" id="${this.subMenu.THONG_KE_NHOM_BENH}">THỐNG KÊ NHÓM BỆNH</li>
        </ul>
        `;
    }
    showContent() {
        return this.handleController.show();
    }

    showContentSubMenu() {
        switch (this.activeSubMenu) {
            case 'F0_MOI':
                this.handleController = baoCaoF0Controller;
                break;
            case 'BIEN_DONG_CA_NHIEM_MOI':
                this.handleController = bienDongCaNhiemMoiController;
                break;
            case 'SO_CA_F0_CONG_DON':
                this.handleController = caNhiemF0CongDonController;
                break;
            case 'BIEN_DONG_CA_NHIEM_CONG_DON':
                this.handleController = caNhiemF0CongDonController;
                break;
            case 'LICH_SU_NGUY_CO':
                this.handleController = lichSuNguyCoController;
                break;
            case 'DIEN_GIAI_NGUY_CO':
                this.handleController = caNhiemF0CongDonController;
                break;
            case 'THONG_KE_NHOM_BENH':
                this.handleController = thongKeNhomBenhController;
                break;
            default:
                break;
        }
        console.log("handleController - mount")
        this.handleController.mount(this.canhiem_province, this.canhiem_district, this.canhiem_commune)
        console.log("🚀 ~ file: CaNhiemController.js ~ line 120 ~ CaNhiemController ~ showContentSubMenu ~ this.canhiem_province, this.canhiem_district, this.canhiem_commune", this.canhiem_province, this.canhiem_district, this.canhiem_commune)
    }
}

var caNhiemController = new CaNhiemController();