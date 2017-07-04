//App.vue
<template>
	<div>
		<router-view
		class="view"
		keep-alive
		transition
		transition-mode="out-in">
		</router-view>
	</div>
</template>
<!-- SCRIPT -->
<script>
export default {
	components: {
	//调用组件
	}
}
</script>
<!-- STYLE -->
<style lang="scss">
	@import "./style/style.scss";
</style>
