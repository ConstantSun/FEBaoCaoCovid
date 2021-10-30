API_ATCOVID_HOST = 'https://antoancovid.dtt.vn/api/v1/dashboard';

class AtCovidController {
    constructor() {
        this.data = new Map();
        this.modeDone = new Map();
    }

    mount(clicked_province, clicked_district) {
        this.clicked_province = clicked_province || 'Việt Nam'
        this.clicked_district = clicked_district
    }

    listener () {
        //
    }

    async _call(path, parram, callback, name) {
        const link = `${API_ATCOVID_HOST}/${path}?${parram}`;
        await $.ajax({
            url: link,
            statusCode: {
                404: function () {
                    console.log(name, "page not found");
                },
                403: function () {
                    console.log(name, "403 Forbidden Mã phản hồi trạng thái lỗi máy khách HTTP chỉ ra rằng máy chủ hiểu yêu cầu nhưng từ chối cho phép nó.");
                }
            },
            success: callback
        }).always(function () {
            console.log(link);
            console.log(name, " load complete!!");
        });
    }

    _get_name_by_dv_id(id) {
        for (var i = 0; i < ATCOVID_PROVINCES.length; i++) {
            if (id == ATCOVID_PROVINCES[i]['id_dv'])
                return ATCOVID_PROVINCES[i]['name'];
        }
    }
    do(data) {
        var key = data["province_id"] == 0 ? 'Việt Nam' : atCovidController._get_name_by_dv_id(data["province_id"]);
        var mydata = data['province_data'];
        var tpm = [];
        const keys = Object.keys(mydata);
        // console.log(keys);
        for (var i = 0; i < keys.length; i++) {
            tpm.push(mydata[keys[i]]);
        }
        atCovidController.data.set(key, tpm);
    }

    show() {
        return `
        <table id='customers' style="width: 680">
            <tr><th>
            Tiến độ triển khai An Toàn Covid tại ${this.clicked_province} trong 30 ngày qua
            </th></tr>
        </table>
        <div id="divThongKeAtCovid" style="width: 680" class="collapse show">
        </div>`;
    }

    async setup(province) {
        if (this.clicked_province == 'Việt Nam') {
            if (!this.data.get(this.clicked_province)) {
                await this._call('deployment-progress-report', 'province_id=0',
                    this.do, 'AtCovidController');
            }
        } else {
            for (var i = 0; i < ATCOVID_PROVINCES.length; i++) {
                if (province == ATCOVID_PROVINCES[i]['name']) {
                    const id = ATCOVID_PROVINCES[i]['id_dv'];
                    const parram = `province_id=${id}`;
                    if (!this.data.get(this.clicked_province)) {
                        await this._call('deployment-progress-report', parram,
                            this.do, 'AtCovidController');
                    }
                }
            }
        }
        this.load()
    }

    load () {
        let dataContent = ''
        const ls = this.data.get(this.clicked_province);
        if(!ls) return;
        for (var i = 0; i < ls.length; i++) {
            dataContent += `
                <tr><td>
                    ${ls[i]['object_name']}
                </td><td>
                    ${ls[i]['last_month_total']}
                </td><td>
                    ${ls[i]['current_month_total']}
                </td><td>
                    ${ls[i]['increasing_total']}
                </td><td>
                    ${ls[i]['increasing_percent']}%
                </td></tr>
            `;
        }
        let content = `<table id='customers' style="width: 680">
            <colgroup>
                <col span='1' style='width: 40%;'>
                <col span='1' style='width: 15%;'>
                <col span='1' style='width: 15%;'>
                <col span='1' style='width: 15%;'>
                <col span='1' style='width: 15%;'>
            </colgroup>
            <tr>
                <th>Nhóm đối tượng</th>
                <th>Tổng trước</th>
                <th>Tổng hiện tại</th>
                <th>Số lượng tăng</th>
                <th>Tỉ lệ tăng</th>
            </tr>
            ${dataContent}
        </table>`
        document.getElementById("divThongKeAtCovid").innerHTML = content;
    }
}
var atCovidController = null;
if (kernel.checkMode(AtCovidController.prototype.constructor.name))
    atCovidController = kernel.addClass(new AtCovidController());