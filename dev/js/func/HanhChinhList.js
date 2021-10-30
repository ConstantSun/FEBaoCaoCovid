class HanhChinhListController {
    constructor(id) {
        this.id = id
    }
    show(province){
        return `<select class="form-control input-lg" id="${this.id}">
        </select>
      `;
    }

    setup(clicked_province, clicked_district) {
        const self = this
        clicked_province = 1
        let options = '<option selected>-- Chọn đơn vị hành chính --</option>'
        if (clicked_province && clicked_district) {
            const DISTRICTS = ATCOVID_DISTRICT.filter((el) => {
                return el.parent_id == clicked_province
            })
            for (var i = 0; i < DISTRICTS.length; i++) {
                if (DISTRICTS[i].id == clicked_district) {
                    continue;
                }
                options += `<option value="${DISTRICTS[i].id}">${DISTRICTS[i].prefix} - ${DISTRICTS[i].name}</option>`
            }
        } else {
            for (var i = 0; i < ATCOVID_PROVINCES.length; i++) {
                if (ATCOVID_PROVINCES[i].id == clicked_province) {
                    continue;
                }
                options += `<option value="${ATCOVID_PROVINCES[i].id}">${ATCOVID_PROVINCES[i].prefix} - ${ATCOVID_PROVINCES[i].name}</option>`
            }
        }
        $(document).ready(function() {
            const select = $('#' + self.id)
            select.select2({
                theme: "bootstrap"
            });
            select.html(options)
        });
        
    }
    
}
