class BaoCaoF0Controller {
    constructor() {
        this.clicked_province = ''
        this.clicked_district = ''
        this.data = new Map();
    }
    mount(clicked_province, clicked_district) {
        this.clicked_province = clicked_province
        this.clicked_district = clicked_district
    }
    listener () {
        //
    }
    setup(province, district, commune) {
        var ctx = document.getElementById("chartBaoCaoF0").getContext("2d");
        // Chart.register(ChartDataLabels);
        var data = {
            
            labels: ["15/7","16/7","17/7","18/7","19/7","20/7","21/7","22/7", "23/7", "24/7", "25/7", "26/7", "27/7", "28/7"],
            datasets: [{
                label: "Hà Nội",
                backgroundColor: "blue",
                data: [15, 20, 30, 35, 38, 78, 80, 150, 320, 370, 365, 358, 784, 820]
            }],
        };
        var myBarChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            plugins: [ChartDataLabels],
            options: {
                barValueSpacing: 100,
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                        }
                    }]
                },
                plugins: {
                    datalabels: {
                        align: 'end',
                        anchor: 'end',
                        color: 'black',
                        labels: {
                            title: {
                                font: {
                                    weight: 'bold',
                                }
                            },
                            value: {
                                color: 'green'
                            }
                        }
                    },
                    legend: {
                        display: true,
                        position: "top",
                    },
                    title: {
                        display: true,
                        text: 'Báo cáo diễn biến F0 trong ngày',
                        font: {
                            size: 20,
                        }
                    }
                }
            }
        });
        this.fillHTML()

        const dataDump = {
			rangeDate: ['23/07', '24/07', '25/07', '26/07', '27/07', '28/07', '29/07'],
			data: {
				hospital:  {
					type: 'Sàng lọc bệnh viện',
					data: [12, 20, 15, 25, 10, 15, 50]
				},
				public: {
					type: 'Cộng đồng',
					data: [12, 20, 15, 25, 10, 15, 50]
				},
				isolate: {
					type: 'Cách li',
					data: [12, 20, 15, 25, 10, 15, 50]
				},
				lockdown: {
					type: 'Phong tỏa',
					data: [12, 20, 15, 25, 10, 15, 50]
				},
				entry: {
					type: 'Nhập cảnh',
					data: [12, 20, 15, 25, 10, 15, 50]
				},
				total: {
					type: 'Tổng số',
					data: [60, 100, 75, 125, 50, 75, 250]
				}
			}
		}

        
        var chartData = [{
            label: 'Sàng lọc bệnh viện',
            data: dataDump.data.hospital.data,
            backgroundColor: '#3776a6',
            borderColor: '#3776a6',
            borderWidth: 1,
            stack: 'combined',
            type: 'bar'
        },
        {
            label: 'Cộng đồng',
            data: dataDump.data.public.data,
            backgroundColor: '#e8691d',
            borderColor: '#e8691d',
            borderWidth: 1,
            stack: 'combined',
            type: 'bar'
        },
        {
            label: 'Cách li',
            data: dataDump.data.isolate.data,
            backgroundColor: '#c5c5c5',
            borderColor: '#c5c5c5',
            borderWidth: 1,
            stack: 'combined',
            type: 'bar'
        },
        {
            label: 'Phong tỏa',
            data: dataDump.data.lockdown.data,
            backgroundColor: '#ecb129',
            borderColor: '#ecb129',
            borderWidth: 1,
            stack: 'combined',
            type: 'bar'
        },
        {
            label: 'Nhập cảnh',
            data: dataDump.data.entry.data,
            backgroundColor: '#22a4e4',
            borderColor: '#22a4e4',
            borderWidth: 1,
            stack: 'combined',
            type: 'bar'
        },
        {
            label: 'Tổng số',
            data: dataDump.data.total.data,
            backgroundColor: '#45a526',
            borderColor: '#45a526',
            borderWidth: 3,
            type: 'line',
            datalabels: {
                color: '#45a526',
                anchor: 'end',
                align: 'top'
            },
        }]
        var labels = ['23/07', '24/07', '25/07', '26/07', '27/07', '28/07', '29/07'];
        var ctxF0moichart = document.getElementById('f0moichart').getContext("2d");
		const f0MoiChart = new Chart(ctxF0moichart, {
            plugins: [ChartDataLabels],
			data: {
				labels: labels,
				datasets: chartData,
                barPercentage: 0.5,
                barThickness: 6,
                maxBarThickness: 1000,
                minBarLength: 2,
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						position: 'bottom',
					},
					title: {
						display: true,
						text: 'THÔNG KÊ CA NHIỄM THEO LOẠI'
					}
				},
                maxBarThickness: 50,
			},
		});
    }
    fillHTML(province, district, commune) {
        this.appendProvinces();
        $('#bcf0-select-place').select2({
            width: '100%',
            theme: "bootstrap"
        });
        $('#bcf0-select-type').select2({
            width: '100%',
            theme: "bootstrap"
        });
        $('#bcf0-from').daterangepicker({
            // singleDatePicker: true,
            startDate: moment().subtract(1, 'days'),
            locale: {
                format: 'DD-MM-YYYY'
            },
            maxSpan: {
                "days": 30,
            },
        });
    }
    appendProvinces() {
        // console.log(ATCOVID_PROVINCES);
        let allProvinces = ATCOVID_PROVINCES;
        let selectPlace = $('#bcf0-select-place').empty();
        let defaultOpt = $("<option></option>").html("-- Chọn --"); 
        selectPlace.append(defaultOpt);
        for (let i = 0; i < allProvinces.length; ++i) {
            // console.log(allProvinces[i]);
            let opt = $("<option></option>").html(allProvinces[i].name).attr('value', allProvinces[i].name);
            selectPlace.append(opt);
        }
    }
    show(province, district, commune) {
        return `
        <div class="d-flex justify-content-center"">
            <form class="w-75 d-flex d-flex justify-content-start">
                <div class="col-4">
                    <p class="bcf0-label">Chọn vùng</p>
                    <select name="place" class="form-control" id="bcf0-select-place">
                        
                    </select>
                </div>
                <div class="col-4">
                    <p class="bcf0-label">Từ ngày</p>
                    <input type="text" class="form-control" id="bcf0-from" name="from" style="width: 100%;">   
                </div>
                <div class="col-4">
                    <p class="bcf0-label">Chọn loại</p>
                    <div style="width: 100%;">
                    <select name="type" class="form-control" id="bcf0-select-type">
                        <option value="sum">Tổng</option>
                        <option value="slbv">Sàng lọc bệnh viện</option>
                        <option value="cd">Cộng đồng</option>
                        <option value="cl">Cách ly</option>
                        <option value="pt">Phong tỏa</option>
                        <option value="nc">Nhập cảnh</option>
                    </select>
                    </div>
                </div>
            </form>
        </div>
        <div class="d-flex justify-content-center mb-4">
            <canvas id="chartBaoCaoF0" class="w-75 mt-4"></canvas>
        </div>
        <hr>
        <div class="d-flex justify-content-center mt-4">
            <canvas id="f0moichart" class="w-75 mt-4"></canvas>
        </div>
        `;
    }
}

var baoCaoF0Controller = new BaoCaoF0Controller();