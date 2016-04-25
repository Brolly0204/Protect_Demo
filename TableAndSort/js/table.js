var str = [
    {"姓名":"鸣人","年龄":"18","性别":"男","武力":"90","级别":"中忍"},
    {"姓名":"佐助","年龄":"18","性别":"男","武力":"90","级别":"中忍"},
    {"姓名":"卡卡西","年龄":"28","性别":"男","武力":"79","级别":"上忍"},
    {"姓名":"纲手","年龄":"38","性别":"女","武力":"90","级别":"上忍"},
    {"姓名":"自来也","年龄":"38","性别":"男","武力":"91","级别":"上忍"},
    {"姓名":"小樱","年龄":"17","性别":"女","武力":"77","级别":"中忍"},
    {"姓名":"水影","年龄":"33","性别":"女","武力":"89","级别":"上忍"},
    {"姓名":"鹿丸","年龄":"19","性别":"男","武力":"70","级别":"中忍"},
    {"姓名":"宇智波鼬","年龄":"28","性别":"男","武力":"99","级别":"上忍"},
    {"姓名":"宇智波斑","年龄":"100","性别":"男","武力":"100","级别":"上忍"},
    {"姓名":"水门","年龄":"36","性别":"男","武力":"99","级别":"上忍"},
    {"姓名":"大蛇丸","年龄":"35","性别":"男","武力":"90","级别":"上忍"},
    {"姓名":"再不斩","年龄":"33","性别":"男","武力":"72","级别":"上忍"},
    {"姓名":"小南","年龄":"30","性别":"女","武力":"88","级别":"上忍"},
    {"姓名":"木叶丸","年龄":"10","性别":"男","武力":"59","级别":"下忍"},
    {"姓名":"雏田","年龄":"18","性别":"女","武力":"69","级别":"下忍"},
    {"姓名":"宁次","年龄":"19","性别":"男","武力":"77","级别":"中忍"},
    {"姓名":"小李","年龄":"16","性别":"男","武力":"70","级别":"下忍"},
    {"姓名":"袁飞","年龄":"79","性别":"男","武力":"99","级别":"上忍"},
    {"姓名":"带土","年龄":"36","性别":"男","武力":"88","级别":"上忍"},
    {"姓名":"我爱罗","年龄":"20","性别":"男","武力":"82","级别":"中忍"},
    {"姓名":"佩恩","年龄":"35","性别":"男","武力":"90","级别":"上忍"},
    {"姓名":"天天","年龄":"16","性别":"女","武力":"69","级别":"下忍"},
    {"姓名":"勘九郎","年龄":"21","性别":"男","武力":"68","级别":"中忍"},
    {"姓名":"佐井","年龄":"25","性别":"男","武力":"73","级别":"中忍"},
    {"姓名":"长门","年龄":"35","性别":"男","武力":"88","级别":"上忍"},
    {"姓名":"丁次","年龄":"18","性别":"男","武力":"67","级别":"下忍"},
    {"姓名":"大和","年龄":"34","性别":"男","武力":"75","级别":"上忍"},
    {"姓名":"井野","年龄":"17","性别":"女","武力":"65","级别":"下忍"},
    {"姓名":"迈特凯","年龄":"36","性别":"男","武力":"88","级别":"上忍"},
    {"姓名":"阿斯玛","年龄":"42","性别":"男","武力":"80","级别":"上忍"},
    {"姓名":"夕阳红","年龄":"37","性别":"女","武力":"78","级别":"上忍"},
    {"姓名":"花火","年龄":"42","性别":"男","武力":"70","级别":"上忍"},
    {"姓名":"宇智波止水","年龄":"43","性别":"男","武力":"85","级别":"上忍"},
    {"姓名":"日足","年龄":"53","性别":"男","武力":"71","级别":"中忍"},
    {"姓名":"志乃","年龄":"21","性别":"男","武力":"77","级别":"中忍"},
    {"姓名":"原野琳","年龄":"16","性别":"女","武力":"79","级别":"下忍"},
    {"姓名":"手鞠","年龄":"15","性别":"女","武力":"70","级别":"中忍"},
    {"姓名":"千代","年龄":"120","性别":"男","武力":"100","级别":"上忍"},
    {"姓名":"迪达拉","年龄":"27","性别":"男","武力":"85","级别":"上忍"},
    {"姓名":"鬼鲛","年龄":"47","性别":"男","武力":"85","级别":"上忍"},
    {"姓名":"飞段","年龄":"56","性别":"男","武力":"87","级别":"上忍"},
    {"姓名":"绝","年龄":"33","性别":"男","武力":"82","级别":"上忍"},
];

/**
 * 表格类
 * @param {Array} data : 表格数据 
 * @param {Element} content : 表格数据容器
 * @param {Number} recordNum : 每页的条数
 */
function Table(data, content, recordNum) {
	this.ary = data;
	this.sortData = this.ary.slice(0);
	this.content = content;
	this.curPage = 0;
	this.recordNum = recordNum;
}

/**
 * 创建表格数据
 * @return {实例} 
 */
Table.prototype.createHeader = function() {
	this.oTable = document.createElement('table');
	this.content.appendChild(this.oTable);
	var oThead = document.createElement('thead');
	this.oTable.appendChild(oThead);
	var oTr = document.createElement('tr');
	oThead.appendChild(oTr);
	for(str in this.ary[0]){
		var oTh = document.createElement('th');
		oTh.innerHTML = str;
		oTr.appendChild(oTh);
	}
	return this;
}

/**
 * 创建导航
 * @return {实例} 
 */
Table.prototype.createBody = function() {
	this.oTbody = document.createElement('tbody');
	this.oTable.appendChild(this.oTbody);
	this.showPage(1);
	return this;
}

/**
 * 创建表头
 * @return {实例} 
 */
Table.prototype.createNav = function() {
	this.totalPage = Math.ceil(this.ary.length/this.recordNum);
	var _this = this;
	this.nav = document.createElement('div');
	this.content.appendChild(this.nav);
	this.prevPage = document.createElement('span');
	this.nav.appendChild(this.prevPage);
	this.prevPage.onclick = function(){
		_this.prevChange.call(_this);
	}
	
	this.prevPage.innerHTML = "上一页";
	this.nav.className = 'nav';
	var oDiv = document.createElement('div');
	this.nav.appendChild(oDiv);
	for(var i=0; i<this.totalPage; i++){
		var page = document.createElement('span');
		page.innerHTML = '第'+ (i+1) + '页';
		page.onclick = function(){
			_this.showPage(_this.curPage = this.innerHTML.match(/\d+/)*1);
		}
		oDiv.appendChild(page);
		if(i==0)
			page.className = 'current';
	}
	this.nextPage = document.createElement('span');
	this.nav.appendChild(this.nextPage);
	this.nextPage.onclick = function() {
		_this.nextChange.call(_this);
	}
	this.nextPage.innerHTML = "下一页";
	return this;
}

/**
 * 创建排序选项并绑定排序事件
 * @param  {Array} arr : 表格数据
 * @param  {String} sortItem : 排序项
 */
Table.prototype.createSort = function(arr, sortItem){
	var _this = this;
	arr[arr.length-1] = arr[arr.length-1] + 1;
	this.arr = arr;
	var options = this.oTable.getElementsByTagName("th");
	options = Array.prototype.slice.apply(options, arr);
	var sort = document.createElement('div');
	sort.className = 'sort';
	this.content.insertBefore(sort, this.oTable);
	var span = document.createElement("span");
	span.innerHTML = "排序：";
	sort.appendChild(span);
	this.select = document.createElement("select");
	options.forEach(function(result, item){
		var option = document.createElement('option');
		if(result.innerHTML === sortItem){
			option.selected = "true";
		}
		option.innerHTML = result.innerHTML;
		_this.select.appendChild(option);
	});
	sort.appendChild(this.select);
	span = document.createElement("span");
	span.innerHTML = "升序";
	span.className = 'mo';
	sort.appendChild(span);
	span = document.createElement("span");
	span.innerHTML = "降序";
	span.className = 'mo';
	sort.appendChild(span);

	var selOptions = this.content.getElementsByTagName("option");
	var oSpans = this.content.getElementsByClassName('mo');
	oSpans[0].onclick = function() {
		[].forEach.call(selOptions,function(result, item){
			if(result.selected){
				_this.sortChange.call(_this, result.innerHTML, 1);
			}
		});	
	}
	oSpans[1].onclick = function() {
		[].forEach.call(selOptions,function(result, item){
			if(result.selected){
				_this.sortChange.call(_this, result.innerHTML, -1);
			}
		});	
	}
}

/**
 * 排序操作
 * @param  {String} str : 排序项
 * @param  {Number} direction : 升序或者降序标志位(1->升序 0->降序)
 */
Table.prototype.sortChange = function(str, direction) {
	var data = this.sortData.slice(0);
	data.sort(function(a, b){
		if(isNaN(a[str]))
            return (a[str].localeCompare(b[str])) * direction;
		return (a[str] - b[str]) * direction;
	});
	//console.log(data);
	this.content.innerHTML = "";
	var test = new Table(data, this.content, this.recordNum);
	test.createHeader().createBody().createNav().createSort(this.arr, str);

}

/**
 * 显示数据页
 * @param  {Number} n ：第几页
 */
Table.prototype.showPage = function(n) {
	this.oTbody.innerHTML = "";
	for(var i=(n-1)*this.recordNum; i<n*this.recordNum; i++){
		var tr = document.createElement('tr');
		for(str in this.ary[i]){
			var td = document.createElement('td');
			td.innerHTML = this.ary[i][str];
			tr.appendChild(td);
		}
		this.oTbody.appendChild(tr);
	}
	var oNav = this.content.getElementsByClassName('nav')[0];
	if(oNav){
		var oSpan = oNav.getElementsByTagName('span');
		for(var i=0; i<oSpan.length; i++){
			oSpan[i].className = "";
		}
		oSpan[n].className = "current";
		this.prevPage.className = "";
		this.nextPage.className = "";
	}
}

/**
 * 向前翻页
 */
Table.prototype.prevChange = function() {
	if(this.curPage > 1 ){
		this.showPage(--this.curPage);
		this.prevPage.className = "";
	}else {
		this.prevPage.className = "arr";
	}
}

/**
 * 向后翻页
 */
Table.prototype.nextChange = function() {
	if(this.curPage!=(this.totalPage)){
		this.showPage(++this.curPage);
		this.nextPage.style.background = "";
	}else{
		this.nextPage.className = "arr";
	}
}

/**
 * 创建表格与导航条
 * @return {实例} 
 */
Table.prototype.createTable = function() {
	this.createHeader().createBody().createNav();
	return this;
}

var content = document.getElementsByClassName('content');
var data1 = str.slice(0);
var data2 = str.slice(0);

var test = new Table(data1, content[0], 10);
test.createTable().createSort([0, 4]);


// var test2 = new Table(data2, content[1], 10);
// test2.createTable().createSort([2, 4]);
