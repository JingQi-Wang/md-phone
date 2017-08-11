//writeLog.vue
<template>
	<div class="writeLog">	
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
				<span class="time" v-on:click="openPicker($event)">
					{{ showDateValue }}
				</span>
			</div>
			<div class="tremBar">
				<span>标题：</span>
				<input class="title" type="text" v-model="titleName"/>
			</div>
			<div class="tremBar editArea">
				<div>内容：</div>
				<div>
					<textarea v-model="text"></textarea>
				</div>
			</div>
		</div>
		<div class="editBtn" v-on:click="save">
			保存
		</div>
		<mt-datetime-picker
			ref="picker"
			type="date"
			v-model="dateValue"
			v-on:confirm="selectPicker">
		</mt-datetime-picker>
	</div>
</template>

<!-- script -->
<script>

import { MessageBox } from 'mint-ui';

export default {
	data() {
		return {
			dateValue:new Date(),
			showDateValue:new Date().Format('yyyy-MM-dd'),
			titleName:'',
			text:'',
		}
	},
	methods: {
		toPage:function(){
			var el = event.currentTarget;
			var a = $(el).attr('data');
			if(a == 0){//本组件data属性设置为0的，页面前往home
				this.$router.push({path:'/workLog'});
			}
		},
		selectPicker:function(value){
			this.showDateValue = value.Format('yyyy-MM-dd');
		},
		openPicker:function(event){
			this.$refs.picker.open();
		},
		save:function(){
			if (this.text == '') {
				MessageBox('日志内容不能为空');
			}else{
				var that = this;
				var info = {
					titleName:this.titleName,
					text:this.text,
					logTimeStr:this.showDateValue,
				}
				this.$index.ajax(this,'/phLog/addLog.ph',info,function(data){
						MessageBox.alert(data).then(action => {
							that.$router.push({path:'/workLog'});
						});
					});
			}
		}
	}
}
</script>