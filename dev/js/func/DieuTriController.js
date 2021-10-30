class DieuTriController {
    divMounted = 'divDieuTri' 
    constructor() {
        this.data = new Map();
        this.clicked_province = ''
        this.clicked_district = ''
        this.handleController = null
        this.dieuTriChart = null
    }
    setup() {
        const dataDump = {
			rangeDate: ['23/07', '24/07', '25/07', '26/07', '27/07', '28/07', '29/07'],
			data: [12, 20, 15, 25, 10, 15, 100]
		}

		const data = {
			labels: dataDump.rangeDate,
			datasets: [{
                label: 'Tỷ lệ sử dụng giường',
                data: dataDump.data,
                borderColor: '#3776a6',
                backgroundColor: function (context) {
                    var index = context.dataIndex;
                    var value = context.dataset.data[index];
                    return value > 80 ? 'red' : '#3776a6';
                },
                datalabels: {
                    color: '#000',
                    clamp: true,
                    anchor: 'end',
                    align: 'end',
                    formatter: function (value) {
                        return value + '%';
                    }
                }
            }],
		};
        let ctx = document.getElementById('dieutri-chart');
        this.dieuTriChart = new Chart(ctx, {
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
                        text: 'Số người xét nghiệm'
                    }
                },
                maxBarThickness: 50,
            },
        })
    }

    mount (clicked_province, clicked_district) {
        this.clicked_province = clicked_province
        this.clicked_district = clicked_district
        let content = this.show()
        document.getElementById(this.divMounted).innerHTML = content;
        this.setup()
        this.listener()
    }

    listener () {
        //
    }

    show() {
        return `
            <div class="row">
                <div class="col-4">
                    <div class="text-center p-1" style="border: 1px solid;">
                        <h6>Số BN nặng</h6>
                        <h6>50</h6>
                    </div>
                </div>
                <div class="col-4">
                    <div class="text-center p-1" style="border: 1px solid;">
                        <h6>Số BN nguy kịch</h6>
                        <h6>10</h6>
                    </div>
                </div>
                <div class="col-4">
                    <div class="text-center p-1" style="border: 1px solid;">
                        <h6>Tỷ lệ tử vong/ BN</h6>
                        <h6>2.1%</h6>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-4">
                    <div class="text-center p-1" style="border: 1px solid;">
                        <h6>Tỷ lệ BN nặng</h6>
                        <h6>10%</h6>
                    </div>
                </div>
                <div class="col-4">
                    <div class="text-center p-1" style="border: 1px solid;">
                        <h6>Ty lệ BN nguy kịch</h6>
                        <h6>2%</h6>
                    </div>
                </div>
                <div class="col-4">
                    <div class="text-center p-1" style="border: 1px solid;">
                        <h6>Tỷ lệ tử vong/ dân</h6>
                        <h6>0.4%</h6>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <canvas id="dieutri-chart" class="w-100 mt-4"></canvas>
            </div>
        `;
    }
}

var dieuTriController = new DieuTriController();