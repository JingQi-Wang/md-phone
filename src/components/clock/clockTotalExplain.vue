//clockTotalExplain.vue
<template>
	<div class="clock-total-explain">
		<div class="container">
			<div class="title-box">
				<img slot="icon" src="../../static/icon/left.svg" width="24" height="24" data="0" v-on:click="toPage">							
				<div class="m-office">
					考勤汇总统计说明
				</div>
				<div class="m-icon">
					<div class="office-icon">
						<img slot="icon" src="../../static/icon/ring.svg" width="24" height="24">
					</div>
				</div>
			</div>
			<!-- explain -->
			<div class="explain">
				<h2>出勤天数：</h2>
				<p>员工的出勤天数需要根据考勤组进行设定，考勤组的设定在OA系统PC端进行。</p>
				<h2>休息天数：</h2>
				<p>员工的出勤天数需要根据考勤组进行设定，考勤组的设定在OA系统PC端进行。</p>
				<h2>迟到早退：</h2>
				<p>未在规定时间之前打卡则视为迟到打卡，提前下班打卡视为早退打卡。</p>
				<h2>缺卡旷工：</h2>
				<p>在正常的工作日中，未打卡则视为缺卡，如果上下班均未打卡则为旷工。</p>
			</div>
		</div>
	
	</div>
</template>
<!-- SCRIPT -->
<script>
export default {
	data() {
		return {
			
		}
	},
	watch: {
		
	},
	methods: {
		toPage:function(){
			this.$router.push({path:'/clock'});
		}
	}
}
</script>