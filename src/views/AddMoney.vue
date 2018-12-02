<template>
    <div id="view-addMoney">
        <div class="addMoney-header">
            <icon name="quxiao" class="addMoney-header-icon"></icon>
            <div class="addMoney-header-tab">
                <van-tabs type="card" color="#f6717d">
                    <van-tab title="收入"></van-tab>
                    <van-tab title="支出"></van-tab>
                    <van-tab title="转账"></van-tab>
                </van-tabs>
            </div>
            <icon name="queren" class="addMoney-header-icon"></icon>
        </div>
        <div class="addMoney-val">
            <div class="addMoney-val-account">
                <!-- <div class="account-icon">
                    <icon name="zhifubaob"></icon>
                </div> -->
                <div class="account-name">支付宝</div>
            </div>
            <div class="addMoney-val-money">¥80.00</div>
        </div>
        <van-swipe :autoplay="0" indicator-color="#f6717d">
            <van-swipe-item>
                <div class="addMoney-type">
                    <type-icon :type="0" name-position="bottom" v-for="i in 15" class="addMoney-type-item"></type-icon>
                </div>
            </van-swipe-item>
            <van-swipe-item>
                <div class="addMoney-type">
                    <type-icon :type="0" name-position="bottom" v-for="i in 15" class="addMoney-type-item"></type-icon>
                </div>
            </van-swipe-item>
        </van-swipe>
        <div class="addMoney-tagBar"></div>
        <div class="addMoney-infoBar">
            <div class="addMoney-infoBar-date" slot="label">
                <icon name="rili30"></icon>
            </div>
            <van-cell-group>
                <van-field v-model="value" placeholder="请输入用户名" />
            </van-cell-group>
        </div>
        <div class="addMoney-numberKeyborad">
            <van-number-keyboard
            :show="true"
            extra-key="."
            @blur="show = false"
            theme="custom"
            />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'addMoney',
        data(){
            return {
                value: ''
            }
        }
    }
</script>

<style lang="less">
    @import "../assets/variable.less";
    #view-addMoney {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        color: @primaryTextColor;
        background-color: #fff;        
        &::after {
            content: '';
            width: 100%;
            height: 216px;
        }
    }
    .addMoney-header {
        padding: 12/@rem 18/@rem;
        display: flex;
        align-items: center;
        border-bottom: 1px solid @dividerColor;
        &-icon {
            font-size: 18/@rem;
        }
        &-tab {
            flex: 1;
        }
    }
    .addMoney-val {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 70/@rem;
        border-bottom: 1px solid @dividerColor;
        &-account {
            display: flex;
            align-items: center;
            padding: 0 40/@rem 0 20/@rem;
            height: 60%;
            border-right: 1px solid @dividerColor;
            font-size: 20/@rem;
            .account-icon {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 36/@rem;
                height: 36/@rem;
                border-radius: 4/@rem;
                background: #2873ff;
                color: #fff;
                font-size: 36/@rem;
            }
        }
        &-money {
            font-size: 36/@rem;
            padding: 0 12/@rem;
        }
    }

    .van-swipe{
        flex:1;

        .addMoney-type {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            height: 90%;
            padding: 12/@rem 18/@rem 16/@rem;
            &-item {
                width: 20%;
                margin: 6/@rem 0;
            }
        }
    }

    .addMoney-infoBar {
        display: flex;
        align-items: center;
        background: #fff;
        // border-top: 1px solid @dividerColor;
        .addMoney-infoBar-date {
            padding: 0 16px;
            border-right: 1px solid @dividerColor;
            .iconfont {
                font-size: 26px;
            }
        }
    }

    .addMoney-tagBar {
        display: flex;
        align-items: center;
        height: 32px;
        width: 100%;
        border-top: 1px solid @dividerColor;
    }
</style>