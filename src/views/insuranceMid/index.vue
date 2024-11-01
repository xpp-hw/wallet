<!--
 * @Author: Mr.Zhao 1914689669@qq.com
 * @Date: 2023-03-23 14:48:28
 * @LastEditors: Mr.Zhao 1914689669@qq.com
 * @LastEditTime: 2023-03-23 15:07:42
 * @FilePath: \wallet\src\views\insuranceMid\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="wrap">
        <div class="bg">
            <div class="rules" @click="isShow = true" id="A02"></div>
            <div class="goLink" @click="goLink" id="A01"></div>
        </div>
        <div class="tankuang" v-if="isShow">
            <div class="midToast">
               <div class="cont">
                <div style="display:flex">
                  <div class="redBox" >1</div><p>用户注册登陆后，完成车辆绑定即可领取奖励（注：仅限首次绑定车辆的新用户）</p>
                </div>
                <div style="display:flex">
                  <div class="redBox" >2</div><p>领取奖品后，可登陆平安好车主APP-我的卡券，进行使用及查看</p>
                </div>
                 <div style="display:flex">
                  <div class="redBox" >3</div> <p>本活动与APPIE NC（苹果公司）无关</p>
                </div>
                 <div style="display:flex">
                  <div class="redBox" >4</div> <p>平安产险有权在法律允许的范围内对活动规则作出适当调整。</p>
                </div>
                 <div style="display:flex">
                  <div class="redBox" >5</div><p>我们会抽取部分幸运用户升级奖励，实际奖励以下发的奖励为准</p>
                </div>


               </div>
            </div>
            <div class="close" @click="isShow = false"></div>
        </div>
    </div>
</template>

<script>
import { initPageJs } from '@/common/Page2435_1_fn.js';

export default {
    name: 'insuranceMid',
    data() {
        return {
            isShow: false,
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_INSURANCEMID_01_A01'
                },
                {
                    id: 'A02',
                    touchCode: 'WAP_T_INSURANCEMID_01_A02'
                }

            ]
        };
    },
    mounted() {
        initPageJs(this.$route.meta.pageName, this.touchArr);
    },
    methods: {
        goLink() {
            window.location.href = 'https://hcz-static.pingan.com.cn/bindingCarAct/index.html?inviteCode=2WXZVR#backCar';
        }
    }
};
</script>

<style lang="less" scoped>
.bg {
    position: relative;
    width: 750px;
    height: 1624px;
    background: url("~@/assets/images/mid_Bg.png") no-repeat;
    background-size: 100%;
    .rules {
        position: absolute;
        top: 30px;
        right: 0;
        width: 160px;
        height: 60px;
    }
    .goLink {
        position: absolute;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        width: 700px;
        height: 150px;
    }
}
.tankuang {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(2, 2, 2, 0.7);
    z-index: 999;
    .midToast {
        width: 584px;
        height: 616px;
        background: url("~@/assets/images/mid_Toast.png") no-repeat;
        background-size: 100%;
        padding: 50px;
        box-sizing: border-box;
        overflow-y: hidden;
        .cont{
          margin-top: 40px;
          width: 100%;
          height: 460px;
          word-wrap: break-word;
          overflow-y: auto;
          font-size: 26px;
          line-height: 1.5;
          color: #963310;
          p{
            width: calc(100% - 30px);
          }
          .redBox{
            width: 30px;
            height: 30px;
            background: red;
            border-radius: 50%;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
            margin-top: 5px;
          }
        }
    }
    .close {
        width: 64px;
        height: 64px;
        background: url("~@/assets/images/mi_close.png") no-repeat;
        background-size: 100%;
        margin-top: 14px;
    }
}
</style>
