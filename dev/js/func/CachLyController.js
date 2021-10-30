class CachLyController {
    constructor() {
        this.data = new Map();
        this.clicked_province = ''
        this.clicked_district = ''
        this.cachLyChart = null
        this.cachLyTheoLoaiChart = null
    }
    mount(clicked_province, clicked_district) {
        this.clicked_province = clicked_province
        this.clicked_district = clicked_district
    }
    setup(province, district, commune) {
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




        var ctx = document.getElementById('cachLy');

        // Setup
        const DATA_COUNT = 7;
        const NUMBER_CFG = {
            count: DATA_COUNT,
            min: -100,
            max: 100
        };

        const labels = ["7/20/2021", "7/21/2021", "7/22/2021", "7/23/2021", "7/24/2021", "7/25/2021", "7/26/2021", "7/27/2021", "7/28/2021", "7/29/2021", "7/30/2021", "7/31/2021"];
        const data = {
            labels: labels,
            datasets: [{
                label: "HN",
                data: [234, 342, 453, 311, 453, 56, 34, 645, 223, 422, 534, 534],
                borderColor: 'Blue',
                backgroundColor: 'Blue',
                datalabels: {
                    color: 'black',
                    anchor: 'end',
                    align: 'top',
                    offset: 10
                }
            }, {
                label: 'HCM',
                data: [274, 142, 353, 811, 153, 756, 434, 345, 923, 432, 584, 234],
                borderColor: "Orange",
                backgroundColor: 'Orange',
                datalabels: {
                    color: 'black',
                    anchor: 'end',
                    align: 'top',
                    offset: 10
                }
            }]
        };


        // Config
        const config = {
            // plugins: [ChartDataLabels],
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    datalabels: {
                        formatter: function(value, context) {
                            return value;
                        }
                    },
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Cách ly'
                    }
                },
                layout: {
                    padding: 0,
                }
            },
        };

        this.cachLyChart = new Chart(ctx, config);

        const labels2 = ["7/20/2021", "7/21/2021", "7/22/2021", "7/23/2021", "7/24/2021", "7/25/2021", "7/26/2021", "7/27/2021", "7/28/2021", "7/29/2021", "7/30/2021", "7/31/2021"];
        const data2 = {
            labels: labels2,
            datasets: [{
                    label: 'Tập trung',
                    data: [...Array(12).keys()],
                    backgroundColor: 'Orange',
                },
                {
                    label: 'Tại nhà',
                    data: [5, 7, 3, 5, 3, 6, 3, 7, 4, 3, 4, 6],
                    backgroundColor: 'Gray',
                },
                {
                    label: 'Khác',
                    data: [8, 6, 5, 1, 2, 3, 6, 4, 8, 5, 1, 2],
                    backgroundColor: 'Yellow',
                },
                {
                    label: 'Tổng số',
                    data: [8, 6, 5, 1, 2, 3, 6, 4, 8, 5, 1, 2],
                    backgroundColor: 'Yellow',
                }
            ]
        };



        const config_2 = {
            type: 'bar',
            data: data2,
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Cách ly theo các nhóm'
                    },
                },
                responsive: true,
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true
                    }
                }
            }
        };



        let ctx2 = document.getElementById("cachLyTheoNhom");
        this.cachLyTheoLoaiChart = new Chart(ctx2, {
            data: {
                datasets: [{
                        type: 'bar',
                        label: 'Tập trung',
                        data: [...Array(12).keys()],
                        backgroundColor: 'Orange',
                    },
                    {
                        type: 'bar',
                        label: 'Tại nhà',
                        data: [5, 7, 3, 5, 3, 6, 3, 7, 4, 3, 4, 6],
                        backgroundColor: 'Gray',
                    },
                    {
                        type: 'bar',
                        label: 'Khác',
                        data: [8, 6, 5, 1, 2, 3, 6, 4, 8, 5, 1, 2],
                        backgroundColor: 'Yellow',
                    },
                    {
                        type: 'line',
                        label: 'Tổng số',
                        data: [14, 16, 12, 12, 12, 15, 16, 18, 23, 18, 16, 18],
                        backgroundColor: 'Yellow',
                    }
                ],
                labels: labels2
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Cách ly theo các nhóm'
                    },
                },
                responsive: true,
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true
                    }
                }
            }
        });


        // var myChart2 = new Chart(ctx2, config_2);


    }
    show(clicked_province, clicked_district, clicked_commune) {
        const hanhChinhListController = new HanhChinhListController('provices')
        const hanhChinhList = hanhChinhListController.show()
        hanhChinhListController.setup(clicked_province, clicked_district)
        let dateRangeInput = new dateRangeController('f0congdon-1')
        const dateRange = dateRangeInput.show()
        dateRangeInput.setup()
        return `
        <div class="container">
        <div class="row">
            <div class="col-md-4">
                ${hanhChinhList}
            </div>
            <div class="col-md-4">
                ${dateRange}
            </div>
            <div class="col-md-4">
                <div class="selectBox">
                    <select id="type_slide21" class="form-control" name="typeOfCachLy">
                        <option selected="true" disabled="disabled" > Loại </option>
                        <option value="clytetaptrung"> Cách ly y tế tập trung </option>
                        <option value="tainha" > Tại nhà </option>
                        <option value="khac"  > Khác </option>
                        <option value="tong" > Tổng </option>
                    </select>
                </div>
            </div>

        </div>

        <div class="chart-container">
            <!-- Trung bình ca mới 7 ngày -->
            <canvas id="cachLy"></canvas>
        </div>

        <div class="chart-container">
            <!-- <hr> BIẾN ĐỘNG CA NHIỄM MỚI -->
            <canvas id="cachLyTheoNhom"></canvas>
        </div>
    </div>               

        `;
    }
    listener() {
        const self = this
        $('#provinces').change(function () {
            console.log("line 372 in provincestracker: ", provinces.value);
            if (provinces.value.localeCompare("Tỉnh/huyện") != 0) {
                selectedProvinceInfor = findInforFromProvinceName(datadumb, provinces.value);
                self.cachLyChart.data.datasets[1].label = provinces.value
                self.cachLyChart.data.datasets[1].data = getProvinceDataToVisualize(selectedProvinceInfor, selectedDate);
                self.cachLyChart.update();
            };
        })

        function provincesTracker() {
            
        }
    }
}

var cachLyController = new CachLyController();