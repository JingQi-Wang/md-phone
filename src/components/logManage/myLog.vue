//myLog.vue
<template>
	<div class="myLog">	
		<!-- 内容 -->
		<div class="container">
			<div class="title-box">
				<img slot="icon" src="../../static/icon/left.svg" width="24" height="24" data="0" v-on:click="toPage">							
				<div class="m-office">
					我的日志
				</div>
				<div class="m-icon">
					<div class="office-icon">
						<img slot="icon" src="../../static/icon/ring.svg" width="24" height="24">
					</div>
				</div>
			</div>
			<div class="logArea">
				<div class="logBox" v-for="item of items" data="1" v-on:click="toPage">
			 		<div class="logOne" v-bind:id="item.workOfficeLogId">
				 		<h3> {{item.userName}} </h3>
				 		<h4> {{item.titleName}} </h4>
				 		<div class="logContent"> {{item.text}} </div>
				 		<p><span class="logTime">  {{item.logTimeStr}} </span></p>
			 	</div>
			 </div>
			</div>
		</div>
	</div>
</template>


<!-- script -->
<script>

export default {
	data() {
		return {
			items:[]
		}
	},
	mounted () {
		var el = this;
		el.$index.ajax(this,'/phLog/queryYourselfLog.ph',{yourSelfFlag:1},function(data){
			el.items = data.rows;
		});
	},
	methods: {
		toPage:function(){
			var el = event.currentTarget;
			var a = $(el).attr('data');
			if(a == 0){//本组件data属性设置为0的，页面前往home
				this.$router.push({path:'/workLog'});
			}else if (a == 1) {
				var info = {
					userName:$.trim($(el).find('h3').text()),
					titleName:$.trim($(el).find('h4').text()),
					text:$.trim($(el).find('.logContent').text()),
					logTimeStr:$.trim($(el).find('.logTime').text()),
					workOfficeLogId:$(el).find('.logOne').attr('id')
				}
				$.extend(this.$log,info);
				this.$router.push({path:'/editLog'});
			}
		},

	}


}





</script>