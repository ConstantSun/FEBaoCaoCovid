class BienDongCaNhiemMoiController {
    constructor() {
        this.data = new Map();
        this.clicked_province = ''
        this.clicked_district = ''
    }
    mount(clicked_province, clicked_district) {
        this.clicked_province = clicked_province
        this.clicked_district = clicked_district
    }
    setup(province, district, commune) {
        // Input requires:
        // biendongCaNhiem: tương ưnngs với tỉnh huyện khi load page
        // datadumb: là file chứa thông tin của dãy các dvhc
        // default_tinh_huyen: là dict chứa infor của tỉnh huyện đặt làm gốc khi load page
        // NOTE: Cac ngay phai lien tuc !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


        let selectedDate = "06/08/2021"; // Default init when loading page

        $('#provinces').select2({
            theme: "bootstrap"
        });

        function getProvinceNameList(dataDumb) {
            let province_list = dataDumb.data;
            let name_list = new Array();
            for (let index = 0; index < province_list.length; index++) {
                let p = province_list[index];
                // console.log(p.tinhCongBo)
                name_list.push(p.tinhCongBo);
            }
            return name_list;
        }


        var provinceNameList = getProvinceNameList(CN_TINH);

        var min = 0,
            max = provinceNameList.length,
            select = document.getElementById('provinces');

        for (var i = min; i < max; i++) {
            var opt = document.createElement('option');
            opt.value = provinceNameList[i];
            opt.innerHTML = provinceNameList[i];
            select.appendChild(opt);
        }


        const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
        const toNumbers = arr => arr.map(Number);



        // Tao mang du lieu cho tinh , given a date , neu date ko ton tai, tra ve mang toan 0.
        // tinh_huyen: dictionary of information 
        // selectedDate : "06/08/2021"
        function getProvinceDataToVisualize(tinh_huyen, selectedDate) {
            // console.log("line 205 ", tinh_huyen, selectedDate);
            // console.log("line 206 ", tinh_huyen.dates);
            let indexSelectedDateInDefault = tinh_huyen.dates.indexOf(selectedDate);

            let correspondingDataToDate = new Array(); // du lieu (cua 1 tinh) cho hinh ben trai 
            let pivot = indexSelectedDateInDefault;
            for (let i = 0; i < 7; i++) {
                if (pivot < 0) {
                    correspondingDataToDate.push(0);
                    continue;
                }
                let avg_nearest_7_days = average(toNumbers(tinh_huyen.datas.slice(pivot - 6, pivot + 1)));
                correspondingDataToDate.push(Math.round(avg_nearest_7_days));
                pivot = pivot - 1;
            }
            return correspondingDataToDate.reverse();
        }




        // Return : a dict of selected province
        function findInforFromProvinceName(dataDumb, provinceName) {
            let province_list = dataDumb.data;
            for (let index = 0; index < province_list.length; index++) {
                let p = province_list[index];
                // console.log(p.tinhCongBo)
                if (p.tinhCongBo.localeCompare(provinceName) == 0) {
                    return p;
                }
            }
            return {};
        }


        var ctx = document.getElementById('myChart');

        // Setup
        const DATA_COUNT = 7;
        const NUMBER_CFG = {
            count: DATA_COUNT,
            min: -100,
            max: 100
        };

        const labels = [" ", " ", " ", " ", " ", " ", " "];
        const data = {
            labels: labels,
            datasets: [{
                label: default_tinh_huyen["tinhCongBo"],
                data: getProvinceDataToVisualize(default_tinh_huyen, selectedDate),
                borderColor: 'Red',
                backgroundColor: 'Red',
                datalabels: {
                    color: 'black',
                }
            }, {
                label: '',
                data: [],
                borderColor: "Blue",
                backgroundColor: 'rgb(240, 137, 41)',
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
            plugins: [ChartDataLabels],
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
                        text: 'Trung bình ca mới trong 7 ngày'
                    }
                },
                layout: {
                    padding: 0,
                }
            },
        };

        var myChart = new Chart(ctx, config);

        console.log("hello 365");


        // const provinces = document.getElementById('provinces');
        // provinces.addEventListener('change', provincesTracker);

        $("#provinces").change(function() {
            let selectedProvince = $("#provinces option:selected").val();
            console.log("line 167 .......... province val: ", selectedProvince);



            let selectedDate = "";
            if (calA != null) {
                console.log("line 386: ", calA.getSelectedDate());
                let currentDate = calA.getSelectedDate();
                let date = String(currentDate.getDate());
                if (date.length == 1) {
                    date = "0" + date;
                }
                let month = String(currentDate.getMonth() + 1);
                if (month.length == 1) {
                    month = "0" + month;
                }
                let year = String(currentDate.getFullYear());
                selectedDate = date + "/" + month + "/" + year;
            };


            // console.log("line 372 in provincestracker: ", provinces.value);
            if (selectedProvince.localeCompare("Tỉnh/huyện") != 0) {
                let selectedProvinceInfor = findInforFromProvinceName(CN_TINH, selectedProvince);
                myChart.data.datasets[1].label = selectedProvince;
                myChart.data.datasets[1].data = getProvinceDataToVisualize(selectedProvinceInfor, selectedDate);
                myChart.update();
            };

        })

        function provincesTracker() {
            console.log("hi .....................");

            let selectedDate = "";
            if (calA != null) {
                console.log("line 386: ", calA.getSelectedDate());
                let currentDate = calA.getSelectedDate();
                let date = String(currentDate.getDate());
                if (date.length == 1) {
                    date = "0" + date;
                }
                let month = String(currentDate.getMonth() + 1);
                if (month.length == 1) {
                    month = "0" + month;
                }
                let year = String(currentDate.getFullYear());
                selectedDate = date + "/" + month + "/" + year;
            };


            console.log("line 372 in provincestracker: ", provinces.value);
            if (provinces.value.localeCompare("Tỉnh/huyện") != 0) {
                console.log(provinces.value.localeCompare("Tỉnh/huyện"), " was selected !!! line 187 --------------");

                let selectedProvinceInfor = findInforFromProvinceName(CN_TINH, provinces.value);
                myChart.data.datasets[1].label = provinces.value;
                myChart.data.datasets[1].data = getProvinceDataToVisualize(selectedProvinceInfor, selectedDate);
                myChart.update();

            };
        }

        function clickCalendar(selectedDate) {
            console.log("date in line 382: ", selectedDate);
            myChart.data.datasets[0].data = getProvinceDataToVisualize(default_tinh_huyen, selectedDate);
            // console.log("calendar chart 0:", getProvinceDataToVisualize(default_tinh_huyen, selectedDate))
            myChart.update();
        }






        var config_1_data_datasets = new Array();


        for (let index = 0; index < bienDongCaNhiem.quan.length; index++) {
            let _label = bienDongCaNhiem.quan[index];
            let _bkgColor = "",
                _borderColor = " ";
            if (bienDongCaNhiem.slope1[index] == bienDongCaNhiem.slope2[index]) {
                _bkgColor = "Blue";
                _borderColor = "Blue";
            } else
            if (bienDongCaNhiem.slope1[index] > bienDongCaNhiem.slope2[index]) {
                _bkgColor = "Green";
                _borderColor = "Green";
            } else {
                _bkgColor = "Red";
                _borderColor = "Red";
            }
            let y1 = bienDongCaNhiem.slope1[index];
            let y2 = bienDongCaNhiem.slope2[index];
            // _data = [2 * y1 - y2, y1, y2, 2 * y2 - y1];
            let _data = [null, y1, y2, null];
            config_1_data_datasets.push({
                label: _label,
                backgroundColor: _bkgColor,
                borderColor: _borderColor,
                data: _data
            });

        }


        var ctx1 = document.getElementById('bienDong');


        var config_1 = {
            plugins: [ChartDataLabels],
            type: 'line',
            data: {
                labels: ["", "", "", ""],
                datasets: config_1_data_datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    datalabels: {
                        formatter: function(value, context) {
                            return context.dataset.label + ", " + value;
                        },

                        backgroundColor: function(context) {
                            return context.dataset.backgroundColor;
                        },
                        borderRadius: 1,
                        color: 'white',
                        font: {
                            weight: 'bold'
                        },
                        // formatter: Math.round,
                        padding: 3
                    },
                    title: {
                        display: true,
                        text: 'BIẾN ĐỘNG CA NHIỄM MỚI'
                    }
                },
                layout: {
                    padding: 500,
                },
                // Core options
                aspectRatio: 3 / 2,
                layout: {
                    padding: {
                        top: 32,
                        right: 16,
                        bottom: 16,
                        left: 8
                    }
                },
                elements: {
                    line: {
                        fill: false,
                        tension: 0.4
                    }
                },
                scales: {
                    y: {
                        stacked: false
                    }
                }
            }

        }


        var bienDong = new Chart(ctx1, config_1);

        console.log("hello 487");






        var calA = new Calendar({
            id: "#calendar",
            calendarSize: "small",
            customWeekdayValues: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
            customMonthValues: ["Tháng một", "Tháng hai", "Tháng ba", "Tháng bốn", "Tháng năm", "Tháng sáu", "Tháng bảy", "Tháng tám", "Tháng chín", "Tháng mười", "Tháng mười một", "Tháng mười hai"],

            dateChanged: (currentDate, events) => {

                let date = String(currentDate.getDate());
                if (date.length == 1) {
                    date = "0" + date;
                }
                let month = String(currentDate.getMonth() + 1);
                if (month.length == 1) {
                    month = "0" + month;
                }
                let year = String(currentDate.getFullYear());
                let selectedDate = date + "/" + month + "/" + year;
                console.log("line 509 in Calendar: ", selectedDate);
                clickCalendar(selectedDate);
                provincesTracker();
            },


        });
        const defaultDate = '08/06/2021'
        calA.setDate(new Date(defaultDate))

        console.log("hello 515");
        console.log("LAST LINE: ", selectedDate, default_tinh_huyen["tinhCongBo"]);
        $('.province-slide8').select2({
            theme: 'bootstrap'
        });
    }
    show(clicked_province, clicked_district, clicked_commune) {
        const hanhChinhListController = new HanhChinhListController('provinces')
        const hanhChinhList = hanhChinhListController.show()
        hanhChinhListController.setup(clicked_province, clicked_district)
        let dateRangeInput = new dateRangeController('calendar')
        const dateRange = dateRangeInput.show()
        dateRangeInput.setup()
        return `
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">${hanhChinhList}</div>
                        <div class="col-md-6">${dateRange}</div>
            
                    </div>
            
                    <div class="chart-container">
                        <!-- Trung bình ca mới 7 ngày -->
                        <canvas id="myChart" style=" height: 330px; width: 680px" height="337" width="675"></canvas>
                    </div>
            
                    <div class="chart-container">
                        <!-- <hr> BIẾN ĐỘNG CA NHIỄM MỚI -->
                        <canvas id="bienDong"  style=" height: 330px; width: 680px" height="337" width="675"></canvas>
                    </div>
                </div>                

        `;
    }
    listener() {
        //
    }
}

var bienDongCaNhiemMoiController = new BienDongCaNhiemMoiController();