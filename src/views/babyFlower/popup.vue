<template>
    <div class="popupwarp">
        <div class="succses">
            修改成功
        </div>
    </div>
</template>

<script>
export default {
    name: 'popup'
    
};
</script>

<style lang="less" scoped>
.popupwarp {
    z-index: 999;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;

    .succses {
        width: 384px;
        height: 95px;
        border-radius: 47.5px 47.5px 47.5px 47.5px;
        background: rgba(0, 0, 0, 1);
        font-size: 40px;
        color: #FFFFFF;
        text-align: center;
        line-height: 95px;
    }
}

</style>
