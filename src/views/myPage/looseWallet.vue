<template>
  <div>
    <div class="intoLooseWallet">
      <h2>选择销户账户</h2>
      <div class="promptMesg">当前已开立的电子账户可选择销户</div>

      <md-field class="radio-field">
        <md-radio-list
          v-model="myBank"
          :options="banks"
          icon-size="lg"
          @change="pufaBankWallet($event)"
        />
      </md-field>

      <md-button :type="setType" @click="setLooseWallet">立即销户</md-button>
      <p class="mobileWallet">移动钱包</p>
    </div>

    <!-- 提醒 -->
    <md-popup v-model="looseCMB">
      <div class="md-example-popup md-example-popup-center">
        <div class="cardTitle">温馨提示</div>
        <p class="fullCardNum">
          您当前的钱包开户机构来源于招商银行，请使用{{phoneNum}}登录招商银行APP，进入【我的】-【银行卡】-【联名钱包】-【移动钱包】，点击【注销】进行销户。
        </p>
        <div class="fullCardBtns">
          <md-button
            class="fullCardCopy"
            type="default"
            size="small"
            style="margin:0 auto ;float:inherit;"
            @click="looseCMB = false"
            >知道了</md-button
          >
        </div>
      </div>
    </md-popup>
  </div>
</template>

<script>
import { Radio, Field, RadioList } from 'mand-mobile';
import api from '@/common/apiUrls';
import * as store2 from '@/common/localstore';

export default {
    components: {
        [Radio.name]: Radio,
        [Field.name]: Field,
        [RadioList.name]: RadioList
    },
    data() {
        return {
            setType: 'disabled',
            pufaBank: '',
            jiangsuBank: '',
            myBank: '',
            banks: [],
            isOrgCode: '',
            isclick: false,
            looseCMB: false,
            phoneNum: ''
        };
    },
    created() {
        this.getAllLoose();
        this.usrmobile = store2.default.get('usrmob');
        this.phoneNum = this.usrmobile.replace(/(\d{3})\d*(\d{4})/, '$1****$2');
    },
    mounted() {},
    methods: {
        setLooseWallet() {
            if (this.isOrgCode.toUpperCase() === 'CMB') {
                this.looseCMB = true;
            } else {
                this.$router.push({
                    name: 'accountCancellation',
                    query: {
                        orgCode: this.isOrgCode
                    }
                });
            }
        },
        pufaBankWallet(e) {
            this.myBank = e.value;
            this.isOrgCode = e.orgCode;
            this.setType = 'primary';
        },

        // 查询所有电子账户
        getAllLoose() {
            api.looseChange
                .qryAllAcc({
                    entryTx: '',
                    // 测试传，生产不传
                    mobile: this.usrmobile
                })
                .then((res) => {
                    this.banks = res.list;
                    for (let i = 0; i <= this.banks.length - 1; i += 1) {
                        this.banks[i].value = i;
                        this.banks[i].text = `${this.banks[i].orgName}  ${this.banks[i].accNbr}`;
                        if (this.banks[i].accNbr == null || this.banks[i].orgCode === 'ICBC-DIGICCY') {
                            this.banks.splice(i, 1);
                            i -= 1;
                        }
                    }
                });
        }
    }
};
</script>

<style scoped lang="less">
.intoLooseWallet {
  width: 100%;
  overflow: hidden;
  background-color: #f9fafb;
  h2 {
    margin-top: 40px;
    margin-bottom: 20px;
    padding: 0 40px;
  }
  .promptMesg {
    height: 60px;
    background-color: #e9f4fe;
    color: #429ef4;
    line-height: 60px;
    padding: 0 40px;
  }
  .md-button {
    width: 350px;
    margin-left: 200px;
    margin-top: 400px;
  }
  .mobileWallet {
    text-align: center;
    margin: 110px 0;
    font-size: 40px;
    color: #d7d7d7;
  }
}
.radio-field {
  margin-bottom: 40px;
}
.md-radio {
  display: inline-block;
}
.md-example-popup {
  position: relative;
  font-size: 28px;
  font-family: DINPro;
  font-weight: 500;
  box-sizing: border-box;
  text-align: center;
  background-color: #fff;
  width: 650px;
  border-radius: 10px;
  padding: 40px;
  .md-example-popup-center {
    padding: 50px;
    border-radius: radius-normal;
  }
  .cardTitle {
    height: 62px;
    line-height: 50px;
    font-size: 36px;
    border-bottom: 1px solid #E1E1E1;
  }
  .fullCardNum {
    font-size: 30px;
    text-align: left;
    margin: 20px 0;
  }
  .fullCardBtns {
    margin-top: 20px;
    overflow: hidden;
  }
  .fullCardSubmit {
    float: left;
    width: 40%;
    background-color: #fff;
    color: #0195ff;
    border: 1px solid #0195ff;
  }
  .fullCardCopy {
    float: right;
    width: 40%;
  }
}
</style>
