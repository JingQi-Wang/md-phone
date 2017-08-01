//flowExamine.vue
<template>
	<div class="flowExamine">	
		<!-- 内容 -->
		<div class="container">
			<div class="title-box">
				<img slot="icon" src="../../static/icon/left.svg" width="24" height="24" data="0" v-on:click="toPage">							
				<div class="m-office">
					流程审批
				</div>
				<div class="m-icon">
				</div>
			</div>
			<div class="logArea">
				<div class="flowArea">
					<h3>请假流程</h3>
					<div class="flowTitle">
						<div  class="flowTitle1">
							申请人
						</div>
						<div  class="flowTitle2">
							冯良
						</div>
					</div>
					<div class="flowTitle">
						<div  class="flowTitle1">
							标题
						</div>
						<div  class="flowTitle2">
							今天出走,只为明日,能与荣耀同行!
						</div>
					</div>
					<div class="flowStatus">
						<div  class="flowStatus1">
							开始时间
						</div>
						<div  class="flowStatus2">
							2016-09-09 14:30
						</div>
					</div>
					<div class="flowStatus">
						<div  class="flowStatus1">
							结束时间
						</div>
						<div  class="flowStatus2">
							2016-09-09 14:30
						</div>
					</div>
					<div class="flowStatus">
						<div  class="flowStatus1">
							实际开始
						</div>
						<div  class="flowStatus2">
							打卡
						</div>
					</div>
					<div class="flowStatus">
						<div  class="flowStatus1">
							实际结束
						</div>
						<div  class="flowStatus2">
							打卡
						</div>
					</div>
					<div class="flowTitle">
						<div  class="flowTitle1">
							请假原因
						</div>
						<div  class="flowTitle2">
							今天出走,只为明日,能与荣耀同行!
						</div>
					</div>
				</div>
				<div class="flowArea">
					<h3>流程</h3>
					<div class="flowMould">
						<p>审批人</p>
						<div class="flowChart examine">
							<span class="flowPeople">人事主管</span>
							<img slot="icon" src="../../static/icon/arrow.svg" width="24" height="24" >
							<span class="flowPeople">办公室主任</span>
							<img slot="icon" src="../../static/icon/arrow.svg" width="24" height="24" >
							<span class="flowPeople">总经理</span>
						</div>
					</div>
					<div class="flowMould">
						<p>抄送人</p>
						<div class="flowChart">
							<span class="flowPeople">人事主管</span>
							<span class="flowPeople">办公室主任</span>
							<span class="flowPeople">总经理</span>
						</div>
					</div>
				</div>
				<div class="flowArea">
					<div class="flowStatus" style="border-top:none;">
						<div  class="flowStatus1">
							审批人
						</div>
						<div  class="flowStatus2">
							风声,思念铃
						</div>
					</div>
					<div class="flowStatus">
						<div  class="flowStatus1">
							审批意见
						</div>
						<div  class="flowStatus2">
							有点假的不好弄
						</div>
					</div>
					<div class="button">
						通过
					</div>
				</div>
			</div>
		</div>
		<div class="flowBottom" data="1" v-on:click="toPage">
			审批
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
		toPage:function(){
			var el = event.currentTarget;
			var a = $(el).attr('data');
			if(a == 0){//
				this.$router.push({path:'/examine'});
			}else if (a == 1) {
				this.$router.push({path:'/examining'});
			}
		}
	}
}
</script>