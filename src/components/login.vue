//login.vue
<template>
	<div class="login">	
		<div class="login-content">
			<mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
			<mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
		</div>	
		<mt-button type="primary" size="large" v-on:click="handleClick">登录</mt-button>
	</div>
	
	
</template>
<!-- SCRIPT -->
<script>
import MessageBox from '../../node_modules/mint-ui/lib/message-box'

export default {
	data() {
		return {
			username:'admin',
			password:'1'
		}
	},
	methods: {
		handleClick:function(){
			if(this.username == ''){
				MessageBox('提示', '请输入用户名');
			}else if(this.password == ''){
				MessageBox('提示', '请输入密码');
			}else{
				$.ajax({
					url: this.host + "/mdoa/phUser/login.ph",
					data:{
						userAccount : this.username,
						password : this.password
					},
					type:"post",
					dataType:"json",
					success:function(data){
						if(data == 200){
							this.$router.push({path:'/home'});
						}else if(data == 400){
							MessageBox('提示', '密码或验证码错误');
						}else if(data == 500){
							MessageBox('提示', '服务器异常');
						}
					}
				})
			}
			
		}
	}

}
</script>