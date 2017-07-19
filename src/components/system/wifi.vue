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
				<mt-cell title="wifi1">
					<button>删除</button>
					<img slot="icon" src="../../static/icon/wifi.svg" width="24" height="24">
				</mt-cell>
				<mt-cell title="wifi2">
					<button>删除</button>
					<img slot="icon" src="../../static/icon/wifi.svg" width="24" height="24">
				</mt-cell>
				<mt-cell title="添加当前wifi为考勤wifi">
					<img slot="icon" src="../../static/icon/wifi.svg" width="24" height="24">
				</mt-cell>
			</div>

		</div>
	</div>	
</template>

<!-- SCRIPT -->
<script>
export default {
	data() {
		return {
			
		}
	},
	methods: {
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