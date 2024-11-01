<template>
  <div class="popups" v-if="popusList.showMask">
    <div class="popups_box">
      <p class="title">{{ popusList.title }}</p>
      <div class="hr"></div>
      <div class="content">{{ popusList.content }}</div>
      <ul class="btn">
        <li v-if="popusList.show" class="alone" @click="confirm">{{ popusList.alone }}</li>
        <li v-if="!popusList.show" class="noalone no_1"></li>
        <li v-if="!popusList.show" class="noalone no_2"></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    props: ['popusList'],
    data() {
        return {
        };
    },
    methods: {
        confirm() {
            this.$emit('isShow', this.popusList.showMask);
        }
    }
};
</script>

<style lang="less" scoped>
.popups {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  .popups_box {
    width: 680px;
    background: #ffffff;
    border-radius: 8px;

    .title {
      font-size: 38px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      color: #333333;
      margin-top: 38px;
    }

    .hr {
      width: 602px;
      height: 2px;
      margin: auto;
      margin-top: 14px;
      border: 1px solid #e1e1e1;
    }

    .content {
      width: 336px;
      font-size: 28px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      margin: auto;
      text-align: center;
      color: #333333;
      line-height: 45px;
      margin-top: 52px;
    }

    .btn {
      display: flex;
      justify-content: space-between;
      margin: 50px auto;
      .alone {
        width: 400px;
        height: 75px;
        margin: auto;
        font-size: 32px;
        border-radius: 8px;
        background: #0195ff;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: center;
        color: #ffffff;
        line-height: 75px;
      }
    }
  }
}
</style>
