<template>
  <div class="text_contaion">
    <div v-html="agreementContent"></div>
  </div>
</template>
<script>
export default {
    props: {
        agreementContent: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="less" scoped>
.text_contaion {
  padding: 10px 30px 40px 30px;
  font-size: 24px;
  text-align: left;
  line-height: 36px;
  color: #d06f45;
  font-weight: 400;
  line-height: 1.5;

  span {
    color: #ff0a04;
    font-weight: 500;
  }
  .red_round {
    background: #ff0a04;
    color: #fff;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: inline-block;
    text-align: center;
    line-height: 28px;
  }
  .mr_top {
    margin-top: 20px;
  }
}
</style>
