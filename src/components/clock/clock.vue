//clock.vue
<template>
	<div class="clock">
		<div class="mask" v-on:click="disappear">
							
		</div>
		<!-- outworkList -->
		
		<div class="outworkList">
			<h3>选择一条公出请假打卡</h3>
			<div class="listArea">
				<p v-for="list of lists" v-on:click="Listclock" v-bind:id="list.outBusinessRecordId
">{{ list.title }}<span>{{(list.startTimeStr).split(' ')[0]}}</span></p>
			</div>
			<div class="loading">
				打卡中
				<div>
					<mt-spinner type="snake" color="#26a2ff"></mt-spinner>
				</div>
			</div>
		</div>
		<!-- tab-container -->
		<mt-tab-container v-model="active">
			<mt-tab-container-item id="clock-container">
				<div class="container">
					<div class="title-box">
						<img slot="icon" src="../../static/icon/left.svg" width="24" height="24" data="0" v-on:click="toPage">		
						<div class="m-office">
							考勤打卡
						</div>
						<div class="m-icon">
							<!-- <div class="office-icon">
								<img slot="icon" src="../../static/icon/ring.svg" width="24" height="24">
							</div> -->
						</div>
					</div>
					<!-- clock base html -->
					<div class="clock-group">
						<div class="user">
							<p>{{ userName }}</p>
							<p class="group">考勤组：{{ attendanceGroupName }}</p>
						</div>
						<div class="time-select">
							<p data="ymd" v-on:click="openPicker($event)">{{ showDateValue }}</p>							
						</div>
					</div>
					<!-- remind -->
					<div class="remind">
						<p>
							{{ remind }}
							<mt-button type="default" size="small" v-on:click="outworkClock">公出打卡</mt-button>
						</p>
					</div>
					<!-- clock box -->
					<div class="clock-box">
						<!-- on duty -->
						<div class="duty" id="on">
							<div class="status">
								<p>上班：{{ onClockTime }} &nbsp;</p>
								<p>(上班时间 {{ onDutyTime }}) &nbsp;</p>
								<span class="font-orange">{{ onDutyStatus }}</span>
							</div>
							<div class="go-clock">
								<div class="go-click blue" v-on:click="clock">
									<h2>{{ serverTime }}</h2>
									<h3>{{ dutyStatus }}</h3>
								</div>
								<p>{{ wifiName }}</p>
							</div>
						</div>
						<!-- off duty -->
						<div class="duty" id="off">
							<div class="status">
								<p>下班：{{ offClockTime }} &nbsp;</p>
								<p>(下班时间 {{ offDutyTime }}) &nbsp;</p>
								<span class="font-orange">{{ offDutyStatus }}</span>
							</div>
							<div class="go-clock">
								<div class="go-click blue" v-on:click="clock">
									<h2>{{ serverTime }}</h2>
									<h3>{{ dutyStatus }}</h3>
								</div>
								<p>{{ wifiName }}</p>
							</div>
						</div>
					</div>
				</div>
			</mt-tab-container-item>
			<mt-tab-container-item id="statistics-container">
				<div class="container">
					<div class="title-box">
						<img slot="icon" src="../../static/icon/left.svg" width="24" height="24" data="0" v-on:click="toPage">							
						<div class="m-office">
							考勤月度汇总
						</div>
						<div class="m-icon">
							<!-- <div class="office-icon">
								<img slot="icon" src="../../static/icon/ring.svg" width="24" height="24">
							</div> -->
						</div>
					</div>
					<!-- clock base html -->
					<div class="clock-group">
						<div class="user">
							<p>{{ userName }}</p>
							<p class="group">考勤组：{{ attendanceGroupName }}</p>
						</div>
						<div class="time-select">
							<p data="ym" v-on:click="openPicker($event)">{{ showDateMonthValue }}</p>
						</div>
					</div>
					<!-- link to -->
					<div class="link-to">
						<router-link class="link-explain" to="/clockTotalExplain">统计说明</router-link>
						<router-link class="link-calendar" to="/clockTotal?">打卡月历</router-link>
						<img slot="icon" src="../../static/icon/clockIcon.svg" width="26" height="26">
					</div>
					<!-- total -->
					<div>
						<mt-cell title="出勤天数" v-bind:value="attendanceDays"></mt-cell>
						<mt-cell title="休息天数" v-bind:value="restDays"></mt-cell>
						<mt-cell title="迟到" v-bind:value="lateTimes"></mt-cell>
						<mt-cell title="早退" v-bind:value="earlyTimes"></mt-cell>
						<mt-cell title="缺卡" v-bind:value="missTimes"></mt-cell>
						<mt-cell title="旷工" v-bind:value="absentDays"></mt-cell>
					</div>
				</div>
			</mt-tab-container-item>
		</mt-tab-container>
		<!-- tabbar -->
		<mt-tabbar v-model="selected" fixed>
			<mt-tab-item id="clock">
				<img slot="icon" src="../../static/icon/clocko.svg" class="clock">
				打卡
			</mt-tab-item>
			<mt-tab-item id="statistics">
				<img slot="icon" src="../../static/icon/statistics.svg" class="statistics">
				统计
			</mt-tab-item>
		</mt-tabbar>
		<mt-datetime-picker
			ref="picker"
			type="date"
			v-model="dateValue"
			v-on:confirm="selectPicker">
		</mt-datetime-picker>
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
/* FOOTER ICON INPUT */
import clockSrc from '../../static/icon/clock.svg'
import clockSrco from '../../static/icon/clocko.svg'
import statisticsSrc from '../../static/icon/statistics.svg'
import statisticsSrco from '../../static/icon/statisticso.svg'
import { Toast } from 'mint-ui';
import { Spinner } from 'mint-ui';

export default {
	data() {
		return {
			remind:'',
			isLeave:null,
			wifiValue:'',
			wifiId:'',//wifiid
			wifiName:'',//wifi名字
			serverTime:'',//时间
			dutyStatus:'',//状态
			onDutyTime:'',//上班时间
			offDutyTime:'',//下班时间
			onClockTime:'未打卡',//上班打卡时间
			offClockTime:'未打卡',//下班打卡时间
			onDutyStatus:'',//上班状态
			offDutyStatus:'',//下班状态
			selected:'',
			active:'',
			userName:this.$user.userName,
			attendanceGroupName:this.$user.attendanceGroupName,
			dateValue: new Date(),
			showDateValue:new Date().Format('yyyy-MM-dd'),
			dateMonthValue:new Date(),
			showDateMonthValue:new Date().Format('yyyy年MM月'),
			attendanceDays:'0天',//出勤天数
			restDays:'0天',//休息天数
			lateTimes:'0次',//迟到
			earlyTimes:'0次',//早退
			missTimes:'0次',//缺卡
			absentDays:'0次',//旷工
			lists:[]
		}
	},
	mounted () {
		this.getMyClockMonthForm();
		this.getClockState();
		this.$user.mouth = this.dateMonthValue
		if(this.GetQueryString() == 1){
			this.selected = 'clock'
			this.active = 'clock-container'
		}else if(this.GetQueryString() == 2){
			this.selected = 'statistics'
			this.active = 'statistics-container'
		}
	},
	watch: {
		selected: function (val) {
			// 这里就可以通过 val 的值变更来确定
			if(val == 'clock'){
				this.active = 'clock-container'				
			}else if(val == 'statistics'){
				this.active = 'statistics-container'
			}
			//changeImg
			this.changeImg(val);
		}
	},
	methods: {
		GetQueryString:function (){
			var str=location.href; //取得整个地址栏
			var num=str.indexOf("?")
			return str.substring(num + 7,num + 8);
		},
		selectMonthPicker:function(value){
			this.showDateMonthValue = value.Format('yyyy年MM月');
			this.$user.mouth = value;
			this.getMyClockMonthForm();
		},
		getMyClockMonthForm:function(){
			var el = this;
			el.$index.ajax(this, '/phClock/getMyClockMonthForm.ph', {balanceMonth:el.dateMonthValue.Format('yyyy-MM')}, function(data){
				// 成功回调
				if(data.clockMonthBalanceForm){
					var a = data.clockMonthBalanceForm;
					el.attendanceDays = a.attendanceDays +'天';
					el.restDays = a.restDays +'天';
					el.lateTimes = a.lateTimes +'次';
					el.earlyTimes = a.earlyTimes +'次';
					el.missTimes = a.missTimes +'次';
					el.absentDays = a.absentDays +'次';
				}else{
					el.attendanceDays = '0天';
					el.restDays = '0天';
					el.lateTimes = '0次';
					el.earlyTimes = '0次';
					el.missTimes = '0次';
					el.absentDays = '0次';
				}		
			})
		},
		selectPicker:function(value){
			var el = this;
			el.showDateValue = value.Format('yyyy-MM-dd');
			if(el.showDateValue == new Date().Format('yyyy-MM-dd')){
				$('#on').show()
				$('#off').show()
				this.getClockState();
			}else{
				$('#on .go-clock').hide();
				$('#off .go-clock').hide()
				$('#on').removeClass('bdcolor');
				$('#off').removeClass('bdcolor');
				el.$index.ajax(this, '/phClock/getMyClockDayDetail.ph', {recordDateStr:el.dateValue.Format('yyyy-MM-dd')}, function(data){
					// 成功回调
					var obj = data.attendanceRecord;
					if(!obj){
						$('#on').hide()
						$('#off').hide()
						el.remind = '当天没有打卡记录！'
						el.onDutyTime = ''
						el.offDutyTime = ''
						el.onClockTime = ''
						el.offClockTime = ''
						el.onDutyStatus = ''
						el.offDutyStatus = ''
					}else{
						$('#on').show()
						$('#off').show()
						if(obj.leaveFlag == 0){
							el.remind = '当日应上班！'
							el.onDutyTime = obj.onDutyTime || ''
							el.offDutyTime = obj.offDutyTime || ''
							el.onClockTime = obj.clockInTime || '缺卡'
							el.offClockTime = obj.clockOutTime || '缺卡'
							if(obj.clockInTime > obj.onDutyTime){
								el.onDutyStatus = '迟到'
							}else{
								el.onDutyStatus = ''
							};
							if(obj.clockOutTime < obj.offDutyTime){
								el.offDutyStatus = '早退'
							}else{
								el.offDutyStatus = ''
							}
						}else if(obj.leaveFlag == 4){
							el.remind = '当日休息哦！'
							el.onDutyTime = obj.onDutyTime || ''
							el.offDutyTime = obj.offDutyTime || ''
							el.onClockTime = obj.clockInTime || ''
							el.offClockTime = obj.clockOutTime || ''
						}else if(obj.leaveFlag == 3){
							el.remind = '当日出了外勤哦！'
							el.onDutyTime = obj.onDutyTime || ''
							el.offDutyTime = obj.offDutyTime || ''
							el.onClockTime = obj.clockInTime || ''
							el.offClockTime = obj.clockOutTime || ''
						}else{
							el.remind = '当日请假了哦！'
							el.onDutyTime = obj.onDutyTime || ''
							el.offDutyTime = obj.offDutyTime || ''
							el.onClockTime = obj.clockInTime || ''
							el.offClockTime = obj.clockOutTime || ''
						}

					}
				})
			}			
		},
		clock:function(){
			var el = this;
			var data = '';
			if(el.isLeave == 1){				
				data = {
					outLocation:el.wifiId,
					outAddress:el.wifiValue
				}
			}else if(el.isLeave == 0){
				data = {
					wifiId:el.wifiId,
					wifiName:el.wifiValue
				}
			}
			el.$index.ajax(this, '/phClock/clock.ph', data, function(data){
				el.getClockState()
			})
		},
		getClockState:function(){
			var el = this;
			var ips = ''
			if(el.$user.phoneType == 1){
				ips = returnCitySN['cip'];
				// ips = '183.129110.238'
			}else if(el.$user.phoneType == 2){
				ips = returnCitySN['cip'];
				// ips = returnCitySN['cip'].substring(0,returnCitySN['cip'].lastIndexOf('.'));
			}
			el.$index.ajax(this, '/phClock/getMyClockState.ph', {
				phoneType : el.$user.phoneType,
				ips : ips
			}, function(data){
				// 成功回调
				var obj = data;
				//若wifiId和name为空，则外勤打卡，否则正常打卡
				if(obj.wifiName && obj.wifiId){
					el.isLeave = 0;					
					el.wifiName = '已进入考勤WIFI：' + obj.wifiName;
					el.wifiValue = obj.wifiName;
					el.wifiId = obj.wifiId;
					$('.go-click').removeClass('orange');
				}
				if(obj.attendanceToday){
					var H = obj.serverTimeStr.substr(0,2);
					var M = obj.serverTimeStr.substr(3,2);
					var S = obj.serverTimeStr.substr(6,2);
					el.serverTime = obj.serverTimeStr;
					el.onDutyTime = obj.attendanceToday.onDutyTime;
					el.offDutyTime = obj.attendanceToday.offDutyTime;
					clearInterval(time);
					var time = setInterval(function(){
						M = Number(M);
						H = Number(H);//强制转数字
						S++;							
						if(S > 59){
							S = 0;				
							M++;
							if(M > 59){ 
								M = 0;						
								H++;
								if(H > 23){H = 0};
							}
						}
						if(S < 10){
							S = '0' + S;
						};
						if(M < 10){
							M = '0' + M;
						};
						if(H < 10){
							H = '0' + H
						};
						var html = H + ':' + M + ':' + S;
						el.serverTime = html;
					},1000);
					if(!obj.attendanceToday.clockInTime && !obj.attendanceToday.clockOutTime){
						$('#on').addClass('bdcolor');
						$('#on .go-clock').show();
						el.remind = '一日之计在于晨，新的一天新的开始！'
						if(obj.serverTimeStr < obj.attendanceToday.onDutyTime ){
							el.dutyStatus = '上班打卡';
						}else if(obj.serverTimeStr > obj.attendanceToday.offDutyTime){
							$('#on .go-clock').hide();
							$('#on').removeClass('bdcolor');
							$('#off .go-clock').show();
							$('#off').addClass('bdcolor');
							el.dutyStatus = '下班打卡';
						}else{
							$('#on .go-click').addClass('orange')							
							el.dutyStatus = '迟到打卡';
						}
					}
					if(obj.attendanceToday.clockInTime){
						$('#on .go-clock').hide();
						$('#off .go-clock').show();
						$('#on').removeClass('bdcolor');
						$('#off').addClass('bdcolor');
						el.remind = '努力工作，才有未来！'					
						el.onClockTime = obj.attendanceToday.clockInTime;
						el.dutyStatus = '下班打卡';
						
						if(obj.attendanceToday.clockInTime > obj.attendanceToday.onDutyTime){
							el.onDutyStatus = '迟到'
						};
					};						
					if(obj.attendanceToday.clockOutTime){
						$('#off .go-clock').show();
						$('#off').addClass('bdcolor');

						el.remind = '下班了，工作了一天早点休息！'
						el.offClockTime = obj.attendanceToday.clockOutTime;
						el.dutyStatus = '更新打卡';
						
						if(!obj.attendanceToday.clockInTime){
							el.onClockTime = '缺卡'
						}
						if(obj.attendanceToday.clockOutTime < obj.attendanceToday.offDutyTime){
							el.offDutyStatus = '早退'
						}
					}

					// 若是外勤
					if(!obj.wifiName && !obj.wifiId){
						el.isLeave = 1;
						el.dutyStatus = '外勤打卡';
						$('.go-click').addClass('orange');
						el.wifiName = '定位中';
						var geolocation = new BMap.Geolocation();    
						geolocation.getCurrentPosition(function(r){
							var mk = new BMap.Marker(r.point);    
							var currentLat = r.point.lat;
							var currentLon = r.point.lng;

							var pt = new BMap.Point(currentLon, currentLat);
							var geoc = new BMap.Geocoder();
							geoc.getLocation(pt, function (rs) {
								var addComp = rs.addressComponents;
								var city = addComp.city;
								var addComp = rs.addressComponents;
								var texts = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber ;
								el.wifiName = '当前位置：' + texts
								el.wifiValue = texts
								el.wifiId = currentLon + "," + currentLat
							});
						})
						
					}

				}else{
					Toast({
						message: '今日加入考勤组,请您明日开始打卡!',
						position: 'center',
						duration: 2000
					});
				}
			})
		},
		openPicker:function(event){
			var el = event.currentTarget;
			var a = $(el).attr('data');
			if(a == 'ymd'){
				this.$refs.picker.open();
			}else if(a == 'ym'){
				this.$refs.monthPicker.open();
				$('.picker-slot').eq(5).hide();//备注：不能往其之前加日期选择器了
			}
		},
		toPage:function(){
			var el = event.currentTarget;
			var a = $(el).attr('data');
			if(a == 0){//本组件data属性设置为0的，页面前往home
				this.$router.push({path:'/'});
			}
		},
		changeImg:function(val){
			if(val == 'clock'){
				$('.'+ val +'').attr('src',clockSrco);
				$('.statistics').attr('src',statisticsSrc);
			}else if(val == 'statistics'){
				$('.'+ val +'').attr('src',statisticsSrco);
				$('.clock').attr('src',clockSrc);
			}
		},
		outworkClock:function(){
			var el = this;
			el.$index.ajax(this, '/phClock/selectOutBusinessRecord.ph',{timeFlag:'1'},function(data){
				el.lists = data.rows;
				var wx = $(window).outerWidth();
				var wy = $(window).outerHeight();
				$('.mask').css({
					'width':wx,
					'height':wy
				});
				$('.outworkList').css({
					'width':wx*.8,
					'height':wy*.5,
					'top':wy*.25
				});
				$('.outworkList .listArea').css({
					'height':wy*.5-36.8
				});
				$('.outworkList .loading').css({
					'height':(wy*.5-36.8)*2/3,
					'padding-top':(wy*.5-36.8)/3
				})
				$('.outworkList').show();
				$('.mask').show();
			});
			
		},
		Listclock:function(event){
			var el = this;
			var currentLat,currentLon;
			var texts;
			var ele = event.currentTarget;
			var outBusinessRecordId = $(ele).attr('id');
			var geolocation = new BMap.Geolocation();   
			$('.outworkList .listArea').hide();
			$('.outworkList .loading').show();

			geolocation.getCurrentPosition(function(r){
				var mk = new BMap.Marker(r.point);    
				currentLat = r.point.lat;
				currentLon = r.point.lng;

				var pt = new BMap.Point(currentLon, currentLat);
				var geoc = new BMap.Geocoder();
				geoc.getLocation(pt, function (rs) {
					var addComp = rs.addressComponents;
					var city = addComp.city;
					var addComp = rs.addressComponents;
					texts = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber ;
					var info = {
						outAddress:texts,
						outLocation:currentLon+','+currentLat,
						userId:el.$user.userId,
						outBusinessRecordId:outBusinessRecordId
					}
					el.$index.ajax(this, '/phClock/updateOutBusinessRecord.ph',info,function(data){
						$('.outworkList').hide();
						if (data == 200) {
							Toast({
							  message: '公出打卡成功',
							  duration: 2000
							});
						}else{
							Toast({
							  message: '公出打卡失败',
							  duration: 2000
							});
						}
						$('.mask').hide(); 
					});
				});
			})

		},
		disappear:function(event){
			var el = event.currentTarget;
			$(el).hide();
			$('.outworkList').hide();
		}
	}
}
</script>