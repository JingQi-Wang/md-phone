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
		//渲染完以后执行，生命周期内只执行一次，初始化数据
		var that = this;
		phone_form.templateObj = {
			dom:'.leaveFlow .flow',//
			title:'填写表单',//表单的标题
			queryUrl:'',//查询信息使用的地址，如果为空则不进行信息的查询
			queryParams:{//进行查询时所携带的参数，可以不进行设置
				//userId:'userid'
			},
			colums:[//列的数组
			    {
					name:'title', //该字段的数据库名，必填项
					columName:'标题',//显示在左侧的字段的名称
					defaultValue:'',//默认值，如果不填则为空
					must:false,//是否为必填项，如果为必填项，则在未填写时，会弹出提示 默认值为 false
					readOnly:true,//是否为只读，如果为只读形式则无法进行修改 默认值是 false
					verify:function(value){//验证value值的方式，返回值为true或者false，如果该项为空则进行自定义验证
						if(value == ''){
							return false;
						}else{
							return true;
						}
					},
					type:'String',//输入的类型，当为String字符类型时，不做任何处理，在进行其他处理时需要进行处理，比如date日期。
					lookType:'input',//显示类型，look：仅查看，input：以input的形式进行显示，可操作，text：文本框形式
					show:true, //是否进行显示，默认值为true
			    },
			    {
					name:'startTime', //该字段的数据库名，必填项
					columName:'开始时间',//显示在左侧的字段的名称
					defaultValue:new Date().Format('yyyy-MM-dd hh:mm'),//默认值，如果不填则为空
					must:false,//是否为必填项，如果为必填项，则在未填写时，会弹出提示 默认值为 false
					readOnly:true,//是否为只读，如果为只读形式则无法进行修改 默认值是 false
					verify:function(value){//验证value值的方式，返回值为true或者false，如果该项为空则进行自定义验证
						if(value == ''){
							return false;
						}else{
							return true;
						}
					},
					type:'date',//输入的类型，当为String字符类型时，不做任何处理，在进行其他处理时需要进行处理，比如date日期。
					lookType:'look',//显示类型，look：仅查看，input：以input的形式进行显示，可操作，text：文本框形式
					show:true, //是否进行显示，默认值为true
			    },
			    {
					name:'endTime', //该字段的数据库名，必填项
					columName:'结束时间',//显示在左侧的字段的名称
					defaultValue:new Date().Format('yyyy-MM-dd hh:mm'),//默认值，如果不填则为空
					must:false,//是否为必填项，如果为必填项，则在未填写时，会弹出提示 默认值为 false
					readOnly:true,//是否为只读，如果为只读形式则无法进行修改 默认值是 false
					verify:function(value){//验证value值的方式，返回值为true或者false，如果该项为空则进行自定义验证
						if(value == ''){
							return false;
						}else{
							return true;
						}
					},
					type:'date',//输入的类型，当为String字符类型时，不做任何处理，在进行其他处理时需要进行处理，比如date日期。
					lookType:'look',//显示类型，look：仅查看，input：以input的形式进行显示，可操作，text：文本框形式
					show:true, //是否进行显示，默认值为true
			    },
			    {
					name:'reason', //该字段的数据库名，必填项
					columName:'请假原因',//显示在左侧的字段的名称
					defaultValue:'',//默认值，如果不填则为空
					must:false,//是否为必填项，如果为必填项，则在未填写时，会弹出提示 默认值为 false
					readOnly:true,//是否为只读，如果为只读形式则无法进行修改 默认值是 false
					verify:function(value){//验证value值的方式，返回值为true或者false，如果该项为空则进行自定义验证
						if(value == ''){
							return false;
						}else{
							return true;
						}
					},
					type:'String',//输入的类型，当为String字符类型时，不做任何处理，在进行其他处理时需要进行处理，比如date日期。
					lookType:'text',//显示类型，look：仅查看，input：以input的形式进行显示，可操作，text：文本框形式
					show:true, //是否进行显示，默认值为true
			    }
			],
			type:'post',//对象进行提交时的类型设置
			submitUrl:'/phMyProcess/startProcess.ph',//提交表单的地址
			data:{//提交数据时的表单信息外的额外信息，被从后台查询出来的数据不会进行提交
				userId:that.$user.userId,
				userName:that.$user.userName,
				leaveType:that.$leaveType.leaveType
			},
			check:{//自定义的选择方式，如果不定义则会使用默认的方法进行选择，如时间
				Date:function(){//自定义时间选择
					alert("自定义的时间选择");
				},
				user:function(){//自定义的用户选择
					
				}
			}
		}
		that.$form.createForm(phone_form.templateObj);
		$('.leaveFlow .flow div[name=startTime]').click(function(){
			that.$refs.beginPicker.open();
		});
		$('.leaveFlow .flow div[name=endTime]').click(function(){
			that.$refs.endPicker.open();
		});
	},
	updated () {
		//数据更新重新渲染后会执行
	},
	methods: {
		selectBeginDate:function(value){
			//this.showBeginDate = value.Format('yyyy-MM-dd hh:mm');
			$('.leaveFlow .flow div[name=startTime]').text(value.Format('yyyy-MM-dd hh:mm'));
			
		},
		selectEndDate:function(value){
			//this.showEndDate = value.Format('yyyy-MM-dd hh:mm');
			$('.leaveFlow .flow div[name=endTime]').text(value.Format('yyyy-MM-dd hh:mm'));
		},
		toPage:function(event){
			var el = event.currentTarget;
			var a = $(el).attr('data');
			if (a == 0) {
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
					if($('.leaveFlow .examine img').length == 0){
						var str = '<span class="flowPeople" id="'+userId+'">'+userName+'</span>';
					}else{
						var str = '<img slot="icon" src='+arrow+' width="24" height="24" ><span class="flowPeople" id="'+userId+'">'+userName+'</span>';
					}
					$('.leaveFlow .examine .addPeople').before(str);
					$('.leaveFlow .chooseBox').hide();
					$('.leaveFlow .container').eq(0).show();
					$('.leaveFlow .flowArea .examine .flowPeople[data!=0]').click(function(){
						var jqthat = $(this);
						var userid = jqthat.attr('id');
						var userName = $.trim(jqthat.text());
						var info = {
							typeId : '001',
							userId:userId,
							userName:userName
						}
						if($('.leaveFlow .examine img').length == 0){

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
					var str = '<span class="flowPeople" id="'+userId+'">'+userName+'</span>';
					$('.leaveFlow .copyTo .addPeople').before(str);
					$('.leaveFlow .chooseBox').hide();
					$('.leaveFlow .container').eq(0).show();
					$('.leaveFlow .flowArea .copyTo .flowPeople[data!=1]').click(function(){
						var jqthat = $(this);
						var userid = jqthat.attr('id');
						var userName = $.trim(jqthat.text());
						var info = {
							typeId : '001',
							userId:userId,
							userName:userName
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
			this.$form.submit(this,phone_form.templateObj);			
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