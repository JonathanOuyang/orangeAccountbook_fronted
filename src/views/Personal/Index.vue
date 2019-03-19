<template>
  <div id="view-personal">
		<div class="personal-group">
			<van-cell-group>
				<van-cell title="通用设置" is-link to="index" />
				<van-cell title="预算" is-link to="/budget" />
				<van-cell title="分类自定义" is-link to="index" />
			</van-cell-group>
			<van-cell-group>
				<van-cell title="用户反馈" is-link to="index" />
				<van-cell title="关于我们" is-link to="index" />
			</van-cell-group>
			<van-cell-group>
				<van-cell title="退出登录" to="index" />
			</van-cell-group>
		</div>
  </div>
</template>

<script>
export default {
  name: "personal"
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