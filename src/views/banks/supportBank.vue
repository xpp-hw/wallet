<template>
   <div class="contains">
        <div class="popup popup-bottom popup-banks" id="popup-banks" >
            <div class="popup-bottom__head">
                <a href="javascript:;" class="close" @click="hidebanks"></a>
                <h3 class="popup-bottom__title">支持绑定的银行列表</h3>
            </div>
            <div class="popup-banks-main">
                <img src="@/assets/images/banks_title.png" class="banks-title" alt="">
                <div class="banks-scroll" id="bankslist">
                    <img src="@/assets/images/banks.png" class="banks-pic" alt="">
                </div>
            </div>
        </div>
   </div>
</template>

<script>

export default {
    name: 'supportBank',
    components: {
    },
    data() {
        return {
        };
    },
    mounted() {
    },
    methods: {
        hidebanks() {
            this.$router.go(-1);
        }
    }
};
</script>
<style lang="less" scoped>
.contains {
    #popup-banks{
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        min-height: 10.64rem;
        background-color: #fff;
        border-top-left-radius: 0.2rem;
        border-top-right-radius: 0.2rem;
        .popup-bottom__head{
            position: relative;
            .close {
                position: absolute;
                right: 0.3rem;
                top: 0.3rem;
                z-index: 2;
                display: inline-block;
                width: 0.4rem;
                height: 0.4rem;
                background: url(../../assets/images/bank_close_icon.png) no-repeat;
                background-size: 100%;
            }
            .popup-bottom__title {
                font-size: 0.34rem;
                color: #333;
                line-height: 1.3rem;
                text-align: center;
            }
        }
        .popup-banks-main {
            width: 6.5rem;
            margin: 0 auto;
            .banks-scroll {
                max-height: 11rem;
                overflow-y: scroll;
            }
            img{
                vertical-align: top;
                width: 100%;
            }
        }
    }
}
</style>
