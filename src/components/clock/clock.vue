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
							<p>冯良</p>
							<p class="group">考勤组：研发考勤组</p>
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
						<div class="duty bdcolor">
							<div class="status">
								<p>上班：</p>
								<p>未打卡</p>
								<span>(正常打卡)</span>
							</div>
							<div class="go-clock">
								<div class="go-click blue">
									<h2>上班打卡</h2>
									<h3>16:58:58</h3>
								</div>
								<p>已进入考勤WIFI：达美印染厂行政楼</p>
							</div>
						</div>
						<!-- off duty -->
						<div class="duty">
							<div class="status">
								<p>下班：</p>
								<p>未打卡</p>
								<span>(正常打卡)</span>
							</div>
							<div class="go-clock hidden">
								<div class="go-click blue">
									<h2>下班班打卡</h2>
									<h3>16:58:58</h3>
								</div>
								<p>已进入考勤WIFI：达美印染厂行政楼</p>
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
							<p>冯良</p>
							<p class="group">考勤组：研发考勤组</p>
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

export default {
	data() {
		return {
			selected:'clock',
			active:'clock-container',
			dateValue: new Date(),
			showDateValue:new Date().Format('yyyy-MM-dd'),
			dateMonthValue:new Date(),
			showDateMonthValue:new Date().Format('yyyy年MM月'),
			attendanceDays:'4天',//出勤天数
			restDays:'4天',//休息天数
			lateTimes:'1次',//迟到
			earlyTimes:'1次',//早退
			missTimes:'2次',//缺卡
			absentDays:'1次'//旷工
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
		selectMonthPicker:function(value){
			this.showDateMonthValue = value.Format('yyyy年MM月');
		},
		selectPicker:function(value){
			this.showDateValue = value.Format('yyyy-MM-dd');
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