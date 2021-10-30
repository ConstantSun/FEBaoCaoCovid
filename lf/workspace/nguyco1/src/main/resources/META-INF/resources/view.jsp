<%@page import="com.liferay.portal.kernel.model.Organization"%>
<%@  include file="/init.jsp"  %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%
  String contextPath = renderRequest.getContextPath();
 
%>


<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>BẢN ĐỒ NGUY CƠ COVID-19</title>
    <!-- Bootstrap -->
    <link href="<%=contextPath%>/css/bootstrap-4.3.1.css" rel="stylesheet">
    <link href="<%=contextPath%>/css/style.css" rel="stylesheet">
     <link href="<%=contextPath%>/css/loading.css" rel="stylesheet">
     
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.0/css/all.css" integrity=""
        crossorigin="anonymous">
    <!-- MAP Leaflet -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin="" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet-geosearch@3.1.0/dist/geosearch.css" />
    
    
    
    <link href="<%=contextPath%>/css/custom.css" rel="stylesheet">
    
    
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
        crossorigin=""></script>
    <script src="https://unpkg.com/leaflet-geosearch@3.1.0/dist/bundle.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet-easybutton@2/src/easy-button.css">
    <script src="https://cdn.jsdelivr.net/npm/leaflet-easybutton@2/src/easy-button.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="<%=contextPath%>/js/lib/jquery-1.12.1.min.js"></script>
    <link rel="stylesheet" href="<%=contextPath%>/js/lib/jquery-ui.css">
    <script src="<%=contextPath%>/js/lib/jquery-ui.js"></script>
    <script src='https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/Leaflet.fullscreen.min.js'></script>
    <link href='https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/leaflet.fullscreen.css'
        rel='stylesheet' />

    <link rel="stylesheet" href="<%=contextPath%>/js/lib/leaflet.zoomhome.css" />
    <script src="<%=contextPath%>/js/lib/leaflet.zoomhome.js"></script>

    <link rel="stylesheet" href="<%=contextPath%>/js/lib/MarkerCluster.css" />
    <link rel="stylesheet" href="<%=contextPath%>/js/lib/MarkerCluster.Default.css" />
    <script src="<%=contextPath%>/js/lib/leaflet.markercluster-src.js"></script>
    <link rel="stylesheet" href="<%=contextPath%>/js/lib/leaflet.label.css" />
    <script type="text/javascript" src="<%=contextPath%>/js/lib/leaflet.label-src.js"></script>
    <script type="text/javascript" src="<%=contextPath%>/js/lib/HeatLayer.js"></script>
    <script type="text/javascript" src="<%=contextPath%>/js/lib/simpleheat.js"></script>

    <style>
        #map {
            height: 500px;
        }

        .info {
            padding: 6px 8px;
            font: 14px/16px Arial, Helvetica, sans-serif;
            background: white;
            background: rgba(255, 255, 255, 0.8);
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
            border-radius: 5px;
        }

        .info h4 {
            margin: 0 0 5px;
            color: #777;
        }

        .legend {
            text-align: left;
            line-height: 18px;
            color: #555;
        }

        .legend i {
            width: 18px;
            height: 18px;
            float: left;
            margin-right: 8px;
            opacity: 0.7;
        }

        #customers {
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        #customers td,
        #customers th {
            border: 1px solid #ddd;
            padding: 8px;
        }

        #customers tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        #customers tr:hover {
            background-color: #ddd;
        }

        #customers th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color:#007bff91;
            color:black;
        }
    </style>
</head>

<body>
<div class="alert alert-info pt-1 pb-1 mb-0" role="alert">
    
    Tổ thông tin đáp ứng nhanh: Hệ thống đang thử nghiệm
</div>
<div id="app" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
<nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
<div class="container"><a href="https://antoancovid.vn"><img src="<%=contextPath%>/images/logo/logo.svg" 
alt="Trang chủ AnToanCovid" style="height: 30px;"></a> <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" 
aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"><span class="navbar-toggler-icon"></span></button> 
<div id="navbarSupportedContent" class="collapse navbar-collapse"><ul class="navbar-nav ml-auto"><li class="nav-item"><a href="/" class="nav-link"><b>Bản đồ nguy cơ</b></a></li> 
<li class="nav-item"><a href="/web/guest/huong-dan1" class="nav-link">Về hệ thống báo cáo</a></li></ul></div></div></nav>

    <!-- body code goes here -->
    <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light">
		<header class="container-fluid">
			<a class="navbar-brand" href="index.html"><img src="images/logo_antoan1.svg" alt="" height="46"></a>
			<div><h4 class="text-danger">BẢN ĐỒ NGUY CƠ COVID</h4></div>

		</header>
    </nav> -->
    <section class="pt-3 pb-3 mb-3" style="position: relative;left: -5px;">
        <div class="container">
            <div class="row">
                <div class="col-lg-5 mb-3">
                    <!-- <div id="autocomplete_form">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="md-form form-group"><input class="form-control" type="text" id="inputAddressAuto" name="inputAddressAuto" placeholder="Nhập tên hoặc địa chỉ"></div>
                            </div>
                        </div>
                    </div> -->
                    <div id='map' style="border: 1px solid black;height: 800px;"></div>
                </div>

                <div id="thelist" class="col-lg-7 mb-3">
                    <p style="align-content: center;">
                        <h3>Hệ thống đang tải dữ liệu tính toán nguy cơ ...</h3>
                    </p>
                <div class="loader">
				 	 <div class="loader__element"></div>
				</div>
                </div>
            </div>
        </div>
    </section>
    
    
    <footer><div class="container-fluid" style="background-color: rgb(78,207,231); border-color: rgb(190, 229, 235);">
    <div class="row"><div class="col-md-6 col-xs-12"><h6 style="margin-top: 10px; font-size: 14px;">
    <strong>BẢN ĐỒ CHUNG SỐNG AN TOÀN VỚI DỊCH BỆNH VIÊM ĐƯỜNG HÔ HẤP CẤP COVID-19</strong></h6></div> <div class="col-md-6 col-xs-12">
    <p style="float: right;"><small>Hỗ trợ bởi Đề án tri thức Việt số hóa </small></p></div></div> <div class="row"><div class="col-md-4 col-xs-12">
    <div> Hotline: 1800 6132 <br>Email: info@antoancovid.vn <br>@Version:2.0.0</div></div> <div class="col-md-8 col-xs-12"><ul style="list-style-type: none; display: flex; float: right;">
    <li><a href="https://itrithucviet.vn/" target="_blank"><img src="<%=contextPath%>/images/logo/HTTSH_logo.png" alt="" style="width: 135px; float: right; margin-right: 15px;"></a></li> <li>
    <a href="https://moh.gov.vn/" target="_blank"><img src="<%=contextPath%>/images/logo/BYT.png" height="60" alt="" class="logo_footer"></a></li> <li>
    <a href="https://www.most.gov.vn/vn/pages/Trangchu.aspx" target="_blank"><img src="<%=contextPath%>/images/logo/KHCN.png" height="60" alt="" class="logo_footer"></a></li> <li>
    <a href="https://www.mic.gov.vn/mic_2020/Pages/trangchu_2020.aspx" target="_blank">
    <img src="<%=contextPath%>/images/logo/TTTT_logo.png" height="60" alt="" class="logo_footer"></a></li> <li><a href="https://www.vnu.edu.vn/home/" target="_blank">
    <img src="<%=contextPath%>/images/logo/DHQG_logo.png" height="60" alt="" class="logo_footer"></a></li></ul></div></div></div></footer>
    
    
    </div>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="<%=contextPath%>/js/lib/popper.min.js"></script>
    <script src="<%=contextPath%>/js/lib/bootstrap-4.3.1.js"></script>

    <!-- map -->
    <!-- <script type="text/javascript" src="<%=contextPath%>/js/gis/sample_f0_points.js"></script>
    <script type="text/javascript" src="<%=contextPath%>/js/gis/realworld.10000.js"></script> -->
    <script type="text/javascript" src="<%=contextPath%>/js/configuration/danger.js"></script>
    <script type="text/javascript" src="<%=contextPath%>/js/configuration/kernel.js"></script>

    <script type="text/javascript" src="<%=contextPath%>/js/gis/provinces.js"></script>
    <!-- <script type="text/javascript" src="<%=contextPath%>/js/gis/districts.js"></script>
    <script type="text/javascript" src="<%=contextPath%>/js/gis/wards.js"></script> -->
    <script type="text/javascript" src="<%=contextPath%>/js/gis/hanhchinh.js"></script>


    <script type="text/javascript" src="<%=contextPath%>/js/gis/adm_region1.js"></script>
    <script type="text/javascript" src="<%=contextPath%>/js/gis/adm_region2.js"></script>
    <script type="text/javascript" src="<%=contextPath%>/js/gis/adm_region3.js"></script>
    <script type="text/javascript" src="<%=contextPath%>/js/gis/adm_list.js"></script>
    <script type="text/javascript" src="<%=contextPath%>/js/gis/diem_tiem_chung.js"></script>

    <script type="text/javascript" src="<%=contextPath%>/js/func/PanelUtil.js"></script>
    <script type="text/javascript" src="<%=contextPath%>/js/func/common.js"></script>    
    <script type="text/javascript" src="<%=contextPath%>/js/func/f0diaphuong_controller.js"></script>    
    <script type="text/javascript" src="<%=contextPath%>/js/func/f0daily_controller.js"></script>
    <script type="text/javascript" src="<%=contextPath%>/js/func/f0_points_controler.js"></script>    
    <script type="text/javascript" src="<%=contextPath%>/js/func/static_point_controller.js"></script>
    <script type="text/javascript" src="<%=contextPath%>/js/func/thong_ke_loader.js"></script>
    <script type="text/javascript" src="<%=contextPath%>/js/func/thong_tin_loader.js"></script>
    <script type="text/javascript" src="<%=contextPath%>/js/func/mobility_loader.js"></script>
    <script type="text/javascript" src="<%=contextPath%>/js/func/his_nguyco_loader.js"></script>
    <script type="text/javascript" src="<%=contextPath%>/js/func/his_nguy_co_controler.js"></script>
    <script type="text/javascript" src="<%=contextPath%>/js/func/list_region_controler.js"></script>
    <script type="text/javascript" src="<%=contextPath%>/js/func/atcovid_controller.js"></script>
    
    <!-- <script type="text/javascript" src="<%=contextPath%>/js/func/ca_nhiem_loader.js"></script> -->
    <!-- <script type="text/javascript" src="<%=contextPath%>/js/func/base_loader.js"></script>
    <script type="text/javascript" src="<%=contextPath%>/js/func/expert_loader.js"></script>
    <script type="text/javascript" src="<%=contextPath%>/js/func/spread_cluster_loader.js"></script> -->

    <script type="text/javascript" src="<%=contextPath%>/js/func/show_info.js"></script>
    <script type="text/javascript" src="<%=contextPath%>/js/func/api_loader.js"></script>
    <script type="text/javascript" src="<%=contextPath%>/js/func/gis_filter.js"></script>
    <script type="text/javascript" src="<%=contextPath%>/js/func/fit_zoom_to.js"></script>

    <script type="text/javascript" src="<%=contextPath%>/js/maplayers.js"></script>
    <script type="text/javascript" src="<%=contextPath%>/js/func/add_control.js"></script>
    <!-- <script type="text/javascript" src="<%=contextPath%>/js/func/search.js"></script> -->


</body>

</html>