<template>
  <div>
    <router-view
      v-wechat-title="$route.meta.title"
      v-if="isRouterAlive"
    ></router-view>
  </div>
</template>

<script>
export default {
    provide() {
        return {
            reload: this.reload
        };
    },
    data() {
        return {
            isRouterAlive: true
        };
    },
    methods: {
        reload() {
            this.isRouterAlive = false;
            this.$nextTick(() => {
                this.isRouterAlive = true;
            });
        }
    }
};
</script>
