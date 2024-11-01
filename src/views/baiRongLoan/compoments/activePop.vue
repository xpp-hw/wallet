<template>
  <div class="pop_contaion">
    <div class="pop_box">
      <div style="position: relative;">
        <div class="btn_class2">
          <img v-if="!zdyPop" :class="imgPopClass?'img2':'img1'" :src="require('@/assets/images/baiRongLoan/pop_'+ popDate.type +'.png')" />
          <img v-else :class="imgPopClass?'img2':'img1'" :src="require('@/assets/images/baiRongLoan/pop_'+ popDate.type +'.png')" />
          <div v-if="zdyPop" class="pop_text">{{popDate.text}}</div>
        </div>
      <div :class="popDate.type === '3' ? 'pop_btn3':'pop_btn'">
        <!-- 取消按钮 -->
        <div class="btn_class1" v-if="imgCancelShow">
          <div @click="cancelClick">
            <img  class="img_cancel" src="../../../assets/images/baiRongLoan/cancel.png" alt="">
          </div>
          <div @click="nextClick">
            <img  class="img_cancel" src="../../../assets/images/baiRongLoan/nextJq_btn.png" alt="">
          </div>
        </div>
        <!-- 自定义按钮 -->
        <div class="btn_class2" v-else>
          <div @click="nextClick">
            <img class="img_submit"  :src="require('@/assets/images/baiRongLoan/btn_'+popDate.type+'.png')" alt="">
          </div>
        </div>
      </div>
      </div>
      <div :class="btnClass?'close_div2':'close_div'" v-if="popDate.type !== '8' && popDate.type !== '12'">
        <div  @click="closePop">
         <img  class="img_close" src="../../../assets/images/baiRongLoan/关闭.png" alt="" srcset="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props: {
        popDate: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
        };
    },
    computed: {
        imgCancelShow() { // 是否显示取消按钮，如不显示需要配置按钮图片
            return this.popDate.type === '4' || this.popDate.type === '2' || this.popDate.type === '9';
        },
        imgPopClass() {
            return this.popDate.type === '3';
        },
        btnClass() {
            return this.popDate.type === '1' || this.popDate.type === '2' || this.popDate.type === '4' || this.popDate.type === '5' || this.popDate.type === '9' || this.popDate.type === '10' || this.popDate.type === '11' || this.popDate.type === '7';
        },
        zdyPop() { // 自定义文案
            return this.popDate.type === '10' || this.popDate.type === '11';
        }
    },
    methods: {
        //
        nextClick() {
            if (this.popDate.type === '8' || this.popDate.type === '12') {
                this.closePop();
            } else {
                this.$router.push({
                    name: 'authorization'
                });
            }
        },
        cancelClick() {
            this.closePop();
        },
        closePop() {
            this.$emit('closePop');
        }
    }
};
</script>
<style lang="less" scoped>
.pop_contaion{
  background: rgba(0, 0, 0, .7);
  z-index: 99;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .pop_box{
   position: fixed;
   top:50%;
   left: 50%;
   transform: translate(-50%,-50%);
   .pop_btn{
      // display: flex;
      // justify-content: space-around;
      // margin-top: -150px;
      width: 100%;
      position: absolute;
      bottom: 0;
      // left: 50%;
      // transform: translate(-50%);
      padding-bottom: 80px;

   }
    .pop_btn3{
      // display: flex;
      // justify-content: space-around;
      // margin-top: -150px;
      width: 100%;
      position: absolute;
      bottom: 0;
      // left: 50%;
      // transform: translate(-50%);
      padding-bottom: 180px;

   }
   .close_div{
    text-align: center;
   }
   .close_div2{
    text-align: center;
    margin-top: 80px;
   }
  .img1{
    width: 566px;
    height: 100%;

  }
  .img2{
    width: 750px;
    height: 100%;
  }
  .img_close{
    height: 81px;
    }
  }
  .btn_class1{
    display: flex;
    width: 100%;
    justify-content: center;
  }
  .btn_class2{
    display: flex;
    width: 100%;
    justify-content: center;
    position: relative;
    .pop_text{
      position: absolute;
      left: 50%;
      top: 55%;
      transform: translate(-50%,-50%);
      color: #848484;
      font-size: 30px;
      width: 80%;
      text-align: center;
      line-height: 1.5;
    }
  }
  .img_cancel{
    height: 80px;
    margin:0 10px;
  }
  .img_submit{
    height: 105px;
    margin:0 10px;
  }
}
</style>
