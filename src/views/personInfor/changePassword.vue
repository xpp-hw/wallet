<template>
  <div class="changePassword">
    <md-field>
      <md-cell-item title="修改支付密码" arrow @click="jumpRoute(1)" />
      <md-cell-item title="重置支付密码" arrow @click="jumpRoute(2)" />
    </md-field>
  </div>
</template>

<script>
export default {
  methods: {
    jumpRoute(a) {
      this.$router.push({
        path: `/authentication/${a}`,
      });
    },
  },
};
</script>
