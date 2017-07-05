//home.vue
<template>
	<div>
		
		<!-- tab-container -->
		<mt-tab-container v-model="active">
			<mt-tab-container-item id="message-container">
				1
			</mt-tab-container-item>
			<mt-tab-container-item id="work-container">
				2
			</mt-tab-container-item>
			<mt-tab-container-item id="my-container">
				<div class="container">
					
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
import messageSrc from '../static/icon/comments.svg'
import messageSrco from '../static/icon/commentso.svg'
import allSrc from '../static/icon/all.svg'
import allSrco from '../static/icon/allo.svg'
import accountSrc from '../static/icon/account.svg'
import accountSrco from '../static/icon/accounto.svg'
export default {
	data() {
		return {
			selected:'work',
			active:'work-container'
		}
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
	created () {
		// 组件创建完后调用的方法,获取数据
		//this.get_data()
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
		}
		// get_data: function(params) {
		// 	var v = this
		// 	if (!params) params = {}
		// 	// 我们这里用全局绑定的 $api 方法来获取数据
		// 	v.$api.get('TestServlet', params, function(r) {
		// 		v.lists = r.data
		// 	})
		// }
	}
}
</script>