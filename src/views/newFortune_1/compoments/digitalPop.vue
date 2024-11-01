<template>
  <div class="digital_container">
    <div class="wrap">
      <div class="title">温馨提示</div>
      <div class="body">
        <p>您暂无数字人民币账户，请下载或打开数字人民币APP推送子钱包至中国移动江苏~</p>
        <span><strong>操作路径：</strong>数字人民币APP->我的->钱包快付管理->商户平台选择中国移动江苏</span>
      </div>
      <div class="foot">
        <!-- <div class="btn" @click="close">取消</div> -->
        <div class="btn dw" @click="close">知道了</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    methods: {
        close() {
            this.$emit('digitalClose');
        },
        down() {
            const loadDateTime = new Date();
            window.location.href = 'dcep://uniwallet/unipay?sourceApplication';// schema链接或者universal link
            window.setTimeout(() => { // 如果没有安装app,便会执行setTimeout跳转下载页
                const timeOutDateTime = new Date();
                if (timeOutDateTime - loadDateTime < 4000) {
                    window.location.href = 'https://pilot.app.ecny.pbcdci.cn/download/index.html';
                    // ios下载地址
                } else {
                    window.close();
                }
            }, 500);
        }
    }
};
</script>

<style lang="less" scoped>
.digital_container {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  z-index: 999;
  .wrap {
    width: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 25px;
    padding-bottom: 40px;
    .title {
      background: #eaf6ff;
      font-weight: 400;
      font-size: 38px;
      color: #1b7aee;
      letter-spacing: 2px;
      text-align: center;
      padding: 23px 0 15px;
      border-radius: 25px 25px 0 0;
    }
    .body {
      font-weight: 400;
     font-size: 30px;
      color: #393939;
      letter-spacing: 1px;
      line-height: 58px;
      padding: 40px 50px 60px;
      span{
        font-weight: 400;
        font-size: 26px;
        color: #8A8D8F;
        letter-spacing: 0.81px;
        line-height: 46px;
      }
    }
    .foot {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .btn {
        border: 1px solid #1b7aee;
        color: #1b7aee;
        padding: 15px 70px;
        border-radius: 40px;
        font-size: 36px;
      }
      .dw{
        background: #1B7AEE;
        color: #fff;
      }
    }
  }
}
</style>
