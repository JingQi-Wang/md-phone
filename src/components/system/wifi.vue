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
				<mt-cell v-bind:title="value.wifiName" v-for="(value, key) in options">
					<button v-on:click="deleteWifi">删除</button>
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
export default {
	data() {
		return {
			aaa:returnCitySN["cip"],
			options:[
				{ wifiName:'wifi1' },
                { wifiName:'wifi2' },
                { wifiName:'wifi3' },
                { wifiName:'wifi4' }
			]
		}
	},
	mounted () {
		//渲染完以后执行，生命周期内只执行一次，初始化数据
		
	},
	methods: {
		deleteWifi:function(){
			this.options.splice(0,1);
		},
		addWifi:function(){
			this.options.push({ wifiName:'wifi4' })
		},
		toPage:function(event){
			var el = event.currentTarget;
			var a = $(el).attr('data');
			if(a == 0){
				this.$router.push({path:'/system'});
				
			}
		}

	}
}
</script>