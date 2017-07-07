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
							
							<mt-datetime-picker
								v-model="pickerVisible"
								type="date"
								year-format="{value} 年"
								month-format="{value} 月"
								date-format="{value} 日">
							</mt-datetime-picker>
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
			pickerVisible:'today'
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
		openPicker() {
			this.$refs.picker.open();
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