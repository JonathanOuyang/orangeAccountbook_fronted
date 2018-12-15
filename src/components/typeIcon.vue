<template>
    <div class="typeIcon" :class="namePositionClass">
        <div class="typeIcon-icon" :class="{unSelected}">
            <Icon :name="incomeTypes[type].icon"></Icon>
        </div>
        <div class="typeIcon-name">{{incomeTypes[type].name}}</div>
    </div>
</template>

<script type="text/javascript">
    function MoneyType(name, icon, color) {
        this.name = name;
        this.icon = icon;
        // this.color = color;
    }
    export default {
        props: {
            type: {
                type: Number,
                required: true
            },
            isShowName: {
                type: Boolean,
                default: false
            },
            namePosition: {
                type: String,
                default: 'right'
            },
            unSelected: {
                type: Boolean,
                default: true
            }
        },
        data(){
            return {
                incomeTypes: [
                    new MoneyType('餐饮', 'canyin'),
                    new MoneyType('交通', 'jiaotong'),
                    new MoneyType('购物', 'gouwu')
                ]
            }
        },
        computed: {
            namePositionClass() {
                if (this.namePosition == 'right') {
                    return 'typeIcon-name-right';
                } else if (this.namePosition == 'bottom') {
                    return 'typeIcon-name-bottom';
                }
            }
        }
    }
</script>

<style lang="less">
    @import "../assets/variable.less";
    .typeIcon{
        display: flex;
        align-items: center;
        .typeIcon-icon{
            display: inline-block;
            width: 34/@rem;
            height: 34/@rem;
            border-radius: 50%;
            background: @primaryColor;
            color: @textPrimaryColor;
            text-align: center;
            .iconfont {
                line-height: 34/@rem;
                font-size: 24/@rem;
            }
            &.unSelected {
                background: #cccccc;
                color: @textPrimaryColor;
            }
        }
    }
    .typeIcon-name-right {
        .typeIcon-name{
            font-size: 20/@rem;
            margin-left: 8/@rem;
        }
    }
    .typeIcon-name-bottom {
        flex-direction: column;
        font-size: 20/@rem;
        .typeIcon-name{
            font-size: 16/@rem;       
        }
    }
</style>