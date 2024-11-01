<template>
  <div class="container">
    <div class="top">
      <div class="rules" @click="popFlag = true"></div>
    </div>
    <div class="body">
      <div class="step_wrap">
        <div class="step_banner"></div>
        <div v-if="b2cStatus === '1'" class="btn" @click="register"></div>
        <div v-else class="btn1" @click="exchange"></div>
        <div class="hot_wrap">
          <div class="list_icon" name="scrollBox">
            <div v-for="(item,index) in iconList" :key="index" class="list_icon_item" name="scrollBoxList">
              <img :src="item.icon" alt="" srcset="">
              <p v-html="item.title"></p>
              <p v-html="item.subtitle"></p>
            </div>
          </div>
          <p class="foot_text">注意:商品所需积分请以积分商城页面展示为准~</p>
        </div>
      </div>
      <div class="know_wallet">
        <div class="konw_title">
          <div class="konw_icon"></div>
        </div>
        <div class="konw_body">
          <div class="arrow_wrap">
            <div class="isKonw">
              <div v-for="(item,index) in walletList" :key="index" class="isKonw_item">
                <img :src="item.icon" alt="">
                <div class="item_text">
                  <p>{{item.title}}</p>
                  <p>{{item.subtitle}}</p>
                </div>
              </div>
            <div class="isKonw_text">移动钱包是江苏移动与各银行、第三方支付机构合作，由零钱账户(和包支付账户)、银行卡(和包账户绑定的银行卡)、电子账户(银行Ⅱ、Ⅲ类户)以及丰富的异业金融产品及权益组成，是<span class="orange">免费开户和使用</span>的哦，<span class="orange">月用月省钱!</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="img_wrap"></div>
    </div>
    <!-- 规则弹窗 -->
    <pop v-if="popFlag" @closePop='closePop' :rulesContent='rulesContent'></pop>
  </div>
</template>

<script>
import api from '@/common/apiUrls';
import pop from './compoments/pop.vue';

export default {
    components: {
        pop
    },
    data() {
        return {
            popFlag: false,
            b2cStatus: '0',
            rulesContent: '',
            iconList: [
                {
                    icon: require('../../assets/images/registerSendPoints/hot_icon1.png'),
                    title: "<span style='color:#F36111'>11元</span>银联",
                    subtitle: '<p>组合券包</p>'
                },
                {
                    icon: require('../../assets/images/registerSendPoints/hot_icon2.png'),
                    title: "<span style='color:#F36111'>1GB</span>",
                    subtitle: '流量日包'
                },
                {
                    icon: require('../../assets/images/registerSendPoints/hot_icon3.png'),
                    title: "<span style='color:#F36111'>2元</span>支付宝",
                    subtitle: "<span style='color:#F36111'>话费红包</span>"
                },
                {
                    icon: require('../../assets/images/registerSendPoints/hot_icon4.png'),
                    title: '1天优酷',
                    subtitle: 'VIP会员'
                },
                {
                    icon: require('../../assets/images/registerSendPoints/hot_icon5.png'),
                    title: '2元高德',
                    subtitle: '打车立减券'
                },
                {
                    icon: require('../../assets/images/registerSendPoints/hot_icon6.png'),
                    title: '2元惠行',
                    subtitle: '停车券'
                },
                {
                    icon: require('../../assets/images/registerSendPoints/hot_icon3.png'),
                    title: "<span style='color:#F36111'>1元</span>支付宝",
                    subtitle: "<span style='color:#F36111'>话费红包</span>"
                },
                {
                    icon: require('../../assets/images/registerSendPoints/hot_icon3.png'),
                    title: "<span style='color:#F36111'>1元</span>支付宝",
                    subtitle: "<span style='color:#F36111'>转账红包</span>"
                }
            ],
            walletList: [
                {
                    icon: require('../../assets/images/registerSendPoints/wallet_icon1.png'),
                    title: '充话费 享优惠',
                    subtitle: '月月享7元话费充值券'
                },
                {
                    icon: require('../../assets/images/registerSendPoints/wallet_icon2.png'),
                    title: '1分钱 抢福利',
                    subtitle: '1GB通用流量'
                },
                {
                    icon: require('../../assets/images/registerSendPoints/wallet_icon3.png'),
                    title: '攒闲钱 返奖励',
                    subtitle: '月月最高6.6元话费+3GB流量'
                }
            ],
            leftEnd: false
        };
    },
    mounted() {
        this.getInfoList();
        this.queryRules();
        this.updateScrollTop();
    },
    methods: {
        updateScrollTop() {
            const scrollList = document.getElementsByName('scrollBox');
            for (let i = 0; i < scrollList.length; i++) {
                const x = scrollList[i];
                this.scrollThen(x);
            }
        },
        async scrollThen(x) {
            do {
                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, 30);
                });
                if (Math.ceil(x.clientWidth + x.scrollLeft) >= Math.ceil(x.scrollWidth)) {
                    this.leftEnd = true;
                } else if (x.scrollLeft == 0) {
                    this.leftEnd = false;
                }
                if (this.leftEnd) {
                    x.scrollLeft -= 1;
                } else {
                    x.scrollLeft += 1;
                }
            } while (true);
        },

        queryRules() {
            api.huataiAgreement({
                businessCode: 'hbzcsjfhd',
                businessType: 'WHOLE'
            })
                .then((res) => {
                    this.rulesContent = res.content.replaceAll('px', '');
                });
        },
        closePop() {
            this.popFlag = false;
        },
        // 获取和包信息
        getInfoList() {
            this.$store.commit('LOADING', true);
            api.B2CWallet.infoList().then((res) => {
                this.b2cStatus = res.state;
                this.$store.commit('LOADING', false);
            }).catch((err) => {
                this.$store.commit('LOADING', false);
            });
        },
        // 去注册
        register() {
            this.$router.push({
                name: 'hbOpen',
                query: {
                    backUrl: `https://fintech.12580life.com${process.env.BASE_URL}registerSendPoints`
                }
            });
        },
        // 去领取
        exchange() {
            window.location.href = 'https://p.10086.cn/i/HX/zhmWb';
        }
    }
};
</script>

<style lang="less" scoped>
.container{
  height: 100vh;
  background: #00D0FF ;
  overflow-y: auto;
  background-size:100% ;
  .top{
    height: 770px;
     background:url('../../assets/images/registerSendPoints/top_bg.png') no-repeat;
     background-size:100% ;
     position: relative;
     .rules{
      height: 102px;
      width: 48px;
      background:url('../../assets/images/registerSendPoints/rules_icon.png') no-repeat;
      background-size:100% ;
      position: absolute;
      top: 30px;
      right: 0;
     }
  }
  .body{
    padding: 0 24px 0 6px;
    position: relative;
    .step_wrap{
      margin-top: -380px;
      height: 579px;
      background: url('../../assets/images/registerSendPoints/step_bg.png') no-repeat;
      background-size:100% ;
      padding: 99px 26px 27px 39px;
      .step_banner{
        height: 155px;
        width: 624px;
        background: url('../../assets/images/registerSendPoints/step_banner.png') no-repeat;
        background-size:100% ;
        margin: 0 auto;
      }
      .btn{
        height: 149px;
        width: 503px;
        background: url('../../assets/images/registerSendPoints/register_btn.png') no-repeat;
        background-size:100% ;
        margin: 19px auto 0;
      }
      .btn1{
        height: 149px;
        width: 503px;
        background: url('../../assets/images/registerSendPoints/exchange_btn.png') no-repeat;
        background-size:100% ;
        margin: 19px auto 0;
      }
      .hot_wrap{
        height: 242px;
        background: url('../../assets/images/registerSendPoints/hot_bg.png') no-repeat;
        background-size:100% ;
        position: relative;
        padding:16px 0 43px 103px;
        box-sizing: border-box;
        .list_icon{
          // width: 550px;
          display: flex;
          overflow-x: auto;
          overflow-y: hidden;
          &::-webkit-scrollbar{
            display: none;
          }
          .list_icon_item{
            margin-right: 50px;
            text-align: center;
          }
          p{
            font-size: 24px;
            color: #344A62;
            font-weight: 700;
            text-align: center;
            white-space: nowrap;
          }
          img{
            width: 100px;
            height: 100px;
            margin-bottom: 5px;
          }
        }
        .foot_text{
          position: absolute;
          bottom: 7px;
          left: 20px;
          color: #344A62 100%;
          font-size: 22px;
        }
      }
    }
    .know_wallet{
      margin-top: 10px;
      padding-bottom: 27px;
      .konw_title{
        height: 155px;
        background: url('../../assets/images/registerSendPoints/isWallet.png') no-repeat;
        background-size:100% ;
        position: relative;
        z-index: 1;
      }
      .konw_icon{
        height: 43px;
        width: 229px;
        background: url('../../assets/images/registerSendPoints/wallet_title.png') no-repeat;
        background-size:100% ;
        position: absolute;
        bottom: -5px;
        left: 40px;
      }
      .konw_body{
        background: #ffffff;
        margin-left: 18px;
        margin-top: -15px;
        border-radius:0 0 30px 30px;
        position: relative;
        padding: 20px;
        .arrow_wrap{
          background: url('../../assets/images/registerSendPoints/bottom_arrow.png') no-repeat;
          background-size:100%;
          padding-top:34px ;
          margin-top: 10px;
          .isKonw{
            background: #EDFBFE;
            border-radius: 20px;
            padding: 0 18px 46px 18px;
            .isKonw_item{
              display: flex;
              background: #D7F7FE;
              padding: 21px 0 15px 25px;
              margin-bottom: 14px;
              border-radius: 14px;
              .item_text{
                margin-left: 36px;
                p:nth-of-type(1){
                  font-size: 30px;
                  color: #21272D 100%;
                  font-weight: 800;
                  margin-top: 10px;
                }
                p:nth-of-type(2){
                  font-size: 26px;
                  color: #797A7C;
                  font-weight: 500;
                  margin-top: 10px;
                }
              }
              img{
                width: 100px;
                height: 100px;
              }
            }
          }
          .isKonw_text{
            color: #213346;
            font-size: 26px;
            line-height: 1.5;
            margin-top: 20px;
          }
          .orange{
            color: #F36111;
            font-weight: 800;
          }
        }
      }
    }
    .img_wrap{
      height: 32px;
      width: 415px;
      margin: auto;
      background: url('../../assets/images/registerSendPoints/bottom_title.png') no-repeat;
      background-size:100% ;
      margin-bottom: 150px;
    }
  }
}
</style>
