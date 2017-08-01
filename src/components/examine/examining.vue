/examining.vue
<template>
	<div class="examining">	
		<!-- 内容 -->
		<div class="container">
			<div class="title-box">
				<img slot="icon" src="../../static/icon/left.svg" width="24" height="24" data="0" v-on:click="toPage">							
				<div class="m-office">
					审批流程
				</div>
				<div class="m-icon">
					<div class="office-icon">
						<img slot="icon" src="../../static/icon/ring.svg" width="24" height="24">
					</div>
				</div>
			</div>
			<div class="examiningBox">
				<div class="examiningBlock">
					<h1>审批意见</h1>
					<textarea>
					</textarea>
				</div>
			</div>
		</div>
		<div class="workLogBottom">
			<div class="myLog">
				通过
			</div>
			<div class="writeLog">
				驳回
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
		toPage:function(){
			var el = event.currentTarget;
			var a = $(el).attr('data');
			if(a == 0){//
				this.$router.push({path:'/flowExamine'});
			}else if (a == 1) {
				this.$router.push({path:'/examining'});
			}
		}
	}
}
</script>