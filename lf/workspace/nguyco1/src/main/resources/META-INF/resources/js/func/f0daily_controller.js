


class F0BaseDailyController {
    constructor() {
        this.dataLuyKe = new Map();
 		this.dataTheoNgay = new Map();
	
		this.dataLuyKeTK = new Map();
 		this.dataTheoNgayTK = new Map();
	
		this.Labels = new Map();
		
    }

	

 api(layerId) {
		
       if(layerId==1){
			 const parram = `tinh=&huyen=&xa=`;
			 call_host_api_v2('getTongCaNgay', parram, this.do, 'getTongCaNgay');
		}
		if(layerId==2){
			
			call_host_api_v2('getCaNhiemHistory/tinh',null, this.do, 'CALL API dienGiaiNguyCo Tinh');
		}
		if(layerId==3){
			call_host_api_v2('getCaNhiemHistory/huyen',null, this.do, 'CALL API dienGiaiNguyCo huyen');

		
		}
		if(layerId==4){
			call_host_api_v2('getCaNhiemHistory/xa',null, this.do, 'CALL API dienGiaiNguyCo xa');

		
		}
    }
    
   

  show() {
        return `
        <table id='customers' style="width: 680">
            <tr><th>
                Thống kê ca nhiễm
                <a data-toggle="collapse" href="#divF0daily"
                    aria-expanded="true" aria-controls="divF0daily">
                    <i style="float: right;"class="fas fa-angle-up rotate-icon">&nbsp;</i>
                </a>
            </th></tr>
        </table>
        <div id="divF0daily" style="width: 680;border-style: outset;" class="collapse show">
            <canvas id="F0dailyChart" width="680" height="400"></canvas>
        </div>`;
    }

setup(key) {
        var labels = this.Labels.get(key);

		var dataLuyKe = this.dataLuyKe.get(key);
		var dataTheoNgay = this.dataTheoNgay.get(key);
		
		var dataLuyKeTK = this.dataLuyKeTK.get(key);
		var dataTheoNgayTK = this.dataTheoNgayTK.get(key);
		
        if (!dataLuyKe) {
           // console.log('f0DailyController.setup', key);
            return;
        }
        if (!document.getElementById("F0dailyChart"))
            return;
            
        if (this.chart != null) {
            this.chart.destroy();
        }
        var canhiem_labels = [];
        var label_luyke = "Tổng số ca(Báo cáo)";
        var label_theongay = "Số ca theo ngày(Báo cáo)";

		var label_luyketk = "Tổng số ca (Nguồn công bố)";
		var label_theongaytk = "Số ca theo ngày(Nguồn công bố))";
				
        var theongay = [];
        var luyke = [];

		var theongaytk = [];
        var luyketk = [];

		//set label
		for (var i = 0; i < labels.length; i++) {
            canhiem_labels.push(labels[i]);
           
        }
		//caluyke
		for (var i = 0; i < dataLuyKe.length; i++) {
           luyke.push(dataLuyKe[i]);
           
        }

        for (var i = 0; i < dataTheoNgay.length; i++) {
           theongay.push(dataTheoNgay[i]);
        }

		for (var i = 0; i < dataTheoNgayTK.length; i++) {
            theongaytk.push(dataTheoNgayTK[i]);
           
        }

		for (var i = 0; i < dataLuyKeTK.length; i++) {
           luyketk.push(dataLuyKeTK[i]);
           
        }

        var ctx = document.getElementById("F0dailyChart").getContext("2d");
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: canhiem_labels,
                datasets: [{
                    label: label_luyke,
                    data: luyke,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
				{
                    label: label_luyketk,
                    data: luyketk,
                    backgroundColor: 'rgba(113, 0, 0, 0.9)',
                    borderColor: 'rgb(225, 189, 189)',
                    borderWidth: 1
                },
                {
                    label:label_theongay ,
                    data: theongay,
                    backgroundColor: 'rgba(255, 205, 86, 0.2)',
                    borderColor: 'rgb(255, 205, 86)',
                    borderWidth: 1
                },
                {
                    label:label_theongaytk ,
                    data: theongaytk,
                    backgroundColor: 'rgba(0, 0, 205, 0.2)',
                    borderColor: 'rgb(170, 170, 225)',
                    borderWidth: 1
                }
 				
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
  }
}

class F0DailyToanQuocController extends F0BaseDailyController{
	 constructor() {
        super();
        this.api(1);
    }

	do(data) {
		
		var result =data.data;
		//console.log(":F0-ToanQuoc========================"+JSON.stringify(result));		
       // setData(data);
        var key = 'Việt Nam';   
		var tpmLabel = [];     
        var tpmLuyKe = [];
 		var tpmLTheoNgay = [];
		var tpmLuyKeTK = [];
 		var tpmLTheoNgayTK = [];
		
        for (var i = 0; i < result.length; i++) {
			var data =result[i];
			tpmLabel.push(data.ngaycongbo);
			tpmLuyKe.push(data.tongluyke)
			tpmLTheoNgay.push(data.tongcangay)
			
			tpmLuyKeTK.push(data.tongluyketk)
			tpmLTheoNgayTK.push(data.tongcangaytk)
         
        }
		f0DailyToanQuocController.Labels.set(key,tpmLabel);
		
        f0DailyToanQuocController.dataLuyKe.set(key,tpmLuyKe);
		f0DailyToanQuocController.dataTheoNgay.set(key,tpmLTheoNgay);
		
		
		f0DailyToanQuocController.dataLuyKeTK.set(key,tpmLuyKeTK);
		f0DailyToanQuocController.dataTheoNgayTK.set(key,tpmLTheoNgayTK);
        
    }
}
var f0DailyToanQuocController = null;
if (kernel.checkMode(F0DailyToanQuocController.prototype.constructor.name))
    f0DailyToanQuocController = kernel.addClass(new F0DailyToanQuocController());


class F0DailyTinhController extends F0BaseDailyController{
	 constructor() {
        super();
        this.api(2);
    }

	do(data) {
		
		var result =data.data;
		//console.log(":F0-ToanQuoc========================"+JSON.stringify(result));		
       // setData(data);
      
        for (var i = 0; i < result.length; i++) {
			var tinh =result[i];
			var ten=tinh.tinhCongBo;
			var datas =tinh.datas;
			var datatk =tinh.datatk;
			var dates = tinh.dates;
			
			var key = ten; 
			
			var tpmLabel = [];     
	        var tpmLuyKe = [];
	 		var tpmLTheoNgay = [];
		
			var tpmLuyKeTK = [];
	 		var tpmLTheoNgayTK = [];
		
			for(var j=0;j<dates.length;j++){
				tpmLabel.push(dates[j]);
			}
			
			var caLuyKe =0;
			for(var j=0;j<datas.length;j++){
				caLuyKe =caLuyKe+parseInt(datas[j]);
				tpmLTheoNgay.push(datas[j]);
				tpmLuyKe.push(caLuyKe)				
				
			}
			
			var caLuyKe =0;
			for(var j=0;j<datatk.length;j++){
				caLuyKe =caLuyKe+parseInt(datatk[j]);
				tpmLTheoNgayTK.push(datatk[j]);
				tpmLuyKeTK.push(caLuyKe)
				
				
			}
			
			f0DailyTinhController.Labels.set(key,tpmLabel);
       	 	f0DailyTinhController.dataLuyKe.set(key,tpmLuyKe);
			f0DailyTinhController.dataTheoNgay.set(key,tpmLTheoNgay);
			
			f0DailyTinhController.dataLuyKeTK.set(key,tpmLuyKeTK);
			f0DailyTinhController.dataTheoNgayTK.set(key,tpmLTheoNgayTK);
			
			//console.log(":Tinh========================"+key);		
			//console.log(":Label========================"+JSON.stringify(tpmLabel));		
			//console.log(":TheoNgay========================"+JSON.stringify(tpmLTheoNgay));		
			//console.log(":LuyKe========================"+JSON.stringify(tpmLuyKe));		
			
         
        }
        
        
    }
}

var f0DailyTinhController = null;
if (kernel.checkMode(F0DailyTinhController.prototype.constructor.name))
f0DailyTinhController = kernel.addClass(new F0DailyTinhController());




class F0DailyHuyenController extends F0BaseDailyController{
	 constructor() {
        super();
        this.api(3);
    }

	do(data) {
		
		var result =data.data;
		//console.log(":F0-ToanQuoc========================"+JSON.stringify(result));		
       // setData(data);
      
        for (var i = 0; i < result.length; i++) {
			var huyen =result[i];
			var ten=huyen.huyenCongBo;
			var datas =huyen.datas;
			var datatk =huyen.datatk;
			var dates = huyen.dates;
			var key = huyen.tinhCongBo+ten;
			
			var tpmLabel = [];     
	        var tpmLuyKe = [];
	 		var tpmLTheoNgay = [];
		
			var tpmLuyKeTK = [];
	 		var tpmLTheoNgayTK = [];
		
			for(var j=0;j<dates.length;j++){
				tpmLabel.push(dates[j]);
			}
			
			var caLuyKe =0;
			for(var j=0;j<datas.length;j++){
				caLuyKe =caLuyKe+parseInt(datas[j]);
				tpmLTheoNgay.push(datas[j]);
				tpmLuyKe.push(caLuyKe)
			}
			
			var caLuyKe =0;
			for(var j=0;j<datatk.length;j++){
				caLuyKe =caLuyKe+parseInt(datatk[j]);
				tpmLTheoNgayTK.push(datatk[j]);
				tpmLuyKeTK.push(caLuyKe)
				
				
			}
			
			f0DailyHuyenController.Labels.set(key,tpmLabel);
       	 	f0DailyHuyenController.dataLuyKe.set(key,tpmLuyKe);
			f0DailyHuyenController.dataTheoNgay.set(key,tpmLTheoNgay);
			
			f0DailyHuyenController.dataLuyKeTK.set(key,tpmLuyKeTK);
			f0DailyHuyenController.dataTheoNgayTK.set(key,tpmLTheoNgayTK);
			//console.log(":HUYEN========================"+key);		
			//console.log(":Label========================"+JSON.stringify(tpmLabel));		
			//console.log(":TheoNgay========================"+JSON.stringify(tpmLTheoNgay));		
			//console.log(":LuyKe========================"+JSON.stringify(tpmLuyKe));		
			
         
        }
        
        
    }
}

var f0DailyHuyenController = null;
if (kernel.checkMode(F0DailyHuyenController.prototype.constructor.name))
f0DailyHuyenController = kernel.addClass(new F0DailyHuyenController());



class F0DailyXaController extends F0BaseDailyController{
	 constructor() {
        super();
        this.api(4);
    }

	do(data) {
		
		var result =data.data;
		//console.log(":F0-Xa========================"+JSON.stringify(result));		
       // setData(data);
      
        for (var i = 0; i < result.length; i++) {
			var xa =result[i];
			var ten=xa.xaCongBo;
			var datas =xa.datas;
			var datatk =xa.datatk;
			var dates = xa.dates;
			var key = xa.tinhCongBo+xa.huyenCongBo+ten;
			
			var tpmLabel = [];     
	        var tpmLuyKe = [];
	 		var tpmLTheoNgay = [];
		
			var tpmLuyKeTK = [];
	 		var tpmLTheoNgayTK = [];
			for(var j=0;j<dates.length;j++){
				tpmLabel.push(dates[j]);
			}
			
			var caLuyKe =0;
			for(var j=0;j<datas.length;j++){
				caLuyKe =caLuyKe+parseInt(datas[j]);
				tpmLTheoNgay.push(datas[j]);
				tpmLuyKe.push(caLuyKe)
			
			}
			
			var caLuyKe =0;
			for(var j=0;j<datatk.length;j++){
				caLuyKe =caLuyKe+parseInt(datatk[j]);
				tpmLTheoNgayTK.push(datatk[j]);
				tpmLuyKeTK.push(caLuyKe)
				
				
			}
			
			f0DailyXaController.Labels.set(key,tpmLabel);
       	 	f0DailyXaController.dataLuyKe.set(key,tpmLuyKe);
			f0DailyXaController.dataTheoNgay.set(key,tpmLTheoNgay);
			
			
			f0DailyXaController.dataLuyKeTK.set(key,tpmLuyKeTK);
			f0DailyXaController.dataTheoNgayTK.set(key,tpmLTheoNgayTK);
			//console.log(":Xa========================"+key);		
			//console.log(":Label========================"+JSON.stringify(tpmLabel));		
			//console.log(":TheoNgay========================"+JSON.stringify(tpmLTheoNgay));		
			//console.log(":LuyKe========================"+JSON.stringify(tpmLuyKe));		
			
         
        }
        
        
    }
}

var f0DailyXaController = null;
if (kernel.checkMode(F0DailyXaController.prototype.constructor.name))
f0DailyXaController = kernel.addClass(new F0DailyXaController());


