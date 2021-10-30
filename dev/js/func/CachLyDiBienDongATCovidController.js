class CachLyDiBienDongATCovidController {
    activeSubMenu = 'CACH_LI'
    subMenu = {
        DI_BIEN_DONG: 'DI_BIEN_DONG',
        AT_COVID: 'AT_COVID',
        CACH_LI: 'CACH_LI',
    }
    divMounted = 'divCachLyDiBienDongATCovid'
    constructor() {
        this.data = new Map();
        this.clicked_province = 'Việt Nam'
        this.clicked_district = ''
        this.handleController = null
    }
    setup() {
        this.handleController.setup();
    }

    mount(clicked_province, clicked_district) {
        this.clicked_province = clicked_province
        this.clicked_district = clicked_district
        let content = this.show()
        document.getElementById(this.divMounted).innerHTML = content;
        this.setup()
        this.listener()
    }

    listener() {
        const self = this
        $('.at-covid-sub-menu-item').click(function() {
            self.activeSubMenu = this.id
            self.mount(self.clicked_province, self.clicked_district)
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
            <li class="list-group-item sub-menu-item at-covid-sub-menu-item ${this.activeSubMenu == this.subMenu.CACH_LI ? 'sub-menu-item-active' : ''}" id="${ this.subMenu.CACH_LI }">CÁCH LY</li>
            <li class="list-group-item sub-menu-item at-covid-sub-menu-item ${this.activeSubMenu == this.subMenu.DI_BIEN_DONG ? 'sub-menu-item-active' : ''}" id="${ this.subMenu.DI_BIEN_DONG }">DI BIẾN ĐỘNG</li></li>
            <li class="list-group-item sub-menu-item at-covid-sub-menu-item ${this.activeSubMenu == this.subMenu.AT_COVID ? 'sub-menu-item-active' : ''}" id="${ this.subMenu.AT_COVID }">AN TOÀN COVID</li>
        </ul>
        `;
    }
    showContent() {
        return this.handleController.show();
    }

    showContentSubMenu() {
        switch (this.activeSubMenu) {
            case 'CACH_LI':
                this.handleController = cachLyController;
                break;
            case 'DI_BIEN_DONG':
                const mobilityLoader = new MobilityLoader()
                console.log(mobilityLoader)
                this.handleController = mobilityLoader;
                break;
            case 'AT_COVID':
                this.handleController = atCovidController;
                break;
            default:
                break;
        }

        this.handleController.mount(this.clicked_province, this.clicked_district)
    }
}

var cachLyDiBienDongATCovidController = new CachLyDiBienDongATCovidController();