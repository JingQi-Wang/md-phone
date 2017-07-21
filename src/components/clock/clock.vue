//clock.vue
<template>
	<div class="clock">
		
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
							<p data="ymd" v-on:click="openPicker($event)">{{ showDateValue }}</p>							
						</div>
					</div>
					<!-- remind -->
					<div class="remind">
						<p>下班了，工作了一天早点休息！</p>
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
								<p>已进入考勤WIFI：{{ wifiName }}</p>
							</div>
						</div>
						<!-- off duty -->
						<div class="duty" id="off">
							<div class="status">
								<p>下班：{{ offClockTime }} &nbsp;</p>
								<p>(下班时间 {{ offDutyTime }})</p>
								<span class="font-orange">{{ offDutyStatus }}</span>
							</div>
							<div class="go-clock">
								<div class="go-click blue" v-on:click="clock">
									<h2>{{ serverTime }}</h2>
									<h3>{{ dutyStatus }}</h3>
								</div>
								<p>已进入考勤WIFI：{{ wifiName }}</p>
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
							<p data="ym" v-on:click="openPicker($event)">{{ showDateMonthValue }}</p>
						</div>
					</div>
					<!-- link to -->
					<div class="link-to">
						<router-link class="link-explain" to="/clockTotalExplain">统计说明</router-link>
						<router-link class="link-calendar" to="/clockTotal">打卡月历</router-link>
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

export default {
	data() {
		return {
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
			selected:'clock',
			active:'clock-container',
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
			absentDays:'0次'//旷工
		}
	},
	mounted () {
		this.getMyClockMonthForm();
		this.getClockState();
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
		selectMonthPicker:function(value){
			this.showDateMonthValue = value.Format('yyyy年MM月');
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
				this.getClockState();
			}else{
				$('#on .go-clock').hide();
				$('#off .go-clock').hide()
				$('#on').removeClass('bdcolor');
				$('#off').removeClass('bdcolor');
				el.$index.ajax(this, '/phClock/getMyClockDayDetail.ph', {recordDateStr:el.dateValue.Format('yyyy-MM-dd')}, function(data){
					// 成功回调
					console.log(data)					
					var obj = data.attendanceRecord;
					if(!obj){
						el.onDutyTime = ''
						el.offDutyTime = ''
						el.onClockTime = ''
						el.offClockTime = ''
						el.onDutyStatus = ''
						el.offDutyStatus = ''
					}else{
						if(obj.leaveFlag == 0){	
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

						}

					}
				})
			}			
		},
		clock:function(){
			var el = this;
			var data = '';
			if(!el.wifiId){
				alert('外勤打卡尚未开通')
				data = null 
			}else{
				var data = {
					wifiId:el.wifiId,
					wifiName:el.wifiName
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
			}else if(el.$user.phoneType == 2){
				ips = returnCitySN['cip'].substring(0,returnCitySN['cip'].lastIndexOf('.'));
			}
			el.$index.ajax(this, '/phClock/getMyClockState.ph', {
				phoneType : el.$user.phoneType,
				ips : ips
			}, function(data){
				// 成功回调
				var obj = data;
				el.wifiName = obj.wifiName;
				el.wifiId = obj.wifiId;
				if(obj.attendanceToday){
					var H = obj.serverTimeStr.substr(0,2);
					var M = obj.serverTimeStr.substr(3,2);
					var S = obj.serverTimeStr.substr(6,2);
					el.serverTime = obj.serverTimeStr;
					el.onDutyTime = obj.attendanceToday.onDutyTime;
					el.offDutyTime = obj.attendanceToday.offDutyTime;
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
						$('#off .go-clock').show();
						$('#off').addClass('bdcolor');					

						el.onClockTime = obj.attendanceToday.clockInTime;
						el.dutyStatus = '下班打卡';
						
						if(obj.attendanceToday.clockInTime > obj.attendanceToday.onDutyTime){
							el.onDutyStatus = '迟到'
						};
					};						
					if(obj.attendanceToday.clockOutTime){
						$('#off .go-clock').show();
						$('#off').addClass('bdcolor');

						el.offClockTime = obj.attendanceToday.clockOutTime;
						el.dutyStatus = '更新打卡';
						
						if(obj.attendanceToday.clockOutTime < obj.attendanceToday.offDutyTime){
							el.onDutyStatus = '早退'
						}
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
				this.$router.push({path:'/home'});
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
		}
	}
}
</script>