<!--
 * @Author: 赵宏峰 zhao_hf@hisuntech.com
 * @Date: 2024-07-26 09:11:32
 * @LastEditors: 赵宏峰 zhao_hf@hisuntech.com
 * @LastEditTime: 2024-10-17 00:07:33
 * @FilePath: \loans\src\views\benefitPersonLoan\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app_wrap">
    <md-popup v-model="isPopupShow" position="bottom" :mask-closable="false">
      <div class="popupContent">
        <p class="p1">服务授权</p>
        <p class="p2"></p>
        <div class="imgLabel">
          <img
            v-if="pageConfData.mobileLogo"
            :src="pageConfData.mobileLogo"
            alt=""
          />
          <img v-else src="@/assets/images/yidong_icon.png" alt="" />
          <img src="@/assets/images/into_icon.png" alt="" />
          <img
            v-if="pageConfData.orgLogo"
            :src="pageConfData.orgLogo"
            alt=""
          />
          <img v-else src="@/assets/images/bocm_icon.png" alt="" />
        </div>
        <p class="p3">
          授权
          <span style="color: #227df6">{{ pageConfData.orgName }}</span>
          获取您的以下信息，用于为您提供产品和服务。
        </p>
        <p class="p4">·{{ pageConfData.description1 }}</p>
        <p class="p4" v-if="pageConfData.description2">
          ·{{ pageConfData.description2 }}
        </p>

        <div class="sureBtn" @click="confirm">确认授权</div>
        <div class="cancelBtn" @click="cancel">暂不授权</div>
      </div>
    </md-popup>
  </div>
</template>

<script>
import api from '@/common/apiUrls';

export default {
  name: "benefitPersonLoan",
  data() {
    return {
      isPopupShow: false,
      isFirst: '',
      pageConfData: {}
    }
  },
  mounted() {
    this.queryPageConf()
  },
  methods: {
    // 获取页面配置
    queryPageConf() {
      this.$store.commit('LOADING', true);
      api.queryH5AuthPageConf({
        orgCode: this.$route.query.orgCode || null
      })
        .then(data => {
          this.$store.commit('LOADING', false);
          // if (data.conf.mobileLogo) {
          //   data.mobileLogo = "data:image/png;base64," + data.mobileLogo;
          // }
          // if (data.conf.orgLogo) {
          //   data.orgLogo = "data:image/png;base64," + data.orgLogo;
          // }
          this.pageConfData = data.conf || {}
          if(this.pageConfData.firstShowFlag) {
            this.isPopupShow = true;
          } else {
            this.getUrl()
          }
        })
        .catch((err) =>{
          this.$store.commit('LOADING', false);
          this.$toast.info(err.msgInfo);
        })
    },
    // queryFirstIn() {
    //   this.$store.commit('LOADING', true);
    //   api.ygdPreCheck({})
    //     .then(data => {
    //       this.$store.commit('LOADING', false);
    //       this.isFirst = data.checkFlag
    //       if (this.isFirst == '01') {
    //         // 首次进入
    //         this.isPopupShow = true;
    //       } else if (this.isFirst == '02') {
    //         this.getUrl();
    //       }
    //     })
    //     .catch(() => {
    //       this.$store.commit('LOADING', false);
    //     })
    // },
    getUrl() {
      this.$store.commit('LOADING', true);
      api.queryH5Apply({
        orgCode: this.$route.query.orgCode || null,
        backUrl: `https://fintech.12580life.com${process.env.BASE_URL}newFortune`
      })
        .then(data => {
          window.location.href = data.pageUrl;
        })
        .catch(err => {
          this.$store.commit('LOADING', false);
          this.$toast.info(err.msgInfo);
        })
    },
    confirm() {
      // this.isPopupShow = false;
      this.getUrl()
    },
    cancel() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped lang="less">
.popupContent {
  width: 100%;
  border-radius: 35px 35px 0 0;
  background: #ffffff;
  box-sizing: border-box;
  padding: 0 45px;
  overflow: auto;
  .p1 {
    font-size: 38px;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
    margin: 30px auto 20px;
  }
  .p2 {
    width: 100%;
    border-top: 1px solid #ccc;
  }
  .p3 {
    font-size: 28px;
    line-height: 45px;
    letter-spacing: 0;
    text-align: left;
    margin-bottom: 24px;
  }
  .p4 {
    font-size: 28px;
    color: #a2a3a8;
    letter-spacing: 0;
    line-height: 46px;
    text-align: left;
  }
  .imgLabel {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 25px auto;
    img {
      width: 131px;
      height: 131px;
      margin: 0 25px;
    }
    img:nth-of-type(2) {
      width: 61px;
      height: 53px;
    }
  }
  .sureBtn {
    width: 628px;
    height: 80px;
    line-height: 80px;
    background: #238ff2;
    border-radius: 45px;
    font-size: 30px;
    color: #ffffff;
    letter-spacing: 1.07px;
    text-align: center;
    margin: 45px auto 30px;
  }
  .cancelBtn {
    width: 628px;
    height: 80px;
    line-height: 80px;
    border: 1px solid #b1b1b1;
    border-radius: 45px;
    font-size: 30px;
    color: #999999;
    letter-spacing: 1.07px;
    text-align: center;
    margin: 0 auto 45px;
  }
}
</style>