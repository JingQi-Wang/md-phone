//editLog.vue
<template>
	<div class="editLog">	
		<!-- 内容 -->
		<div class="container">
			<div class="title-box">
				<img slot="icon" src="../../static/icon/left.svg" width="24" height="24" data="0" v-on:click="toPage">							
				<div class="m-office">
					修改日志
				</div>
				<div class="m-icon">
					<!-- <div class="office-icon">
						<img slot="icon" src="../../static/icon/ring.svg" width="24" height="24">
					</div> -->
				</div>
			</div>
			<div class="tremBar">
				<span>日期：</span>
				<span class="time">{{ logTimeStr }}</span>
			</div>
			<div class="tremBar">
				<span>标题：</span>
				<input class="title" type="text" v-model="titleName"/>
			</div>
			<div class="tremBar editArea">
				<div style="float:left;">内容：</div>
				<textarea  v-model="text"></textarea>
			</div>
			<div class="editBtn" v-on:click="edit">
				修改
			</div>
		</div>
	</div>
</template>

<!-- script -->
<script>

import MessageBox from '../../../node_modules/mint-ui/lib/message-box'

export default {
	data() {
		return {
			userName:'',
			titleName:'',
			text:'',
			logTimeStr:'',
			workOfficeLogId:''
		}
	},
	mounted () {
		this.userName = this.$log.userName;
		this.titleName = this.$log.titleName;
		this.text = this.$log.text;
		this.logTimeStr = this.$log.logTimeStr;
		this.workOfficeLogId = this.$log.workOfficeLogId;
	},
	methods: {
		toPage:function(){
			var el = event.currentTarget;
			var a = $(el).attr('data');
			if(a == 0){//本组件data属性设置为0的，页面前往home
				this.$router.push({path:'/myLog'});
			}
		},
		edit:function(){
			if (this.text == '') {
				MessageBox('日志内容不能为空');
			}else{
				var that = this;
				var info = {
					userName:this.userName,
					titleName:this.titleName,
					text:this.text,
					logTimeStr:this.logTimeStr,
					workOfficeLogId:this.workOfficeLogId
				}

				this.$index.ajax(this,'/phLog/updateYourselfLog.ph',info,function(data){
					MessageBox.alert(data).then(action => {
						that.$router.push({path:'/myLog'});
					});
				});
			}
			
		}
	}

}

</script>