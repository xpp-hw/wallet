<template>
  <div class="account_contaion">
    <div class="wrap">
      <div class="title">和包账户实名</div>
      <div class="text_wrap">
        <img src="../../assets/images/B2Cwallet/warn_icon.png" alt="" />
        您的账户未实名，为了保证账户正常使用，请确认以下信息完成实名认证。
      </div>
    </div>
    <div class="md-example-child md-example-child-input-item-1">
      <md-field>
        <md-input-item
          title="姓名"
          preview-type="text"
          placeholder="输入姓名"
          v-model="customerName"
          :disabled='notInputFlag'
        ></md-input-item>
        <md-input-item
          title="身份证号"
          type="text"
          placeholder="输入二代身份证号码"
          v-model="idNo"
          maxlength='18'
          :disabled='notInputFlag'
        ></md-input-item>
      </md-field>
    </div>
    <div class="foot_btn">
       <md-button type="primary" round @click="subimt" :inactive='!customerName || !idNo'>确认实名</md-button>
    </div>
  </div>
</template>
<script>
import { InputItem, Field, Button } from 'mand-mobile';
import api from '@/common/apiUrls';
import * as store2 from '@/common/localstore';

export default {
    components: {
        [InputItem.name]: InputItem,
        [Field.name]: Field,
        [Button.name]: Button
    },
    data() {
        return {
            idNo: '',
            customerName: '',
            dealChn: '',
            backUrl: '',
            ZFbackID: '',
            notInputFlag: false, // 判断已授权且二次放号过不可修改
            userNo: '',
            accessSource: '00'
        };
    },
    mounted() {
        this.dealChn = this.$route.query.dealChn;
        this.ZFbackID = this.$route.query.ZFbackID || '';
        this.getBackUrl({
            dealChn: this.dealChn
        });
        this.queryInfo();
        if (this.$client.LEADEON) {
            this.accessSource = '01';
        } else if (this.$client.JSMCC) {
            this.accessSource = '02';
        } else {
            this.accessSource = '00';
        }
    },
    methods: {
        queryName() {
        // 查询用户是否实名
            api.B2CWallet.certificationInfo().then((res) => {
                this.userNo = res.userNo;
            });
        },
        // 返回地址
        getBackUrl(data) {
            api.newBank
                .backUrl(data)
                .then((res) => {
                    if (res.backUrl) {
                        this.backUrl = res.backUrl;
                    }
                })
                .catch((err) => {
                    this.$toast.info(err.msgInfo);
                });
        },
        queryInfo() {
            // 查询用户是否实名
            api.B2CWallet.certificationInfo().then((res) => {
                if (res.idNo && res.customerName) {
                    this.notInputFlag = true;
                }
                this.userNo = res.userNo;
                this.idNo = res.idNo || '';
                this.customerName = res.customerName || '';
            });
        },
        subimt() {
            let recordUrl = window.location.href;
            let recordIndex;
            if (recordUrl.indexOf('?') > -1) {
                recordIndex = recordUrl.indexOf('?');
            } else {
                recordIndex = recordUrl.length;
            }
            recordUrl = recordUrl.slice(0, recordIndex);
            const params = {
                customerName: this.customerName,
                idNo: this.idNo,
                userNo: this.userNo,
                parentChannel: this.$route.query.parchn || null,
                childChannel: this.$route.query.gytype || null,
                pageUrl: recordUrl || '',
                accessSource: this.accessSource
            };
            this.$store.commit('LOADING', true);
            api.B2CWallet.certification(params).then((res) => {
                this.$store.commit('LOADING', false);
                if (this.backUrl && this.ZFbackID) {
                    this.$toast.info('实名成功，正在进入银行卡绑卡页面！');
                    setTimeout(() => {
                        this.$router.push({
                            name: 'bindCard',
                            replace: true,
                            query: this.$route.query
                        });
                    }, 2000);
                } else if (this.backUrl) {
                    this.$toast.info('实名成功，正在进入银行卡绑卡页面！');
                    setTimeout(() => {
                        this.$router.push({
                            name: 'bindCard',
                            replace: true,
                            query: this.$route.query
                        });
                    }, 2000);
                } else {
                    this.$toast.info('实名成功，正在进入银行卡绑卡页面！');
                    setTimeout(() => {
                        this.$router.push({
                            name: 'bindCard',
                            query: this.$route.query
                        });
                    }, 2000);
                }
            }).catch((err) => {
                this.$store.commit('LOADING', false);
                this.$toast.info(err.msgInfo);
            });
        }
    }
};
</script>
<style lang="less" scoped>
.account_contaion {
  height: 100vh;
  background-image: linear-gradient(180deg, #ffffff 0%, #f2f3f7 52%);
  box-sizing: border-box;
  .wrap {
    padding: 37px 30px;
    .title {
      font-weight: 600;
      font-size: 40px;
      color: #333333;
    }
    .text_wrap {
      background: #f4faff;
      border-radius: 12px;
      padding: 20px 26px;
      font-size: 24px;
      color: #238ff2;
      letter-spacing: 0;
      margin: 24px 0 0;
      img {
        width: 28px;
        height: 28px;
      }
    }
  }
    .foot_btn{
      width: 90%;
      margin: 200px auto;
    }
}
</style>
