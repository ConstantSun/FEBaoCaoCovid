class CaNhiemToanQuocControler {
    constructor(){
        
    }
    show() {
        return `
        <table id='customers' style="width: 680">
            <tr><th>
            Ca nhiễm các tỉnh trên toàn quốc
            <a data-toggle="collapse" 
                href="#divCaNhiemToanQuoc" 
                    aria-expanded="true" 
                        aria-controls="divCaNhiemToanQuoc">
                <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i>
            </a>
            </th></tr>
        </table>
        <div id="divCaNhiemToanQuoc" style="width: 680" class="collapse show">	
            <canvas id="canhiemToanQuoc" width="680"></canvas>
        </div>
        `;
    }

    setup() {
        const title = "Ca nhiễm";
        if (!dataChartCaNhiemToanQuoc['tinh']) return;
        var ctx = document.getElementById('canhiemToanQuoc').getContext("2d");
        var chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dataChartCaNhiemToanQuoc['tinh'],
                datasets: [{
                    label: title,
                    data: dataChartCaNhiemToanQuoc['F0'],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 500
                        }
                    },
                    x: {
                        ticks: {
                            autoSkip: false
                        }
                    }
                }
            }
        });
    }
    showChartLuyKe() {
        return `
        <table id='customers' style="width: 680">
            <tr><th>
                Thống kê ca nhiễm
                <a data-toggle="collapse" href="#collapseOne1"
                    aria-expanded="true" aria-controls="collapseOne1">
                    <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i>
                </a>
            </th></tr>
        </table>
        <div id="collapseOne1" style="width: 680" class="collapse show">
            <canvas id="caseChart" width="680" height="400"></canvas>
        </div>`;
    }
    setupChartLuyKe() {
        var ctx = document.getElementById("caseChart").getContext("2d");
        var caseChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: canhiem_labels,
                datasets: [{
                    label: total_case_label,
                    data: total_case_values,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: new_case_label,
                    data: new_case_values,
                    backgroundColor: 'rgba(255, 205, 86, 0.2)',
                    borderColor: 'rgb(255, 205, 86)',
                    borderWidth: 1
                }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

var caNhiemToanQuocControler = new CaNhiemToanQuocControler({});

class BaseHisCaNhiemLoader {
    constructor(data) {
        this.Labels = data;
        
    }

    show(key) {
        if (!dataHisCaNhiem[key]) {
            return '';
        }
        return `
        <table id='customers' style="width: 680">
            <tr><th>
            Ca nhiễm mỗi ngày
            <a data-toggle="collapse" href="#CaNhiemMoiNgay" aria-expanded="true" 
            aria-controls="CaNhiemMoiNgay">
                <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i>
            </a>
            </th></tr>	
        </table>
        <div id="CaNhiemMoiNgay" style="width: 680" class="collapse show">	
            <canvas id="canhiem" width="680"></canvas>
        </div>`;
    }
    setup(title, key) {
        if (!dataHisCaNhiem[key]) {
            return;
        }
        var ctx = document.getElementById('canhiem').getContext("2d");
        var chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.Labels,
                datasets: [{
                    label: title,
                    data: dataHisCaNhiem[key],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }
}

class HisCaNhiemTinhLoader extends BaseHisCaNhiemLoader {
    constructor(data) {
        super(data);
    }
    do(data) {
        var results = readSheet(data);
        // var today = new Date(); // 2021-04-29
        // var start_date = new Date('April 29, 2021 00:00:00');
        // var end_date = today; // new Date('June 02, 2021 00:00:00');
        var idx_date_start = 2; //parseInt((today - start_date) / 86400000) + 1;
        // var idx_date_end = parseInt((end_date - start_date) / 86400000) + 2;
        var idx_date_end = results[0].length - 1;
        var all_data = [];
        for (var j = idx_date_start; j <= idx_date_end; j++) {
            canhiem_labels.push(results[0][j]);
        }
        hisCaNhiemTinhLoader = new HisCaNhiemTinhLoader(canhiem_labels);
        for (var i = 1; i < results.length; i++) {
            const province = results[i][1];
            var tmp = [];
            var case_of_province = 0;
            for (var j = idx_date_start; j <= idx_date_end; j++) {
                tmp.push(parseFloat(results[i][j]));
                case_of_province += parseFloat(results[i][j]);
            }
            dataHisCaNhiem[province] = tmp;
            all_data.push(tmp);
            // console.log(province, case_of_province);
            data_f0.set(province, case_of_province);
            dataChartCaNhiemToanQuoc['tinh'].push(province);
            dataChartCaNhiemToanQuoc['F0'].push(case_of_province);
        }

        for (var i = 0; i < canhiem_labels.length; i++) {
            var sum_new_case = 0;

            for (var j = 0; j < all_data.length; j++) {
                var aa = all_data[j];
                if (i < aa.length) {
                    sum_new_case += aa[i];
                }
            }

            new_case_values.push(sum_new_case);
        }
        // tính lũy kế
        var sum_total_case = 0;
        for (var i = 0; i < canhiem_labels.length; i++) {
            sum_total_case += new_case_values[i];
            total_case_values.push(sum_total_case);
        }
        // console.log('dataHisCaNhiemTinh: ', dataHisCaNhiem);
        if (listRegionControler)
            data_info_general = listRegionControler.provinces();
        // legend.addTo(Lmap);
        // reset_adm1();
        // loadDataLevel2();
    }
    api() {
        call_api('1afRMX-Tau3t_EhYeHONth8jiw6_KIFoDObkyrWltwFQ', 1,
            this.do, 'HisCaNhiemTinhLoader');
    }
    show(province) {
        return super.show(province);
    }
    setup(province) {
        const title = "Ca nhiễm theo ngày " + province;
        super.setup(title, province);
    }
}

var hisCaNhiemTinhLoader = new HisCaNhiemTinhLoader({});

class HisCaNhiemHuyenLoader extends BaseHisCaNhiemLoader {
    constructor(data) {
        super(data);
    }
    do(data) {
        var results = readSheet(data);
        // var today = new Date(); // 2021-04-29
        // var start_date = new Date('April 29, 2021 00:00:00');
        // var end_date = today; // new Date('June 02, 2021 00:00:00');
        var idx_date_start = 3; //parseInt((today - start_date) / 86400000) + 1;
        // var idx_date_end = parseInt((end_date - start_date) / 86400000) + 2;
        var idx_date_end = results[0].length - 1;

        var date_labels = [];
        for (var j = idx_date_start; j <= idx_date_end; j++) {
            date_labels.push(results[0][j]);
        }
        hisCaNhiemHuyenLoader = new HisCaNhiemHuyenLoader(date_labels);
        for (var i = 1; i < results.length; i++) {
            const province = results[i][1];
            const district = results[i][2];
            var tmp = [];
            var sum_case = 0;
            for (var j = idx_date_start; j <= idx_date_end; j++) {
                tmp.push(parseFloat(results[i][j]));
                sum_case += parseFloat(results[i][j]);
            }
            dataHisCaNhiem[province + district] = tmp;
            data_f0.set(province + district, sum_case);
        }
        // console.log('doDataCanhiemHuyen: ', dataHisCaNhiem);
    }
    api() {
        call_api('1afRMX-Tau3t_EhYeHONth8jiw6_KIFoDObkyrWltwFQ', 2,
            this.do, 'HisCaNhiemHuyenLoader');
    }
    show(province, district) {
        return super.show(province + district);
    }
    setup(province, district) {
        const title = "Ca nhiễm theo ngày " + district + ', ' + province;
        super.setup(title, province + district);
    }
}

var hisCaNhiemHuyenLoader = new HisCaNhiemHuyenLoader({});

class HisCaNhiemXaLoader extends BaseHisCaNhiemLoader {
    constructor(data) {
        super(data);
    }
    do(data) {
        var results = readSheet(data);
        // var today = new Date(); // 2021-04-29
        // var start_date = new Date('April 29, 2021 00:00:00');
        // var end_date = today; // new Date('June 02, 2021 00:00:00');
        var idx_date_start = 4; //parseInt((today - start_date) / 86400000) + 1;
        // var idx_date_end = parseInt((end_date - start_date) / 86400000) + 3;
        var idx_date_end = results[0].length - 1;
        var date_labels = [];
        for (var j = idx_date_start; j <= idx_date_end; j++) {
            date_labels.push(results[0][j]);
        }
        hisCaNhiemXaLoader = new HisCaNhiemXaLoader(date_labels);
        for (var i = 1; i < results.length; i++) {
            const province = results[i][1];
            const district = results[i][2];
            const commune = results[i][3];
            var tmp = [];
            var total_case = 0;
            for (var j = idx_date_start; j <= idx_date_end; j++) {
                tmp.push(parseFloat(results[i][j]));
                total_case += parseInt(results[i][j]);
            }
            dataHisCaNhiem[province + district + commune] = tmp;
            data_f0.set(province + district + commune, total_case);
        }
        adm3_layer = L.geoJson(mydata3, {
            style: style,
            filter: districtFilter,
            onEachFeature: onEachFeature3
        });
        // console.log('doDataCanhiemXa: ', dataHisCaNhiem);
    }
    api() {
        call_api('1afRMX-Tau3t_EhYeHONth8jiw6_KIFoDObkyrWltwFQ', 3,
            this.do, 'HisCaNhiemXaLoader');
    }
    show(province, district, commune) {
        return super.show(province + district + commune);
    }
    setup(province, district, commune) {
        const title = "Ca nhiễm theo ngày " + commune + ', ' + district + ', ' + province;
        super.setup(title, province + district + commune)
    }
}

var hisCaNhiemXaLoader = new HisCaNhiemXaLoader({});
