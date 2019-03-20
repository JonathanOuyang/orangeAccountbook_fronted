<template>
  <div id="view-personal">
		<div class="personal-group">
			<van-cell-group>
				<van-cell title="通用设置" is-link to="index" />
				<van-cell title="预算" is-link to="/budget" />
				<van-cell title="分类自定义" is-link to="/categoryManage" />
			</van-cell-group>
			<van-cell-group>
				<van-cell title="用户反馈" is-link to="index" />
				<van-cell title="关于我们" is-link to="index" />
			</van-cell-group>
			<van-cell-group>
				<van-cell 
					title="退出登录" 
					clickable
					@click="loginOut"/>
			</van-cell-group>
		</div>
  </div>
</template>

<script>
export default {
	name: "personal",
	methods: {
		loginOut() {
			this.$dialog.confirm({
        title: "提示",
        message: "确认退出登录？"
      }).then(() => {
				localStorage.removeItem('token')
				this.$router.push('/login')
			})
		}
	},
};
</script>

<style lang="less">
@import "../../assets/variable.less";
#view-personal {
	// display: flex;
	height: 100%;
	background-color: @grey;
}
.personal-group {
	.van-cell-group {
		background-color: @grey;
		margin-top: 10px;
	}
}
</style>