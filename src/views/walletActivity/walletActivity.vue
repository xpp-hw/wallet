<template>
  <div>
    <div class="activity">
      <div class="bottom">
        <div class="cont">
          <div class="card" v-for="(item, idx) in itemList" :key="idx" :id="item.id" @click="jumpTo(item.link)">
            <img :src="item.imgUrl" alt="">
            <div class="btn">{{item.title}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { browser } from '@/common/publicFunc.js';
import { initPageJs } from '@/common/Page2435_1_fn.js';

export default {
    name: 'walletActivity',
    data() {
        return {
            // itemList: [
            //     {
            //         imgUrl: require('../../assets/images/activity/10yuan_ktqb.png'),
            //         title: '立即开通',
            //         id: 'B01',
            //         link: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/openAccount/khEmpower'
            //     },
            //     {
            //         imgUrl: require('../../assets/images/activity/10yuan_hf.png'),
            //         title: '去充值',
            //         id: 'B02',
            //         link: 'https://wap.js.10086.cn/WSCZYLQBCS.thtml'
            //     },
            //     {
            //         imgUrl: require('../../assets/images/activity/10yuan_hfb.png'),
            //         title: '我要赚话费',
            //         id: 'B03',
            //         link: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/telephoneCharges/description'
            //     },
            //     {
            //         imgUrl: require('../../assets/images/activity/3gb.png'),
            //         title: '我要赢流量',
            //         id: 'B04',
            //         link: 'https://p.12580life.com/wps/service/WalletToActPage.xhtml'
            //     }
            // ],
            itemList: [
                // {
                //     imgUrl: require('../../assets/images/activity/item_1.png'),
                //     title: '领取',
                //     id: 'B01',
                //     link: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/openAccount/khEmpowersourceChannel=' +(this.$route.query.sourceChannel||'')
                // },
                {
                    imgUrl: require('../../assets/images/activity/item2_2.png'),
                    title: '领取',
                    id: 'B02',
                    link: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/member/rightsfree?dealCh=0yb01&typeId=0yb001&ch=012w&parchn=' + this.$route.query.parchn + '&gytype=' + this.$route.query.gytype
                },
                // {
                //     imgUrl: require('../../assets/images/activity/item3_2.png'),
                //     title: '领取',
                //     id: 'B03',
                //     link: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/newBanksPhoneBill'
                // },
                {
                    imgUrl: require('../../assets/images/activity/item10.png'),
                    title: '领取',
                    id: 'B03',
                    link: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/oneCent?parchn=' + this.$route.query.parchn + '&gytype=' + this.$route.query.gytype
                },
                {
                    imgUrl: require('../../assets/images/activity/item4_2.png'),
                    title: '领取',
                    id: 'B04',
                    link: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/traddicHome?parchn=' + this.$route.query.parchn + '&gytype=' + this.$route.query.gytype
                }
            ],
            isCanShare: true,
            typeId: 'walletActivity',
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_WALLETACTIVITY_01_A01'
                },
                {
                    id: 'B01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_WALLETACTIVITY_01_B01'
                },
                {
                    id: 'B02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_WALLETACTIVITY_01_B02'
                },
                {
                    id: 'B03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_WALLETACTIVITY_01_B03'
                },
                {
                    id: 'B04',
                    touchCode: 'WAP_T_FORTUNE_CENTER_WALLETACTIVITY_01_B04'
                }
            ]
        };
    },
    mounted() {
        if (this.$route.query.typeId) {
            this.typeId = this.$route.query.typeId;
        }
        initPageJs(this.$route.meta.pageName, this.touchArr);
    },
    methods: {
        jumpTo(link) {
            // if (link.indexOf('khEmpower') > -1) {
            //     // eslint-disable-next-line no-param-reassign
            //     link += this.getUrlValue();
            // }
            // eslint-disable-next-line no-param-reassign

            link += this.getUrlValue();


            if (!browser.versions.JSMCC) {
                if (link.indexOf('WalletToActPage') > -1) {
                    this.$router.push({
                        name: 'browserJump',
                        query: {
                            jumpUrl: link
                        }
                    });
                } else {
                    window.location.href = link;
                }
            } else {
                window.location.href = link;
            }
        },
        // 地址参数
        getUrlValue() {
            if (window.location.href.indexOf('?') > -1) {
                const urlLast = window.location.href.split('?')[1];

                if (window.location.href.indexOf('typeId') > -1) {
                    return `?${urlLast}`;
                }
                return `?typeId=${this.typeId}&${urlLast}`;
            }
            return `?typeId=${this.typeId}`;
        }
    }
};
</script>

<style scoped lang="less">
.activity{
  position: relative;
  .share{
    width: 1.16rem;
    height: 0.43rem;
    text-align: center;
    line-height: 0.5rem;
    position: absolute;
    top: 0.8rem;
    right: -0.2rem;
    background: #FFDC1C;
    color: #CF3E35;
    font-weight: 600;
    font-size: 0.28rem;
    border-radius: 0.2rem;
  }
  .bottom{
    width: 100%;
    // height: ;
    height: 960px;
    background: url('../../assets/images/activity/activity_bg2.png') no-repeat;
    background-size: 100% 100%;
    padding-top: 450px;
    .cont{
    //   width: 100%;
      margin-left:0.25rem;
      margin-top:0.6rem;
      .card{
        padding: 0 0.6rem .19rem;
        position: relative;
        img{
        width:5.75rem;
        height: 2.21rem;
        }
        // .btn{
        //   width: 2.08rem;
        //   height: 0.6rem;
        //   line-height: 0.6rem;
        //   background: #FFDC1C;
        //   color: #CF3E35;
        //   font-weight: 600;
        //   text-align: center;
        //   border-radius: 0.4rem;
        //   font-weight: 600;
        //   font-size: 0.32rem;
        //   position: absolute;
        //   top: 1.4rem;
        //   left: 50%;
        //   margin-left: -1.04rem;
        // }
        .btn{
            position: absolute;
            top: 0.57rem;
            left:5.51rem;
            width: 0.46rem;
            height: 1.08rem;
            font-size: 0.48rem;
            font-style: PingFang SC;
            color: white;
            word-wrap: break-word; //竖排
          }
        }
      }
    }
  }
</style>
