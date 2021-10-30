class XetNghiemController {
    activeSubMenu = 'TY_LE_XET_NGHIEM'
    subMenu = {
        TY_LE_XET_NGHIEM: 'TY_LE_XET_NGHIEM',
        KET_QUA_XET_NGHIEM: 'KET_QUA_XET_NGHIEM',
        TY_LE_DUONG_TINH: 'TY_LE_DUONG_TINH',
    }
    divMounted = 'divXetNghiem' 
    constructor() {
        this.data = new Map();
        this.clicked_province = ''
        this.clicked_district = ''
        this.handleController = null
    }
    setup() {
        this.handleController.setup();
    }

    mount (clicked_province, clicked_district) {
        this.clicked_province = clicked_province
        this.clicked_district = clicked_district
        let content = this.show()
        document.getElementById(this.divMounted).innerHTML = content;
        this.setup()
        this.listener()
    }

    listener () {
        const self = this
        $('.xetnghiem-sub-menu-item').click(function () {
            self.activeSubMenu = this.id
            self.mount(self.clicked_province, self.clicked_district)
        })
        this.handleController.listener();
    }

    show() {
        this.showContentSubMenu(this.activeSubMenu)
        return `
            <div class="mb-3 font-weight-bold">BÁO CÁO CA XÉT NGHIỆM</div>
            <div class="row">
                <div class="col-3">${this.showSubMenu()}</div>
                <div class="col-9">${this.showContent()}</div>
            </div>
        `;
    }
    showSubMenu() {
        return `
        <ul class="list-group">
            <li class="list-group-item sub-menu-item xetnghiem-sub-menu-item ${this.activeSubMenu == this.subMenu.TY_LE_XET_NGHIEM ? 'sub-menu-item-active' : ''}" id="${ this.subMenu.TY_LE_XET_NGHIEM }">Tỷ lệ xét nghiệm</li>
            <li class="list-group-item sub-menu-item xetnghiem-sub-menu-item ${this.activeSubMenu == this.subMenu.KET_QUA_XET_NGHIEM ? 'sub-menu-item-active' : ''}" id="${ this.subMenu.KET_QUA_XET_NGHIEM }">Kết quả xét nghiệm</li></li>
            <li class="list-group-item sub-menu-item xetnghiem-sub-menu-item ${this.activeSubMenu == this.subMenu.TY_LE_DUONG_TINH ? 'sub-menu-item-active' : ''}" id="${ this.subMenu.TY_LE_DUONG_TINH }">Tỷ lệ dương tính</li>
        </ul>
        `;
    }
    showContent() {
        return this.handleController.show();
    }

    showContentSubMenu() {
        switch (this.activeSubMenu) {
            case 'TY_LE_XET_NGHIEM':
                this.handleController = tyLeXetNghiemController;
                break;
            case 'KET_QUA_XET_NGHIEM':
                console.log(ketQuaXetNghiemController)
                this.handleController = ketQuaXetNghiemController;
                break;
            case 'TY_LE_DUONG_TINH':
                console.log(tyLeDuongTinhController)
                this.handleController = tyLeDuongTinhController;
                break;
            default:
                break;
        }

        this.handleController.mount(this.clicked_province, this.clicked_district)
    }
}

var xetNghiemController = new XetNghiemController();