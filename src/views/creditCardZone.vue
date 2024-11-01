<!--
 * @Author: 赵宏峰 zhao_hf@hisuntech.com
 * @Date: 2024-06-03 09:09:11
 * @LastEditors: 赵宏峰 zhao_hf@hisuntech.com
 * @LastEditTime: 2024-06-03 13:53:22
 * @FilePath: \wallet\src\views\creditCardZone.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="wrap">
        <div class="head"></div>

        <div class="noCard" v-if="showCredit == '1' ">
            <div class="goLookBtn" @click="goActivity"></div>
        </div>

        <div v-if="showCredit == '2' ">
            <div class="creditCard" v-for="item,index in creditList" :key="index" :style="{marginTop: index == 0 ? '-2.38rem' : '' }" @click="goLink(item.url)">
                <img :src="item.logo" alt="">
            </div>
            <div class="bottomTip"></div>
            <div class="textLine">
                <p class="left_icon"></p>
                <p>以上具体权益详情，以各自信用卡业务页面及规则为准</p>
                <p class="right_icon"></p>
            </div>
        </div>

    </div>
</template>

<script>
import api from '@/common/apiUrls';

export default {
    name: 'creditCardZone',
    data() {
        return {
            showCredit: '0',
            creditList: [
                // require("@/assets/images/credit1.png"),
                // require("@/assets/images/credit2.png"),
                // require("@/assets/images/credit3.png"),
            ]
        }
    },
    mounted() {
        this.queryCardData()
    },
    methods: {
        queryCardData() {
            api.getDataList({})
            .then(res => {
                this.creditList = res.body
                if(this.creditList.length > 0) {
                    this.showCredit = '2'
                    this.creditList.sort(function(a,b) {
                        return a.sort - b.sort
                    })
                } else {
                    this.showCredit = '1'
                }
            })
            .catch(() => {
                
            })
        },
        goActivity() {
            this.$router.push({
                name: 'newFortune'
            })
        },
        goLink(url) {
            if(!url) {
                return
            }
            window.location.href = url
        }
    },
}
</script>

<style scoped lang="less">
.wrap {
    min-height: 100vh;
    background: #F4F3F8;
    overflow: hidden;
}
.head {
    width: 750px;
    height: 542px;
    background: url('~@/assets/images/zone_bg.png') no-repeat;
    background-size: 100%;
}
.noCard {
    overflow: hidden;
    width: 702px;
    height: 942px;
    background: url('~@/assets/images/noCard_bg.png') no-repeat;
    background-size: 100%;
    margin: -260px auto 0;
}
.goLookBtn {
    width: 495px;
    height: 96px;
    background: url('~@/assets/images/goLookOther_btn.png') no-repeat;
    background-size: 100%;
    margin: 700px auto 0;
}
.creditCard {
    width: 702px;
    height: 575px;
    margin: 0 auto 20px;
    img {
        width: 100%;
        height: 100%;
    }
}
.bottomTip {
    width: 700px;
    height: 110px;
    background: url('~@/assets/images/creditTip.png') no-repeat;
    background-size: 100%;
    margin: 0 auto 35px;
}
.textLine {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 45px;
}
.left_icon {
    width: 78px;
    height: 7px;
    background: url('~@/assets/images/left.png') no-repeat;
    background-size: 100%;
}
.right_icon {
    width: 78px;
    height: 7px;
    background: url('~@/assets/images/right.png') no-repeat;
    background-size: 100%;
}
</style>