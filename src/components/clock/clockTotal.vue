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
					<p>{{ userName }}</p>
					<p class="group">考勤组：{{ attendanceGroupName }}</p>
				</div>
				<div class="time-select">
					<p v-on:click="openPicker">{{ showDateMonthValue }}</p>
				</div>
			</div>
			<!-- calendar -->
			<div class="calendar" id="calendar"></div>
			<!-- class box -->
			<div class="class-box">
				<p>班次：{{ dutyType }}</p>
				<p class="classDuty">{{ onDutyTime }} - {{ offDutyTime }}</p>
				<p>&nbsp;&nbsp;</p>
				<p>考勤组：{{ attendanceGroupName }}</p>
			</div>

			<!-- that day -->
			<div class="that-day">
				<div class="duty">
					<p>上班：&nbsp;&nbsp;</p>
					<p>{{ onClockTime }}</p>
					<span>{{ onDutyStatus }}&nbsp;&nbsp;</span>
					<mt-button type="danger" size="small" v-show="on" v-on:click="forgetCard(1)">去补卡</mt-button>
				</div>
				<div class="duty">
					<p>下班：&nbsp;&nbsp;</p>
					<p>{{ offClockTime }}</p>
					<span>{{ offDutyStatus }}&nbsp;&nbsp;</span>
					<mt-button type="danger" size="small" v-show="off" v-on:click="forgetCard(2)">去补卡</mt-button>
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
			dateMonthValue:this.$user.mouth,
			showDateMonthValue:this.$user.mouth.Format('yyyy年MM月'),
			userName:this.$user.userName,
			attendanceGroupName:this.$user.attendanceGroupName,
			dutyType:'',//什么班
			onDutyTime:'',//上班时间
			offDutyTime:'',//下班时间
			onClockTime:'',//上班打卡时间
			offClockTime:'',//下班打卡时间
			onDutyStatus:'',//上班状态
			offDutyStatus:'',//下班状态
			on:false,
			off:false,
			currentDay:''//选中的日期
		}
	},
	watch: {
		
	},
	mounted () {
		// 设置calendar div中的html部分
		this.renderHtml();
		this.getMyClockMonthForm();
		this.getMyClockDayDetail(this.dateMonthValue.Format('yyyyMM01'))
	},
	methods: {
		forgetCard:function(replaceType){
			if(replaceType == 1){
				this.$leaveType.replaceTime = this.onDutyTime;
			}else if(replaceType == 2){
				this.$leaveType.replaceTime = this.offDutyTime;
			}
			this.$leaveType.typeId = '007';
			this.$leaveType.replaceType = replaceType;
			this.$leaveType.replaceRecordDate = this.currentDay;
			this.$router.push({path:'/leaveFlow'});
		},
		selectMonthPicker:function(value){
			this.showDateMonthValue = value.Format('yyyy年MM月');
			dateObj.setDate(new Date(value));
			this.getMyClockMonthForm();
		},
		getMyClockMonthForm:function(){
			var el = this;
			el.$index.ajax(this, '/phClock/getMyClockMonthForm.ph', {balanceMonth:el.dateMonthValue.Format('yyyy-MM')}, function(data){
				// 成功回调
				// 表格中显示日期
				el.showCalendarData();
				// 绑定事件
				el.bindEvent();

				for(var i=0 ; i<data.clockDayForms.length ; i++){
					var tds = $('#calendarTable .currentMonth');
					for(var j = 0; j < tds.length; j++) {
						var str = data.clockDayForms[i].recordDateStr
						var timeStr = str.substr(0, 4) + str.substr(5, 2) + str.substr(8, 2)
						if(timeStr == tds.eq(j).attr('data')){
							if(data.clockDayForms[i].leaveFlag == 0){
								if(data.clockDayForms[i].beLateFlag == 0 && data.clockDayForms[i].leaveEarlyFlag == 0){
									tds.eq(j).find('i').addClass('blue')
								}else{
									tds.eq(j).find('i').addClass('orange')
								}
							}else{
								if(data.clockDayForms[i].clockInTime || data.clockDayForms[i].clockOUtTime){
									tds.eq(j).find('i').addClass('blue')
								}
							}

						}
					}
				}

			})
		},
		toPage:function(){
			this.$router.push({path:'/clock?value=2'});
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
					_tds[i].innerHTML = '<div class="current">' + _thisDay.getDate() + '</div><i></i>';
				}else{
					_tds[i].innerHTML = '<div>' + _thisDay.getDate() + '</div><i></i>';
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
			var el = this;
			var table = document.getElementById("calendarTable");
			var tds = table.getElementsByTagName('td');
			for(var i = 0; i < tds.length; i++) {
				this.addEvent(tds[i], 'click', function(event){
					var ele = event.currentTarget;
					$('#calendarTable td').find('div').removeClass('current');
					$(ele).find('div').addClass('current');
					el.getMyClockDayDetail($(ele).attr('data'))
				});
			}
		},
		getMyClockDayDetail:function(recordDateStr){
			var el = this;
			el.currentDay = recordDateStr.substr(0,4)+'-'+recordDateStr.substr(4,2)+ '-' +recordDateStr.substr(6,2);
			el.$index.ajax(this, '/phClock/getMyClockDayDetail.ph', {
				recordDateStr:el.currentDay,
				isLeave:1
			}, function(data){
				// 成功回调
				if(data.attendanceRecord){
					$('.classDuty').show();
					$('.that-day').show();					
					if(data.attendanceRecord.leaveFlag == 0){
						el.on = false;
						el.off = false;
						el.dutyType = '';
						el.onDutyTime = data.attendanceRecord.onDutyTime
						el.offDutyTime = data.attendanceRecord.offDutyTime
						el.onClockTime = data.attendanceRecord.clockInTime || '缺卡'
						el.offClockTime = data.attendanceRecord.clockOutTime || '缺卡'
						if(data.attendanceRecord.beLateFlag == 0){
							el.onDutyStatus = '（正常打卡）';
						}else if(data.attendanceRecord.beLateFlag == 1){
							el.onDutyStatus = '（迟到）';
						}else if(data.attendanceRecord.beLateFlag == 2){
							el.onDutyStatus = '';
							el.on = true;
						}
						if(data.attendanceRecord.leaveEarlyFlag == 0){
							el.offDutyStatus = '（正常打卡）';
						}else if(data.attendanceRecord.leaveEarlyFlag == 1){
							el.offDutyStatus = '（早退）';
						}else if(data.attendanceRecord.leaveEarlyFlag == 2){
							el.offDutyStatus = '';
							el.off = true;
						}
					}else{
						if(data.attendanceRecord.leaveFlag == 3){
							el.dutyType = '外勤';
						}else if(data.attendanceRecord.leaveFlag == 4){
							el.dutyType = '休息';
						}else{
							el.dutyType = '请假';
						}
						$('.classDuty').hide();
						el.onDutyTime = data.attendanceRecord.onDutyTime
						el.offDutyTime = data.attendanceRecord.offDutyTime
						el.onClockTime = data.attendanceRecord.clockInTime || ''
						el.offClockTime = data.attendanceRecord.clockOutTime || ''
					}

					
				}else{
					$('.that-day').hide();
					$('.classDuty').hide();
					el.dutyType = '未安排班次'
				}
			})
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