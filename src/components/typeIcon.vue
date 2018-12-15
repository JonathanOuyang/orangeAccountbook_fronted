<template>
    <div class="typeIcon" :class="namePositionClass" @click="handleClick">
        <div class="typeIcon-icon" :class="{'unSelected':checker&&!selected}">
            <Icon :name="icon"></Icon>
        </div>
        <div class="typeIcon-name">{{name}}</div>
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
            name: {
                type: String
            },
            icon: {
                type: String
            },
            isShowName: {
                type: Boolean,
                default: false
            },
            namePosition: {
                type: String,
                default: 'right'
            },
            checker: {
                type: Boolean,
                default: false
            },
            selected: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {}
        },
        computed: {
            namePositionClass() {
                if (this.namePosition == 'right') {
                    return 'typeIcon-name-right';
                } else if (this.namePosition == 'bottom') {
                    return 'typeIcon-name-bottom';
                }
            }
        },
        methods: {
            handleClick(){
                this.$emit('select')
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
            font-size: 20/@rem;
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
            margin-left: 8/@rem;
        }
    }
    .typeIcon-name-bottom {
        flex-direction: column;
        .typeIcon-name{
            margin-top: 2px;
            font-size: 14/@rem;       
        }
    }
</style>