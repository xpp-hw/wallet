<template>
  <div class="currencyPage">
    <div class="mask" v-if="isShowkuang">
      <div class="kuang">
        <p class="tips">温馨提示</p>
        <div class="hr"></div>
        <p class="content">{{ title }}</p>
        <div class="btn" @click="gohome">知道了</div>
      </div>
    </div>
    <div class="mask hookModel"  v-if="isShowHoop || isEmpty"></div>
    <div class="mask hookCont" v-if="isShowHoop">
      <div class="kuang">
        <p class="tips">温馨提示</p>
        <div class="hr"></div>
        <p class="content">{{ hookTitle }}</p>
        <div class="btnBox">
          <div class="btn" @click="isShowHoop = false">取消</div>
          <div class="btn" @click="goHookUp">确认挂接</div>
        </div>
      </div>
    </div>
    <div class="bgImg">
      <img src="@/assets/images/shuzihuobi/shuzihuobi_1.png" />
      <img src="@/assets/images/shuzihuobi/shuzihuobi_2.png" />
      <img src="@/assets/images/shuzihuobi/shuzihuobi_3.png" />
      <img src="@/assets/images/shuzihuobi/shuzihuobi_4.png" />
      <div class="botton" @click="onJump"></div>
    </div>
     <div class="mask" v-if="gosign">
      <div class="kuang" style="height:360px">
        <p class="tips">温馨提示</p>
        <div class="hr"></div>
        <p class="content" style="padding-top:0"> 您的手机号{{usrmob}}下存在电子账户，点击确认，签约账户；<br />签约成功后，即可查看您的钱包账户。</p>
        <div class="btnBox">
          <button class="btn" @click="gosign = false">取消</button>
          <button class="btn" @click="confirmSign">确认签约 </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/common/apiUrls';

export default {
    data() {
        return {
            Url: [],
            title: '',
            isShowkuang: false,
            gosign: false,
            usrmob: '', // 开户手机号
            isShowHoop: false,
            hookTitle: '',
            isJump: false,
            phone: '',
            isEmpty: true, // 开始的时候空白页面
            isSecond: ''
        };
    },
    mounted() {
        //  查询用户是否可开户
        api.digiccyApi
            .getInfo()
            .then((res) => {
                this.usrmob = res.data.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                // if (res.data.walletStatus === '10') {
                //     // 未签约
                //     this.gosign = true;
                //     return;
                // }
                this.isEmpty = false;
                console.log(1111111);
                if (res.data == null || res.data === '' || res.data.walletStatus === '-3' || res.data.walletStatus === '-2' || res.data.walletStatus === '2' || res.data.walletStatus === '6' || res.data.walletStatus === '7') {
                    //  跳转开户页
                    api.digiccyApi
                        .register()
                        .then((data) => {
                            this.isShowkuang = false;
                            const q = data.data.registerForm;
                            this.Url = q ? q.split('<s') : '';
                            if (this.Url) {
                                this.isJump = true;
                            } else {
                                this.title = '获取开户链接失败';
                                this.isShowkuang = true;
                            }
                        })
                        .catch((err) => {
                            console.log(333333);
                            this.title = err.msgInfo;
                            this.isShowkuang = true;
                        });
                } else if (res.data && res.data.walletStatus === '-1') {
                    // 已开户未挂接时
                    const pat = /(\d{3})\d*(\d{4})/;
                    this.phone = res.data.mobile.replace(pat, '$1****$2') || ''; // 手机号脱敏
                    this.hookTitle = `您的手机号码${this.phone}下存在数字人民币账户，点击确认，同意将您的账户挂接到江苏移动掌上营业厅；挂接成功后，即可查看您的数字人民币账户`;
                    this.isShowHoop = true;
                    this.isSecond = res.data.rspCode === '13382' ? '00' : '01';
                } else {
                    this.title = '您已开通过工行数字人民币钱包，无法继续开通哦~';
                    this.isShowkuang = true;
                }
            })
            .catch((err) => {
                console.log(err);
                this.isEmpty = false;
                this.title = err.msgInfo;
                this.isShowkuang = true;
            });
    },
    // mounted() {},
    methods: {
        onJump() {
            if (this.isJump) {
                //   window.location.href = this.Url;
                // eslint-disable-next-line prefer-destructuring
                document.querySelector('body').innerHTML = this.Url[0];
                const div = document.createElement('div'); // 创建div
                // eslint-disable-next-line prefer-destructuring
                div.innerHTML = this.Url[0]; // 将返回的form 放入div
                document.body.appendChild(div);
                document.forms[0].submit();
            }
        },
        gohome() {
            // 跳转到我的页面并刷新
            this.$router.push({
                name: 'newFortune',
                query: {
                    refresh: 1
                }
            });
        },
        // 跳转签约
        confirmSign() {
            this.$router.push({
                name: 'walletSign',
                query: {
                    acctyp: '02'
                }
            });
        },
        // 跳转挂接页面
        goHookUp() {
            this.$router.push({
                name: 'hookHandling',
                query: {
                    phone: this.phone,
                    isSecond: this.isSecond
                }
            });
        }
    }
};
</script>

<style lang="less">
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
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background: rgba(5, 5, 5, 0.6);
}
.kuang {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 5.8rem;
  height: 3.2rem;
  padding: 0.3rem;
  text-align: center;
  background: white;
  border-radius: 0.2rem;
}
.tips {
  text-align: center;
  font-size: 0.4rem;
}
.hr {
  width: 100%;
  height: 0.01rem;
  margin: 0.3rem auto;
  background-color: #dddddd;
}
.content {
  font-size: 0.32rem;
  padding-top: 0.3rem;
}
.btn {
  margin:30px auto;
  color: white;
  font-size: 0.32rem;
  line-height: 0.8rem;
  border-radius: 0.1rem;
  background: rgb(1, 149, 255);
}
.bgImg {
  position: relative;
  font-size: 0;
  img {
    width: 100%;
  }
  .botton {
    position: absolute;
    top: 593px;
    left: 150px;
    width: 445px;
    height: 105px;
    border-radius: 50px;
  }
}
.btnBox{
  display: flex;
  justify-content: space-between;
  .btn{
    width: 200px;
  }
}
.hookModel{
  background: url('../../assets/images/skeleton.jpg') no-repeat;
  background-size: 100% 100%;
}
.hookCont{
  .kuang{
    height: 4.2rem;
    .hr{
      width: 100%;
    }
    .content{
      padding-top: 0;
      line-height: 0.5rem;
    }
    .btnBox{
      display: flex;
      .btn{
        position: inherit;
        width: 6em;
      }
      .btn:first-of-type{
        background: #fff;
        color: #999;
        border: 1px solid #999;
      }
    }
  }
}
</style>
