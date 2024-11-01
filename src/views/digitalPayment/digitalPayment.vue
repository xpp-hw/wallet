<template>
  <div class="shubi">
    <!-- 数币活动banner -->
    <!-- <div class="banner1" v-if="shubiList.length > 0" @click="bannerCLick"></div> -->
    <div class="content" v-if="shubiList.length > 0">
      <div v-for="(item, idx) in shubiList" :key="idx" class="contentList">
        <div class="cardImg">
          <img :src="getImg(item.bankCode)"   />
        </div>
        <div class="main">
          <p class="account">
            {{ item.debtorAgentName }}钱包 ({{ item.walletId }})
          </p>
          <p class="code">
            {{ item.mobile }}
          </p>
        </div>
      </div>
    </div>
    <div class="no_shubi"  v-if="showFlag">
      <img src="../../assets/images/digitalPayment/no_pay_bg.png" alt="">
      <p class="bak_text">
        您暂无数字人民币账户，请下载或打开数字人民币APP推送子钱包至中国移动江苏～
      </p>
      <p class="blue_box">
        <strong>操作路径：</strong>数字人民币APP->我的->钱包快付管理->
        商户平台选择中国移动江苏
      </p>
      <!-- 数币活动banner -->
      <!-- <div  @click="bannerCLick">
        <img class="bannerClass" src="../../assets/images/digitalPayment/banner2.png" alt="">
      </div> -->
    </div>
  </div>
</template>

<script>
import api from '@/common/apiUrls';
import defaultImage from '@/assets/images/arrows.png';

export default {
    data() {
        return {
            shubiList: [], // 数币集合
            showFlag: false
        };
    },
    mounted() {
        this.getCmbList();// 获取数币信息
    },
    methods: {

        getImg(id) {
            try {
                // return require(`../../assets/images/banks/bankimages/icon_${id}.png`);
                if (id == 'BOCM') {
                    return 'https://upay.12580life.com/upay/wps/images/banks/icon_BCOM.png';
                }
                if (id == 'Tenpay') {
                    return 'https://upay.12580life.com/upay/wps/images/banks/QQ.png';
                }
                if (id == 'MYBANK') {
                    return 'https://upay.12580life.com/upay/wps/images/banks/WS.png';
                }
                return `https://upay.12580life.com/upay/wps/images/banks/icon_${id}.png`;
            } catch (e) {
                return require('@/assets/images/account-icon.png');
            // 图片找不到时，使用默认图片
            }
        },
        bannerCLick() {
            this.$router.push({
                path: 'zsDcpay/index'
            });
        },
        getCmbList() {
            this.$store.commit('LOADING', true);
            api.digiccyApi.getList({ channelId: 'cmb' }).then((res) => {
                if (res.list && res.list.length > 0) {
                    res.list.forEach((item) => {
                        item.channelId = item.channelId.toUpperCase();
                    });
                    this.shubiList = res.list;
                } else {
                    this.showFlag = true;
                }
                this.$store.commit('LOADING', false);
            }).catch((err) => {
                this.$store.commit('LOADING', false);
            });
        }
    }
};
</script>

<style lang="less" scoped>
.shubi {
  height: 100vh;
  background: #f7f8fa;
  box-sizing: border-box;
  overflow-y: auto;
}
.shubi .content .contentList .cardImg {
  width: 87px;
  height: 85px;
  img {
    width: 87px;
    height: 85px;
  }
}
.banner1{
  height: 395px;
  background: url('../../assets/images/digitalPayment/banner1.png') no-repeat;
  background-size:100% ;
}
.content {
  background: #f7f8fa;
  padding: 35px 25px;
  border-radius: 40px 40px 0 0;
  .contentList {
    height: 212px;
    margin-bottom: 24px;
    padding: 0 21px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    border-radius: 12px;
    background: url("../../assets/images/digitalPayment/pay_bg_red.png")
      no-repeat;
    background-size: 100% 100%;
    .cardImg {
      width: 170px;
      height: 108px;

      img {
        width: 170px;
        height: 108px;
      }
    }
    .shubiImg {
      img {
        width: 180px;
        height: 114px;
      }
    }
    .imgCont {
      display: flex;
      align-self: center;
      position: absolute;
      top: 35px;
      left: 35px;

      img {
        width: 20px;
        height: 20px;
        margin-top: 5px;
      }

      span {
        line-height: 30px;
        margin-left: 10px;
        color: #fff;
        font-size: 12px;
      }
    }

    .btn {
      width: 95px;
      height: 30px;
      line-height: 30px;
      background: #e58985;
      color: #fff;
      font-size: 20px;
      text-align: center;
      border-radius: 12px;
    }

    .main {
      flex-grow: 1;
      padding-left: 20px;

      .account {
        font-weight: 500;
        font-size: 30px;
        color: #1e1e1e;

        span {
          font-size: 24px;
          color: #7c7c7c;
          margin-left: 20px;
        }
      }

      .code {
        font-size: 26px;
        color: #898989;
        margin-top: 20px;
      }

      .openBtn {
        background: #00aaee;
        margin-top: 10px;
      }
    }
  }

  .contentList:last-of-type {
    margin-bottom: 0;
  }

}
.no_shubi{
  text-align: center;
  position: fixed;
  top: 20%;
  img{
    width: 417px;
  }
  .bannerClass{
    width: 690px;
    height: 180px;
    margin-top: 180px;
  }
    .bak_text{
      text-align: center;
      width: 90%;
      margin: auto;
      font-weight: 500;
      font-size: 28px;
      color: #30313B;
      line-height: 49px;
    }
    .blue_box{
      width: 90%;
      opacity: 0.67;
       margin: auto;
      background: #EEF2FB;
      border-radius: 10px;
      padding: 15px 21px 24px;
      margin-top: 50px;
       color: #7d7f82;
      font-size: 26px;
      font-weight: 500;
      line-height: 47px;
      letter-spacing: 0;
      text-align: left;
    }
  }
</style>
