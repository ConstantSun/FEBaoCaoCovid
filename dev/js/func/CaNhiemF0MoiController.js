class CaNhiemF0MoiController {
    constructor() {
        this.data = new Map();
        this.clicked_province = ''
        this.clicked_district = ''
        this.f0MoiChart = null
    }

    mount(clicked_province, clicked_district) {
        this.clicked_province = clicked_province
        this.clicked_district = clicked_district
    }
    setup() {
        // Chart.register(ChartDataLabels);
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

        var ctx = document.getElementById('f0moichart').getContext("2d");

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
            stack: 'combined',
            type: 'line',
            datalabels: {
                color: '#45a526',
                clamp: true,
                anchor: 'start',
                align: 'top'
            },
        }]
        var labels = ['23/07', '24/07', '25/07', '26/07', '27/07', '28/07', '29/07'];
		this.f0MoiChart = new Chart(ctx, {
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

    callApi (locations = null, dateRang = null) {
        const dataDump = {
			rangeDate: ['23/07', '24/07', '25/07', '26/07', '27/07', '28/07', '29/07'],
			data: [
				{
                    id: 1,
					provice: 'Hà Nội',
					data: [12, 20, 15, 25, 10, 15, 100]
				},
				{
                    id: 2,
					provice: 'HCM',
					data: [120, 200, 150, 250, 100, 151, 400]
				},
                {
                    id: 3,
					provice: 'Hải Phòng',
					data: [120, 233, 189, 130, 89, 334, 122]
				},
			]
		}

        return dataDump.data.filter((el) => {
            return locations.includes(el.id)
        })
    }

    show() {
        return `
            <div class="d-flex justify-content-center">
                <canvas id="f0moichart" class="w-75 mt-4"></canvas>
            </div>
        `
    }

    listener() {
        //
    }
}

var caNhiemF0MoiController = new CaNhiemF0MoiController();