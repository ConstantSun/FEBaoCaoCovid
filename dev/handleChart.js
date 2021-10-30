// Chart.register(ChartDataLabels);
var ctx = document.getElementById("myChart").getContext("2d");

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
var dataDump = [
    {
        label: "Hải Phòng",
        data: [150, 320, 370, 365, 358, 784, 820, 1231, 4546, 3212, 5555, 6542, 1232]
    },
    {
        label: "TP. Hồ Chí Minh",
        data: [15, 120, 170, 465, 338, 184, 420, 230, 350, 324, 1000, 2000, 3000, 3500]
    },
    {
        label: "Đà Nẵng",
        data: [102, 220, 437, 436, 535, 684, 720],
    }
];
const allProvinces = ATCOVID_PROVINCES;
$(document).ready(function() {
    $('.select-place').select2();
});
$('#select-place').change(function() {
    let itemSelected = $(this).val();
    for (let i = 0; i < dataDump.length; ++i) {
        if (dataDump[i].label == itemSelected) {
            if (typeof data.datasets[1] === 'undefined') {
                data.datasets.push({
                    'label': dataDump[i].label,
                    'backgroundColor': 'orange',
                    'data': dataDump[i].data,
                });
                console.log(data.datasets);
                myBarChart.update();
                // label: "Hà Nội",
                // backgroundColor: "blue",
                // data: [15, 20, 30, 35, 38, 78, 80, 150, 320, 370, 365, 358, 784, 820]
                break;
            }
            // console.log(data.datasets[1]);
            data.datasets[1].label = dataDump[i].label;
            data.datasets[1].data = dataDump[i].data;
            myBarChart.update();
            break; 
        }
    }
});

function appendProvinces() {
    let selectPlace = $('#select-place').empty();
    let defaultOpt = $("<option></option>").html("-- Chọn --"); 
    // let default = 1;
    selectPlace.append(defaultOpt);
    for (let i = 0; i < allProvinces.length; ++i) {
        // console.log(allProvinces[i]);
        let opt = $("<option></option>").html(allProvinces[i].name).attr('value', allProvinces[i].name);
        selectPlace.append(opt);
    }
    // console.log(selectPlace);
}
appendProvinces();
console.log(myBarChart.data);
console.log("dataset : ");
console.log(data.datasets);

