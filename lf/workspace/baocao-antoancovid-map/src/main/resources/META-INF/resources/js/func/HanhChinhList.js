class HanhChinhListController {
    options = ''
    constructor() {
    }
    show(province){
        return `<select class="form-control input-lg" id="hanh-chinh-select">
            <option selected>-- Chọn đơn vị hành chính --</option>
            ${this.options}
        </select>
      `;
    }

    setup(clicked_province, clicked_district) {
        $(document).ready(function() {
            $('#hanh-chinh-select').select2({
                theme: "bootstrap"
            });
        });
        clicked_province = 1
        if (clicked_province && clicked_district) {
            const DISTRICTS = ATCOVID_DISTRICT.filter((el) => {
                return el.parent_id == clicked_province
            })
            for (var i = 0; i < DISTRICTS.length; i++) {
                if (DISTRICTS[i].id == clicked_district) {
                    continue;
                }
                this.options += `<option value="${DISTRICTS[i].id}">${DISTRICTS[i].prefix} - ${DISTRICTS[i].name}</option>`
            }
        } else {
            for (var i = 0; i < ATCOVID_PROVINCES.length; i++) {
                if (ATCOVID_PROVINCES[i].id == clicked_province) {
                    continue;
                }
                this.options += `<option value="${ATCOVID_PROVINCES[i].id}">${ATCOVID_PROVINCES[i].prefix} - ${ATCOVID_PROVINCES[i].name}</option>`
            }
        }
        
    }
    
}

hanhChinhListController = new HanhChinhListController();