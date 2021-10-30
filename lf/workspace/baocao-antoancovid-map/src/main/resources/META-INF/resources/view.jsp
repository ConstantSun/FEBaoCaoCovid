<%@  include file="/init.jsp"  %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%
  String contextPath = renderRequest.getContextPath();
%>



<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Bản đồ covid Thành phố Hà Nội</title>
  <!-- Bootstrap -->
  <link href="<%=contextPath %>/css/bootstrap-4.3.1.css" rel="stylesheet" />
  <link href="<%=contextPath %>/css/style.css" rel="stylesheet" />
  <link href="<%=contextPath %>/css/menu.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css" integrity=""
    crossorigin="anonymous" />

  <link rel="stylesheet" href="<%=contextPath %>/css/MarkerCluster.css" />
  <link rel="stylesheet" href="<%=contextPath %>/css/MarkerCluster.Default.css" />
  <link rel="stylesheet" href="<%=contextPath %>/css/leaflet.label.css" />
  

  <!-- MAP Leaflet -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    crossorigin="" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet-geosearch@3.1.0/dist/geosearch.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet-easybutton@2/src/easy-button.css" />
  <link rel="stylesheet" href="<%=contextPath %>/css/jquery-ui.css" />
  <link href="https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/leaflet.fullscreen.css"
    rel="stylesheet" />
  <link rel="stylesheet" href="<%=contextPath %>/css/leaflet.zoomhome.css" />
  <link rel="stylesheet" href="<%=contextPath %>/css/loading.css" />
  <!-- Calendar -->
  <script src="https://cdn.jsdelivr.net/npm/color-calendar/dist/bundle.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/color-calendar/dist/css/theme-basic.css" />
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet" />

  <!-- jQuery -->
  <!-- <style>
		.nav-link {
			overflow: hidden;
		}
	</style> -->
  <script src="<%=contextPath %>/js/lib/jquery-3.3.1.min.js"></script>
  <script src="<%=contextPath %>/js/lib/jquery-ui.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
  <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
  <style>
    .icon-menu {
      display: inline-block;
      font-size: 22px;
      margin-right: 5px;
      margin-bottom: 0px;
    }
  </style>

  <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
    integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
    crossorigin=""></script>
  <script src="https://unpkg.com/leaflet-geosearch@3.1.0/dist/bundle.min.js"></script>

  <script src="https://cdn.jsdelivr.net/npm/leaflet-easybutton@2/src/easy-button.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0"></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
  <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
  <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
  <link rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/select2-bootstrap-theme@0.1.0-beta.10/dist/select2-bootstrap.css" />

  <script src="https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/Leaflet.fullscreen.min.js"></script>

  <link rel="stylesheet" href="<%=contextPath %>/js/lib/leaflet.zoomhome.css" />
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
  <script src="<%=contextPath %>/js/lib/leaflet.zoomhome.js"></script>

  <script src="<%=contextPath %>/js/lib/leaflet.markercluster-src.js"></script>

  <script type="text/javascript" src="<%=contextPath %>/js/lib/leaflet.label-src.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/lib/HeatLayer.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/lib/simpleheat.js"></script>

  <script type="text/javascript">
    /// some script

    // jquery ready start
    $(document).ready(function () {
      // jQuery code

      $("[data-trigger]").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var offcanvas_id = $(this).attr("data-trigger");
        $(offcanvas_id).toggleClass("show");
        $("body").toggleClass("offcanvas-active");
        $(".screen-overlay").toggleClass("show");
      });

      // Close menu when pressing ESC
      $(document).on("keydown", function (event) {
        if (event.keyCode === 27) {
          $(".offcanvas").removeClass("show");
          $("body").removeClass("overlay-active");
        }
      });

      $(".btn-close, .screen-overlay").click(function (e) {
        $(".screen-overlay").removeClass("show");
        $(".offcanvas").removeClass("show");
        $("body").removeClass("offcanvas-active");
      });
    }); // jquery end
  </script>
</head>

<body>
  <b class="screen-overlay"></b>
  <!-- offcanvas panel -->
  <aside class="offcanvas" id="my_offcanvas1">
    <header class="p-3 bg-light border-bottom">
      <button class="btn btn-outline-secondary btn-close">
        <i class="fas fa-times"></i>
      </button>
      <h5 class="mb-0">Lớp dữ liệu trên bản đồ</h5>
    </header>
    <div class="pl-3 pt-3">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor ipsa
        aliquid, dolorem, ducimus atque, earum ab impedit nam ipsum et error
        quasi! Porro blanditiis, sequi maxime quidem. Maiores, aperiam ut.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor ipsa
        aliquid, dolorem, ducimus atque, earum ab impedit nam ipsum et error
        quasi! Porro blanditiis, sequi maxime quidem. Maiores, aperiam ut.
      </p>
    </div>
  </aside>
  <!-- offcanvas panel .end -->

  <!-- body code goes here -->
  <div id="wrapper" class="animate">
    <nav class="
          navbar
          header-top
          fixed-top
          navbar-expand-lg navbar-dark
          bg-primary1
        ">
      <span class="navbar-toggler-icon leftmenutrigger"></span>
      <a class="navbar-brand text-uppercase" href="#">BẢN ĐỒ COVID-BẢN THỬ NGHIỆM</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav animate side-nav">
          <li class="nav-item text-center active border-bottom1">
            <a class="nav-link" href="#"><i class="fas fa-layer-group fa-2x"></i><span class="ttip">Các lớp bản
                đồ</span></a>
            <div class="sub-panel">
              <h1 class="sub-panel-title">Lớp dữ liệu trên bản đồ</h1>
              <div class="icon-close">
                <i class="fas fa-times"></i>
              </div>
              <div class="sub-panel-body">
                <div class="sub-panel-grid">
                  <div class="checkbox checkbox-container">
                    <label>
                      <input type="checkbox" onchange="toggleFMode()" value="" />
                      <i class="fas fa-allergies"></i>
                      <i class="fas fa-head-side-virus"></i> Ca dương tính
                    </label>
                  </div>
                  <div class="checkbox checkbox-container">
                    <label>
                      <input type="checkbox" onchange="resetMapCommune(this)" id="commune" value="" />
                      <h3 class="icon-menu">X</h3>
                      Lớp bản đồ Phường/Xã
                    </label>
                  </div>
                  <div class="checkbox checkbox-container">
                    <label>
                      <input type="checkbox" onchange="resetMapDistrict(this)" id="district" value="" />
                      <h3 class="icon-menu">H</h3>
                      Lớp bản đồ Quận/Huyện
                    </label>
                  </div>
                  <div class="checkbox checkbox-container">
                    <label>
                      <input type="checkbox" onchange="resetMapProvince(this)" checked="checked" id="province"
                        value="" />
                      <h3 class="icon-menu">T</h3>
                      Lớp bản đồ Tỉnh/Thành
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item text-center border-bottom1">
            <a class="nav-link" href="#" onclick="showHanhChinh()"><i class="fas fa-route fa-2x"></i><span
                class="ttip">Chuyển nhanh đến các vùng hành chính</span>
              <div class="sub-panel" style="width: 40%">
                <h1 class="sub-panel-title">Chuyển nhanh đến các vùng hành chính</h1>
                <div class="icon-close">
                  <i class="fas fa-times"></i>
                </div>
                <div class="sub-panel-body">
                  <div id="thelist" class="sub-panel-grid"></div>
                </div>
              </div>
            </a>
          </li>
          <li class="nav-item text-center border-bottom1">
            <a class="nav-link" href="#" onclick="showCaNhiem()">
              <i class="fas fa-street-view fa-2x"></i>
              <span class="ttip">Báo cáo Ca nhiễm Và Nguy cơ</span>
              <div class="sub-panel" style="width: 90%">
                <h1 class="sub-panel-title">Báo cáo Ca nhiễm Và Nguy cơ</h1>
                <div class="icon-close">
                  <i class="fas fa-times"></i>
                </div>
                <div class="sub-panel-body">
                  <div id="divCaNhiem" class="sub-panel-grid">
                    <!-- <div class="row sub-menu-bao-cao-f0">
											<div class="col-3">
												<table style="width: 100%;text-align: center;">
													<tbody>
														<tr class="bcf0-box" id="bcf0-1" onclick="changeSelectedBox(1);"><td>F0 Mới trong ngày</td></tr>
														<tr class="bcf0-box" id="bcf0-2" onclick="changeSelectedBox(2);"><td>Biến động ca nhiễm mới</td></tr>
														<tr class="bcf0-box" id="bcf0-3" onclick="changeSelectedBox(3);"><td>Số ca F0 cộng dồn</td></tr>
														<tr class="bcf0-box" id="bcf0-4" onclick="changeSelectedBox(4);"><td>Biến động F0 cộng dồn</td></tr>
														<tr class="bcf0-box" id="bcf0-5" onclick="changeSelectedBox(5);"><td>Lịch sử nguy cơ</td></tr>
														<tr class="bcf0-box" id="bcf0-6" onclick="changeSelectedBox(6);"><td>Diễn giải nguy cơ</td></tr>
														<tr class="bcf0-box" id="bcf0-7" onclick="changeSelectedBox(7);"><td>Thống kê nhóm bệnh</td></tr>
													</tbody>
												</table>
											</div>
											<div class="col-1"></div>
											<div class="col-8" id="bcf0-chart-area">

											</div>
										</div> -->
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class="nav-item text-center border-bottom1">
            <a class="nav-link" href="#" onclick="showXetNghiem()">
              <i class="fas fa-microscope fa-2x"></i><span class="ttip">Báo cáo xét nghiệm</span>
              <span class="ttip">Báo cáo xét nghiệm</span>
              <div class="sub-panel" style="width: 90%">
                <h1 class="sub-panel-title">Báo cáo xét nghiệm</h1>
                <div class="icon-close">
                  <i class="fas fa-times"></i>
                </div>
                <div class="sub-panel-body">
                  <div id="divXetNghiem" class="sub-panel-grid"></div>
                </div>
              </div>
            </a>
          </li>
          <li class="nav-item text-center border-bottom1">
            <a data-trigger="#my_offcanvas1" class="nav-link" href="#"><i class="fas fa-pills fa-2x"></i><span
                class="ttip">Báo cáo Điều trị</span></a>
          </li>
          <li onclick="showTiemPhong()" class="nav-item text-center border-bottom1">
            <a class="nav-link" href="#"><i class="fas fa-syringe fa-2x"></i><span class="ttip">Báo cáo Tiêm
                phòng</span>
              <div class="sub-panel" style="width: 70vw">
                <h1 class="sub-panel-title">Báo cáo tiêm phòng</h1>
                <div class="icon-close">
                  <i class="fas fa-times"></i>
                </div>
                <div class="sub-panel-body">
                  <div class="sub-panel-grid">
                    <div id="tiemphong"></div>
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class="nav-item text-center border-bottom1">
            <a data-trigger="#my_offcanvas1" class="nav-link" href="#"><i class="fas fa-map-marked-alt fa-2x"></i><span
                class="ttip">Báo cáo Cách ly, di biến động và tiến độ ATCovid</span></a>
          </li>
          <div class="bottom-0 position-absolute w-100">
            <li class="nav-item text-center border-bottom1 border-top1">
              <a data-trigger="#my_offcanvas1" class="nav-link" href="/c/portal/logout"><i class="fas fa-sign-out-alt fa-2x"></i><span
                  class="ttip">Đăng xuất</span></a>
            </li>
            <li class="nav-item text-center">
              <a data-trigger="#my_offcanvas1" class="nav-link" href="#"><i class="fas fa-book fa-2x"></i><span
                  class="ttip">Hướng dẫn</span></a>
            </li>
          </div>
        </ul>
        <ul class="navbar-nav ml-md-auto d-md-flex">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="/" id="navbarDropdown1" role="button" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              Về trang báo cáo</a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown1">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
         
        </ul>
      </div>
    </nav>

    <!-- <div class="vh-100a"> -->
    <div>
      <!-- <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7862646.94834948!2d105.910455!3d15.794297549999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1527843841305" width="100%" height="100%" frameborder="0" style="border:0" allowfullscreen></iframe> -->
      <div id="map" style="height: calc(100vh - 50px); margin-top: 50px"></div>
    </div>
  </div>

  <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
  <script src="<%=contextPath %>/js/jquery-3.3.1.min.js"></script>

  <!-- Include all compiled plugins (below), or include individual files as needed -->
  <script src="<%=contextPath %>/js/popper.min.js"></script>
  <script src="<%=contextPath %>/js/bootstrap-4.3.1.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.5.0/chart.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0"></script>
  <script src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
  <script>
    $(document).ready(function () {
      $(".leftmenutrigger").on("click", function (e) {
        $(".side-nav").toggleClass("open");
        e.preventDefault();
      });
    });
  </script>

  <script type="text/javascript" src="<%=contextPath %>/js/configuration/danger.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/configuration/kernel.js"></script>

  <script type="text/javascript" src="<%=contextPath %>/js/gis/provinces.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/gis/districts.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/gis/wards.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/gis/hanhchinh.js"></script>

  <script type="text/javascript" src="<%=contextPath %>/js/gis/adm_region1.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/gis/adm_region2.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/gis/adm_region3.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/gis/adm_list.js"></script>
  <!-- <script type="text/javascript" src="js/gis/diem_tiem_chung.js"></script> -->
  <script type="text/javascript" src="<%=contextPath %>/js/gis/default_tinh_huyen_slide8.js"></script>

  <script type="text/javascript" src="<%=contextPath %>/js/func/PanelUtil.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/common.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/f0diaphuong_controller.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/f0daily_controller.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/tiemphong_controller.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/f0_points_controler.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/static_point_controller.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/thong_ke_loader.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/thong_tin_loader.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/mobility_loader.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/his_nguyco_loader.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/his_nguy_co_controler.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/list_region_controler.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/atcovid_controller.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/ca_nhiem_loader.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/maplayers.js"></script>

  <!-- <script type="text/javascript" src="js/func/base_loader.js"></script>
    <script type="text/javascript" src="js/func/expert_loader.js"></script>
    <script type="text/javascript" src="js/func/spread_cluster_loader.js"></script> -->
  <script type="text/javascript" src="<%=contextPath %>/js/func/CaNhiemController.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/BaoCaoF0Controller.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/show_info.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/api_loader.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/gis_filter.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/fit_zoom_to.js"></script>

  <script type="text/javascript" src="<%=contextPath %>/js/lib/menu.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/add_control.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/dateRangeInput.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/HanhChinhList.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/CaNhiemF0CongDonController.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/LichSuNguyCoController.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/CaNhiemF0MoiController.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/xetNghiemController.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/KetQuaXetNghiemController.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/TyLeXetNghiemController.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/TyLeDuongTinhController.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/func/BienDongCaNhiemMoiController.js"></script>
  <script type="text/javascript" src="<%=contextPath %>/js/gis/ls_canhiem_tinh.js"></script>

  <script>
    $(document).ready(function () {
      window.initSelect2 = function () {
        $(".select2").select2({
          theme: "bootstrap",
        });
      };
      window.initSelect2();
    });
  </script>
</body>

</html>

</body>

</html>