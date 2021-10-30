var is_add_lable_tinh = false;
var tag_image_path = 'data:image/jpeg;base64,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';
var image_share_path = 'https://i.pinimg.com/564x/21/b5/fb/21b5fbb40e18ca405723ded6f1a093e0.jpg';
var markerListLayer = [];
var isF0Mode = false;
class ListRegionControler {
    constructor() {
        this.Data = HANH_CHINH;
    }
    addControl(map) {
        // L.easyButton('<h3>F</h3>', function () {
        //     isF0Mode = !isF0Mode;
        //     if (!isF0Mode) {
        //         listRegionControler.clearTotalF0LabelLayer();
        //     }
        //     else {
        //         if (clicked_province == '') {
        //             listRegionControler.addLabelProvincesMap();
        //         } else {
        //             if (clicked_district == '') {
        //                 listRegionControler.addLabelDistrictsMap(clicked_province);
        //             } else {
        //                 listRegionControler.addLabelWardsMap(clicked_province, clicked_district);
        //             }
        //         }
        //     }
        // }, "Xem tổng F0 tại bản đồ").addTo(map);
    }
    _getItemTagDiaPhuong(parent, item, fit_zoom_func, i) {
        // console.log('getItemTagDiaPhuong', item);
        const color = getColor(data_core.get(parent + item))
        const f0text = getF0(data_f0, parent + item);
        const host = parent != '' ?
            `https://nguyco.antoancovid.vn/danger?p=${parent}&d=${item}` :
            `https://nguyco.antoancovid.vn/danger?p=${item}`;
        const share_text = `<a href="${host}" class="hanh-chinh-href" target="_blank">
                                <img width="14" alt="chia sẻ liên kết" title="chia sẻ liên kết"
                                src="${image_share_path}" style="float: right;">
                            </a>`;
        // tạm thời bỏ chức năng này
        const bien_phap_text = `<a href="#" id="pop${i}">
                                    <img width="14" alt="Biện pháp đáp ứng"
                                    title="Biện pháp đáp ứng"
                                    src="${tag_image_path}" style="float: right;">
                                </a>`;
        const content = parent != ''? bien_phap_text : share_text;
        return `
                <i style="background:${color};color:white">&nbsp;${i + 1}&nbsp;</i>
                <a href="#" onclick="return ${fit_zoom_func};">${item}</a> (F0:${f0text})
                ${content}
                `;
    }

    _createdMaker(point, f0) {
        var marker = L.marker([point['lat'], point['lng']], {
            icon: L.divIcon({
                className: 'text-labels',   // Set class for CSS styling
                html: `<b style="background-color: darkmagenta; color:#fff">&nbsp;${f0}&nbsp;</b>`
            }),
            zIndexOffset: 1000     // Make appear above other map features
        });
        // console.log('marker', marker);
        marker.addTo(Lmap);
        markerListLayer.push(marker);
    }

    clearTotalF0LabelLayer() {
        while (markerListLayer.length > 0) {
            const marker = markerListLayer.pop();
            Lmap.removeLayer(marker);
        }
    }

    _preloading() {
        var data = new Map();
        for (var i = 0; i < ATCOVID_PROVINCES.length; i++) {
            const province = ATCOVID_PROVINCES[i];
            var districts = [];
            for (var j = 0; j < ATCOVID_DISTRICT.length; j++) {
                const district = ATCOVID_DISTRICT[j];
                if (province['id'] == district['parent_id']) {
                    districts.push(district);
                    var wards = [];
                    for (var k = 0; k < ATCOVID_WARDS.length; k++) {
                        const ward = ATCOVID_WARDS[k];
                        if (district['id'] == ward['parent_id']) {
                            wards.push(ward);
                        }
                    }
                    data.set(province['name'] + district['name'], wards);
                }
            }
            data.set(province['name'], districts);
        }
        return data;
    }
    addLabelLayerMap(layerId) {
        if (isF0Mode)
            switch (layerId) {
                case 1:
                    this.addLabelProvincesMap();
                    break;
                case 2:
                    this.addLabelDistrictsMap(clicked_province);
                    break;
                case 3:
                    this.addLabelWardsMap(clicked_province, clicked_district);
                    break;
                default:
                    this.addLabelProvincesMap(clicked_province);
            }
        else {
            this.clearTotalF0LabelLayer();
        }
    }
    addLabelProvincesMap() {
        this.clearTotalF0LabelLayer();
        // console.log('addLabelProvincesMap', ATCOVID_PROVINCES.length)
        const provinces = this.Data['Việt Nam'];
        for (var i = 0; i < provinces.length; i++) {
            const point = provinces[i];
            var f0 = getF0(data_f0, point['name']);
            this._createdMaker(point, f0);
        }
    }

    addLabelDistrictsMap(province) {
        this.clearTotalF0LabelLayer();
        const disttricts = this.Data[province];
        console.log('addLabelDistrictsMap', province, disttricts);
        for (var i = 0; i < disttricts.length; i++) {
            const point = disttricts[i];
            const f0 = getF0(data_f0, province + point['name']);
            this._createdMaker(point, f0);
        }
    }

    addLabelWardsMap(province, district) {
        this.clearTotalF0LabelLayer();
        const wards = this.Data[province + district];
        console.log('addLabelWardsMap', province, district, wards);
        for (var i = 0; i < wards.length; i++) {
            const ward = wards[i];
            const f0 = getF0(data_f0, province + district + ward['name']);
            this._createdMaker(ward, f0);
        }
    }

    provinces() {
        var map = mapVN['VN'];
        var str = `
        <table id='customers' class="hanh-chinh-table" style="width: 680">
            <tr><th>
            Danh sách các tỉnh có nguy cơ từ cao đến thấp
            </th><tr/>
        </table>
        <div id="collapseOne" style="width: 680" class="collapse show">
        <table id='customers' class="hanh-chinh-table" style="width: 680">
            <tbody>`;

        map.sort(function (x, y) {
            let a = (data_core.get(x)),
                b = (data_core.get(y));
            if (("" + a) === "undefined") { a = 0.0; }
            if (("" + b) === "undefined") { b = 0.0; }
            if ((b - a) == 0) {
                const f0x = getF0(data_f0, x);
                const f0y = getF0(data_f0, y);
                return f0y - f0x;
            }
            return b - a;
        });
        for (var i = 0; i < map.length; i += 3) {
            var province = map[i];
            var fit_zoom_func = `fit_zoom_to1('${province}')`;
            str += (i < 12) ? '<tr><td>' : `<tr><td class="nguyco1">`
            str += this._getItemTagDiaPhuong('', province, fit_zoom_func, i);
            str += (i < 12) ? '</td><td>' : '</td><td class="nguyco1 ">';
            if ((i + 1) < map.length) {
                province = map[i + 1];
                var fit_zoom_func = `fit_zoom_to1('${province}')`;
                str += this._getItemTagDiaPhuong('', province, fit_zoom_func, i + 1);
            }
            str += (i < 12) ? '</td><td>' : `</td><td class="nguyco1 ">`
            if ((i + 2) < map.length) {
                province = map[i + 2];
                var fit_zoom_func = `fit_zoom_to1('${province}')`;
                str += this._getItemTagDiaPhuong('', province, fit_zoom_func, i + 2);;
            }
            str += '</td></tr>';
        }
        str += `
        </tbody>
     
    </table></div>`;
        str = str + panelUtil.createdBienPhapModal();
        str = str.replaceAll("undefined", "");
        return str;
    }
    districts(province) {
        var map = mapVN[province];
        const color = getColor(data_core.get(province));
        const f0text = getF0(data_f0, province);
        var str = `
        <table id='customers' class="hanh-chinh-table" style="width: 680">
            <tr><th>
            <i style="background:${color}">&nbsp;&nbsp;&nbsp;</i>&nbsp;
            ${province} (F0: ${f0text}),
            <a style="color: #f8f8f8;text-decoration: underline;" href="" onclick="return fit_zoom_to_VN();">Việt Nam</a>,
            <a style="color: #f8f8f8;text-decoration: underline;" href="#" id="pop">Biện pháp đáp ứng</a>
            </th><tr/>
        </table>
        <div id="collapseOne1" style="width: 680" class="collapse show">
        <table id='customers' class="hanh-chinh-table" style="width: 680">`;

        map.sort(function (x, y) {
            let a = (data_core.get(province + x)),
                b = (data_core.get(province + y));
            if (("" + a) === "undefined") { a = 0.0; }
            if (("" + b) === "undefined") { b = 0.0; }
            return b - a;
        });

        for (var i = 0; i < map.length; i += 3) {
            var district = map[i];
            var fit_zoom_func = `fit_zoom_to2('${province}','${district}')`;
            str += '<tr><td>';
            str += this._getItemTagDiaPhuong(province, district, fit_zoom_func, i);
            str += '</td><td>';
            if ((i + 1) < map.length) {
                district = map[i + 1];
                var fit_zoom_func = `fit_zoom_to2('${province}','${district}')`;
                str += this._getItemTagDiaPhuong(province, district, fit_zoom_func, i + 1);
            }
            str += '</td><td>';
            if ((i + 2) < map.length) {
                district = map[i + 2];
                var fit_zoom_func = `fit_zoom_to2('${province}','${district}')`;
                str += this._getItemTagDiaPhuong(province, district, fit_zoom_func, i + 2);
            }
            str += '</td></tr>';
        }
        str += '</table></div>';
        str = str + panelUtil.createdBienPhapModal();

        return str.replaceAll("undefined", "");
    }
    communes(province, district) {
        var map = mapVN[province + " " + district];
        var parent = province + district;

        const color = getColor(data_core.get(province));
        const color_district = getColor(data_core.get(province + district));
        const f0text = getF0(data_f0, province);
        const f0text_district = getF0(data_f0, province + district);
        var fit_zoom_func = `fit_zoom_to1('${province}')`;
        var str = `
        <table id='customers' class="hanh-chinh-table" style="width: 680">
            <tr><th>
                <i style="background:${color_district}">&nbsp;&nbsp;&nbsp;</i>${district}
                &nbsp;(F0: ${f0text_district}),
                <i style="background:${color}">&nbsp;&nbsp;&nbsp;</i>&nbsp;
                <a style="color: #f8f8f8;text-decoration: underline;" href="" onclick="return ${fit_zoom_func};">${province}</a>&nbsp;
                (F0: ${f0text}),
                <a style="color: #f8f8f8;text-decoration: underline;" href="#" id="pop">Biện pháp đáp ứng</a>
            </th><tr/></table>
        <div id="collapseOne1" style="width: 680" class="collapse show">
            <table id='customers' class="hanh-chinh-table" style="width: 680">`;

        map.sort(function (x, y) {
            let a = (data_core.get(parent + x)),
                b = (data_core.get(parent + y));
            if (("" + a) === "undefined") { a = 0.0; }
            if (("" + b) === "undefined") { b = 0.0; }
            return b - a;
        });

        for (var i = 0; i < map.length; i += 3) {
            var commune = map[i];
            fit_zoom_func = `fit_zoom_to3('${province}','${district}','${commune}')`;
            str += '<tr><td>'
            str += this._getItemTagDiaPhuong(parent, commune, fit_zoom_func, i);
            str += '</td><td>';
            if ((i + 1) < map.length) {
                commune = map[i + 1];
                fit_zoom_func = `fit_zoom_to3('${province}','${district}','${commune}')`;
                str += this._getItemTagDiaPhuong(parent, commune, fit_zoom_func, i + 1);
            }
            str += '</td><td>';
            if ((i + 2) < map.length) {
                commune = map[i + 2];
                fit_zoom_func = `fit_zoom_to3('${province}','${district}','${commune}')`;
                str += this._getItemTagDiaPhuong(parent, commune, fit_zoom_func, i + 2);
            }
            str += '</td></tr>';
        }
        str += '</table></div>';
        str = str + panelUtil.createdBienPhapModal();
        return str.replaceAll("undefined", "");
    }
    showCommune(province, district, commune) {
        const color = getColor(data_core.get(province));
        const color_district = getColor(data_core.get(province + district));
        const f0text = getF0(data_f0, province);
        const f0text_district = getF0(data_f0, province + district);
        var fit_zoom_to2 = `fit_zoom_to2('${province}', '${district}')`;
        var fit_zoom_to1 = `fit_zoom_to1('${province}')`;
        return `
            <table id='customers' class="hanh-chinh-table" style="width: 680">
                <tr><th>
                    ${commune}&nbsp;
                    <i style="background:${color_district}">&nbsp;&nbsp;&nbsp;</i>&nbsp;
                    <a style="color: #f8f8f8;text-decoration: underline;" href="" onclick="return ${fit_zoom_to2};">${district}</a>&nbsp;
                    (F0: ${f0text_district}),
                    <i style="background:${color}">&nbsp;&nbsp;&nbsp;</i>&nbsp;
                    <a style="color: #f8f8f8;text-decoration: underline;" href="" onclick="return ${fit_zoom_to1};">${province}</a>
                    &nbsp;(F0: ${f0text}),
                    <a style="color: #f8f8f8;text-decoration: underline;" href="#" id="pop">Biện pháp đáp ứng</a>
                </th><tr/>
            </table>` + panelUtil.createdBienPhapModal();
    }
}

listRegionControler = null;
if (kernel.checkMode(ListRegionControler.prototype.constructor.name))
    listRegionControler = kernel.addClass(new ListRegionControler());
