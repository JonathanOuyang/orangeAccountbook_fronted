<template>
    <div class="infoPanel"
        :style="{ 
            width: width,
            height: height+'rem'
        }">
        <slot></slot>
    </div>
</template>

<script type="text/javascript">
    export default {
        
    }
</script>

<style lang="less">
@import "../assets/variable.less";    
    
</style>