class TyLeDuongTinhController {
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
					}
				}
		})
		
	
		const data = {
			labels: dataDump.rangeDate,
			datasets: datasets,
		};
		let ctx = document.getElementById('tyleduongtinh-chart');
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
        hanhChinhListController.setup(clicked_province, clicked_district)
        const hanhChinhList = hanhChinhListController.show()
        let dateRangeInput = new dateRangeController('f0congdon-1')
        const dateRange = dateRangeInput.show()
        dateRangeInput.setup()
        return `
			<div class="d-flex justify-content-center">
				<div class="card w-100">
					<div class="card-header text-center">
						Tỷ lệ dương tính qua xét nghiệm nhanh trong 7 ngày gần nhất 
					</div>
					<div class="card-body">
						<div class="d-flex justify-content-between">
							<div class="p-3 text-center" style="border: 1px solid;">
								<h6>Tổng số</h6>
								<h6>1%</h6>
							</div>
							<div class="p-3 text-center" style="border: 1px solid;">
								<h6>F1</h6>
								<h6>1%</h6>
							</div>
							<div class="p-3 text-center" style="border: 1px solid;">
								<h6>F2</h6>
								<h6>1%</h6>
							</div>
							<div class="p-3 text-center" style="border: 1px solid;">
								<h6>NVYT</h6>
								<h6>1%</h6>
							</div>
							<div class="p-3 text-center" style="border: 1px solid;">
								<h6>NN</h6>
								<h6>1%</h6>
							</div>
							<div class="p-3 text-center" style="border: 1px solid;">
								<h6>PT</h6>
								<h6>1%</h6>
							</div>
							<div class="p-3 text-center" style="border: 1px solid;">
								<h6>CDD</h6>
								<h6>1%</h6>
							</div>
							<div class="p-3 text-center" style="border: 1px solid;">
								<h6>CL</h6>
								<h6>1%</h6>
							</div>
							<div class="p-3 text-center" style="border: 1px solid;">
								<h6>BV</h6>
								<h6>1%</h6>
							</div>
							<div class="p-3 text-center" style="border: 1px solid;">
								<h6>NC</h6>
								<h6>1%</h6>
							</div>
							<div class="p-3 text-center" style="border: 1px solid;">
								<h6>Khác</h6>
								<h6>1%</h6>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="d-flex justify-content-center">
				<div class="card w-100">
					<div class="card-header text-center">
						Tỷ lệ dương tính qua xét nghiệm khẳng định trong 7 ngày gần nhất 
					</div>
					<div class="card-body">
						<div class="d-flex justify-content-between">
							<div class="p-3 text-center" style="border: 1px solid;">
								<h6>Tổng số</h6>
								<h6>1%</h6>
							</div>
							<div class="p-3 text-center" style="border: 1px solid;">
								<h6>F1</h6>
								<h6>1%</h6>
							</div>
							<div class="p-3 text-center" style="border: 1px solid;">
								<h6>F2</h6>
								<h6>1%</h6>
							</div>
							<div class="p-3 text-center" style="border: 1px solid;">
								<h6>NVYT</h6>
								<h6>1%</h6>
							</div>
							<div class="p-3 text-center" style="border: 1px solid;">
								<h6>NN</h6>
								<h6>1%</h6>
							</div>
							<div class="p-3 text-center" style="border: 1px solid;">
								<h6>PT</h6>
								<h6>1%</h6>
							</div>
							<div class="p-3 text-center" style="border: 1px solid;">
								<h6>CDD</h6>
								<h6>1%</h6>
							</div>
							<div class="p-3 text-center" style="border: 1px solid;">
								<h6>CL</h6>
								<h6>1%</h6>
							</div>
							<div class="p-3 text-center" style="border: 1px solid;">
								<h6>BV</h6>
								<h6>1%</h6>
							</div>
							<div class="p-3 text-center" style="border: 1px solid;">
								<h6>NC</h6>
								<h6>1%</h6>
							</div>
							<div class="p-3 text-center" style="border: 1px solid;">
								<h6>Khác</h6>
								<h6>1%</h6>
							</div>
						</div>
					</div>
				</div>
			</div>
            <div class="d-flex justify-content-center mt-5">
                <form class="w-100 d-flex d-flex justify-content-center">
                    <div class="col-md-4 mb-2">
                    ${hanhChinhList}
                    </div>
                    <div class="col-md-4 mb-2">
                    ${dateRange}
                    </div>
					<div class="col-md-4 mb-2">
						<select class="form-control" id="type-select">
							<option selected>-- Loại --</option>
							<option >Cách li</option></option>
							<option>Nhập cảnh</option>
						</select>
					</div>
                </form>
            </div>
            <div class="d-flex justify-content-center">
                <canvas id="tyleduongtinh-chart" class="w-100 mt-4"></canvas>
            </div>
        `
    }
}

var tyLeDuongTinhController = new TyLeDuongTinhController();