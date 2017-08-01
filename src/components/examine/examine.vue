//examine.vue
<template>
	<div class="examine">	
		<!-- 内容 -->
		<div class="container">
			<div class="title-box">
				<img slot="icon" src="../../static/icon/left.svg" width="24" height="24" data="0" v-on:click="toPage">							
				<div class="m-office">
					待审流程
				</div>
				<div class="m-icon">
					<div class="office-icon">
						<img slot="icon" src="../../static/icon/refresh.svg" width="24" height="24" v-on:click="refresh">
					</div>
				</div>
			</div>
			<div class="message-box">
				<div class="message-item">
					<div class="message-detail">
						<h2>14:00&nbsp;&nbsp;系统消息</h2>
						<p>梦德、冯良发起的物品领用申请需要您进行审批</p>
						<div>
							<img slot="icon" src="../../static/icon/flowIcon.svg" width="24" height="24">
							<span>流程任务通知</span>
						</div>
					</div>
					<span class="go-to" data="1" v-on:click="toPage">前往处理</span>
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
		toPage:function(){
			var el = event.currentTarget;
			var a = $(el).attr('data');
			if(a == 0){//本组件data属性设置为0的，页面前往home
				this.$router.push({path:'/home'});
			}else if (a == 1) {
				this.$router.push({path:'/flowExamine'});
			}
		}
	},
	refresh:function(){
		window.location.reload()
	}
}
</script>