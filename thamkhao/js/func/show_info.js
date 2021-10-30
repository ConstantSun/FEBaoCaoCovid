function showInfoVietNam() {
console.log("🚀 ~ file: show_info.js ~ line 2 ~ showInfoVietNam ~ showInfoVietNam")
    
    var str = '';
    if (f0DiaPhuongController) str += f0DiaPhuongController.showInfo();
    // caNhiemToanQuocControler.showChartLuyKe() +
    // caNhiemToanQuocControler.show() +
    //if (f0DailyController) str += f0DailyController.show();
	//liemnn
	if (f0DailyToanQuocController) str += f0DailyToanQuocController.show();
	
    if (f0DiaPhuongController) str += f0DiaPhuongController.show("tỉnh trên toàn quốc");
    if (hisNguyCoTinhLoader)
        str += hisNguyCoTinhLoader.show('Tỉnh/Thành', '', '', '');
    if (thongKeNguyCoToanQuocLoader)
        str += thongKeNguyCoToanQuocLoader.show();
    if (atCovidController) str += atCovidController.show('Việt Nam');
    if (mobilityLoader) str += mobilityLoader.show('Việt Nam');

    document.getElementById("thelist").innerHTML = str;
    // caNhiemToanQuocControler.setupChartLuyKe();
    // caNhiemToanQuocControler.setup();
    if (thongKeNguyCoToanQuocLoader) thongKeNguyCoToanQuocLoader.load();
    if (f0DiaPhuongController) f0DiaPhuongController.loadInfo('', '', '')
   //liemnn
     //if (f0DailyController) f0DailyController.setup('Việt Nam');
	 if (f0DailyToanQuocController) f0DailyToanQuocController.setup('Việt Nam');

    if (f0DiaPhuongController) f0DiaPhuongController.setup('Việt Nam');
    if (hisNguyCoTinhLoader) hisNguyCoTinhLoader.setup('', '', '');
    if (mobilityLoader) mobilityLoader.setup('Việt Nam');
    if (atCovidController) atCovidController.load('Việt Nam');

    showMoreRowOfTable();

    if (isF0Mode) listRegionControler.addLabelProvincesMap(province);
    if (f0PointControler) f0PointControler.clearLayers();
}


function showInfoTinh(province) {
    console.log("🚀 ~ file: show_info.js ~ line 40 ~ showInfoTinh ~ province", province)
    var str = '';
    if (f0DiaPhuongController)
        str += f0DiaPhuongController.showInfo();
    
	//liemnn
	 //if (f0DailyController) str += f0DailyController.show();
	if (f0DailyTinhController) str += f0DailyTinhController.show();
	
	
    // str += hisCaNhiemTinhLoader.show(province);
    if (hisNguyCoHuyenLoader)
        str += hisNguyCoHuyenLoader.show('Quận/Huyện', province, '', '');
    if (f0DiaPhuongController)
        str += f0DiaPhuongController.show('quận/huyện trên ' + province);
    if (thongTinNguyCoTinhLoader)
        str += thongTinNguyCoTinhLoader.show(province);
    if (thongKeNguyCoTinhLoader)
        str += thongKeNguyCoTinhLoader.show(province);
    if (atCovidController)
        str += atCovidController.show(province);
    if (mobilityLoader) str += mobilityLoader.show(province);
    str = str.replaceAll("undefined", "");

    document.getElementById("thelist").innerHTML = str;
    console.log("🚀 ~ file: show_info.js ~ line 64 ~ showInfoTinh ~ str", str)

	//liemnn
   // if (f0DailyController) f0DailyController.load(province, '', '');
 	if (f0DailyTinhController) f0DailyTinhController.setup(province);

    // hisCaNhiemTinhLoader.setup(province);
    if (f0DiaPhuongController)
        f0DiaPhuongController.load(province, '', '');
    if (thongKeNguyCoTinhLoader)
        thongKeNguyCoTinhLoader.load(province);
    if (thongTinNguyCoTinhLoader)
        thongTinNguyCoTinhLoader.load(province, "Tỉnh/Thành");
    if (hisNguyCoHuyenLoader)
        hisNguyCoHuyenLoader.setup(province, '', '');
    if (mobilityLoader) mobilityLoader.setup(province);
    if (atCovidController) atCovidController.load(province);
    showMoreRowOfTable();
    if (isF0Mode && listRegionControler) listRegionControler.addLabelDistrictsMap(province);
    if (f0PointControler) f0PointControler.clearLayers();
}

function showInfoHuyen(province, district) {
    console.log("🚀 ~ file: show_info.js ~ line 90 ~ showInfoHuyen ~ showInfoHuyen")
    var str = '';
    if (f0DiaPhuongController) str += f0DiaPhuongController.showInfo();
    //liemnn
	//if (f0DailyController) str += f0DailyController.show();
	if (f0DailyHuyenController) str += f0DailyHuyenController.show();
    // str += hisCaNhiemHuyenLoader.show(province, district);
    if (f0DiaPhuongController)
        str += f0DiaPhuongController.show(`phường/xã trên ${district}, ${province}`);
    if (hisNguyCoXaLoader)
        str += hisNguyCoXaLoader.show('Phường/Xã', province, district, '');
    if (thongTinNguyCoHuyenLoader)
        str += thongTinNguyCoHuyenLoader.show(province, district);
    if (thongKeNguyCoHuyenLoader)
        str += thongKeNguyCoHuyenLoader.show(province, district);

    document.getElementById("thelist").innerHTML = str.replaceAll("undefined", "");
//liemnn
    //if (f0DailyController)
       // f0DailyController.load(province, district, '');
		if (f0DailyHuyenController)
        f0DailyHuyenController.setup(province+ district);

    if (f0DiaPhuongController)
        f0DiaPhuongController.load(province, district, '');
    if (thongKeNguyCoHuyenLoader)
        thongKeNguyCoHuyenLoader.load(province, district);
    if (thongTinNguyCoHuyenLoader)
        thongTinNguyCoHuyenLoader.load(province + district, "Quận/Huyện");
    // hisCaNhiemHuyenLoader.setup(province, district);
    if (hisNguyCoXaLoader)
        hisNguyCoXaLoader.setup(province, district, '');

    showMoreRowOfTable();

    if (isF0Mode && listRegionControler) listRegionControler.addLabelWardsMap(province, district);
    if (f0PointControler) f0PointControler.clearLayers();
}

function showInfoXa(province, district, commune) {
    var str = '';
    if (f0DiaPhuongController)
        str += f0DiaPhuongController.showInfo();
    // str +=  hisCaNhiemXaLoader.show(province, district, commune);
   //liemnn
	// if (f0DailyController) str += f0DailyController.show();
	if (f0DailyXaController) str += f0DailyXaController.show();
    if (thongTinNguyCoXaLoader)
        str += thongTinNguyCoXaLoader.show(province + district + commune);

    document.getElementById("thelist").innerHTML = str.replaceAll("undefined", "");

    if (f0DiaPhuongController)
        f0DiaPhuongController.loadInfo(province, district, commune);
    if (thongTinNguyCoXaLoader)
        thongTinNguyCoXaLoader.load(province + district + commune, "Phường/Xã");
    //liemnn
	//if (f0DailyController) f0DailyController.load(province, district, commune);
	if (f0DailyXaController) f0DailyXaController.setup(province+district+commune);

    // hisCaNhiemXaLoader.setup(province, district, commune)

    if (isF0Mode && listRegionControler) listRegionControler.clearTotalF0LabelLayer();
    if (f0PointControler) f0PointControler.api(province, district, commune);
}