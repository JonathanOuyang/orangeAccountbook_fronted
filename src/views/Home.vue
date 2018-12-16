<template>
  <div id="view-home">
    <header>
		<div class="home-header-banner">
			<div class="home-title">
				<div class="text-book">
					{{bookName}}<Icon name="genghuan" :size="22" style="margin-left: 0.1rem"></Icon>
				</div>
				<div class="text-extra">
					您已连续记账{{moneyDay}}天
				</div>
			</div>
		</div>
		<div class="home-panel">
			<div class="home-panel-text">
				<div class="home-panel-outcome">
					<div class="info-title">本月支出</div>
					<div class="info-value">1200</div>
				</div>
				<div class="home-panel-income">
					<div class="info-title">本月收入</div>
					<div class="info-value">2000</div>
				</div>
			</div>
			<div class="info-budget"></div>
		</div>
	</header>
	<div class="home-button-group">
		<router-link class="home-button" tag="div" to="/calendar">
			<icon name="rili" class="button-icon"></icon>
			所有账单
		</router-link>
		<router-link class="home-button" tag="div" to="/chart">
			<icon name="tubiaobingzhuangtu" class="button-icon"></icon>
			财务报表
		</router-link>
	</div>
	<div class="moneyList">
		<div class="title-moneyList">
			<span>近期新增账单</span>
		</div>
		<money-list :data="moneys"></money-list>
	</div>
  </div>
</template>

<script>
export default {
	name: 'home',
	data(){
		return {
			bookName: '生活账本',
			moneyDay: 1,
			moneys: [
				{
					date: new Date(2018, 9, 30),
					type: 0,
					value: 80,
					isOutcome: true
				},
				{
					date: new Date(2018, 9, 30),
					type: 1,
					value: 65,
					isOutcome: false
				},
				{
					date: new Date(2018, 9, 30),
					type: 0,
					value: 80,
					isOutcome: true
				},
				{
					date: new Date(2018, 9, 29),
					type: 2,
					value: 80,
					isOutcome: true
				}
			]
		}
	}
}
</script>

<style lang="less">
	@import "../assets/variable.less";
	#view-home{
	    height: 100%;	
		color: @primaryTextColor;
	}
	.home-header-banner {
		.header-background(120);

		.text-book {
			font-size: 24/@rem;
		}
		.text-extra {
			font-size: 14/@rem;
			margin-top: 4/@rem;
		}
	}

	.home-panel {
		width: 66%;
		height: 120/@rem;
		display: flex;
		align-items: center;
    	border-radius: 10px;
    	padding: 0 30/@rem;
		.info-panel(-12.5%);
		.home-panel-text {
			display: flex;
			flex-direction: column;
			flex: 1;
		}
		.home-panel-outcome {
			flex: 1;	
			.info-title{
				font-size: 16/@rem;
			}
			.info-value {
				font-size: 36/@rem;
				margin-left: -4/@rem; 
			}
		}
		.home-panel-income {
			display: flex;
			.info-title, .info-value{
				font-size: 16/@rem;
			}
			.info-title {
				margin-right: 6px;
			}
		}
		.info-budget {
			width: 90/20em;
			height: 90/20em;
			border-radius: 50%;
			background: @primaryColor;
		}
	}

	.home-button-group {
		display: flex;
		// justify-content: center;
		margin: 0 auto;
		width: 80%;
		.home-button {
			margin: 6/@rem;
			padding: 12/@rem 0;
			flex: 1;
			border-radius: 4px;
			background: @linearColor;
			font-size: 16/@rem;
			color: @textPrimaryColor;
			text-align: center;
			.button-icon {
				font-size: 16/@rem;
			}
		}
	}

	.moneyList {
		margin-top: 22/@rem;
		padding: 0 20/@rem;
		.title-moneyList {
			font-size: 16/@rem;
			margin: 18/@rem 0;
		}
	}

</style>