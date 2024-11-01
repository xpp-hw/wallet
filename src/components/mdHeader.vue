<template>
    <div class="headNav" v-show="navShow">
        <span class="leftBack" @click="clickLeft">
            <md-icon v-show="arrowShow" class="arrowIco" name="arrow-left"></md-icon>
            <span>返 回</span>
        </span>
        <span class="titleTxt">{{ this.$route.meta.title }}</span>
        <span v-if="titleR" class="titleR" @click="clickRight">{{ titleR }}</span>
    </div>
</template>

<script>
import { Icon } from 'mand-mobile';

export default {
    name: 'mdHeader',
    props: {
        navShow: {
            type: Boolean,
            default: true
        },
        arrowShow: { // 返回箭头是否展示
            type: Boolean,
            default: true
        },
        title: { // 标题
            type: String,
            default: '移动钱包'
        },
        titleR: { // 右侧文字
            type: String,
            default: ''
        }
    },
    components: {
        [Icon.name]: Icon
    },
    data() {
        return {
        };
    },
    methods: {
        clickRight() {
            this.$emit('clickRight');
        },
        clickLeft() {
            if (this.$listeners.clickLeft) {
                this.$emit('clickLeft');
            } else {
                this.$router.go(-1);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.headNav {
    background-color: #FFF;
    text-align: center;
    height: 88px;
    line-height: 88px;
    position: relative;
    .leftBack {
        .arrowIco{
            color:#238FF2;
            font-size: 34px;
            position:absolute;
            left:36px;
            top:50%;
            transform:translateY(-50%);
        }
        span {
            position:absolute;
            left:80px;
            top:50%;
            transform:translateY(-50%);
            width: 100px;
            height: 48px;
            opacity: 1;
            font-size: 34px;
            font-weight: 400;
            text-align: left;
            color: #238ff2;
            line-height: 48px;
        }
    }
    .titleTxt{
        color: #13252E;
        font-size: 36px;
    }

    .titleR{
        color: #553CD9;
        font-size: 28px;
        position: absolute;
        right: 30px;
    }
}
</style>
