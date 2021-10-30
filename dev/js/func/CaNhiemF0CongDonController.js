class CaNhiemF0CongDonController {
    constructor() {
        this.data = new Map();
        this.clicked_province = ''
        this.clicked_district = ''
        this.f0CongDonChart1 = null
        this.f0CongDonChart2 = null
    }

    mount(clicked_province, clicked_district) {
        this.clicked_province = clicked_province
        this.clicked_district = clicked_district
    }
    setup2()  {
        // Chart.register(ChartDataLabels);
		const dataDump = {
			rangeDate: ['02/08', '09/08'],
			locates: ['Thanh Xuân', 'Ba Đình', 'Hoàng Mai', 'Thanh Trì'],
			data: [12, 34, 55, 66]
		}

		let datasets =	[{
					data: dataDump.data,
					borderColor: '#e8691e',
					backgroundColor:  '#e8691e',
					datalabels: {
						color: '#fff',
						clamp: true,
						anchor: 'center',
						align: 'center'
					}
				}];
	
		const data = {
			labels: dataDump.locates,
			datasets: datasets,
		};
		let ctxLine = document.getElementById('f0congdon-chart-2').getContext("2d");
		this.f0CongDonChart2 = new Chart(ctxLine, {
			plugins: [ChartDataLabels],
			type: 'bar',
			data: data,
			options: {
				responsive: true,
				indexAxis: 'y',
				plugins: {
					legend: {
						display: false,
					},
					title: {
						display: true,
						text: 'Số ca F0 cộng dồn'
					}
				},
                maxBarThickness: 30,
			},
		});

		const dataDumpUpdate = {
			rangeDate: ['02/08', '09/08'],
			locates: ['Thanh Liêm', 'Bình Lục', 'Lý Nhân', 'Kim Bảng'],
			data: [3, 2, 1, 8]
		}


		this.f0CongDonChart2.data.labels = dataDumpUpdate.locates;
		this.f0CongDonChart2.data.datasets[0].data = dataDumpUpdate.data;
		this.f0CongDonChart2.update()
    }
    setup1() {
        // Chart.register(ChartDataLabels);
		const dataDump = {
			rangeDate: ['23/07', '24/07', '25/07', '26/07', '27/07', '28/07', '29/07'],
			data: [
				{
					provice: 'Hà Nội',
					data: [12, 20, 15, 25, 10, 15, 100]
				},
				{
					provice: 'HCM',
					data: [120, 200, 150, 250, 100, 151, 400]
				},
			]
		}

		let datasets = dataDump.data.map((el) => {
			return 	{
					label: el.provice,
					data: el.data,
					borderColor: '#e8691e',
					backgroundColor:  '#e8691e',
					datalabels: {
						color: '#e8691e',
						clamp: true,
						anchor: 'start',
						align: 'top'
					}
				}
		})
		
	
		const data = {
			labels: dataDump.rangeDate,
			datasets: datasets,
		};
		var ctxLine = document.getElementById('f0congdon-chart-1');
		this.f0CongDonChart1 = new Chart(ctxLine, {
			plugins: [ChartDataLabels],
			type: 'line',
			data: data,
			options: {
				responsive: true,
				plugins: {
				legend: {
					position: 'bottom',
				},
				title: {
					display: true,
					text: 'Số ca F0 cộng dồn'
				}
			}
		},

		})
        this.listener()
    }

    setup () {
        this.setup1()
        this.setup2()
    }

    listener () {
        this.listener1()
        this.listener2()
    }

    listener1 () {
        const self = this
        $('#hanh-chinh-select').change(function () {
            const result = self.callApi([1, parseInt(this.value)])
            let datasets = result.map((el) => {
                const color = self.getRandomColor()
                return 	{
                    label: el.provice,
                    data: el.data,
                    borderColor: color,
					backgroundColor: color,
                    datalabels: {
                        color: '#e8691e',
                        clamp: true,
                        anchor: 'start',
                        align: 'top'
                    }
                }
            })
            self.f0CongDonChart1.data.datasets = datasets
            self.f0CongDonChart1.update()
        })
        $('#daterange').on('apply.daterangepicker', function(ev, picker) {
            console.log(picker.startDate.format('YYYY-MM-DD'));
            console.log(picker.endDate.format('YYYY-MM-DD'));
          });
    }

    getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    listener2 () {
        $('#daterange').on('apply.daterangepicker', function(ev, picker) {
            console.log(picker.startDate.format('YYYY-MM-DD'));
            console.log(picker.endDate.format('YYYY-MM-DD'));
          });
    }

    getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
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
            <div class="mb-5">
                ${this.showContentF0CongDon1()}
            </div>
            <hr/>
            <div class="mt-5">
                ${this.showContentF0CongDon2()}
            </div>
        `;
    }

    showContentF0CongDon1() {
        const hanhChinhListController = new HanhChinhListController('hanh-chinh-select')
        const hanhChinhList = hanhChinhListController.show()
        hanhChinhListController.setup(clicked_province, clicked_district)
        let dateRangeInput = new dateRangeController('f0congdon-1')
        const dateRange = dateRangeInput.show()
        dateRangeInput.setup()
        return `
            <div class="d-flex justify-content-center"">
                <form class="w-75 d-flex d-flex justify-content-center">
                    <div class="col-md-6 mb-2">
                    ${hanhChinhList}
                    </div>
                    <div class="col-md-6 mb-2">
                    ${dateRange}
                    </div>
                </form>
            </div>
            <div class="d-flex justify-content-center">
                <canvas id="f0congdon-chart-1" class="w-75 mt-4"></canvas>
            </div>
        `
    }

    showContentF0CongDon2() {
        let dateRangeInput = new dateRangeController('f0congdon-2')
        const dateRange = dateRangeInput.show()
        dateRangeInput.setup()
        return `
            <div class="d-flex justify-content-center">
                <h2>Biểu đồ F0 cộng dồn 2</h2>
            </div>
            <div class="d-flex">
                <div class="w-25 box">
                    <h5>F0 tiếp nhận nơi khác</h5>
                    <h5>10</h5>
                </div>
                <div class="w-25 box">
                    <h5>F0 điều chuyển đi nơi khác</h5>
                    <h5>10</h5>
                </div>
                <div class="w-25 box">
                    <h5>F1 mới trong ngày</h5>
                    <h5>10</h5>
                </div>
                <div class="w-25 box">
                    <h5>F2 mới trong ngày</h5>
                    <h5>10</h5>
                </div>

            </div>
            <div class="d-flex justify-content-center mt-5"">
                <form class="w-75 d-flex d-flex justify-content-start">
                    <div class="col-md-6 mb-2">
                    ${dateRange}
                    </div>
                </form>
            </div>
            <div class="d-flex justify-content-center">
                <canvas id="f0congdon-chart-2" class="w-75 mt-4"></canvas>
            </div>
        `
    }
}

var caNhiemF0CongDonController = new CaNhiemF0CongDonController();