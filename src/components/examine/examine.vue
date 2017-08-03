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
				<div class="message-item" v-for="item of items">
					<div class="message-detail">
						<h2>系统消息&nbsp;&nbsp; {{ item.createTime }}</h2>
						<p>{{ item.title }}</p>
						<div>
							<img slot="icon" src="../../static/icon/flowIcon.svg" width="24" height="24">
							<span>流程任务通知</span>
						</div>
					</div>
					<span class="go-to" data="1" v-on:click="toPage" v-if="item.executeStatus == 1" v-bind:id="item.processRecordId">前往处理</span>
					<span class="go-to" v-else>已处理</span>
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
			items:[]
		}
	},
	mounted () {
		var info = {
			userId : this.$user.userId,
			userName : this.$user.userName
		}
		var that = this;
		that.$index.ajax(that,'/phMyProcess/getWaitExamineProcess.ph',info,function(data){
			that.items = data.rows;
		});
	},
	methods: {
		toPage:function(){
			var el = event.currentTarget;
			var a = $(el).attr('data');
			if(a == 0){//本组件data属性设置为0的，页面前往home
				this.$router.push({path:'/'});
			}else if (a == 1) {
				var info = {
					processRecordId:$(el).attr('id')
				}
				$.extend(this.$leaveType,info);
				this.$router.push({path:'/flowExamine'});
			}
		},
		refresh:function(){
			window.location.reload()
		}
	}	
}
</script>