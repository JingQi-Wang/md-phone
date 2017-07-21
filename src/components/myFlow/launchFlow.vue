//launchFlow.vue
<template>
	<div class="launchFlow">	
		<!-- 内容 -->
		<div class="container">
			<div class="title-box">
				<img slot="icon" src="../../static/icon/left.svg" width="24" height="24" data="0" v-on:click="toPage">
				<div class="m-office">
					发起流程
				</div>
				<div class="m-icon">
				</div>
			</div>
			<div class="applicationModel">
				<p>常用(5)</p>
				<div class="applicationArea">
					<div class="applicationBar">
						<div class="applicationBlock">
							<img slot="icon" src="../../static/icon/fillCard.svg" width="60" height="58">
							<div class="icon-explain">补卡申请</div>
						</div>
						<div class="applicationBlock">
							<img slot="icon" src="../../static/icon/clockIcon.svg" width="60" height="58"  data="2" v-on:click="toPage">
							<div class="icon-explain">请假</div>
						</div>
						<div class="applicationBlock">
							<img slot="icon" src="../../static/icon/travel.svg" width="50" height="50">
							<div class="icon-explain">出差</div>
						</div>
					</div>
					<div class="applicationBar">
						<div class="applicationBlock">
							<img slot="icon" src="../../static/icon/goOut.svg" width="56" height="54">
							<div class="icon-explain">外出</div>
						</div>
						<div class="applicationBlock">
							<img slot="icon" src="../../static/icon/night.svg" width="53" height="51">
							<div class="icon-explain">夜勤请假</div>
						</div>
						<div class="applicationBlock hide">
							<img slot="icon" src="../../static/icon/night.svg" width="49" height="47">
							<div class="icon-explain">夜勤请假</div>
						</div>
					</div>
				</div>
			</div>
			<div class="applicationModel  otherApplication">
				<p>其他(3)</p>
				<div class="applicationArea">
					<div class="applicationBar">
						<div class="applicationBlock">
							<img slot="icon" src="../../static/icon/expense.svg" width="56" height="54">
							<div class="icon-explain">报销</div>
						</div>
						<div class="applicationBlock">
							<img slot="icon" src="../../static/icon/get.svg" width="56" height="54">
							<div class="icon-explain">打卡</div>
						</div>
						<div class="applicationBlock">
							<img slot="icon" src="../../static/icon/useCar.svg" width="54" height="52">
							<div class="icon-explain">出差</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<!-- script -->
<script>
export default {
	data() {
		return {
		}
	},
	methods: {
		toPage:function(event){
			var el = event.currentTarget;
			var a = $(el).attr('data');
			if (a == 0) {
				this.$router.push({path:'/myFlow'});
			}else if (a == 1) {
				this.$router.push({path:'/lookFlow'});
			}else if (a == 2) {
				this.$router.push({path:'/leaveFlow'});
			}
		}
	}
}

</script>