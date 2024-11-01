<template>
  <div class="popContainer">
    <div class="pop_wrap">
      <div class="pop_bg">
        <div class="pop_rules">
          <div v-html="rulesContent"></div>
        </div>
      </div>
      <div class="pop_close" @click="$emit('closePop')"></div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        rulesContent: {
            type: String,
            default: () => ''
        }
    }
};
</script>

<style lang="less" scoped>
  .popContainer{
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    background: rgba(0, 0, 0, .5);
    width: 100%;
    z-index: 99;
    overflow: hidden;
    font-size: 26px;
    color: #275070;
    line-height: 1.5;
    .pop_wrap{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      .pop_bg{
        width: 602px;
        height: 709px;
        background: url('../../../assets/images/registerSendPoints/pop_bg.png') no-repeat;
        background-size:100% ;
        padding: 96px 50px 50px;
        box-sizing: border-box;
        .pop_rules{
          overflow-y: auto;
          height: 550px;
        }
      }
      .pop_close{
        width: 50px;
        height: 50px;
        background: url('../../../assets/images/registerSendPoints/pop_close.png') no-repeat;
        background-size:100% ;
        margin: 50px auto;
      }
    }
    .bold_t{
      font-weight: bold;
    }
  }
</style>
