<template>
	<div class="lookCopyTo">	
		<!-- 内容 -->
		<div class="container">
			<div class="title-box">
				<img slot="icon" src="../../static/icon/left.svg" width="24" height="24" data="0" v-on:click="toPage">							
				<div class="m-office">
					抄送流程详情
				</div>
				<div class="m-icon">
				</div>
			</div>
			<div class="logArea">
				<div class="flowArea">
					<h3>{{ leaveType }}</h3>
					<div class="flowStatus">
						<div  class="flowStatus1">
							申请人
						</div>
						<div  class="flowStatus2">
							{{ userName }}
						</div>
					</div>
					<div class="flowStatus">
						<div  class="flowStatus1">
							标题
						</div>
						<div  class="flowStatus2">
							{{ title }}
						</div>
					</div>
					<div class="flowStatus" v-show="haveTime">
						<div  class="flowStatus1">
							开始时间
						</div>
						<div  class="flowStatus2">
							{{ startTime }}
						</div>
					</div>
					<div class="flowStatus" v-show="haveTime">
						<div  class="flowStatus1">
							结束时间
						</div>
						<div  class="flowStatus2">
							{{ endTime }}
						</div>
					</div>
					<div class="flowStatus">
						<div  class="flowStatus1">
							{{ because }}
						</div>
						<div  class="flowStatus2">
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
						<div class="flowChart copy">
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
					<div class="button" v-if="item.examineStatus == 2">
						通过
					</div>
					<div class="button examine-btn" v-if="item.examineStatus == 1">
						审批中
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
	</div>
</template>

<script>
import arrow from '../../static/icon/arrow.svg';
export default {
	data() {
		return {
			items:[],
			leaveType:'',
			userName:'',
			title:'',
			startTime:'',
			endTime:'',
			reason:'',
			haveTime:false,
			because:''
		}
	},
	mounted () {
		var that = this;
		var info = {
			processRecordId:this.$leaveType.processRecordId
		}
		that.$index.ajax(that,'/phMyRelated/getProcessFormMessage.ph',info,function(data){
			data = $.parseJSON(data);
			if (data.typeId == '001') {
				if (data.leaveType == '1') {
					that.leaveType = '事假';
				}else{
					that.leaveType = '病假';
				}
				that.haveTime = true;
				that.because = '请假原因';
			}else if (data.typeId == '002') {
				that.leaveType = '公出';
				that.haveTime = true;
				that.because = '公出原因';
			}else if (data.typeId == '003') {
				that.leaveType = '离职';
				that.because = '离职原因';
			}else if (data.typeId == '007') {
				that.leaveType = '补卡';
				that.because = '缺卡原因';
			}
			that.userName = data.userName;
			that.title = data.title;
			that.startTime = data.startTimeStr;
			that.endTime = data.endTimeStr;
			that.reason = data.reason;
		});
		that.$index.ajax(that,'/phMyRelated/getProcessExecutor.ph',info,function(data){
			var excuteUserHead = data.excuteUserHead;
			var str = '';
			for (var i = excuteUserHead; i ; i = i.nextTask) {
			 	str += '<span class="flowPeople" id="'+i.executorId+'">'+i.executorName+'</span>';
			 	str += '<img slot="icon" src="'+arrow+'" width="24" height="24" >'
			}; 
			$('.lookCopyTo .flowArea .examine').append(str);
			$('.lookCopyTo .flowArea .examine img:last').remove();
			var copyToUsers = data.copyToUsers;
			str = '';
			for(var i = 0;i<copyToUsers.length;i++){
				str += '<span class="flowPeople" id="'+copyToUsers[i].executorId+'">'+copyToUsers[i].executorName+'</span>';
			}
			$('.lookCopyTo .flowArea .copy').append(str);
		});
		that.$index.ajax(that,'/phMyProcess/getExamineIdea.ph',info,function(data){
			that.items = data;
		});
	},
	methods: {
		toPage:function(){
			var el = event.currentTarget;
			var a = $(el).attr('data');
			if(a == 0){//
				this.$router.push({path:'/copyTo'});
			}
		}
	}
}
</script>