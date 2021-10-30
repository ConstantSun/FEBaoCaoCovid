var mobility_data = {};
class MobilityLoader {
    constructor() {
        this.api();
    }

    do(mydata) {
        var results = readSheet(mydata);
        for (var i = 1; i < results.length; i++) {
            const province = results[i][8];
            if (!(province in mobility_data)) {
                mobility_data[province] = {
                    'date': [],
                    'retail': [],
                    'grocery': [],
                    'park': [],
                    'public_transit': [],
                    'work': [],
                    'residence': [],
                }
            }
            mobility_data[province]['date'].push(results[i][1]);
            mobility_data[province]['retail'].push(results[i][2]);
            mobility_data[province]['grocery'].push(results[i][3]);
            mobility_data[province]['park'].push(results[i][4]);
            mobility_data[province]['public_transit'].push(results[i][5]);
            mobility_data[province]['work'].push(results[i][6]);
            mobility_data[province]['residence'].push(results[i][7]);
        }
        // console.log('mobility_data',mobility_data);
        loadDataLevel2();
    }

    api() {
        call_api('17C2M92WIUUVYnsf_65IwmH21D4gAVHfO3fohOmUAeKY', 1,
            this.do, this.constructor.name);
    }

    show(province) {
        // var title = '<h5 class="text-danger">Di chuyển trong tỉnh/thành phố ' + province + '(% thay đổi)</h5>';
        // if (province == 'Việt Nam'){
        // 	title = '<h5 class="text-danger">Di chuyển trong Việt Nam (% thay đổi)</h5>';
        // }
        return `
        <table id='customers' style="width: 680">
        <tr>
            <th>
                Di chuyển trong ${province} (% thay đổi)
                <a data-toggle="collapse" href="#DivMobility" aria-expanded="true" 
            aria-controls="DivMobility">
                <i style="float: right;" class="fas fa-angle-up rotate-icon">&nbsp;</i>
            </a> 		
            </th>
        </tr></table>
        <div id="DivMobility" style="width: 680; border-style: outset;" class="collapse show">
        <div>
        <table id="mobility-table">
            <tr>
                <td><canvas id="retail" width="220" height="200"></canvas></td>
                <td><canvas id="grocery" width="220" height="200"></canvas></td>
                <td><canvas id="park" width="220" height="200"></canvas></td>
            </tr>
            <tr>
                <td><canvas id="public_transit" width="220" height="200"></canvas></td>
                <td><canvas id="work" width="220" height="200"></canvas></td>
                <td><canvas id="residence" width="220" height="200"></canvas></td>
            </tr>
        </table>
        </div>
        </div>
        `;
    }

    setup(province) {
        var labels = {
            "retail": "Khu bán lẻ/giải trí",
            "grocery": "Khu chợ/hiệu thuốc",
            "park": "Công viên",
            "public_transit": "Giao thông công cộng",
            "work": "Nơi làm việc",
            "residence": "Nơi ở"
        }

        for (const [key, value] of Object.entries(labels)) {
            var ctx = document.getElementById(key).getContext("2d");
            // console.log('mobility_data', province, mobility_data[province]);
            var chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: mobility_data[province]['date'],
                    datasets: [{
                        label: value,
                        data: mobility_data[province][key],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: {
                            max: 100,
                            min: -100,
                            stepValue: 20,
                        }
                    }
                }
            });
        }
    }
}
var mobilityLoader = null;
if (kernel.checkMode(MobilityLoader.prototype.constructor.name))
    mobilityLoader = kernel.addClass(new MobilityLoader());
