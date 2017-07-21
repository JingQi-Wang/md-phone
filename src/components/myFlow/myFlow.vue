//myFlow.vue
<template>
	<div class="myFlow">	
		<!-- 内容 -->
		<div class="container">
			<div class="title-box">
				<img slot="icon" src="../../static/icon/left.svg" width="24" height="24" data="0" v-on:click="toPage">							
				<div class="m-office">
					我的流程
				</div>
				<div class="m-icon">
					<div class="office-icon">
						<img slot="icon" src="../../static/icon/refresh.svg" width="24" height="24" v-on:click="refresh">
					</div>
				</div>
			</div>
			<div class="logArea">
				<div class="flowArea">
					<h3>请假流程</h3>
					<div class="flowTitle">
						<div  class="flowTitle1">
							标题
						</div>
						<div  class="flowTitle2">
							把手机贵BNDVAUSDHVWYA
						</div>
					</div>
					<div class="flowStatus">
						<div  class="flowStatus1">
							审批状态
						</div>
						<div  class="flowStatus2">
							把手机贵BNDVAUSDHVWYA
						</div>
					</div>
					<div class="button" data="1" v-on:click="toPage">查看</div>
				</div>
			</div>
		</div>
		<div class="flowBottom" data="2" v-on:click="toPage">
			发起流程
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
				this.$router.push({path:'/home'});
			}else if (a == 1) {
				this.$router.push({path:'/lookFlow'});
			}else if (a == 2) {
				this.$router.push({path:'/launchFlow'});
			}
		},
		refresh:function(){
			window.location.reload()
		}
	}
}

</script>