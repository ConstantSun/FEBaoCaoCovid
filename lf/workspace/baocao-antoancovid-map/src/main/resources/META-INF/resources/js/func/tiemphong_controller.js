class TiemPhongController {
  constructor() {
    window.chartColors = {
      red: "rgb(255, 99, 132)",
      orange: "rgb(255, 159, 64)",
      yellow: "rgb(255, 205, 86)",
      green: "rgb(75, 192, 192)",
      blue: "rgb(54, 162, 235)",
      purple: "rgb(153, 102, 255)",
      grey: "rgb(201, 203, 207)",
    };
    window.randomScalingFactor = function () {
      return (
        (Math.random() > 0.5 ? 1.0 : 1.0) * Math.round(Math.random() * 100)
      );
    };
    this.loading();
    setTimeout(() => {
      this.init();
      this.doChart();
      initSelect2();
    }, 2000)
  }

  doChart() {
    var MONTHS = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var color = Chart.helpers.color;
    var barChartData = {
      labels: [
        "01/2021",
        "02/2021",
        "03/2021",
        "04/2021",
        "05/2021",
        "06/2021",
        "07/2021",
        "08/2021",
        "09/2021",
        "10/2021",
        "11/2021",
        "12/2021",
      ],
      datasets: [
        {
          label: "Hà Nội",
          backgroundColor: "#3498db",
          borderColor: "#3498db",
          borderWidth: 1,
          data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
          ],
        },
        {
          label: "Tp Hồ Chí Minh",
          backgroundColor: "#e67e22",
          borderColor: "#e67e22",
          borderWidth: 1,
          data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
          ],
        },
      ],
    };

    var ctx = document.getElementById("tiem1mui").getContext("2d");
    window.myBar = new Chart(ctx, {
      type: "bar",
      data: barChartData,
      options: {
        responsive: true,
        // legend: {
        //   position: "top",
        // },
      },
    });

    var ctx = document.getElementById("tiemdu").getContext("2d");
    window.myBar = new Chart(ctx, {
      type: "bar",
      data: barChartData,
      options: {
        responsive: true,
        // legend: {
        //   position: "top",
        // },
      },
    });
    var ctx = document.getElementById("tiemmoi").getContext("2d");
    window.myBar = new Chart(ctx, {
      type: "bar",
      data: barChartData,
      options: {
        responsive: true,
        // legend: {
        //   position: "top",
        // },
      },
    });
  }
  loading()
  {
    $("#tiemphong").html(`
      <div class="w-100 h-100 flex mt-5">
        <div style="width:200px; margin:auto" class="text-center">
          <h5 class="text-muted">Đang tải dữ liệu</h5>
          <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>

      </div>
    `);
  }

  init() {
    $("#tiemphong").html(`
      <div class="row mt-3">
        <div class="col col-md-4">
          <div class="card text-center" style="border: solid 1px #e67e22">
            <h5 class="mt-2">Tổng số mũi</h5>
            <p class="tieu-number">500.000</p>
          </div>

        </div>
        <div class="col col-md-4">
          <div class="card text-center" style="border: solid 1px #e67e22">
            <h5 class="mt-2">Tỉ lệ tiêm 1 mũi</h5>
            <p class="tieu-number">10%</p>
          </div>

        </div>
        <div class="col col-md-4">
          <div class="card text-center" style="border: solid 1px #e67e22">
            <h5 class="mt-2">Tỉ lệ tiêm đủ</h5>
            <p class="tieu-number">5%</p>
          </div>
        </div>

      </div>
      <div class="mb-3">
        <select style="width: 200px" class="select2 p-2">
          <option>Tỉnh/Huyện</option>
          <option>Hà Nội</option>
          <option>TP Hồ Chí Minh</option>
        </select>
      </div>

      <div class="row">
        <div class="col col-md-12 mt-5">
          <h4 class="text-center">Tỉ lệ tiêm 1 mũi</h4>
          <canvas style="width:100%" id="tiem1mui">
          </canvas>
        </div>
        <div class="col col-md-12 mt-5">
          <h4 class="text-center">Tỉ lệ tiêm đủ</h4>
          <canvas style="width:100%" id="tiemdu">
          </canvas>
        </div>
      </div>
      <div class="mt-5">
        <h4 class="text-center">Tiêm mới</h4>
        <div class="row">
          <div class="col-md-12 mt-5">
            <canvas id="tiemmoi">
            </canvas>
          </div>
        </div>
      </div>

    `);
  }
}
