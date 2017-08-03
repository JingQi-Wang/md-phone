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
						<div class="flowChart">
						</div>
					</div>
				</div>
				<div class="flowArea">
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
			that.leaveType = data.leaveType;
			that.userName = data.leaveType;
			that.title = data.title;
			that.startTime = data.startTime;
			that.endTime = data.endTime;
			that.reason = data.reason;
		});
		that.$index.ajax(that,'/phMyRelated/getProcessExecutor.ph',info,function(data){
			excuteUserHead = data.excuteUserHead;
			var str = '';
			for (var i = excuteUserHead; i ; i = i.nextTask) {
			 	str += '<span class="flowPeople"'+i.executorId+'>'+i.executorName+'</span>';
			 	str += '<img slot="icon" src="../../static/icon/arrow.svg" width="24" height="24" >'
			}; 
			$('.flowExamine .flowArea .examine').append(str);
			$('.flowExamine .flowArea .examine img:last').remove();
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
				this.$router.push({path:'/examine'});
			}else if (a == 1) {
				this.$router.push({path:'/examining'});
			}
		}
	}
}
</script>