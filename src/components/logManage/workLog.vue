//workLog.vue
<template>
	<div class="workLog">	
		<!-- 内容 -->
		<div class="container">
			<div class="title-box">
				<img slot="icon" src="../../static/icon/left.svg" width="24" height="24" data="0" v-on:click="toPage">							
				<div class="m-office">
					工作日志
				</div>
				<div class="m-icon">
					<div class="office-icon">
						<img slot="icon" src="../../static/icon/ring.svg" width="24" height="24">
					</div>
				</div>
			</div>
			<div class="logArea">
				
			</div>
		</div>
		<div class="workLogBottom">
			<div class="myLog"  data="1" v-on:click="toPage">
				我的日志
			</div>
			<div class="writeLog"  data="2" v-on:click="toPage">
				写日志
			</div>

		</div>		
	</div>
</template>

<!-- script -->
<script>
export default {
	data() {
		return {
		}
	},
	mounted () {
		//渲染完以后执行，生命周期内只执行一次，初始化数据
		//yourSelfFlag = 1;
		var el = this;
		el.$index.ajax(this,'/phLog/queryOneselfAndSubLog.ph',null,function(data){
			//成功回调
			data = data.rows;
			var str = '';
			for (var i = 0; i <data.length; i++) {
			 	str += '<div class="logBox">'
			 		+ '<div class="logOne">'
			 		+ '<h3>'+data[i].userName+'</h3>'
			 		+ '<h4>'+data[i].titleName+'</h4>'
			 		+ '<div class="logContent">'+data[i].text+'</div>'
			 		+ '<p><span class="logTime">'+data[i].logTimeStr+'</span></p>'
			 		+ '</div>'
			 		+ '</div>'
			} 
			$('.workLog .container .logArea').append(str);
		})
	},
	methods: {
		toPage:function(){
			var el = event.currentTarget;
			var a = $(el).attr('data');
			if(a == 0){//本组件data属性设置为0的，页面前往home
				this.$router.push({path:'/home'});
			}else if (a == 1) {
				this.$router.push({path:'/myLog'});
			}else if (a == 2) {
				this.$router.push({path:'/writeLog'});
			}
		},
	}


}





</script>