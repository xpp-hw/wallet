<template>
  <div v-if="showFlag" class="text_contaion" :style="rulePageBg.logo ? {background: '#f1f2f2 url(' + rulePageBg.logo + ')',backgroundSize: '100%',backgroundRepeat: 'no-repeat'} : ''">
    <div class="body" >
      <div class="box_title"></div>
      <div v-html="agreementContent"></div>
    </div>
  </div>
</template>
<script>
import api from '@/common/apiUrls';

export default {
    data() {
        return {
            agreementContent: '',
            rulePageBg: {},
            showFlag: false
        };
    },
    mounted() {
        this.queryAgreementContent();
        this.getBackgroundImage();
    },
    methods: {
        // 获取首页背景
        getBackgroundImage() {
            this.$store.commit('LOADING', true);
            api.baiRong.getBackgroundImage({ activityNo: 'DKJOLY', floorType: '1' }).then((res) => {
                if (res.body.length > 0) {
                    this.rulePageBg = res.body.find(item => item.floorType === '1');
                }
            }).finally(() => {
                this.showFlag = true;
                this.$store.commit('LOADING', false);
            });
        },
        // 获取规则
        queryAgreementContent() {
            api.baiRong.bairongQueryAgreementList().then((res) => {
                this.agreementContent = res.data.agreementList[0].agreementContent.replaceAll('px', '');
            });
        }
    }
};
</script>

<style lang="less" scoped>
.text_contaion {
  padding: 50px 25px 40px 25px;
  font-size: 24px;
  text-align: left;
  line-height: 36px;
  color: #d06f45;
  font-weight: 400;
  line-height: 1.5;
  background: #f1f2f2 url('../../assets/images/baiRongLoan/rules_top_bg.png') no-repeat;
  background-size: 100%;
  height: 100%;
  .body{
    background: linear-gradient(to top, #fff 80%, #ffffff00); /* 标准的语法 */
    padding:0 20px 30px;
    border-radius: 26px 26px 26px 26px;
  }
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
   .box_title {
        // background: url(../../assets/images/baiRongLoan/active_icon.png) no-repeat;
        background-size: 100%;
        height: 72px;
        margin: 0 auto 15px;
      }
}
</style>
