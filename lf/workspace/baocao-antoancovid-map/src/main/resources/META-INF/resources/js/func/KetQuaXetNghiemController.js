class KetQuaXetNghiemController {
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
    setup() {
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
            let color = this.getRandomColor()
			return 	{
					label: el.provice,
					data: el.data,
					borderColor: color,
					backgroundColor: color,
					datalabels: {
						color: '#e8691e',
						anchor: 'end',
						align: 'end'
					}
				}
		})
		
	
		const data = {
			labels: dataDump.rangeDate,
			datasets: datasets,
		};
		let ctx = document.getElementById('ketquaxetnghiem-chart');
		this.f0CongDonChart1 = new Chart(ctx, {
			plugins: [ChartDataLabels],
			type: 'bar',
			data: data,
			options: {
				responsive: true,
				plugins: {
				legend: {
					position: 'bottom',
				},
				title: {
					display: true,
					text: 'Tỷ lệ xét nghiệm'
				}
			}
		},

		})
        this.listener()
    }

    listener () {
        //
    }

    getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
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
            <div class="d-flex justify-content-center"">
                <form class="w-75 d-flex d-flex justify-content-start">
                    <div class="col-md-6 mb-2">
                        <select class="form-control" id="type-select">
                            <option selected>-- Loại --</option>
                            <option >Cách li</option></option>
                            <option>Nhập cảnh</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="d-flex justify-content-center">
                <canvas id="ketquaxetnghiem-chart" class="w-75 mt-4"></canvas>
            </div>
        `
    }
}

var ketQuaXetNghiemController = new KetQuaXetNghiemController();