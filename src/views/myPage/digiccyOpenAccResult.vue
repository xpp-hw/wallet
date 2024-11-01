<template>
  <div>
    <div class="container openaccount" id="container">
      <div class="account-index-wrapper">
        <!-- <div class="open-progress">
          <div class="progress-pic">
            <img src="@/assets/images/progress1.png" alt="" />
            <div class="progress-line actline"></div>
            <img src="@/assets/images/progress4.png" alt="" />
            <div class="progress-line actline"></div>
            <img src="@/assets/images/progress5.png" alt="" />
          </div>
          <div class="txt-progress">
            <span class="act-progress">预开户</span
            ><span style="margin-right: .2rem" class="act-progress"
              >短信验证</span
            ><span style="margin-right: .1rem" class="act-progress">完成</span>
          </div>
        </div>-->
        <div class="opening-account" v-if="opening">
          <img src="@/assets/images/loading-ing.gif" alt />
          <p>正在开户</p>
          <p class="tip">
            预计
            <span style="color: #238ff2">20秒</span>完成开户，请您耐心等待
          </p>
        </div>
        <div class="open-acc-success" v-if="success">
          <div class="success-info">
            <img src="@/assets/images/opening-success2.png" alt class="icon" />
            <p class="h3">恭喜,成功开通数字人民币账户！</p>
            <!-- <p class="h4">您可以使移动钱包充值话费，购买理财等。</p> -->
          </div>
          <a href="javascript:;" class="success-index" @click="gohome" id="A01">完成</a>
          <div class="success-ad" v-if="hasad">
            <img src="@/assets/images/wallet_banner.png" class="banner_img" alt />
            <img src="@/assets/images/wallet_banner.png" class="banner_img" alt />
          </div>
        </div>
        <div class="open-acc-fail" v-if="fail">
          <div class="success-info">
            <img src="@/assets/images/opening-error2.png" alt class="icon" />
            <p class="h3">{{ failreason }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header';
import api from '@/common/apiUrls';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import * as store2 from '@/common/localstore';

export default {
    name: 'digiccyOpenAccResult',
    components: {
        Header
    },
    data() {
        return {
            opening: true,
            success: false,
            fail: false,
            mobile: '',
            timer: '',
            failreason: '抱歉,您暂时无法开通此数字货币账户！',
            openfail: '',
            typeid: '', // 渠道号
            hasad: false,
            gourl: '',
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_OPENACCOUNT_RESULT_A01'
                },
                {
                    id: 'A04',
                    touchCode: 'WAP_T_OPENACCOUNT_RESULT_A04'
                }
            ],
            orgcode: '',
            fxmobile: ''
        };
    },
    created() {
        this.mobile = store2.default.get('usrmob');
        this.openfail = this.$route.query.openfail;
        this.orgcode = this.$route.query.orgcode;
        // console.log(this.openfail);
        // console.log(this.$route.query.failreason);
        if (this.$route.query.typeId) {
            this.typeid = this.$route.query.typeId;
            this.fxmobile = this.$route.query.fxmobile;
        }
        if (this.$route.query.openfail === 1) {
            this.failreason = this.$route.query.failreason;
            this.opening = false;
            this.success = false;
            this.fail = true;
        } else {
            //   this.checkstatus();
            this.getStsData();
        }
        initPageJs(this.$route.meta.pageName, this.touchArr);
    },
    methods: {
        gohome() {
            // 跳转到我的页面并刷新
            this.$router.push({
                name: 'index',
                query: {
                    refresh: 1
                }
            });
        },
        getStsData() {
            if (!this.timer) {
                this.timer = setInterval(() => {
                    this.checkstatus();
                }, 5000);
            }
        },
        checkstatus() {
            const data = {
                orgCode: this.orgcode,
                mobile: this.mobile
            };
            api.digiccyApi
                .getInfo()
                .then((res) => {
                    console.log(res.data);
                    if (res.data == null) {
                        this.opening = true;
                        this.success = false;
                        this.fail = false;
                    } else {
                        this.opening = false;
                        this.success = true;
                        this.fail = false;
                    }
                })
                .catch((err) => {
                    console.log(err);
                    if (err.msgCd !== 'BUS00000') {
                        if (err.msgCd === '-53') {
                            this.opening = false;
                            this.success = false;
                            this.fail = true;
                            this.failreason = '银行系统维护中，请次日重试';
                        } else {
                            this.opening = false;
                            this.success = false;
                            this.fail = true;
                            this.failreason = err.msgInfo;
                        }
                    }
                });
        }
    }
};
</script>
<style scoped lang="less">
.open-progress {
  width: 100%;
  height: 2.7rem;
  background: #fff;
  .progress-pic {
    width: 6.4rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    margin-bottom: 0.28rem;
    img {
      width: 0.79rem;
      height: 0.79rem;
      margin-top: 0.75rem;
    }
    div {
      width: 2rem;
      height: 0.04rem;
      background: #cdcdcd;
      border-radius: 0.05rem;
      margin-top: 0.7rem;
      margin-top: 0.7rem;
      margin-left: 0.05rem;
      margin-right: 0.05rem;
    }
    .actline {
      background: #0195ff;
    }
  }
  .txt-progress {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 6.4rem;
    margin: 0 auto;
    span {
      color: #999;
      font-size: 0.32rem;
    }
    .act-progress {
      color: #0195ff;
    }
  }
}
.opening-account {
  width: 100%;
  //   margin-top: 0.5rem;
  margin-top: 2.7rem;
  text-align: center;
  img {
    width: 1.25rem;
    height: 1.25rem;
    display: block;
    margin: 0 auto;
  }
  p:nth-of-type(1) {
    font-size: 0.4rem;
    color: #333;
    padding-top: 0.4rem;
    font-weight: 500;
  }
  .tip {
    font-size: 0.28rem;
    color: #888888;
    padding-top: 0.1rem;
  }
}
.open-acc-success,
.open-acc-fail {
  width: 100%;
  //   margin-top: .4rem;
  margin-top: 2.7rem;
  text-align: center;
}
.success-info {
  img {
    width: 1.24rem;
    height: 1.24rem;
    margin-bottom: 0.39rem;
    display: block;
    margin: 0 auto;
  }
  .h3 {
    color: #333;
    font-size: 0.4rem;
    margin-top: 0.39rem;
  }
  .h4 {
    color: #666;
    font-size: 0.28rem;
    margin-top: 0.2rem;
  }
}
.success-index {
  width: 5.1rem;
  height: 0.9rem;
  opacity: 1;
  background: #0195ff;
  border-radius: 0.1rem;
  display: block;
  color: #fff;
  text-align: center;
  line-height: 0.9rem;
  margin: 0 auto;
  margin-top: 0.69rem;
  font-size: 0.36rem;
  text-decoration: none;
}
.success-ad {
  margin-top: 1rem;
  width: 100%;
  margin-bottom: 1rem;
  img {
    width: 6.9rem;
    margin: 0 auto;
    display: block;
    height: 2rem;
    margin-top: 0.2rem;
  }
}
</style>
