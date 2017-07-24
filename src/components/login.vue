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
//接口地址
var url = 'http://192.168.0.108:8888/mdoa/phUser/login.ph';


export default {
	data() {
		return {
			userName:'lvbing',
			password:'123456'
		}
	},
	beforeCreate () {
		var el = this;
		if(localStorage.getItem('userName') && localStorage.getItem('password')){
			$.ajax({
				url: url,
				data:{
					sessionId: localStorage.getItem('sessionId') || null,
					userAccount : localStorage.getItem('userName'),
					password : localStorage.getItem('password')
				},
				type:"post",
				dataType:"json",
				success:function(data){
					//	ajax session 参数处理 
					if(data.sessionId){
						localStorage.setItem('sessionId',data.sessionId);
					}
					if(data.success){
						el.$router.push({path:'/home'});
					}
				},
				error:function() {
					MessageBox('提示', '登录失败');
				}
			})
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
					url: url,
					data:{
						sessionId: localStorage.getItem('sessionId') || null,
						userAccount : el.userName,
						password : el.password
					},
					type:"post",
					dataType:"json",
					success:function(data){
						if(data.sessionId){
							localStorage.setItem('sessionId',data.sessionId);
						}
						if(data.success){
							localStorage.setItem('userName',el.userName);
							localStorage.setItem('password',el.password);
							el.$router.push({path:'/home'});
						}else{
							MessageBox('提示', '登录失败,请重新登录');
						}
					},
					error:function() {
						MessageBox('提示', '登录失败');
					}
				})
			}			
		}

	}

}
</script>