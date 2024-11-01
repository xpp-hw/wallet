<template>
    <div id="anchor" ref="cont" class="cont">
        <div class="textContent" v-html="rulesContent.replace(/px/g,'')">
        </div>
        <div
            id="B01"
            :class="{ canClick: isCanclick }"
            class="btn"
            @click="hasRead"
        >
            我已阅读并知晓
        </div>
    </div>
</template>

<script>
import { Toast } from "mand-mobile";
import { initPageJs } from "@/common/Page2435_1_fn.js";
import api from "@/common/apiUrls";

export default {
    data() {
        return {
            isCanclick: true,
            isBottom: false,
            hasread: false,
            textBox: {},
            touchArr: [
                {
                    id: "A01",
                    touchCode: "WAP_T_TRADDIC_PROTOCOL_01_A01",
                },
                {
                    id: "B01",
                    touchCode: "WAP_T_TRADDIC_PROTOCOL_01_B01",
                },
                {
                    id: "C01",
                    touchCode: "WAP_T_TRADDIC_PROTOCOL_01_C01",
                },
            ],
            rulesContent: '',
        };
    },
    mounted() {
        if (this.$route.query.state) {
            this.hasread = true;
        }
        document.querySelector("#anchor").scrollIntoView(true);
        if (!this.hasread) {
            Toast.info("请滑动文字到底阅读完协议");
            this.isCanclick = false;
        }
        this.handleScroll();
        this.$nextTick(() => {
            this.textBox = this.$refs.cont;
            const boxHeight = this.textBox.clientHeight;
            const windowHeight =
                document.documentElement.clientHeight ||
                document.body.clientHeight;
            if (boxHeight < windowHeight) {
                this.isBottom = true;
            }
        });
        window.addEventListener("scroll", this.handleScroll);
        initPageJs(this.$route.meta.pageName, this.touchArr);
        this.queryRules()
    },
    methods: {
        queryRules() {
            api.huataiAgreement({
                businessCode: "llbfwktxy",
                businessType: 'WHOLE'
            })
                .then((res) => {
                    this.rulesContent = res.content;
                });
        },
        handleScroll() {
            // 获取滚动时的高度,可视区的高度,滚动条的总高度
            // 变量scrollTop是滚动条滚动时，距离顶部的距离
            const scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop;
            // 变量windowHeight是可视区的高度
            const windowHeight =
                document.documentElement.clientHeight ||
                document.body.clientHeight;
            // 变量scrollHeight是滚动条的总高度
            const scrollHeight =
                document.documentElement.scrollHeight ||
                document.body.scrollHeight;
            if (scrollTop + windowHeight + 10 >= scrollHeight) {
                // 把距离顶部的距离加上可视区域的高度 等于或者大于滚动条的总高度就是到达底部
                this.isCanclick = true;
            }
        },
        hasRead() {
            if (this.isCanclick) {
                this.$router.replace({
                    path: "/traddicHome",
                    query: {
                        check: this.isCanclick,
                        ...this.$route.query
                    },
                });
            }
        },
    },
};
</script>
<style lang="less" scoped>
.cont {
    padding: 0.3rem;
    line-height: 0.37rem;
    word-break: break-all;

    .top {
        text-align: center;
        font-weight: 600;
        font-size: 0.35rem;
        line-height: 0.8rem;
    }

    .main {
        font-weight: 600;
    }

    .black {
        color: black;
        font-weight: bold;
    }

    .red {
        color: red;
        font-weight: bold;
    }

    p {
        font-size: 0.3rem;
        line-height: 0.4rem;
        margin-bottom: 0.1rem;
    }

    .list {
        text-indent: 2em;
    }

    p:last-of-type {
        margin-bottom: 1rem;
    }

    .btn {
        width: 6.9rem;
        height: 0.82rem;
        font-size: 0.36rem;
        line-height: 0.82rem;
        color: #fff;
        background: #9bc9f3;
        text-align: center;
        border-radius: 0.08rem;
        position: fixed;
        bottom: 0;
    }

    .canClick {
        background: #238ff2;
    }
}
.textContent {
    font-size: 30px;
    line-height: 1.5;
    margin-bottom: 60px;
}
</style>
