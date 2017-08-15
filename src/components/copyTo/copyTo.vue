<template>
	<div class="copyTo">	
		<!-- 内容 -->
		<div class="container">
			<div class="title-box">
				<img slot="icon" src="../../static/icon/left.svg" width="24" height="24" data="0" v-on:click="toPage">							
				<div class="m-office">
					抄送流程
				</div>
				<div class="m-icon">
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
					<span class="go-to" data="1" v-on:click="toPage"  v-bind:id="item.processRecordId">查看详情</span>
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import arrow from '../../static/icon/arrow.svg';
import { Toast } from 'mint-ui';
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
		that.$index.ajax(that,'/phMyProcess/getCopyToProcessList.ph',null,function(data){
			data = $.parseJSON(data);
			that.items = data.rows;
		});
	},
	methods: {
		toPage:function(event){
			var el = event.currentTarget;
			var a = $(el).attr('data');
			if(a == 0){//
				this.$router.push({path:'/'});
			}else if(a == 1){
				var info = {
					processRecordId:$(el).attr('id')
				}
				$.extend(this.$leaveType,info);
				this.$router.push({path:'/lookCopyTo'});
			}
		}
	}
}
</script>