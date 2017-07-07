//login.vue
<template>
	<div class="login">
		<div class="login-content">
			<mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
			<mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
		</div>
		<mt-button type="primary" size="large" v-on:click="handleClick">primary</mt-button>
	</div>
</template>
<!-- SCRIPT -->
<script>
export default {
	data() {
		return {
			username:'user',
			password:'****'
		}
	},
	methods: {
		handleClick:function(){
			this.$router.push({path:'/home'});
		}
	}
}
</script>