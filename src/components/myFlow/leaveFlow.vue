//leaveFlow.vue
<template>
	<div class="leaveFlow">	
		<!-- 内容 -->
		<div class="container">
			<div class="title-box">
				<img slot="icon" src="../../static/icon/left.svg" width="24" height="24" data="0" v-on:click="toPage">
				<div class="m-office">
					请假
				</div>
				<div class="m-icon">
				</div>
			</div>
			<div class="logArea">
				<div class="flowArea flow">
				</div>
				<div class="flowArea">
					<h3>流程</h3>
					<div class="flowMould">
						<p>审批人</p>
						<div class="flowChart examine">
							<span class="flowPeople addPeople" data="0" v-on:click="addPeople">添加</span>
						</div>
					</div>
					<div class="flowMould">
						<p>抄送人</p>
						<div class="flowChart copyTo">
							<span class="flowPeople addPeople" data="1" v-on:click="addPeople">添加</span>
						</div>
					</div>
				</div>
				<div class="btnArea">
					<mt-button type="primary" size="large" v-on:click="startProgress">发起流程</mt-button>
				</div>
			</div>
		</div>
		<div class="container chooseBox">
			<div class="title-box">
				<img slot="icon" src="../../static/icon/left.svg" width="24" height="24" data="0" v-on:click="back">
				<div class="m-office">
					选择人员
				</div>
				<div class="m-icon">
				</div>
			</div>
			<div class="chooseArea">
				<p> <input type="text" name="userName" placeholder="搜索" v-model="name" /><button v-on:click="queryUser">查询</button></p>
				<div class="choosePeople">
					<h2><span v-on:click="backChooseDet">{{ showDet }}</span></h2>
					<div class="chooseDet" v-for="det of dets">
						<div class="det" v-on:click="chooseUser" v-bind:id="det.id">
							{{ det.text }}
						</div>
					</div>
					<div class="chooseUser" v-for="user of users">
						<div class="user" v-on:click="completeChoose" v-bind:id="user.userId">
							{{ user.userName }}
						</div>
					</div>
					<div class="noResult">
						并未搜索到结果
					</div>
				</div>
			</div>
		</div>
		<mt-datetime-picker
			ref="beginPicker"
			type="datetime"
			v-model="beginDate"
			v-on:confirm="selectBeginDate">
		</mt-datetime-picker>
		<mt-datetime-picker
			ref="endPicker"
			type="datetime"
			v-model="endDate"
			v-on:confirm="selectEndDate">
		</mt-datetime-picker>
	</div>
</template>

<!-- script -->
<script>
import arrow from '../../static/icon/arrow.svg';
import { Toast } from 'mint-ui';
var phone_form = {};
export default {
	data() {
		return {
			applyName:'',
			title:'',
			reason:'',
			beginDate:new Date(),
			showBeginDate:new Date().Format('yyyy-MM-dd hh:mm'),
			endDate:new Date(),
			showEndDate:new Date().Format('yyyy-MM-dd hh:mm'),
			dets:[],
			users:[],
			judgeFlag:'',
			showDet:'',
			name:''
		}
	},
	created () {
		// 组件创建完后执行
	},
	mounted () {
		$('.leaveFlow .flowArea .examine .flowPeople[data!=0]').click(function(){
			var jqthat = $(this);
			var userid = jqthat.attr('id');
			var userName = $.trim(jqthat.text());
			var taskId = jqthat.attr('taskId');
			var info = {
				typeId : '001',
				userId:userId,
				userName:userName,
				taskId:taskId
			}
			if($('.leaveFlow .examine .flowPeople') == 1){

				that.$index.ajax(that,'/phMyProcess/deleteExecute.ph',info,function(data){
					Toast({
					  message: data,
					  duration: 3000
					});
					if (data =="删除成功") {
						$(jqthat).remove();
					}
				});
			}else{
				that.$index.ajax(that,'/phMyProcess/deleteExecute.ph',info,function(data){
					Toast({
					  message: data,
					  duration: 3000
					});
					if (data =="删除成功") {
						$(jqthat).remove();
						$('.leaveFlow .examine img:last').remove();
					}
				});
			}
		});
		$('.leaveFlow .flowArea .copyTo .flowPeople[data!=1]').click(function(){
			var jqthat = $(this);
			var userid = jqthat.attr('id');
			var userName = $.trim(jqthat.text());
			var taskId = jqthat.attr('taskId');
			var info = {
				typeId : '001',
				userId:userId,
				userName:userName,
				taskId:taskId
			}
			that.$index.ajax(that,'/phMyProcess/deleteCopyTo.ph',info,function(data){
				Toast({
				  message: data,
				  duration: 3000
				});
				if (data =="删除成功") {
					$(jqthat).remove();
				}
			});
		});
		//渲染完以后执行，生命周期内只执行一次，初始化数据
		var that = this;
		var typeId = that.$leaveType.typeId;
		var flowStr = '';
		if (typeId == '001') {
			flowStr += '<div class="flowStatus">'
					+  '<div  class="flowStatus1">标题</div>'
					+  '<div  class="flowStatus2">'
					+  '<input type="text" class="title"/></div>'
					+  '</div>'
					+  '<div class="flowStatus">'
					+  '<div  class="flowStatus1">请假类型</div>'
					+  '<div  class="flowStatus2"><select class="leaveType"></select></div>'	
					+  '</div>'	
					+  '<div class="flowStatus">'
					+  '<div  class="flowStatus1">开始时间</div>'
					+  '<div  class="flowStatus2 startTime"></div>'	
					+  '</div>'	
					+  '<div class="flowStatus">'
					+  '<div  class="flowStatus1">结束时间</div>'
					+  '<div  class="flowStatus2 endTime"></div>'	
					+  '</div>'	
					+  '<div class="flowStatus">'
					+  '<div  class="flowStatus1">请假原因</div>'
					+  '<div  class="flowStatus2 "><textarea class="reason"></textarea></div>'	
					+  '</div>';
			$('.leaveFlow .flow').append(flowStr);
			that.$index.ajax(that,'/phDictionary/queryDictionary.ph',{selectKey:'leave_type'},function(data){
				data = data.rows;
				var str = '';
				for(var i = 0;i<data.length;i++){
					str += '<option value="'+data[i].optionKey+'">'+data[i].optionValue+'</optio>';
				}
				$('.leaveFlow .flow .leaveType').append(str);
			});
			$('.leaveFlow .flow .startTime').click(function(){
				that.$refs.beginPicker.open();
			});
			$('.leaveFlow .flow .endTime').click(function(){
				that.$refs.endPicker.open();
			});
		}else if (typeId == '002') {
			$('.leaveFlow .container:eq(0) .title-box .m-office').text('公出');
			flowStr += '<div class="flowStatus">'
					+  '<div  class="flowStatus1">标题</div>'
					+  '<div  class="flowStatus2">'
					+  '<input type="text" class="title"/></div>'
					+  '</div>'
					+  '<div class="flowStatus">'
					+  '<div  class="flowStatus1">开始时间</div>'
					+  '<div  class="flowStatus2 startTime"></div>'	
					+  '</div>'	
					+  '<div class="flowStatus">'
					+  '<div  class="flowStatus1">结束时间</div>'
					+  '<div  class="flowStatus2 endTime"></div>'	
					+  '</div>'	
					+  '<div class="flowStatus">'
					+  '<div  class="flowStatus1">公出原因</div>'
					+  '<div  class="flowStatus2 "><textarea class="reason"></textarea></div>'	
					+  '</div>';
			$('.leaveFlow .flow').append(flowStr);
			$('.leaveFlow .flow .startTime').click(function(){
				that.$refs.beginPicker.open();
			});
			$('.leaveFlow .flow .endTime').click(function(){
				that.$refs.endPicker.open();
			});
		}else if (typeId == '003') {
			$('.leaveFlow .container:eq(0) .title-box .m-office').text('离职');
			flowStr += '<div class="flowStatus">'
					+  '<div  class="flowStatus1">标题</div>'
					+  '<div  class="flowStatus2">'
					+  '<input type="text" class="title"/></div>'
					+  '</div>'
					+  '<div class="flowStatus">'
					+  '<div  class="flowStatus1">公出原因</div>'
					+  '<div  class="flowStatus2 "><textarea class="reason"></textarea></div>'	
					+  '</div>';
			$('.leaveFlow .flow').append(flowStr);
		}else if (typeId == '007') {
			$('.leaveFlow .container:eq(0) .title-box .m-office').text('补卡');
			flowStr += '<div class="flowStatus">'
					+  '<div  class="flowStatus1">标题</div>'
					+  '<div  class="flowStatus2">'
					+  '<input type="text" class="title"/></div>'
					+  '</div>'
					+  '<div class="flowStatus">'
					+  '<div  class="flowStatus1">补卡日期</div>'
					+  '<div  class="flowStatus2 startTime">'+that.$leaveType.replaceRecordDate+'</div>'
					+  '</div>'	
					+  '<div class="flowStatus">'
					+  '<div  class="flowStatus1">补卡时间</div>'
					+  '<div  class="flowStatus2 endTime">'+that.$leaveType.replaceTime+'</div>'	
					+  '</div>'
					+  '<div class="flowStatus">'
					+  '<div  class="flowStatus1">补卡原因</div>'
					+  '<div  class="flowStatus2 "><textarea class="reason"></textarea></div>'	
					+  '</div>';
			$('.leaveFlow .flow').append(flowStr);
		}
		var info = {
			typeId:typeId
		}
		that.$index.ajax(this,'/phMyProcess/getProcessMessage.ph',info,function(data){
			if (data.excuteUserHead) {
				var excuteUserHead = data.excuteUserHead;
				var str = '';
				for (var i = excuteUserHead; i ; i = i.nextTask) {
				 	str += '<span class="flowPeople" id="'+i.executorId+'" taskId="'+i.taskId+'">'+i.executorName+'</span>';
				 	str += '<img slot="icon" src="'+arrow+'" width="24" height="24" >'
				}; 
				$('.leaveFlow .flowArea .examine .addPeople').before(str);
				$('.leaveFlow .flowArea .examine img:last').remove();
			}
			if(data.copyToUsers){
				var copyToUsers = data.copyToUsers;
				var str = '';
				for(var i = 0 ; i < copyToUsers.length ; i++){
					str += '<span class="flowPeople" id="'+copyToUsers[i].executorId+'" taskId="'+copyToUsers[i].taskId+'">'+copyToUsers[i].executorName+'</span>';
				}
				$('.leaveFlow .flowArea .copyTo .addPeople').before(str);
			}
		});
	},
	updated () {
		//数据更新重新渲染后会执行
	},
	methods: {
		selectBeginDate:function(value){
			//this.showBeginDate = value.Format('yyyy-MM-dd hh:mm');
			$('.leaveFlow .flow .startTime').text(value.Format('yyyy-MM-dd hh:mm'));
			
		},
		selectEndDate:function(value){
			//this.showEndDate = value.Format('yyyy-MM-dd hh:mm');
			$('.leaveFlow .flow .endTime').text(value.Format('yyyy-MM-dd hh:mm'));
		},
		toPage:function(event){
			var el = event.currentTarget;
			var a = $(el).attr('data');
			var typeId = this.$leaveType.typeId;
			if (a == 0 && typeId == '007') {
				this.$router.push({path:'/clockTotalExplain'});
			}else if( a == 0){
				this.$router.push({path:'/launchFlow'});
			}
		},
		addPeople:function(event){
			var that = this;
			var el = event.currentTarget;
			var a = $(el).attr('data');
			if (a == 0) {
				that.judgeFlag = 0;
			}else{
				that.judgeFlag = 1;
			}
			$('.leaveFlow .container').eq(0).hide();
			that.$index.ajax(this,'/phDepartment/getFramework.ph',null,function(data){
				that.dets = data[0].children[0].children;
			});
			$('.leaveFlow .chooseBox').show();
			$('.leaveFlow .chooseBox .chooseDet').show();
			$('.leaveFlow .chooseBox h2').hide();
			$('.leaveFlow .chooseBox .chooseUser').hide();
		},
		chooseUser:function(event){
			var that = this;
			var el = event.currentTarget;
			var a = $(el).attr('id');
			var info = {
				departmentUrl:a,
				inviteFlag:'1'
			};
			that.$index.ajax(this,'/phUserInfo/selectUserInfo.ph',info,function(data){
				that.users = data.rows;
				$('.leaveFlow .chooseBox .chooseDet').hide();
				that.showDet = $.trim($(el).text());
				$('.leaveFlow .chooseBox h2').show();
				$('.leaveFlow .chooseBox .chooseUser').show();
			});
		},
		completeChoose:function(event){
			var that = this;
			var el = event.currentTarget;
			var userId = $(el).attr('id');
			var userName = $.trim($(el).text());
			if (that.judgeFlag == 0) {
				var info = {
					typeId : '001',
					userId:userId,
					userName:userName
				}
				that.$index.ajax(that,'/phMyProcess/addExecute.ph',info,function(data){
					if($('.leaveFlow .examine .flowPeople').length == 1){
						var str = '<span class="flowPeople" id="'+userId+'" taskId="'+data.taskId+'">'+userName+'</span>';
					}else{
						var str = '<img slot="icon" src='+arrow+' width="24" height="24" ><span class="flowPeople" id="'+userId+'" taskId="'+data.taskId+'">'+userName+'</span>';
					}
					$('.leaveFlow .examine .addPeople').before(str);
					$('.leaveFlow .chooseBox').hide();
					$('.leaveFlow .container').eq(0).show();
					$('.leaveFlow .flowArea .examine .flowPeople[data!=0]').click(function(){
						var jqthat = $(this);
						var userid = jqthat.attr('id');
						var userName = $.trim(jqthat.text());
						var taskId = jqthat.attr('taskId');
						var info = {
							typeId : '001',
							userId:userId,
							userName:userName,
							taskId:taskId
						}
						if($('.leaveFlow .examine .flowPeople') == 1){

							that.$index.ajax(that,'/phMyProcess/deleteExecute.ph',info,function(data){
								Toast({
								  message: data,
								  duration: 3000
								});
								if (data =="删除成功") {
									$(jqthat).remove();
								}
							});
						}else{
							that.$index.ajax(that,'/phMyProcess/deleteExecute.ph',info,function(data){
								Toast({
								  message: data,
								  duration: 3000
								});
								if (data =="删除成功") {
									$(jqthat).remove();
									$('.leaveFlow .examine img:last').remove();
								}
							});
						}
					});
				});
			}else{
				var info = {
					typeId : '002',
					userId:userId,
					userName:userName
				}
				that.$index.ajax(that,'/phMyProcess/addCopyTo.ph',info,function(data){
					var str = '<span class="flowPeople" id="'+userId+'" taskId="'+data.taskId+'">'+userName+'</span>';
					$('.leaveFlow .copyTo .addPeople').before(str);
					$('.leaveFlow .chooseBox').hide();
					$('.leaveFlow .container').eq(0).show();
					$('.leaveFlow .flowArea .copyTo .flowPeople[data!=1]').click(function(){
						var jqthat = $(this);
						var userid = jqthat.attr('id');
						var userName = $.trim(jqthat.text());
						var taskId = jqthat.attr('taskId');
						var info = {
							typeId : '001',
							userId:userId,
							userName:userName,
							taskId:taskId
						}
						that.$index.ajax(that,'/phMyProcess/deleteCopyTo.ph',info,function(data){
							Toast({
							  message: data,
							  duration: 3000
							});
							if (data =="删除成功") {
								$(jqthat).remove();
							}
						});
					});
				});
			}
			
		},
		backChooseDet:function(event){
			var el = event.currentTarget;
			$(el).parent().hide();
			$('.leaveFlow .chooseBox .chooseUser').hide();
			$('.leaveFlow .chooseBox .chooseDet').show();
		},
		queryUser:function(event){
			var that = this;
			var info = {
				userName:that.name,
				inviteFlag:'1'
			};
			that.$index.ajax(this,'/phUserInfo/selectUserInfo.ph',info,function(data){
				that.users = data.rows;
				if (data.rows.length <= 0) {
					$('.leaveFlow .chooseBox .noResult').show();
				}
				$('.leaveFlow .chooseBox .title-box img').attr('data','back');
				$('.leaveFlow .chooseBox .chooseDet').hide();
				$('.leaveFlow .chooseBox .chooseUser').show();
			});
		},
		startProgress:function(){
			var that = this;
			var typeId = that.$leaveType.typeId;
			var info;
			var title = $('.leaveFlow .flow .title').val();
			var reason = $('.leaveFlow .flow .reason').val();

			if(title == '' || title == null){
				Toast({
					 message: '请填写标题',
					 duration: 1000
				});
				return;
			}else if(reason == '' || reason == null){
				Toast({
					 message: '请填写原因',
					 duration: 1000
				});
				return;
			}
			if(typeId = '001'){
				var startTimeStr = $.trim($('.leaveFlow .flow .startTime').text());
				var endTimeStr = $.trim($('.leaveFlow .flow .endTime').text());
				info = {
					title:title,
					userName:that.$user.userName,
					userId:that.$user.userId,
					departmentName:that.$user.departmentName,
					startTimeStr:startTimeStr,
					endTimeStr:endTimeStr,
					reason:reason,
					typeId:typeId,
					leaveType:$('.leaveFlow .flow .leaveType').val(),
					leaveTypeValue:$('.leaveFlow .flow .leaveType option:selected').text()
				}
			}else if(typeId == '002'){
				var startTimeStr = $.trim($('.leaveFlow .flow .startTime').text());
				var endTimeStr = $.trim($('.leaveFlow .flow .endTime').text());
				info = {
					title:title,
					userName:that.$user.userName,
					userId:that.$user.userId,
					departmentName:that.$user.departmentName,
					startTimeStr:startTimeStr,
					endTimeStr:endTimeStr,
					reason:reason,
					typeId:typeId
				}
			}else if(typeId == '003'){
				info = {
					title:title,
					userName:that.$user.userName,
					userId:that.$user.userId,
					departmentName:that.$user.departmentName,
					reason:reason,
					typeId:typeId
				}
			}else if(typeId == '007'){
				info = {
					title:title,
					userName:that.$user.userName,
					userId:that.$user.userId,
					departmentName:that.$user.departmentName,
					reason:reason,
					typeId:typeId,
					replaceType:1,
					replaceRecordDate:that.$leaveType.replaceRecordDate,
					replaceTime:that.$leaveType.replaceTime
				}
			}
			that.$index.ajax(that,'/phMyProcess/startProcess.ph',info,function(data){
				Toast({
				  message: "流程启动成功",
				  duration: 3000
				});
				if(typeId == '007'){
					that.$router.push({path:'/clockTotalExplain'});
				}else{
					that.$router.push({path:'/launchFlow'});
				}
			});
		},
		back:function(event){
			var el = event.currentTarget;
			var a = $(el).attr('data');
			if(a == 0){
				$('.leaveFlow .container').eq(1).hide();
				$('.leaveFlow .container').eq(0).show();
				$('.leaveFlow .chooseBox h2').hide();
				$('.leaveFlow .chooseBox .chooseDet').hide();
				$('.leaveFlow .chooseBox .chooseUser').show();
			}else if (a == 'back') {
				$(el).attr('data',0);
				$('.leaveFlow .chooseBox .noResult').hide();
				$('.leaveFlow .chooseBox .chooseDet').show();
				$('.leaveFlow .chooseBox .chooseUser').hide();
			}
		}
	}
}

</script>