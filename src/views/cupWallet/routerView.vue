<template>
    <div>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"  v-wechat-title="$route.meta.title"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"  v-wechat-title="$route.meta.title"></router-view>
    </div>
</template>

<script>

export default {
    data() {
        return {
        };
    },
    methods: {
    }
};
</script>
