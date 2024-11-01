<template>
  <div class="setpassword">
    <passwordPage :dataList="lis" v-on:childByVal="childByVal"></passwordPage>
  </div>
</template>

<script>
import { Toast } from "mand-mobile";
import passwordPage from "../../components/passwordPage.vue";

export default {
  inject: ["reload"],
  components: {
    passwordPage,
  },
  data() {
    return {
      lis: {
        briefVal: "提示：支付密码不要输入重复或连续的数字",
        isTitle: "请输入6位数字密码",
      },
    };
  },
  created() {},
  mounted() {
    if (this.$route.params.title == 1) {
      window.document.title = "设置支付密码";
    } else if (this.$route.params.title == 2) {
      window.document.title = "修改支付密码";
    } else if (this.$route.params.title == 3) {
      window.document.title = "重置支付密码";
    }
  },
  methods: {
    childByVal(val) {
      if (val.subVal) {
        this.$router.push({
          path: `/reconfirm/${this.$route.params.title}`,
          query: { subVal1: val.subId },
        });
      }else{
          setTimeout(() => {
          Toast.info(val.toast);
          this.reload();
        }, 200);

      }
    },
  },
};
</script>

<style lang="less" scoped>
.setpassword {
  height: 100vh;
  background-color: #f5f5f5;
}
</style>
