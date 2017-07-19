//system.vue
<template>
	<div class="system">	
		<div class="container">
			<div class="title-box">
				<img slot="icon" src="../../static/icon/left.svg" width="24" height="24" data="0" v-on:click="toPage">							
				<div class="m-office">
					系统设置
				</div>
				<div class="m-icon">
					<div class="office-icon">
						<img slot="icon" src="../../static/icon/ring.svg" width="24" height="24">
					</div>
				</div>
			</div>
			<br />
			<div>
				<mt-cell title="WIFI管理" is-link to="/wifi">
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
				this.$router.push({path:'/home'});
				
			}
		}			
	}
}
</script>