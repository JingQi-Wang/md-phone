//home.vue
<template>
	<div class="home">
		<div>{{ aaa }}</div>
		<!-- tab-container -->
		<mt-tab-container v-model="active">
			<mt-tab-container-item id="message-container">
				<div class="container">
					<!-- MESSAGE SELECT -->
					<div class="message-select">
						<select name="">
							<option value="0">全部</option>
							<option value="1">已读</option>
							<option value="2">未读</option>
							<option value="3">叮消息</option>
						</select>
					</div>
					<!-- MESSAGE CONTENT -->
					<div class="message-box">
						<div class="message-item">
							<div class="message-detail">
								<h2>14:00&nbsp;&nbsp;系统消息</h2>
								<p>梦德、冯良发起的物品领用申请需要您进行审批</p>
								<div>
									<img slot="icon" src="../static/icon/flowIcon.svg" width="24" height="24">
									<span>流程任务通知</span>
								</div>
							</div>
							<a href="" class="go-to">前往处理</a>
						</div>


					</div>
				</div>
			</mt-tab-container-item>
			<mt-tab-container-item id="work-container">
				<div class="container">
					<div class="title-box">
						<div class="m-office">M-office</div>
						<div class="m-icon">
							<div class="office-icon">
								<img slot="icon" src="../static/icon/set.svg" width="24" height="24" data="system" v-on:click="toPage">
							</div>
							<div class="office-icon">
								<img slot="icon" src="../static/icon/ring.svg" width="24" height="24">
							</div>
						</div>
					</div>
					<!-- BANNER -->
					<div class="banner">
						
					</div>
					<!-- MANNAGE -->
					<div class="go-mannage">
						<div class="go-item">
							<p>带我审批</p>
							<div class="number">9</div>
						</div>
						<i></i>
						<div class="go-item">
							<p>出勤天数</p>
							<div class="number">10</div>
						</div>
					</div>
					<br />
					<!-- APPLICATION -->
					<div class="application">
						<h2>应用：</h2>
						<hr />
						<div class="application-item">
							<div data="0" v-on:click="toPage($event)">
								<p>考勤打卡</p>
								<img slot="icon" src="../static/icon/clockIcon.svg" width="35" height="35">
							</div>
							<i></i>
							<div data="1" v-on:click="toPage($event)">
								<p>工作日志</p>
								<img slot="icon" src="../static/icon/logIcon.svg" width="30" height="30">
							</div>
						</div>
						<hr />
						<div class="application-item">
							<div>
								<p>抄送流程</p>
								<img slot="icon" src="../static/icon/flowIcon2.svg" width="35" height="35">
							</div>
							<i></i>
							<div>
								<p>我的流程</p>
								<img slot="icon" src="../static/icon/flowIcon.svg" width="30" height="30">
							</div>
						</div>
						<hr />
					</div>
				
				</div>
			</mt-tab-container-item>
			<mt-tab-container-item id="my-container">
				<div class="container">
					<div class="title-box">
						<div class="m-office">M-office</div>
						<div class="m-icon">
							<div class="office-icon">
								<img slot="icon" src="../static/icon/ring.svg" width="24" height="24">
							</div>
						</div>
					</div>
					<br />
					<div>
						<mt-cell v-bind:title="userName"></mt-cell>
					</div>
					<br />
					<div>
						<mt-cell title="部门：" v-bind:value="departmentName">
							<img slot="icon" src="../static/icon/dept.svg" width="24" height="24">
						</mt-cell>
						<mt-cell title="岗位：" v-bind:value="postName">
							<img slot="icon" src="../static/icon/post.svg" width="24" height="24">
						</mt-cell>
						<mt-cell title="角色：" v-bind:value="roles">
							<img slot="icon" src="../static/icon/role.svg" width="24" height="24">
						</mt-cell>
					</div>
					<br />
					<div>
						<mt-cell title="版本：" value="1.0">
							<img slot="icon" src="../static/icon/version.svg" width="24" height="24">
						</mt-cell>
					</div>
					<br />
					<div class="out-login">
						<a data="logout" v-on:click="toPage">退出登录</a>
					</div>				
				</div>
			</mt-tab-container-item>
		</mt-tab-container>
		<!-- tabbar -->
		<mt-tabbar v-model="selected" fixed>
			<mt-tab-item id="message">
				<img slot="icon" src="../static/icon/comments.svg" class="message">
				消息
			</mt-tab-item>
			<mt-tab-item id="work">
				<img slot="icon" src="../static/icon/allo.svg" class="work">
				工作
			</mt-tab-item>
			<mt-tab-item id="my-condition">
				<img slot="icon" src="../static/icon/account.svg" class="my-condition">
				我的
			</mt-tab-item>
		</mt-tabbar>

	</div>
</template>
<!-- SCRIPT -->
<script>
/* FOOTER ICON INPUT */
import messageSrc from '../static/icon/comments.svg'
import messageSrco from '../static/icon/commentso.svg'
import allSrc from '../static/icon/all.svg'
import allSrco from '../static/icon/allo.svg'
import accountSrc from '../static/icon/account.svg'
import accountSrco from '../static/icon/accounto.svg'
import { Toast } from 'mint-ui';

export default {
	data() {
		return {
			aaa:'',
			selected:'work',
			active:'work-container',
			userName:'',
			departmentName:'',
			postName:'',
			roles:''
		}
	},
	created () {
		// 组件创建完后执行
		var el = this;
		el.$index.ajax(this, '/phUser/getUser.ph', null, function(data){
			// 成功回调
			$.extend(el.$user, data);
			el.userName = data.userName;
			el.departmentName = data.departmentName;
			el.postName = data.postName;
			var str = '';
			for(let i=0; i<data.roles.length; i++){
				str += data.roles[i].roleName + ' '
			}
			el.roles = str;
		})
		
	},
	mounted () {
		//渲染完以后执行，生命周期内只执行一次，初始化数据
	
	},
	updated () {
		//数据更新重新渲染后会执行

	},
	watch: {
		selected: function (val) {
			// 这里就可以通过 val 的值变更来确定
			if(val == 'message'){
				this.active = 'message-container'				
			}else if(val == 'work'){
				this.active = 'work-container'
			}else if(val == 'my-condition'){
				this.active = 'my-container'
			}
			//changeImg
			this.changeImg(val);
		}
	},
	methods: {
		changeImg:function(val){
			if(val == 'message'){
				$('.'+ val +'').attr('src',messageSrco);
				$('.work').attr('src',allSrc);
				$('.my-condition').attr('src',accountSrc);
			}else if(val == 'work'){
				$('.'+ val +'').attr('src',allSrco);
				$('.message').attr('src',messageSrc);
				$('.my-condition').attr('src',accountSrc);
			}else if(val == 'my-condition'){
				$('.'+ val +'').attr('src',accountSrco);
				$('.message').attr('src',messageSrc);
				$('.work').attr('src',allSrc);
			}
		},
		toPage:function(event){
			var el = event.currentTarget;
			var a = $(el).attr('data');
			if(a == 0){//本组件data属性设置为0的，页面前往考勤页面
				if(this.$user.attendanceGroupId){
					this.$router.push({path:'/clock'});
				}else{
					Toast({
						message: '还未加入考勤组,请加入后再打卡',
						position: 'center',
						duration: 2000
					});
				}
			}else if (a == 1) {//本组件data属性设置为1的，页面前往工作日志页面
				this.$router.push({path:'/workLog'});
			}else if(a == 'logout'){
				localStorage.removeItem('userName');
				localStorage.removeItem('password');
				this.$router.push({path:'/'});
			}else if(a == 'system'){
				this.$router.push({path:'/system'});
			}
		}
	}
}
</script>