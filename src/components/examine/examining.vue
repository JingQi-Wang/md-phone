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
					<!-- <div class="office-icon">
						<img slot="icon" src="../../static/icon/ring.svg" width="24" height="24">
					</div> -->
				</div>
			</div>
			<div class="examiningBox">
				<div class="examiningBlock">
					<h1>审批意见</h1>
					<textarea v-model="executorIdea">
					</textarea>
				</div>
			</div>
		</div>
		<div class="workLogBottom">
			<div class="myLog" data="0" v-on:click="examine">
				通过
			</div>
			<div class="writeLog" data="1" v-on:click="examine">
				驳回
			</div>
		</div>	
	</div>
</template>


<!-- script -->
<script>
import { Toast } from 'mint-ui';
export default {
	data() {
		return {
			executorIdea:''
		}
	},
	methods: {
		toPage:function(event){
			var el = event.currentTarget;
			var a = $(el).attr('data');
			if(a == 0){//
				this.$router.push({path:'/flowExamine'});
			}
		},
		examine:function(event){
			var that = this;
			var el = event.currentTarget;
			var a = $(el).attr('data');
			var examineStatus ;
			if(that.executorIdea == '' || that.executorIdea == null){
				Toast({
					message: '审批意见不能为空',
					duration: 2000
				});
			}else{
				if(a == 0){
					examineStatus = '2';
				}else if (a == 1) {
					examineStatus = '3';
				}
				var info = {
					examineStatus:examineStatus,
					executorIdea:that.executorIdea,
					taskId:that.$leaveType.taskId
				}
				that.$index.ajax(that,'/phMyProcess/examineTask.ph',info,function(data){
					Toast({
						message: data,
						duration: 2000
					});
					that.$router.push({path:'/examine'});
				});
			}			
		}
	}
}
</script>