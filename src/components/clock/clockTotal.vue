//clock.vue
<template>
	<div class="clock-total">
		<div class="container">
			<div class="title-box">
				<img slot="icon" src="../../static/icon/left.svg" width="24" height="24" data="0" v-on:click="toPage">							
				<div class="m-office">
					打卡月历
				</div>
				<div class="m-icon">
					<div class="office-icon">
						<img slot="icon" src="../../static/icon/ring.svg" width="24" height="24">
					</div>
				</div>
			</div>
			<!-- clock base html -->
			<div class="clock-group">
				<div class="user">
					<p>冯良</p>
					<p class="group">考勤组：研发考勤组</p>
				</div>
				<div class="time-select">
					<p v-on:click="openPicker">{{ showDateMonthValue }}</p>							
				</div>
			</div>
			<!-- calendar -->
			<div class="calendar" id="calendar"></div>
			<!-- class box -->
			<div class="class-box">
				<p>班次：</p>
				<p>白班</p>
				<p>8:30 - 17:30</p>
				<p>&nbsp;&nbsp;</p>
				<p>考勤组：</p>
				<p>研发部考勤组</p>
			</div>
			<!-- that day -->
			<div class="that-day">
				<div class="duty">
					<p>上班：&nbsp;&nbsp;</p>
					<p>未打卡</p>
					<span>(正常打卡)</span>
				</div>
				<div class="duty">
					<p>下班：&nbsp;&nbsp;</p>
					<p>未打卡</p>
					<span>(正常打卡)</span>
				</div>
			</div>

		</div>
		<mt-datetime-picker
			ref="monthPicker"
			type="date"
			year-format="{value} 年"
			month-format="{value} 月"
			v-model="dateMonthValue"
			v-on:confirm="selectMonthPicker">
		</mt-datetime-picker>
	</div>
</template>
<!-- SCRIPT -->
<script>
/*
* 用于记录日期，显示的时候，根据dateObj中的日期的年月显示
*/
var dateObj = (function(){
	var _date = new Date();    // 默认为当前系统时间
	return {
		getDate : function(){
			return _date;
		},
		setDate : function(date) {
			_date = date;
		}
	};
})();
export default {
	data() {
		return {
			dateMonthValue:new Date(),
			showDateMonthValue:new Date().Format('yyyy年MM月'),
		}
	},
	watch: {
		
	},
	mounted () {
		// 设置calendar div中的html部分
		this.renderHtml();
		// 表格中显示日期
		this.showCalendarData();
		// 绑定事件
		this.bindEvent();	    
	},
	methods: {
		selectMonthPicker:function(value){
			this.showDateMonthValue = value.Format('yyyy年MM月');
			dateObj.setDate(new Date(value));
			this.showCalendarData();
		},
		toPage:function(){
			this.$router.push({path:'/clock'});
		},
		openPicker:function(){
			this.$refs.monthPicker.open();
			$('.picker-slot').eq(2).hide();//备注：不能往其之前加日期选择器了
		},
		renderHtml:function(){
			var calendar = document.getElementById("calendar");
	        var bodyBox = document.createElement("div");  // 表格区 显示数据
			// 设置表格区的html结构
			bodyBox.className = 'calendar-body-box';
			var _headHtml = "<tr>" + 
					"<th>日</th>" +
					"<th>一</th>" +
					"<th>二</th>" +
					"<th>三</th>" +
					"<th>四</th>" +
					"<th>五</th>" +
					"<th>六</th>" +
					"</tr>";
			var _bodyHtml = "";
			// 一个月最多31天，所以一个月最多占6行表格
			for(var i = 0; i < 6; i++) {  
				_bodyHtml += "<tr>" +
						"<td></td>" +
						"<td></td>" +
						"<td></td>" +
						"<td></td>" +
						"<td></td>" +
						"<td></td>" +
						"<td></td>" +
					"</tr>";
			}
			bodyBox.innerHTML = "<table id='calendarTable' class='calendar-table'>" +
					_headHtml + _bodyHtml +
					"</table>";
			// 添加到calendar div中
			calendar.appendChild(bodyBox);
		},
		showCalendarData:function(){
			var _year = dateObj.getDate().getFullYear();
			var _month = dateObj.getDate().getMonth() + 1;
			var _dateStr = this.getDateStr(dateObj.getDate());
			// 设置表格中的日期数据
			var _table = document.getElementById("calendarTable");
			var _tds = _table.getElementsByTagName("td");
			var _firstDay = new Date(_year, _month - 1, 1);// 当前月第一天

			for(var i = 0; i < _tds.length; i++) {

				var _thisDay = new Date(_year, _month - 1, i + 1 - _firstDay.getDay());
				var _thisDayStr = this.getDateStr(_thisDay);

				if(i - _firstDay.getDay() == 0){
					_tds[i].innerHTML = '<div class="current">' + _thisDay.getDate() + '</div>';
				}else{
					_tds[i].innerHTML = '<div>' + _thisDay.getDate() + '</div>';
				}
				_tds[i].setAttribute('data', _thisDayStr);

				if(_thisDayStr == this.getDateStr(new Date())) {// 当前天
					if(_thisDayStr.substr(0, 6) == this.getDateStr(_firstDay).substr(0, 6)){
						_tds[i].className = 'currentDay';					
					}else{
						_tds[i].className = 'otherMonth';
					}
				}else if(_thisDayStr.substr(0, 6) == this.getDateStr(_firstDay).substr(0, 6)) {
					_tds[i].className = 'currentMonth';// 当前月
				}else {// 其他月
					_tds[i].className = 'otherMonth';
				}
			}
		},
		bindEvent:function(){
			//给每个td绑定点击事件
			var table = document.getElementById("calendarTable");
			var tds = table.getElementsByTagName('td');
			for(var i = 0; i < tds.length; i++) {
				this.addEvent(tds[i], 'click', function(event){
					var el = event.currentTarget;
					$('#calendarTable td').find('div').removeClass('current');
					$(el).find('div').addClass('current');
				});
			}
		},
		addEvent:function(dom, eType, func){
			if(dom.addEventListener) {  // DOM 2.0
				dom.addEventListener(eType, function(e){
					func(e);
				});
			} else if(dom.attachEvent){  // IE5+
				dom.attachEvent('on' + eType, function(e){
					func(e);
				});
			} else {  // DOM 0
				dom['on' + eType] = function(e) {
					func(e);
				}
			}
		},
		getDateStr:function(date){
			var _year = date.getFullYear();
			var _month = date.getMonth() + 1;    // 月从0开始计数
			var _d = date.getDate();			 
			_month = (_month > 9) ? ("" + _month) : ("0" + _month);
			_d = (_d > 9) ? ("" + _d) : ("0" + _d);
			return _year + _month + _d;
		}
	}
}
</script>