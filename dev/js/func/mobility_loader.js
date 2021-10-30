var mobility_data = {};
class MobilityLoader {
    constructor() {
        this.clicked_province = ''
        this.clicked_district = ''
    }

    mount(clicked_province, clicked_district) {
        this.clicked_province = clicked_province || 'Việt Nam'
        this.clicked_district = clicked_district
    }

    listener () {
        //
    }

    do(mydata) {
        var results = readSheet(mydata);
        for (var i = 1; i < results.length; i++) {
            const province = results[i][8];
            if (!(province in mobility_data)) {
                mobility_data[province] = {
                    'date': [],
                    'retail': [],
                    'grocery': [],
                    'park': [],
                    'public_transit': [],
                    'work': [],
                    'residence': [],
                }
            }
            mobility_data[province]['date'].push(results[i][1]);
            mobility_data[province]['retail'].push(results[i][2]);
            mobility_data[province]['grocery'].push(results[i][3]);
            mobility_data[province]['park'].push(results[i][4]);
            mobility_data[province]['public_transit'].push(results[i][5]);
            mobility_data[province]['work'].push(results[i][6]);
            mobility_data[province]['residence'].push(results[i][7]);
        }
        // console.log('mobility_data',mobility_data);
        loadDataLevel2();
    }

    async api() {
        await call_api('17C2M92WIUUVYnsf_65IwmH21D4gAVHfO3fohOmUAeKY', 1,
            this.do, this.constructor.name);
    }

    show(province) {
        // var title = '<h5 class="text-danger">Di chuyển trong tỉnh/thành phố ' + province + '(% thay đổi)</h5>';
        // if (province == 'Việt Nam'){
        // 	title = '<h5 class="text-danger">Di chuyển trong Việt Nam (% thay đổi)</h5>';
        // }
        return `
        <table id='customers' style="width: 680">
        <tr>
            <th>
                Di chuyển trong ${this.clicked_province} (% thay đổi)
            </th>
        </tr></table>
        <div id="DivMobility" style="border-style: outset;" class="collapse show">
            <div class="row">
                <div class="col-md-4">
                    <canvas id="retail" width="220" height="200"></canvas>
                </div>
                <div class="col-md-4">
                    <canvas id="grocery" width="220" height="200"></canvas>
                </div>
                <div class="col-md-4">
                    <canvas id="park" width="220" height="200"></canvas>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-4">
                    <canvas id="public_transit" width="220" height="200"></canvas>
                </div>
                <div class="col-md-4">
                    <canvas id="work" width="220" height="200"></canvas>
                </div>
                <div class="col-md-4">
                    <canvas id="residence" width="220" height="200"></canvas>
                </div>
            </div>
        </div>
        `;
    }

    async setup() {
        await this.api();
        var labels = {
            "retail": "Khu bán lẻ/giải trí",
            "grocery": "Khu chợ/hiệu thuốc",
            "park": "Công viên",
            "public_transit": "Giao thông công cộng",
            "work": "Nơi làm việc",
            "residence": "Nơi ở"
        }

        for (const [key, value] of Object.entries(labels)) {
            var ctx = document.getElementById(key).getContext("2d");
            if (mobility_data[this.clicked_province]) {
                var chart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: mobility_data[this.clicked_province]['date'],
                        datasets: [{
                            label: value,
                            data: mobility_data[this.clicked_province][key],
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: {
                                max: 100,
                                min: -100,
                                stepValue: 20,
                            }
                        }
                    }
                });
            }
        }
    }
}

