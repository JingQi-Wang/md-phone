//system.vue
<template>
	<div class="system">	
		<div class="container">
			<div class="title-box">
				<img slot="icon" src="../../static/icon/left.svg" width="24" height="24" data="0" v-on:click="toPage">							
				<div class="m-office">
					WIFI管理
				</div>
				<div class="m-icon">
					<div class="office-icon">
						<img slot="icon" src="../../static/icon/ring.svg" width="24" height="24">
					</div>
				</div>
			</div>
			<br />
			<div>
				<mt-cell v-bind:title="value.wifiName" v-bind:key="index" v-for="(value, index) in options">
					<button v-on:click="updateWifi" v-bind:id="value.wifiId">更新</button>
					&nbsp;&nbsp;
					<button v-on:click="deleteWifi" v-bind:id="value.wifiId">删除</button>
					<img slot="icon" src="../../static/icon/wifi.svg" width="24" height="24">
				</mt-cell>
				
				<mt-cell title="添加考勤wifi">
					<button v-on:click="addWifi">添加</button>
					<img slot="icon" src="../../static/icon/wifi.svg" width="24" height="24">
				</mt-cell>
			</div>
			<div v-on:click="">{{ aaa }}</div>
		</div>
	</div>	
</template>

<!-- SCRIPT -->
<script>
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';

export default {
	data() {
		return {
			aaa:returnCitySN["cip"],
			options:[
				
			]
		}
	},
	mounted () {
		//渲染完以后执行，生命周期内只执行一次，初始化数据
		this.getWifi();
	},
	methods: {
		getWifi:function(){
			var el = this;			
			el.$index.ajax(this, '/phClock/getWifi.ph', null, function(data){
				el.options = data;
			})
		},
		addWifi:function(){
			MessageBox.prompt('请输入wifi名称').then( ({ value, action }) => {
				var el = this;
				el.$index.ajax(this, '/phClock/setWifi.ph', {
					wifiName:value,
					ips:returnCitySN['cip'],
					phoneType:el.$user.phoneType
				},function(data){
					Toast({
						message:data,
						duration:2000
					});
					el.getWifi();
				})
			})

		},
		updateWifi:function(){
			var ele = event.currentTarget;
			var a = $(ele).attr('id');
			MessageBox.confirm('确定要更新该wifi吗?').then(action => {
				var el = this;
				el.$index.ajax(this, '/phClock/updateWifi.ph', {
					wifiId:a,
					ips:returnCitySN['cip'],
					phoneType:el.$user.phoneType
				},function(data){
					
				})
			})

		},
		deleteWifi:function(event){
			var ele = event.currentTarget;
			var a = $(ele).attr('id');
			MessageBox.confirm('确定删除该wifi吗?').then(action => {
				var el = this;
				el.$index.ajax(this, '/phClock/deleteWifi.ph', {
					wifiId:a
				},function(data){
					Toast({
						message:data,
						duration:2000
					});
					el.getWifi();
				})
			})

		},
		toPage:function(event){
			var ele = event.currentTarget;
			var a = $(ele).attr('data');
			if(a == 0){
				this.$router.push({path:'/system'});
				
			}
		}

	}
}
</script>