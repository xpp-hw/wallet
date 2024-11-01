<template>
    <div class="warp"></div>
</template>

<script>
import api from "@/common/apiUrls";
import { initPageJs } from "@/common/Page2435_1_fn.js";

export default {
    name: "newBanksResult",
    components: {},
    data() {
        return {
            touchArr: [
                {
                    id: "",
                    touchCode: "",
                },
            ],
        };
    },

    mounted() {},
    created() {
        initPageJs(this.$route.meta.pageName, this.touchArr);
    },
    methods: {},
};
</script>

<style lang="less" scoped>
.warp {
}
</style>
