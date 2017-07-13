//login.vue
<template>
	<div class="login">	
		<div class="login-content">
			<mt-field label="用户名" placeholder="请输入用户名" v-model="userName"></mt-field>
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
			userName:'',
			password:''
		}
	},
	beforeCreate () {
		if(localStorage.getItem('userName')){
			this.$router.push({path:'/home'});
		}
	},
	methods: {
		handleClick:function(){			
			var el = this;		
			if(el.userName == ''){
				MessageBox('提示', '请输入用户名');
			}else if(el.password == ''){
				MessageBox('提示', '请输入密码');
			}else{				
				$.ajax({
					url: el.host + "/mdoa/phUser/login.ph",
					data:{
						userAccount : el.userName,
						password : el.password
					},
					type:"post",
					dataType:"json",
					success:function(data){
						if(data == 200){
							localStorage.setItem('userName',el.userName);
							el.$router.push({path:'/home'});
						}else if(data == 400){
							MessageBox('提示', '密码或验证码错误');
						}else if(data == 500){
							MessageBox('提示', '服务器异常');
						}
					},
					error:function() {
						
					}
				})
			}
			
		}
	}

}
</script>