<!--
 * @Author: zhf 1914689669@.com
 * @Date: 2023-08-08 17:26:29
 * @LastEditors: zhf 1914689669@.com
 * @LastEditTime: 2023-08-08 17:33:50
 * @FilePath: \wallet\src\views\ZS_shubi\routerView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <router-view  v-wechat-title="$route.meta.title"></router-view>
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
