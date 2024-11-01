<template>
  <div class="popwarp">
    <div v-if="popInfo.type == 'text'" class="text">
      <div v-if="popInfo.state == 1" class="prompt">
        <div class="head">
          <p class="one"></p>
          <p class="two"></p>
          <p class="three"></p>
          <div>提示</div>
          <p class="three"></p>
          <p class="two"></p>
          <p class="one"></p>
        </div>
        <div class="concent">
          <h3>您即将开通业务：</h3>
          <p><span>业务名称：</span> 移动钱包</p>
          <p>
            <span>业务资费：</span>
            <b style="font-weight: bold; color: red">0元/月</b
            >（次月起自动续订）
          </p>
          <p><span>当前状态：</span> 未开通</p>
          <p><span> 生效方式：</span>立即生效</p>
          <div>
            <p>短信验证码：</p>
            <input
              v-model="msgCode"
              maxlength="4"
              oninput="value=value.replace(/[^\d]/g,'')"
              placeholder="请输入短信验证码"
              type="text"
            />
            <button v-if="countdown == 60" @click="getTextMsg">
              获取验证码
            </button>
            <button style="background: #d8d8d8; color: #7e7e7e" v-else>
              已发送({{ countdown }}s)
            </button>
            <div class="videText">
              <span
                >收不到短信验证码？点击试试<span
                  @click="getvoiceMsg()"
                  :class="{ red: countdown == 60 }"
                  >语音验证码</span
                ></span
              >
            </div>
            <div class="text">
              <p></p>
              <span>短信验证码在5分钟内有效，3次输入错误后失效</span>
            </div>
          </div>
          <div class="button">
            <md-agree
              v-model="agreeConf.checked"
              :disabled="agreeConf.disabled"
              :size="agreeConf.size"
              @change="onChange(agreeConf.name, agreeConf.checked, $event)"
            >
              我已阅读并接受<span style="color: #01a6f0">
                <span @click.prevent="goXieyi(0)">《业务详情》</span>
                <span @click.prevent="goXieyi(1)">《和包授权协议》</span>
                <span @click.prevent="goXieyi(2)">《和包隐私权政策》</span>
                <span @click.prevent="goXieyi(4)"
                  >《和包支付业务用户服务协议》</span
                >
              </span>
            </md-agree>
          </div>
        </div>
        <div class="submit">
          <button @click="submit(false)">取消</button>
          <button
            :class="{ codestyle: numValLengthTrue }"
            @click="submit(true)"
          >
            确认
          </button>
        </div>
      </div>
      <div v-if="popInfo.state == 2" class="receipt">
        <div class="head" id="headId">
          <h3>业务受理单</h3>
        </div>
        <div class="content">
          <img alt="" src="@/assets/images/newRights/img_1.png" />
          <p>{{ date.year }}年{{ date.month }}月{{ date.day }}日</p>
          <p>手机号码：{{ mobNo }}</p>
          <p>客户名称：{{ userName }}</p>
          <ul>
            <li>鉴权方式：统一认证+短信验证码</li>
            <li>受理类型：业务办理</li>
            <li>
              受理时间：{{ date.year }}-{{ date.month }}-{{ date.day }}
              {{ date.hour }}:{{ date.minute }}:{{ date.second }}
            </li>
            <li>受理渠道：此APP</li>
            <li>商品名称：移动钱包</li>
            <li>业务详情：</li>
          </ul>
          <div class="text">
            <div class="agrement" v-html="agreementContent"></div>
            <div style="width: 100%; height: 2rem; text-align: right">
              <img
                alt=""
                :src="city"
                style="
                  width: 1.8rem;
                  height: auto;
                  margin-right: 0.4rem;
                  transform: rotate(-25deg);
                "
              />
            </div>
            <h4>甲方：{{ userName }}</h4>
            <h4>乙方：中国移动通信集团江苏有限公司{{ cityName }}分公司</h4>
            <img alt="" src="@/assets/images/newRights/img.png" />
          </div>
          <hebaoAgreement
            v-if="xieyiFlag"
            :btnFlag="false"
            :changeClass="'hbSign'"
            :siver="siver"
            :showList="showList"
          ></hebaoAgreement>
        </div>

        <div class="button">
          <button
            v-if="countdowns == 0"
            style="background: rgba(0, 179, 255, 1)"
            @click="$emit('submit', true, 1)"
          >
            已阅读并接受
          </button>
          <button v-else>已阅读并接受({{ countdowns }}s)</button>
        </div>
      </div>
    </div>
    <div v-if="popInfo.type == 'img'" class="img">
      <!--            首次开通-->
      <div v-if="popInfo.state == 1" class="first">
        <div class="button">
          <div @click="$emit('submit', false)"></div>
          <div @click="rightOpen(2)"></div>
        </div>
      </div>
      <div v-if="popInfo.state == 2" class="modify">
        <div class="button">
          <div @click="$router.push({ name: 'looseChange' })"></div>
        </div>
      </div>
      <div v-if="popInfo.state == 3" class="open">
        <div class="button">
          <div @click="rightOpen(1)"></div>
        </div>
      </div>
      <div v-if="popInfo.state == 4" class="daylimit">
        <div class="button">
          <div @click="$emit('submit', false)"></div>
        </div>
      </div>
      <div v-if="popInfo.state == 5" class="mouthlimit">
        <div class="button">
          <div @click="$emit('submit', false)"></div>
        </div>
      </div>
      <div v-if="popInfo.state == 6" class="haveno">
        <div class="button">
          <div @click="$emit('submit', false)"></div>
        </div>
      </div>
      <div v-if="popInfo.state == 7" class="twoyuan">
        <div class="button">
          <div @click="$emit('submit', false)"></div>
        </div>
      </div>
      <div v-if="popInfo.state == 8" class="oneGb">
        <div class="button">
          <div @click="$emit('submit', false)"></div>
        </div>
      </div>
      <div v-if="popInfo.state == 9" class="no">
        <div class="button">
          <div @click="$emit('submit', false)"></div>
        </div>
      </div>
      <div v-if="popInfo.state == 10" class="oneyuan">
        <div class="button">
          <div @click="$emit('submit', false)"></div>
        </div>
      </div>
      <div v-if="popInfo.state == 11" class="fiveyuan">
        <div class="button">
          <div @click="$emit('submit', false)"></div>
        </div>
      </div>
      <div class="closse" @click="$emit('submit', false)">
        <img alt="" src="@/assets/images/newRights/icon_tianjia@2x.png" />
      </div>
    </div>
    <div v-if="iserr" class="err">
      {{ errtext }}
    </div>
  </div>
</template>

<script>
import { Agree } from 'mand-mobile';
import api from '@/common/apiUrls';
import * as store2 from '@/common/localstore';
import hebaoAgreement from '@/components/hebaoAgreement';

export default {
  name: 'pop',
  props: ['popInfo', 'countdown', 'userName', 'dealCh','inviter'],
  components: {
    [Agree.name]: Agree,
    hebaoAgreement
  },
  data() {
    return {
      agreementContent: '',
      voice: false,
      // countdown: 60,
      countdowns: 5,
      iserr: false,
      errtext: '',
      agreeConf: {
        checked: false,
        name: 'agree0',
        size: 'md',
        disabled: false,
        introduction: '选中状态'
      },
      smsJrnNo: '', // 验证码流水号
      mobNo: '', // 手机号
      numValLengthTrue: false, // 验证码长度是否正确
      msgCode: '', // 验证码
      date: {
        year: new Date().getFullYear(),
        month:
          Number(new Date().getMonth() + 1) < 10
            ? `0${Number(new Date().getMonth() + 1)}`
            : Number(new Date().getMonth() + 1),
        day:
          Number(new Date().getDate()) < 10
            ? `0${Number(new Date().getDate())}`
            : Number(new Date().getDate()),
        hour:
          Number(new Date().getHours()) < 10
            ? `0${Number(new Date().getHours())}`
            : Number(new Date().getHours()),
        minute:
          Number(new Date().getMinutes()) < 10
            ? `0${Number(new Date().getMinutes())}`
            : Number(new Date().getMinutes()),
        second:
          Number(new Date().getSeconds()) < 10
            ? `0${Number(new Date().getSeconds())}`
            : Number(new Date().getSeconds())
      }, // 日期
      isclick: true,
      city: '',
      cityName: '',
      xieyiFlag: false,
      siver: 1,
      showList: ['1', '2', '4'],
      accessSource: '00'
    };
  },
  watch: {
    msgCode(val) {
      if (val.length > 4) {
        this.msgCode = val.substring(0, 4);
      }
      if (val.length !== 4) {
        this.numValLengthTrue = false;
      } else if (this.agreeConf.checked) {
        this.numValLengthTrue = true;
      }
    },
    countdown(val) {
      console.log(val);
      if (val == 60) {
        this.voice = false;
      }
    }
  },
  mounted() {
    if (this.$client.LEADEON) {
      this.accessSource = '01';
    } else if (this.$client.JSMCC) {
      this.accessSource = '02';
    } else {
      this.accessSource = '00';
    }
    this.getCity();
    this.getAgreement();
    this.mobNo = `${store2.default.get('usrmob').slice(0, 3)
      }****${store2.default.get('usrmob').slice(7)}`;
  },

  methods: {
    getCity() {
      api.getUserNo()
        .then((res) => {
          this.city = require(`../../assets/images/zhang/${res.cityNo
            }.png`);
          switch (res.cityNo) {
            case '11':
              this.cityName = '苏州';
              break;
            case '12':
              this.cityName = '淮安';
              break;
            case '13':
              this.cityName = '宿迁';
              break;
            case '14':
              this.cityName = '南京';
              break;
            case '15':
              this.cityName = '连云港';
            case '16':
              this.cityName = '徐州';
              break;
            case '17':
              this.cityName = '常州';
              break;
            case '18':
              this.cityName = '镇江';
              break;
            case '19':
              this.cityName = '无锡';
              break;
            case '20':
              this.cityName = '南通';
              break;
            case '21':
              this.cityName = '泰州';
              break;
            case '22':
              this.cityName = '盐城';
              break;
            case '23':
              this.cityName = '扬州';
              break;
          }
          this.mobNo = res.mobile.replace(
            /(\d{3})\d{4}(\d{4})/,
            '$1****$2'
          );
          const nu = res.userName.length - 1;
          for (let i = 0; i < nu; i++) {
            this.userName += '*';
          }

          this.userName += res.userName.slice(-1);
        })
        .catch((err) => {
          console.log('------******-----');
        });
    },
    // 获取验证码
    getvoiceMsg() {
      this.voice = true;
      this.getMsgCode();
    },
    getTextMsg() {
      this.voice = false;
      this.getMsgCode();
    },
    getMsgCode(type) {
      if (!this.agreeConf.checked) {
        this.$toast.info('请您先勾选“我已阅读并同意《业务详情》协议”');
        return;
      }
      if (this.countdown != 60) {
        return;
      }
      this.$emit('getMsgCode');
      if (this.voice) {
        api.newSmsSend({
          smsType: '1'
        })
          .then((res) => {
            console.log(res.smsJrnNo);
            this.smsJrnNo = res.smsJrnNo;
          })
          .catch((err) => {
            this.showerr(err.msgInfo);
          });
      } else {
        api.newSmsSend()
          .then((res) => {
            console.log(res.smsJrnNo);
            this.smsJrnNo = res.smsJrnNo;
          })
          .catch((err) => {
            this.showerr(err.msgInfo);
          });
      }
    },
    // 协议
    onChange(name, checked) {
      if (checked) {
        if (this.msgCode.length == 4) {
          this.numValLengthTrue = true;
        }
        this.agreeConf.checked = true;
        this.$emit('submit', true, 2);
        // 触发倒计时5秒
        this.countdowns = 5;
        const timer = setInterval(() => {
          this.countdowns--;
          if (this.countdowns == 0) {
            clearInterval(timer);
          }
        }, 1000);
      } else {
        this.numValLengthTrue = false;
      }
    },
    goXieyi(val) {
      this.xieyiFlag = true;
      this.siver = val;
      this.onChange('', true);
    },
    // 发信
    submit(state, type) {
      if (state) {
        if (!this.agreeConf.checked) {
          this.showerr('请阅读并同意《业务详情》协议');
        } else {
          this.checkMsgCode();
        }
      } else {
        this.$emit('submit', state, type);
      }
    },
    // 校验验证码
    checkMsgCode() {
      this.$store.commit('LOADING', true);
      if (!this.isclick) {
        return;
      }
      this.isclick = false;
      console.log(this.msgCode.length);
      if (this.msgCode.length != 4) {
        this.showerr('请输入验证码');
        return;
      }
      let recordUrl = window.location.href;
      let recordIndex;
      if (recordUrl.indexOf('?') > -1) {
        recordIndex = recordUrl.indexOf('?');
      } else {
        recordIndex = recordUrl.length;
      }
      recordUrl = recordUrl.slice(0, recordIndex);
      const timmer = setTimeout(() => {
        this.$store.commit('LOADING', false);
        this.$toast.info('系统忙了，请稍后再试');
      }, 8000);
      api.zeroPackageTransaction({
        chooseFlag: '1',
        oprType: '1',
        smsJrn: this.smsJrnNo,
        smsCode: this.msgCode,
        dealCh: this.dealCh,
        parentChannel: this.$route.query.parchn || '',
        childChannel: this.$route.query.gytype || '',
        pageUrl: recordUrl || '',
        accessSource: this.accessSource,
        inviter: this.inviter
      })
        .then((res) => {
          clearTimeout(timmer);
          this.$store.commit('LOADING', false);
          // this.zeroOpenCoupons();
          // this.$emit('submit', false);
          if (res.status == 'SUCCESS') {
            this.$emit('goresults', 1, '');
          } else {
            this.$emit('goresults', 0, err.msgInfo);
          }
          this.isclick = true;
        })
        .catch((err) => {
          clearTimeout(timmer);
          this.$store.commit('LOADING', false);
          // this.$emit('submit', 1);
          this.$emit('goresults', 0, err.msgInfo);
          this.isclick = true;
        });
    },
    // 展示错误
    showerr(text) {
      this.iserr = true;
      this.errtext = text;
      setTimeout(() => {
        this.iserr = false;
      }, 2000);
    },
    // 跳转开通钱包
    rightOpen(type) {
      // 跳钱包开通页面
      if (type === 1) {
        window.location.href = `https://fintech.12580life.com/fintech-h5/fortuneCenter/openAccount/khEmpower?typeId=lingyuanbao&orgCode=CMB&parchn=${this.$route.query.parchn}&gytype=${this.$route.query.gytype}`;
      } else {
        window.location.href = `https://fintech.12580life.com/fintech-h5/fortuneCenter/openAccount/khEmpower?typeId=lingyuanbao&parchn=${this.$route.query.parchn}&gytype=${this.$route.query.gytype}`;
      }
    },
    // 下发优惠卷
    zeroOpenCoupons() {
      api.zeroOpenCoupons()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAgreement() {
      api.agreement()
        .then((res) => {
          this.agreementContent = res.agreementContent.replaceAll(
            'px',
            ''
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.popwarp {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  .text {
    .prompt {
      width: 650px;
      border-radius: 20px 20px 0 0;
      background: rgba(255, 255, 255, 1);
      display: flex;
      flex-direction: column;
      //position: absolute;
      //bottom: 0;
      //left: 0;
      .head {
        height: 104px;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        div {
          font-size: 38px;
          margin: 0 10px;
        }

        p {
          margin: 0 10px;
        }

        .one {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #cb9d4a;
        }

        .two {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #cb9d4a;
        }

        .three {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #cb9d4a;
        }
      }

      .concent {
        width: 100%;
        padding: 0 45px;
        box-sizing: border-box;
        flex: 1;

        h3 {
          font-weight: Bold;
          font-size: 30px;
          margin: 20px 0;
        }

        > p {
          margin-bottom: 10px;
          font-size: 24px;

          span {
            color: #666666;
          }
        }

        div {
          margin-top: 40px;

          > p {
            font-size: 18px;
            margin-bottom: 13px;
          }

          input {
            width: 245px;
            height: 58px;
            outline: none;
            border: 2px solid #666666;
            border-radius: 10px 10px 10px 10px;
            margin-right: 20px;
            padding: 0 20px;
            box-sizing: border-box;
          }

          button {
            width: 178px;
            height: 60px;
            border-radius: 30px 30px 30px 30px;
            line-height: 60px;
            background: linear-gradient(to right, #f3d69e, #e6c58a, #f3d69e);
            color: #937337;
            font-size: 24px;
          }

          .text {
            display: flex;
            align-items: center;
            margin-bottom: -20px;

            p {
              width: 10px;
              height: 10px;
              background: rgba(1, 167, 240, 1);
              border-radius: 50%;
              margin: 0 10px 0 0;
            }

            span {
              font-size: 18px;
              color: #666666;
            }
          }
          .videText {
            margin: 20px 0 -10px 0;
            font-size: 18px;
            .red {
              color: red;
            }
          }
        }

        .button {
          .md-agree {
            font-size: 20px;
          }
        }
      }

      .submit {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 85px;
        box-sizing: border-box;
        margin-bottom: 40px;
        margin-top: 29px;

        button {
          width: 211px;
          height: 70px;
          border-radius: 35px 35px 35px 35px;
          background: rgba(216, 216, 216, 1);
          color: #7e7e7e;
          font-size: 30px;
          font-weight: bold;
        }

        .codestyle {
          background: rgba(0, 179, 255, 1);
          color: #ffffff;
        }
      }
    }

    .receipt {
      width: 572px;
      height: 750px;
      border-radius: 20px 20px 20px 20px;
      background: rgba(255, 255, 255, 1);
      display: flex;
      flex-direction: column;
      position: relative;
      .head {
        height: 84px;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      img {
        width: 241px;
        height: 74px;
        margin-top: 33.5px;
        //margin-left: -34px;
      }

      .content {
        flex: 1;
        margin: 0 16px 0 34px;
        overflow-y: scroll;

        > p {
          height: 49px;
          border-bottom: 2px solid #e5e5e5;
          line-height: 49px;
          font-size: 24px;
          color: #666666;
        }

        ul {
          margin-top: 29.5px;

          li {
            height: 21px;
            margin-bottom: 14px;
            font-size: 22px;
            color: #666666;
          }
        }

        .text {
          margin-top: 22px;

          h3 {
            font-size: 22px;
            font-weight: bold;
            color: #333333;
          }

          p {
            font-size: 20px;
            text-indent: 18px;
            color: #666666;

            span {
              color: #333333;
              font-weight: bold;
            }
          }

          h4 {
            font-size: 20px;
            margin-top: 10px;
            font-weight: normal;
            color: #666666;
          }

          img {
            margin-top: 0;
          }
        }
      }

      .button {
        display: flex;
        justify-content: center;
        align-items: center;

        button {
          width: 332px;
          height: 60px;
          margin: 27px 0;
          border-radius: 30px 30px 30px 30px;
          background: rgba(199, 199, 199, 1);
          font-size: 26px;
          font-weight: 500;
          color: #ffffff;
        }
      }
    }
  }

  .img {
    display: flex;
    align-items: center;
    flex-direction: column;

    > div {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      align-items: flex-end;
    }

    .button {
      display: flex;
      justify-content: center;
      margin-bottom: 48px;
      width: 100%;
      height: 75px;

      div {
        width: 200px;
        border-radius: 35px 35px 35px 35px;
        margin: 0 6px;
      }
    }

    .first {
      //首次开通
      width: 500px;
      height: 759px;
      background: url("~@/assets/images/newRights/13.png") no-repeat;
      background-size: 100% auto;
    }

    .modify {
      //去修改
      width: 556px;
      height: 689px;
      background: url("~@/assets/images/newRights/14.png") no-repeat;
      background-size: 100% auto;
    }

    .open {
      //去开通
      width: 556px;
      height: 689px;
      background: url("~@/assets/images/newRights/15.png") no-repeat;
      background-size: 100% auto;
    }

    .daylimit {
      //日限额
      width: 556px;
      height: 689px;
      background: url("~@/assets/images/newRights/17.png") no-repeat;
      background-size: 100% auto;
    }

    .mouthlimit {
      //月限额
      width: 556px;
      height: 689px;
      background: url("~@/assets/images/newRights/18.png") no-repeat;
      background-size: 100% auto;
    }

    .haveno {
      //抢完
      width: 556px;
      height: 565px;
      background: url("~@/assets/images/newRights/16.png") no-repeat;
      background-size: 100% auto;
    }

    .twoyuan {
      width: 498px;
      height: 628px;
      background: url("~@/assets/images/newRights/19.png") no-repeat;
      background-size: 100% auto;
    }

    .oneGb {
      width: 498px;
      height: 687px;
      background: url("~@/assets/images/newRights/20.png") no-repeat;
      background-size: 100% auto;
    }

    .no {
      width: 498px;
      height: 480px;
      background: url("~@/assets/images/newRights/21.png") no-repeat;
      background-size: 100% auto;
    }

    .oneyuan {
      width: 498px;
      height: 628px;
      background: url("~@/assets/images/newRights/22.png") no-repeat;
      background-size: 100% auto;
      //.button{
      //    background: black;
      //    margin-bottom: 48px;
      //}
    }

    .fiveyuan {
      width: 498px;
      height: 628px;
      background: url("~@/assets/images/newRights/23.png") no-repeat;
      background-size: 100% auto;
    }

    //关闭按钮
    .closse {
      margin-top: 30px;
      width: 78px;
      height: 78px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .err {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.5);
    font-size: 30px;
    color: white;
    width: 550px;
    height: 100px;
    border-radius: 20px;
    text-align: center;
    line-height: 100px;
    //width:;
  }
}
</style>
