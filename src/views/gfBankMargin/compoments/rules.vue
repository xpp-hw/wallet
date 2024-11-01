<!--
 * @Author: 赵宏峰 zhao_hf@hisuntech.com
 * @Date: 2024-10-18 09:40:02
 * @LastEditors: 赵宏峰 zhao_hf@hisuntech.com
 * @LastEditTime: 2024-10-23 18:27:54
 * @FilePath: \wallet\src\views\gfBankMargin\compoments\rules.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="rules_container">
    <!-- 弹窗 -->
    <div class="pop">
        <div class="pop_content">
          <div class="htmlContent" v-html="rulesContent"></div>

        </div>
    </div>
    <div class="close" @click="close"></div>
  </div>
</template>

<script>
export default {
    props: {
        rulesContent: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            titleList: [
                {
                    name: '时间'
                }, {
                    name: '奖品名称'
                }, {
                    name: '状态'
                }
            ],
            dataList: []
        };
    },
    methods: {
        close() {
            this.$emit('closePop');
        }
    }
};
</script>

<style lang="less" scoped>
.rules_container {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  .pop {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 547px;
    height: 696px;
    background: url("../../../assets/images/gfBankMargin/pop2_bg.png") no-repeat;
    background-size: 100%;
    padding: 96px 45px 0;
    box-sizing: border-box;
    .pop_content {
      height: 500px;
      overflow-y: auto;
      .htmlContent {
        font-size: 27px;
        line-height: 1.4;
      }
    }
  }
  .close {
    width: 66px;
    height: 66px;
    background: url("../../../assets/images/gfBankMargin/close_btn.png")
      no-repeat;
    background-size: 100%;
    position: absolute;
    top: 78%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
