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
				<div class="flowArea">
					<h3>请假流程</h3>
					<div class="flowTitle">
						<div  class="flowTitle1">
							申请人
						</div>
						<div  class="flowTitle2">
							<input type="text" name="" v-model="applyName">
						</div>
					</div>
					<div class="flowTitle">
						<div  class="flowTitle1">
							标题
						</div>
						<div  class="flowTitle2">
							<input type="text" name="" v-model="title">
						</div>
					</div>
					<div class="flowStatus">
						<div  class="flowStatus1">
							开始时间
						</div>
						<div  class="flowStatus2">
							<span class="time" data="beginDate" v-on:click="openPicker($event)">
								{{ showBeginDate }}
							</span>
						</div>
					</div>
					<div class="flowStatus">
						<div  class="flowStatus1">
							结束时间
						</div>
						<div  class="flowStatus2">
							<span class="time" data="endDate" v-on:click="openPicker($event)">
								{{ showEndDate }}
							</span>
						</div>
					</div>
					<!-- <div class="flowStatus">
						<div  class="flowStatus1">
							实际开始
						</div>
						<div  class="flowStatus2">
							打卡
						</div>
					</div>
					<div class="flowStatus">
						<div  class="flowStatus1">
							实际结束
						</div>
						<div  class="flowStatus2">
							打卡
						</div>
					</div> -->
					<div class="flowTitle">
						<div  class="flowTitle1">
							请假原因
						</div>
						<div  class="flowTitle2 reason">
							<textarea type="text" name="" v-model="reason"></textarea> 
						</div>
					</div>
				</div>
				<div class="flowArea">
					<h3>流程</h3>
					<div class="flowMould">
						<p>审批人</p>
						<div class="flowChart examine">
							<span class="flowPeople">人事主管</span>
							<img slot="icon" src="../../static/icon/arrow.svg" width="24" height="24" >
							<span class="flowPeople">办公室主任</span>
							<img slot="icon" src="../../static/icon/arrow.svg" width="24" height="24" >
							<span class="flowPeople">总经理</span>
							<span class="flowPeople addPeople">添加</span>
						</div>
					</div>
					<div class="flowMould">
						<p>抄送人</p>
						<div class="flowChart">
							<span class="flowPeople">人事主管</span>
							<span class="flowPeople">办公室主任</span>
							<span class="flowPeople">总经理</span>
							<span class="flowPeople addPeople">添加</span>
						</div>
					</div>
				</div>
				<div class="btnArea">
					<mt-button type="primary" size="large">发起流程</mt-button>
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
		}
	},
	methods: {
		selectBeginDate:function(value){
			this.showBeginDate = value.Format('yyyy-MM-dd hh:mm');
		},
		selectEndDate:function(value){
			this.showEndDate = value.Format('yyyy-MM-dd hh:mm');
		},
		openPicker:function(event){
			var el = event.currentTarget;
			var a = $(el).attr('data');
			if (a == 'beginDate') {
				this.$refs.beginPicker.open();
			}else if (a == 'endDate') {
				this.$refs.endPicker.open();
			}
		},
		toPage:function(event){
			var el = event.currentTarget;
			var a = $(el).attr('data');
			if (a == 0) {
				this.$router.push({path:'/myFlow'});
			}else if (a == 1) {
				this.$router.push({path:'/lookFlow'});
			}else if (a == 2) {
				this.$router.push({path:'/launchFlow'});
			}
		}
	}
}

</script>