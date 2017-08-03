//lookFlow.vue
<template>
	<div class="lookFlow">	
		<!-- 内容 -->
		<div class="container">
			<div class="title-box">
				<img slot="icon" src="../../static/icon/left.svg" width="24" height="24" data="0" v-on:click="toPage">							
				<div class="m-office">
					查看流程
				</div>
				<div class="m-icon">
					<div class="office-icon">
						<img slot="icon" src="../../static/icon/refresh.svg" width="24" height="24" v-on:click="refresh">
					</div>
				</div>
			</div>
			<div class="logArea">
				<div class="flowArea">
					<h3>{{ leaveType }}</h3>
					<div class="flowTitle">
						<div  class="flowTitle1">
							申请人
						</div>
						<div  class="flowTitle2">
							{{ userName }}
						</div>
					</div>
					<div class="flowTitle">
						<div  class="flowTitle1">
							标题
						</div>
						<div  class="flowTitle2">
							{{ title }}
						</div>
					</div>
					<div class="flowStatus">
						<div  class="flowStatus1">
							开始时间
						</div>
						<div  class="flowStatus2">
							{{ startTime }}
						</div>
					</div>
					<div class="flowStatus">
						<div  class="flowStatus1">
							结束时间
						</div>
						<div  class="flowStatus2">
							{{ endTime }}
						</div>
					</div>
					<div class="flowTitle">
						<div  class="flowTitle1">
							请假原因
						</div>
						<div  class="flowTitle2">
							{{ reason }}
						</div>
					</div>
				</div>
				<div class="flowArea">
					<h3>流程</h3>
					<div class="flowMould">
						<p>审批人</p>
						<div class="flowChart examine">
						</div>
					</div>
					<div class="flowMould">
						<p>抄送人</p>
						<div class="flowChart copyTo">
						</div>
					</div>
				</div>
				<div class="flowArea" v-for="item of items">
					<div class="flowStatus" style="border-top:none;">
						<div  class="flowStatus1">
							审批人
						</div>
						<div  class="flowStatus2">
							{{ item.executorName }}
						</div>
					</div>
					<div class="flowStatus">
						<div  class="flowStatus1">
							审批意见
						</div>
						<div  class="flowStatus2">
							{{ item.executorIdea }}
						</div>
					</div>
					<div class="button examine-btn" v-if="item.examineStatus == 1">
						待审
					</div>
					<div class="button" v-if="item.examineStatus == 2">
						通过
					</div>
					<div class="button reject-btn" v-if="item.examineStatus == 3">
						驳回
					</div>
					<div class="button reject-btn" v-if="item.examineStatus == 4">
						撤回
					</div>
				</div>
			</div>
		</div>
		<div class="flowBottom" v-on:click="ding">
			叮一下
		</div>
	</div>
</template>

<!-- script -->
<script>
import arrow from '../../static/icon/arrow.svg';
import { Toast } from 'mint-ui';
export default {
	data() {
		return {
			items:[],
			leaveType:'',
			userName:'',
			title:'',
			startTime:'',
			endTime:'',
			reason:''
		}
	},
	mounted () {
		var that = this;
		var info = {
			processRecordId:this.$leaveType.processRecordId
		}
		that.$index.ajax(that,'/phMyRelated/getProcessFormMessage.ph',info,function(data){
			data = $.parseJSON(data);
			that.leaveType = data.leaveType;
			that.userName = data.userName;
			that.title = data.title;
			that.startTime = data.startTime;
			that.endTime = data.endTime;
			that.reason = data.reason;
		});
		that.$index.ajax(that,'/phMyRelated/getProcessExecutor.ph',info,function(data){
			//data = $.parseJSON(data);
			if (data['excuteUserHead']) {
				var excuteUserHead = data['excuteUserHead'];
				var str = '';
				for (var i = excuteUserHead; i ; i = i.nextTask) {
				 	str += '<span class="flowPeople"'+i.executorId+'>'+i.executorName+'</span>';
				 	str += '<img slot="icon" src="'+arrow+'" width="24" height="24" >'
				}; 
				$('.lookFlow .flowArea .examine').append(str);
				$('.lookFlow .flowArea .examine img:last').remove();
			}
			if (data['copyToUsers']) {
				var copyToUsers = data['copyToUsers'];
				var str = '';
				for (var i = 0; i < data['copyToUsers'].length ; i ++ ) {
				 	str += '<span class="flowPeople"'+data['copyToUsers'][i].copyToId+'>'+i.data['copyToUsers'][i].copyToName+'</span>';
				}; 
				$('.lookFlow .flowArea .copyTo').append(str);
			}
		});
		that.$index.ajax(that,'/phMyProcess/getExamineIdea.ph',info,function(data){
			if (data.length > 0 ) {
				that.items = data;
				var status = data[data.length-1].examineStatus;
				if (status == '1') {
					$('.lookFlow .flowBottom').attr('status','1');
					$('.lookFlow .flowBottom').text('叮一下');
				}else if(status == '2'){
					$('.lookFlow .flowBottom').attr('status','2');
					$('.lookFlow .flowBottom').text('已通过');
				}else if(status == '3'){
					$('.lookFlow .flowBottom').attr('status','3');
					$('.lookFlow .flowBottom').addClass('reject-flowBottom');
					$('.lookFlow .flowBottom').text('已被驳回');
				}else if(status == '4'){
					$('.lookFlow .flowBottom').attr('status','4');
					$('.lookFlow .flowBottom').addClass('reject-flowBottom');
					$('.lookFlow .flowBottom').text('已被撤回');
				}
			}else{
				$('.lookFlow .flowBottom').attr('status','1');
				$('.lookFlow .flowBottom').text('叮一下');
			}
		});
	},
	methods: {
		toPage:function(event){
			var el = event.currentTarget;
			var a = $(el).attr('data');
			if (a == 0) {
				this.$router.push({path:'/myFlow'});
			}
		},
		refresh:function(){
			window.location.reload()
		},
		ding:function(event){
			var el = event.currentTarget;
			var status = $(el).attr('status');
			if(status == '1'){

			}
		}
	}
}

</script>