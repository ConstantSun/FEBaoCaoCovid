class ThongKeNhomBenhController {
    constructor() {
        this.data = new Map();
    }

    mount(clicked_province, clicked_district, clicked_commune) {
        this.clicked_province = clicked_province
        this.clicked_district = clicked_district
        this.clicked_commune = clicked_commune
    }
    listener() {
        //
    }
    setup(province, district, commune) {
        var ctx1 = document.getElementById('thongKeDoTuoi');
        var myChart1 = new Chart(ctx1, {
            type: 'doughnut',
            plugins: [ChartDataLabels],
            data: {
                labels: ['1 (< 18)', '2 (18-40)', '3 (41-59)', '4 (>= 60)'],
                datasets: [{
                    label: 'Cơ cấu giới tính & độ tuổi của FO',
                    // data: [14.05, 58.96, 20.31, 6.68],
                    data: [1000, 2000, 3000, 4000],
                    backgroundColor: [
                        '#287271',
                        '#F4A261',
                        '#8AB17D',
                        '#E9C46A',
                    ],
                    borderColor: [
                        '#287271',
                        '#F4A261',
                        '#8AB17D',
                        '#E9C46A',
                    ],
                    borderWidth: 1,
                    hoverOffset: 4,
                }]
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 20,
                            }
                        },
                        position: 'right',
                    },
                    title: {
                        text: 'Cơ cấu độ tuổi',
                        display: true,
                        font: {
                            size: 25,
                        }
                    },
                    datalabels: {
                        borderColor: 'white',
                        borderRadius: 25,
                        borderWidth: 2,
                        padding: 10,
                        color: 'white',
                        font: {
                            size: 15,
                        },
                        labels: {
                            value: {},
                            title: {
                                color: 'white',
                            }
                        },
                        formatter: (value, ctx) => {
                            let sum = 0;
                            let dataArr = ctx.chart.data.datasets[0].data;
                            dataArr.map(data => {
                                sum += data;
                            });
                            let percentage = (value*100 / sum).toFixed(2)+"%";
                            return percentage;
                        },
                    }
                }
            }
        });
        var ctx2 = document.getElementById('thongKeGioiTinh');
        var myChart2 = new Chart(ctx2, {
            type: 'pie',
            plugins: [ChartDataLabels],
            data: {
                labels: ['Nam', 'Nữ'],
                datasets: [{
                    label: 'Cơ cấu giới tính & độ tuổi của FO',
                    data: [46, 54],
                    backgroundColor: [
                        '#287271',
                        '#F4A261',
                    ],
                    borderColor: [
                        '#287271',
                        '#F4A261',
                    ],
                    borderWidth: 1,
                    hoverOffset: 4,
                }]
            },
            options: {
                plugins: {
                    title: {
                        text: 'Cơ cấu giới tính',
                        display: true,
                        font: {
                            size: 25,
                        }
                    },
                    legend: {
                        labels: {
                            font: {
                                size: 20,
                            }
                        },
                        position: 'right',
                    },
                    datalabels: {
                        borderColor: 'white',
                        borderRadius: 25,
                        borderWidth: 2,
                        padding: 10,
                        color: 'white',
                        font: {
                            size: 15,
                        },
                        labels: {
                            value: {},
                            title: {
                                color: 'white',
                            }
                        },
                        formatter: (value, ctx) => {
                            let sum = 0;
                            let dataArr = ctx.chart.data.datasets[0].data;
                            dataArr.map(data => {
                                sum += data;
                            });
                            let percentage = (value*100 / sum).toFixed(2)+"%";
                            return percentage;
                        },
                    }
                }
            }
        });
        var ctx3 = document.getElementById('thongKeNgheNghiep');
        var myChart3 = new Chart(ctx3, {
            type: 'doughnut',
            plugins: [ChartDataLabels],
            data: {
                labels: [
                    'buôn bán hàng hóa',
                    'công nhân',
                    'học sinh/sinh viên',
                    'lái xe dịch vụ',
                    'lao động tự do',
                    'nhân viên dịch vụ',
                    'nhân viên văn phòng',
                    'nhân viên y tế',
                    'nông dân',
                    'ở nhà',
                    'trẻ em',
                    'Trường hợp khác',
                ],
                datasets: [{
                    label: 'Cơ cấu nghề nghiệp của FO',
                    data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 3, 3],
                    backgroundColor: [
                        '#287271',
                        '#F4A261',
                        '#8AB17D',
                        '#E9C46A',
                        '#3D9D90',
                        '#EE8959',
                        '#945A17',
                        '#E76F51',
                        '#C7DDE5',
                        '#E74723',
                        '#287271',
                        '#F4A261',
                    ],
                    borderColor: [
                        '#287271',
                        '#F4A261',
                        '#8AB17D',
                        '#E9C46A',
                        '#3D9D90',
                        '#EE8959',
                        '#945A17',
                        '#E76F51',
                        '#C7DDE5',
                        '#E74723',
                        '#287271',
                        '#F4A261',
                    ],
                    borderWidth: 1,
                    hoverOffset: 4,
                }]
            },
            options: {
                plugins: {
                    title: {
                        text: 'Cơ cấu nghề nghiệp',
                        display: true,
                        font: {
                            size: 25,
                        }
                    },
                    legend: {
                        position: 'right',
                        labels: {
                            font: {
                                size: 20,
                            }
                        },
                    },
                    datalabels: {
                        borderColor: 'white',
                        borderRadius: 25,
                        borderWidth: 2,
                        padding: 10,
                        color: 'white',
                        font: {
                            size: 15,
                        },
                        labels: {
                            value: {},
                            title: {
                                color: 'white',
                            }
                        },
                        formatter: (value, ctx) => {
                            let sum = 0;
                            let dataArr = ctx.chart.data.datasets[0].data;
                            dataArr.map(data => {
                                sum += data;
                            });
                            let percentage = (value*100 / sum).toFixed(2)+"%";
                            return percentage;
                        },
                    }
                }
            }
        });
        var ctx4 = document.getElementById('thongKeTrieuChungCaBenh');
        var myChart4 = new Chart(ctx4, {
            type: 'doughnut',
            plugins: [ChartDataLabels],
            data: {
                labels: [
                    'sốt',
                    'khó thở',
                    'tức ngực',
                    'họng có đờm',
                    'đau họng',
                    'sổ mũi',
                    'mất vị giác',
                    'cảm cúm',
                    'ăn không ngon',
                    'đắng miệng',
                    'mệt mỏi',
                    'khác',
                ],
                datasets: [{
                    label: 'Cơ cấu nhóm triệu chứng của FO',
                    data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 3, 3, 4],
                    backgroundColor: [
                        '#287271',
                        '#F4A261',
                        '#8AB17D',
                        '#E9C46A',
                        '#3D9D90',
                        '#EE8959',
                        '#945A17',
                        '#E76F51',
                        '#C7DDE5',
                        '#E74723',
                        '#287271',
                        '#F4A261',
                    ],
                    borderColor: [
                        '#287271',
                        '#F4A261',
                        '#8AB17D',
                        '#E9C46A',
                        '#3D9D90',
                        '#EE8959',
                        '#945A17',
                        '#E76F51',
                        '#C7DDE5',
                        '#E74723',
                        '#287271',
                        '#F4A261',
                    ],
                    borderWidth: 1,
                    hoverOffset: 4,
                }]
            },
            options: {
                plugins: {
                    title: {
                        text: 'Cơ cấu nhóm triệu chứng ca bệnh',
                        display: true,
                        font: {
                            size: 25,
                        }
                    },
                    legend: {
                        position: 'right',
                        labels: {
                            font: {
                                size: 20,
                            }
                        },
                    },
                    datalabels: {
                        borderColor: 'white',
                        borderRadius: 25,
                        borderWidth: 2,
                        padding: 10,
                        color: 'white',
                        font: {
                            size: 15,
                        },
                        labels: {
                            value: {},
                            title: {
                                color: 'white',
                            }
                        },
                        formatter: (value, ctx) => {
                            let sum = 0;
                            let dataArr = ctx.chart.data.datasets[0].data;
                            dataArr.map(data => {
                                sum += data;
                            });
                            let percentage = (value*100 / sum).toFixed(2)+"%";
                            return percentage;
                        },
                    }
                }
            }
        });
        var ctx5 = document.getElementById('thongKeCacNhomTiepXuc');
        var myChart5 = new Chart(ctx5, {
            type: 'doughnut',
            plugins: [ChartDataLabels],
            data: {
                labels: [
                    'anh em họ hàng, người thân',
                    'bạn bè thân thiết thường gặp',
                    'hàng xóm',
                    ['người có tiếp xúc qua công việc/sinh hoạt hàng ngày'],
                    'người cùng khoa/phòng điều trị',
                    'người cùng làm việc/nơi làm việc',
                    'người cùng phòng/khu cách ly',
                    'người đi cùng phương tiện giao thông',
                    'người sống cùng nhà/cùng phòng/cùng hộ gia đình',
                    'Trường hợp khác',
                ],
                datasets: [{
                    label: 'Cơ cấu các nhóm tiếp xúc lây bệnh của FO',
                    data: [10, 10, 10, 10, 10, 10, 10, 3, 3, 4],
                    backgroundColor: [
                        '#287271',
                        '#F4A261',
                        '#8AB17D',
                        '#E9C46A',
                        '#3D9D90',
                        '#EE8959',
                        '#945A17',
                        '#E76F51',
                        '#C7DDE5',
                        '#E74723',
                    ],
                    borderColor: [
                        '#287271',
                        '#F4A261',
                        '#8AB17D',
                        '#E9C46A',
                        '#3D9D90',
                        '#EE8959',
                        '#945A17',
                        '#E76F51',
                        '#C7DDE5',
                        '#E74723',
                    ],
                    borderWidth: 1,
                    hoverOffset: 4,
                }]
            },
            options: {
                plugins: {
                    title: {
                        text: 'Cơ cấu các nhóm tiếp xúc lây bệnh',
                        display: true,
                        font: {
                            size: 25,
                        }
                    },
                    legend: {
                        labels: {
                            font: {
                                size: 20,
                            }
                        },
                        position: 'bottom',
                    },
                    datalabels: {
                        borderColor: 'white',
                        borderRadius: 25,
                        borderWidth: 2,
                        padding: 10,
                        color: 'white',
                        font: {
                            size: 15,
                        },
                        labels: {
                            value: {},
                            title: {
                                color: 'white',
                            }
                        },
                        formatter: (value, ctx) => {
                            let sum = 0;
                            let dataArr = ctx.chart.data.datasets[0].data;
                            dataArr.map(data => {
                                sum += data;
                            });
                            let percentage = (value*100 / sum).toFixed(2)+"%";
                            return percentage;
                        },
                    }
                }
            }
        });
    }
    
    show(province, district, commune) {
        return `
            <div>
                <div class="box-thong-ke-nhom-benh">
                    <div class="title-thong-ke-nhom-benh">
                        <h2> Cơ cấu giới tính và độ tuổi của F0</h2>
                    </div>
                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col-5">
                            <canvas id="thongKeGioiTinh" style="max-width: 600px; max-height: 600px;"></canvas>
                        </div>
                        <div class="col-5">
                            <canvas id="thongKeDoTuoi" style="max-width: 800px; max-height: 800px;"></canvas>
                        </div>
                    </div>
                </div>
                <div class="box-thong-ke-nhom-benh">
                    <div class="title-thong-ke-nhom-benh">
                        <h2> Cơ cấu nghề nghiệp của F0</h2>
                    </div>
                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col-11">
                            <canvas id="thongKeNgheNghiep" class="chart-thong-ke"></canvas>
                        </div>
                    </div>
                </div>
                <div class="box-thong-ke-nhom-benh">
                    <div class="title-thong-ke-nhom-benh">
                        <h2> Cơ cấu nhóm triệu chứng ca bệnh</h2>
                    </div>
                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col-11">
                            <canvas id="thongKeTrieuChungCaBenh" class="chart-thong-ke"></canvas>
                        </div>
                    </div>
                </div>
                <div class="box-thong-ke-nhom-benh">
                    <div class="title-thong-ke-nhom-benh">
                        <h2> Cơ cấu các nhóm tiếp xúc lây bệnh</h2>
                    </div>
                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col-11">
                            <canvas id="thongKeCacNhomTiepXuc" style="max-height: 800px;max-width: 800px;height: 800px;width: 800px;"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

var thongKeNhomBenhController = new ThongKeNhomBenhController();