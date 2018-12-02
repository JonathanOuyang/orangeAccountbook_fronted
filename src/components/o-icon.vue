<template>
  	<i class="iconfont" :class="'icon-'+name"></i>
</template>

<script type="text/javascript">
export default {

  	props: {
  		name:{
  			type: String,
  			required: true
		},
		link: {
			type: String
		}
  	}
}
</script>

<style lang="less">
@import '../assets/icon/iconfont.css';
</style>
