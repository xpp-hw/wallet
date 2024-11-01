<template>
  <div>
    <div class="intoLooseChange">
      <h2>设置默认电子账户</h2>
      <div class="promptMesg">当前已开立的以下账户可设置为默认电子账户</div>

      <md-field class="radio-field">
        <md-radio-list
          v-model="myBank"
          :options="banks"
          icon-size="lg"
          @change="pufaBankChange($event)"
        />
      </md-field>

      <md-button :type="setType" @click="setLooseChange">设置</md-button>
      <p class="mobileWallet">移动钱包</p>
    </div>

    <!-- 提醒 -->
    <md-popup v-model="isPopupShow.center">
      <div class="md-example-popup md-example-popup-center">
        <div class="cardTitle">提醒</div>
        <p class="fullCardNum">
          设置成功后立即生效，后续支付或其它电子账户功能将使用该账户发起，确认设置？
        </p>
        <div class="fullCardBtns">
          <md-button
            class="fullCardSubmit"
            type="default"
            size="small"
            @click="isPopupShow.center = false"
            >取消</md-button
          >
          <md-button
            class="fullCardCopy"
            type="default"
            size="small"
            @click="fullCardSubmit"
            >确定</md-button
          >
        </div>
      </div>
    </md-popup>
    <md-popup v-model="isSelect.center">
      <div class="md-example-popup md-example-popup-center">
        <div class="cardTitle">提醒</div>
        <p class="fullCardNum">
          请先选择电子账户
        </p>
        <div class="fullCardBtns">
          <md-button
            class="fullCardCopy"
            type="default"
            size="small"
            style="margin:0 auto ;float:inherit;"
            @click="isSelect.center = false"
            >确定</md-button
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
            isPopupShow: {
                center: false
            },
            isSelect: {
                center: false
            },
            myBank: '',
            banks: [],
            isOrgCode: '',
            isclick: false
        };
    },
    created() {
        this.getAllLoose();
        this.usrmobile = store2.default.get('usrmob');
    },
    mounted() {},
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        setLooseChange() {
            this.isPopupShow.center = true;
        },
        fullCardSubmit() {
            this.isPopupShow.center = false;
            // 设置默认电子账户
            api.looseChange
                .setDefAcc({
                    entryTx: '',
                    // 测试传，生产不传
                    mobile: this.usrmobile,
                    orgCode: this.isOrgCode
                })
                .then((res) => {
                    if (res.msgCd == 'BUS00000') {
                        this.$toast.info('电子账户设置成功');
                        this.getAllLoose();
                    } else {
                        this.$toast.info('电子账户设置失败');
                    }
                });
        },
        pufaBankChange(e) {
            if (e.defaultAccFlg === '01') {
                this.myBank = 0;
            } else if (e.defaultAccFlg === '02') {
                this.myBank = 1;
            }
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
                    // console.log(res.list);
                    for (let i = 0; i <= res.list.length - 1; i++) {
                        res.list[i].value = i;
                        res.list[i].text = `${res.list[i].orgName}  ${res.list[i].accNbr}`;
                        if (res.list[i].defaultAccFlg == '01') {
                            this.myBank = 0;
                        } else if (res.list[i].defaultAccFlg == '02') {
                            this.myBank = 1;
                        }
                        if (res.list[i].accNbr == null) {
                            res.list.splice(i, 1);
                            i -= 1;
                        }
                    }
                    this.banks = res.list;
                    for (let j = 0; j < this.banks.length; j += 1) {
                        if (this.banks[j].orgCode === 'ICBC-DIGICCY') {
                            this.banks.splice(j, 1);
                            j -= 1;
                        }
                    }
                    if (this.myBank === '') {
                        this.setType = 'primary';
                    }
                });
        }
    }
};
</script>

<style scoped lang="less">
.header {
  overflow: hidden;
  display: flex;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  background-color: #fff;
  .back {
    float: left;
    font-size: 30px;
    margin-left: 40px;
  }
  .movewallet {
    font-size: 34px;
    font-weight: 700;
    margin: 0 auto;
  }
}
.intoLooseChange {
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
  width: 500px;
  border-radius: 10px;
  padding: 40px;
  .md-example-popup-center {
    padding: 50px;
    border-radius: radius-normal;
  }
  .cardTitle {
    height: 82px;
    line-height: 50px;
    font-size: 36px;
    border-bottom: 1px soild #f6f6f6;
  }
  .fullCardNum {
    font-size: 30px;
    height: 110px;
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
