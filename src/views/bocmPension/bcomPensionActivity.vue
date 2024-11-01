<!--
 * @Author: 赵宏峰 zhao_hf@hisuntech.com
 * @Date: 2024-05-24 11:04:40
 * @LastEditors: 赵宏峰 zhao_hf@hisuntech.com
 * @LastEditTime: 2024-10-22 17:07:51
 * @FilePath: \wallet\src\views\bocmPension\bcomPensionActivity.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="wrap">
        <div class="header">
            <!-- 规则 -->
            <div class="rules" @click="showActivityRules"></div>
            <!-- 奖品 -->
            <div class="prizes" @click="showMyPrize"></div>
        </div>

        <div class="main">
            <!-- 领取 -->
            <div class="activityBtn" id="topBtn" v-if="WhichBtn.url" @click="openOrReceive">
                <img :src="WhichBtn.url" alt="">
            </div>
        </div>

        <!-- 说明 -->
        <div class="tab1"></div>
        <div class="title_tab"></div>
        <div class="tabContent" :style="{marginBottom: (showBottomBtn && WhichBtn.url) ? '2.8rem' : '0.5rem' }">
            <img v-for="(item,index) in tabImgList" :key="index" :src="item.url" :style="{height: item.height}" alt="">
        </div>

        <!-- 底部按钮 -->
        <div class="bottomNav" v-show="showBottomBtn && WhichBtn.url">
            <div class="bottomBtn" @click="openOrReceive">
                <div class="jiaobiao" v-if="WhichBtn.type == 'open'"></div>
                <img :src="WhichBtn.url" alt="">
            </div>
        </div>

        <div class="tankuang" v-if="tankuang">
            <div class="rulesBg" v-show="showRules">
                <div class="rulestop">
                    <p class="rulesTitle">活动规则</p>
                    <div class="close" @click="closePop"></div>
                </div>
                <div class="rulesContent" v-html="agreementContent"></div>
            </div>

            <!-- 活动已结束 -->
            <div class="timeOver" v-if="timeOver">
                <div class="OK time_btn" @click="closePop"></div>
            </div>

            <!-- 无奖品 -->
            <div class="noPrize" v-if="noPrize">
                <div class="OK no_btn" @click="closePop"></div>
            </div>

            <!-- 奖品列表 -->
            <div class="myPrize" v-if="showPrize">
                <div class="prizeNav">
                    <div class="prizeLine" v-for="item,index in prizeList" :key="index" :style="{paddingRight: (item.sts == '1' || item.sts == '1') ? '0.25rem' : '0.35rem' }">
                        <p>{{ item.ordAmt }}</p>
                        <p>{{ item.ordDate }}</p>
                        <p style="color: #59A410;">{{ item.status }}</p>
                    </div>
                </div>
                <div class="OK prize_btn" @click="closePop"></div>
            </div>

        </div>

    </div>
</template>

<script>
import api from '@/common/apiUrls';
import * as store2 from "@/common/localstore";

export default {
    name: 'bcomPensionActivity',
    data() {
        return {
            WhichBtn: {
                url: '',
                type: ''
            },
            tankuang: false,
            showRules: false,
            noPrize: false,
            timeOver: false,
            showPrize: false,
            btnImgList: [
                require("@/assets/images/BOCM/receiveBtn.png"),
                require("@/assets/images/BOCM/activateBtn.png"),
                require("@/assets/images/BOCM/partInBtn.png"),
                require("@/assets/images/BOCM/notNewBtn.png"),
            ],
            tabImgList: [
                {
                    url: require("@/assets/images/BOCM/img1.png"),
                    height: '3.26rem'
                },
                {
                    url: require("@/assets/images/BOCM/img2.png"),
                    height: '2.14rem'
                },
                {
                    url: require("@/assets/images/BOCM/img3.png"),
                    height: '2.38rem'
                },
                {
                    url: require("@/assets/images/BOCM/img4.png"),
                    height: '1.86rem'
                },
                {
                    url: require("@/assets/images/BOCM/img5.png"),
                    height: '1.9rem'
                },
                {
                    url: require("@/assets/images/BOCM/img6.png"),
                    height: '2.54rem'
                },
            ],
            showBottomBtn: false,
            agreementContent: "",
            prizeList: []
        };
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll) // 监听页面滚动
        this.reciveRecordQuery()
        // this.prizeReceive()
    },
    created() {
      api.getEncrypt({})
      .then((data) => {
        let emsKey = data.encryptKey || ''
        if(process.env.VUE_APP_ENV == 'local' || process.env.VUE_APP_ENV == 'sit') {
          gdp('setUserId', emsKey); // 此处填写用户手机号
        } else {
          if(this.$client.LEADEON) {
            gdp('setUserId', emsKey); // 此处填写用户手机号
          }
        }
      })
    },
    methods: {
        openOrReceive() {
            if(this.WhichBtn.type == 'receive') {
                this.prizeReceive()
            } else if(this.WhichBtn.type == 'open') {
                this.$router.push({
                    path: "/bocmPension/empowerMiddle",
                    query: {}
                })
            }
        },
        // 奖品领取
        prizeReceive() {
            this.$store.commit('LOADING', true);
            api.newUserReceive({
                mobileNo: store2.default.get("usrmob") || "",
                orgCode: 'BOCM'
            })
            .then(res => {
                this.$store.commit('LOADING', false);
                if(res.msgCd = 'BUS00000') {
                    this.$toast.info('领取成功~')
                    this.reciveRecordQuery()
                } else {
                    this.$toast.info('领取失败~')
                    this.reciveRecordQuery()
                }
            })
            .catch(() => {
                this.$store.commit('LOADING', false);
                this.$toast.info('领取失败~')
                this.reciveRecordQuery()
            })
        },
        // 奖品发放记录
        queryPrizeList() {
            api.getPrizeInfo({
                activityId: "",
                mobNo: store2.default.get("usrmob") || "",
                chnNo: "13",
            })
            .then(res => {
                
            })
        },
        // 养老金账户开户状态查询
        queryPensionOpen() {
            this.$store.commit('LOADING', true);
            api.openStsQuery({})
            .then(data => {
                this.$store.commit('LOADING', false);
                // openStatus 开户状态 1-已开户 2-未开户 3-开户中 4-已销户 5-开户失败
                // userType 01-新户，02-非新户
                if(data.openStatus == '1' && data.userType == '01') {
                    this.WhichBtn.url = this.btnImgList[0] // 立即领取按钮
                    this.WhichBtn.type = 'receive'
                } else if(data.openStatus == '1' && (data.userType == '02' || !data.userType)) {
                    this.WhichBtn.url = this.btnImgList[3] // 不能领取按钮
                    this.WhichBtn.type = ''
                } else {
                    this.WhichBtn.url = this.btnImgList[1] // 开户按钮
                    this.WhichBtn.type = 'open'
                }
            })
            .catch(() => {
                this.$store.commit('LOADING', false);
            })
        },
        // 领取记录查询
        reciveRecordQuery() {
            this.$store.commit('LOADING', true);
            api.getPrizeInfo({
                activityId: "", // 活动编号
                mobNo: store2.default.get("usrmob") || "",
                chnNo: "13", // 渠道号
            })
            .then(res => {
                this.$store.commit('LOADING', false);
                if (res.prizeTjnInfo && res.prizeTjnInfo.length > 0){
                    // 有记录
                    this.WhichBtn.url = this.btnImgList[2] // 已参与按钮
                    this.WhichBtn.type = ''

                    this.prizeList = res.prizeTjnInfo;
                    this.prizeList.forEach(data => {
                        switch(data.sts) {
                            case '0':
                                data.status = '未领取'
                                break;
                            case '1':
                                data.status = '领取成功'
                                break;
                            case '2':
                                data.status = '领取失败'
                                break;
                            case '3':
                                data.status = '领取中'
                                break;
                        }
                    })

                } else {
                    this.queryPensionOpen()
                }
            })
            .catch(() => {
                this.$store.commit('LOADING', false);
                this.queryPensionOpen()
            })
        },
        queryAgreement() {
            this.$store.commit('LOADING', true);
            api.huataiAgreement({
                businessCode: "jhyljxhhd",
                businessType: 'WHOLE'
            })
            .then((res) => {
                this.$store.commit('LOADING', false);
                this.agreementContent = res.content.replace(/font-size/g,'').replace(/line-height/g,'').replace(/font-family/g,'');
            })
            .catch(() => {
                this.$store.commit('LOADING', false);
            })
        },
        // 获取页面滚动距离
	    handleScroll () {
            if(!this.WhichBtn.url) {
                return
            }
            let topBtn = document.getElementById('topBtn')
            let scrollResult = this.elementIsVisibleInViewport(topBtn,true)
            if(!scrollResult) {
                this.showBottomBtn = true
            } else {
                this.showBottomBtn = false
            }
            console.log(scrollResult,'---')
	    },
        showActivityRules() {
            this.tankuang = true;
            this.showRules = true;
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
            this.queryAgreement()
        },
        showMyPrize() {
            this.tankuang = true;
            // this.timeOver = true;
            
            // this.queryPrizeList()
            if(this.prizeList.length > 0) {
                this.showPrize = true;

                document.documentElement.style.overflow = 'hidden';
                document.body.style.overflow = 'hidden';

            } else {
                this.noPrize = true;
            }
        },
        closePop() {
            this.tankuang = false;
            this.showRules = false;
            this.noPrize = false
            this.timeOver = false;
            this.showPrize = false;
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        },
        elementIsVisibleInViewport(el, partiallyVisible = false) {
            // 第一个参数是element  第二个参数是 是否部分可见也算可见  
            // 设置为false 即有一部份不可见即不可见
            // 设置为true 即部分可见即算是可见
            const {
                top,
                left,
                bottom,
                right
            } = el.getBoundingClientRect();
            const {
                innerHeight,
                innerWidth
            } = window;
            return partiallyVisible ?
                ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
                ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth)) :
                top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
        }

    },
    // 滚动重置
    beforeDestroy () {
        window.removeEventListener('scroll', this.handleScroll)
    },
};
</script>

<style lang="less" scoped>
.wrap {
    min-height: 100vh;
    background: #F3F4F6;
    overflow: hidden;
}
.header {
    position: relative;
    width: 100%;
    height: 803px;
    background: url('~@/assets/images/BOCM/pensionActivity_bg5.png') no-repeat;
    background-size: 100%;
    .rules {
        width: 121px;
        height: 50px;
        position: absolute;
        top: 220px;
        right: 0;
        background: url('~@/assets/images/BOCM/ruleBtn.png') no-repeat;
        background-size: 100%;
    }
    .prizes {
        width: 121px;
        height: 50px;
        position: absolute;
        top: 285px;
        right: 0;
        background: url('~@/assets/images/BOCM/prizeBtn.png') no-repeat;
        background-size: 100%;
    }
}
.main {
    position: relative;
    width: 713px;
    height: 768px;
    background: url('~@/assets/images/BOCM/pensionActivity_bg3.png') no-repeat;
    background-size: 100%;
    margin: -233px auto 0;
    overflow: hidden;
    .activityBtn {
        margin: 539px auto 0;
        width: 449px;
        height: 124px;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
.tab1 {
    width: 702px;
    height: 204px;
    margin: 33px auto 14px;
    background: url('~@/assets/images/BOCM/tab1.png') no-repeat;
    background-size: 100%;
}
.title_tab {
    width: 702px;
    height: 112px;
    margin: 0 auto;
    background: url('~@/assets/images/BOCM/title_nav.png') no-repeat;
    background-size: 100%;
}
.tabContent {
    padding: 22px 0 38px 0;
    box-sizing: border-box;
    margin: -35px auto 280px;
    width: 706px;
    border-radius: 16px 16px 16px 16px;
    background: #FFFFFF;
    img {
        width: 660px;
        margin: 0 23px 20px;
    }
    img:nth-last-of-type(1) {
        margin-bottom: 0;
    }
}
.tankuang {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(2, 2, 2, 0.7);
    z-index: 999;
    .rulesBg {
        position: absolute;
        bottom: 0;
        left: 0;
        .rulestop {
            position: relative;
            width: 750px;
            height: 120px;
            background: url('~@/assets/images/BOCM/activity/rulesBg.png') no-repeat;
            background-size: 100%;
            .rulesTitle {
                line-height: 120px;
                font-size: 38px;
                text-align: center;
                color: #6B110A;
                letter-spacing: 4px;
                font-weight: 600;
            }
            .close {
                position: absolute;
                top: 35px;
                right: 41px;
                width: 38px;
                height: 38px;
                background: url('~@/assets/images/BOCM/activity/close.png') no-repeat;
                background-size: 100%;
            }
        }
        .rulesContent {
            margin-top: -2px;
            width: 750px;
            height: 606px;
            background: #FFFFFF;
            font-size: 24px;
            text-align: justify;
            line-height: 36px;
            letter-spacing: 5px;
            color: #934d2b;
            box-sizing: border-box;
            padding: 10px 40px 20px;
            overflow: scroll;
        }
    }
    .timeOver {
        width: 566px;
        height: 651px;
        background: url('~@/assets/images/BOCM/activity/timeOver.png') no-repeat;
        background-size: 100%;
        .time_btn {
            margin: 473px auto 0;
        }
    }
    .noPrize {
        width: 588px;
        height: 609px;
        background: url('~@/assets/images/BOCM/activity/noPrize.png') no-repeat;
        background-size: 100%;
        .no_btn {
            margin: 428px auto 0;
        }
    }
    .myPrize {
        position: relative;
        width: 588px;
        height: 609px;
        background: url('~@/assets/images/BOCM/activity/myPrize.png') no-repeat;
        background-size: 100%;
        .prize_btn {
          width: 230px;
          height: 90px;
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
        }
        .prizeNav {
            width: 500px;
            margin: 270px auto 0;
            height: 238px;
            overflow: scroll;
            .prizeLine {
                display: flex;
                justify-content: space-between;
                box-sizing: border-box;
                padding-right: 25px;
                font-size: 24px;
                text-align: center;
                color: #363838;
                margin-bottom: 20px;
            }
        }
    }
}
.bottomNav {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 220px;
    background: #FFFFFF;
    overflow: hidden;
    .bottomBtn {
        position: relative;
        width: 450px;
        height: 124px;
        margin: 48px auto 0;
        img {
            width: 100%;
            height: 100%;
        }
        .jiaobiao {
            position: absolute;
            top: -22px;
            right: -48px;
            width: 177px;
            height: 57px;
            background: url('~@/assets/images/BOCM/jiaobiao_2.png') no-repeat;
            background-size: 100%;
        }
    }
}
.OK {
    width: 283px;
    height: 102px;
    background: url('~@/assets/images/BOCM/activity/ok_btn.png') no-repeat;
    background-size: 100%;
}
</style>
