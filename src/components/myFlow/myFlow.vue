//myFlow.vue
<template>
	<div class="myFlow">	
		<!-- 内容 -->
		<div class="container">
			<div class="title-box">
				<img slot="icon" src="../../static/icon/left.svg" width="24" height="24" data="0" v-on:click="toPage">							
				<div class="m-office">
					我的流程
				</div>
				<div class="m-icon">
					<div class="office-icon">
						<img slot="icon" src="../../static/icon/refresh.svg" width="24" height="24" v-on:click="refresh">
					</div>
				</div>
			</div>
			<div class="logArea">
				<div class="flowArea" v-for="item of items">
					<h3>{{ item.processTypeName }}</h3>
					<div class="flowStatus">
						<div  class="flowStatus1">
							标题
						</div>
						<div  class="flowStatus2">
							{{ item.title }}
						</div>
					</div>
					<div class="flowStatus">
						<div  class="flowStatus1">
							审批状态
						</div>
						<div  class="flowStatus2" v-if="item.executeStatus == 1">
							审批中
						</div>
						<div  class="flowStatus2 poss" v-if="item.executeStatus == 2">
							通过
						</div>
						<div  class="flowStatus2 reject" v-if="item.executeStatus == 3">
							驳回
						</div>
						<div  class="flowStatus2" v-if="item.executeStatus == 4">
							撤回
						</div>
					</div>
					<div class="button" v-bind:id="item.processRecordId" data="1" v-on:click="toPage">查看</div>
				</div>
			</div>
		</div>
		<div class="flowBottom" data="2" v-on:click="toPage">
			发起流程
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
		that.$index.ajax(that,'/phMyRelated/getProcessList.ph',null,function(data){
			that.items = data.rows;
		});
	},
	methods: {
		toPage:function(event){
			var el = event.currentTarget;
			var a = $(el).attr('data');
			if (a == 0) {
				this.$router.push({path:'/'});
			}else if (a == 1) {
				var info = {
					processRecordId:$(el).attr('id')
				}
				$.extend(this.$leaveType,info);
				this.$router.push({path:'/lookFlow'});
			}else if (a == 2) {
				this.$router.push({path:'/launchFlow'});
			}
		},
		refresh:function(){
			window.location.reload()
		}
	}
}

</script>