<template>
    <div class="warp">
        <div class="box"></div>
        <div class="agree">
            <div class="t">
                您即将进入由<span>华泰证券股份有限公司</span>提供的服务页面，需要您授权提供以下信息给<span
                    >华泰证券</span
                >
            </div>
            <div class="m">*手机号码信息</div>
            <div class="a">
                <md-agree
                    v-model="agreeConf.checked"
                    :disabled="agreeConf.disabled"
                    :size="agreeConf.size"
                    icon-type="square"
                    @change="
                        onChange(agreeConf.name, agreeConf.checked, $event)
                    "
                >
                    下次不再提示
                </md-agree>
            </div>
            <div class="b">
                <div class="l" @click="back">取消</div>
                <div class="r" @click="go">同意</div>
            </div>
        </div>
    </div>
</template>

<script>
import { Agree } from "mand-mobile";
export default {
    name: "transitPage",
    components: {
        [Agree.name]: Agree,
    },
    data() {
        return {
            agreeConf: {
                checked: false,
                name: "agree4",
                size: "md",
                disabled: false,
                introduction: "方形勾选框选中状态",
            },
        };
    },
    beforeRouteEnter(to, from, next) {
        console.log(window.localStorage.getItem(to.query.htscid));
        if (window.localStorage.getItem(to.query.htscid)) {
            window.location.href =
                "https://m.zhangle.com/views/lowcode/lowcode.html?appId=" +
                to.query.htscid +
                "&ly=HTC1-9000039870";
        } else {
            next();
        }
    },
    methods: {
        onChange(name, checked) {
            console.log(
                `agree name = ${name} is ${checked ? "checked" : "unchecked"}`
            );
        },
        go() {
            if (this.agreeConf.checked && this.$route.query.htscid) {
                window.localStorage.setItem(this.$route.query.htscid, true);
            }
            window.location.href =
                "https://m.zhangle.com/views/lowcode/lowcode.html?appId=" +
                this.$route.query.htscid +
                "&ly=HTC1-9000039870";
        },
        back() {
            this.$router.go(-1);
        },
    },
};
</script>

<style scoped lang="less">
.warp {
    width: 100%;
    height: 100vh;
    background: #656667;
    display: flex;
    //align-items: flex-end;
    flex-direction: column;
    background: url("~@/assets/images/transit/bg.png") no-repeat;
    background-size: 750px auto;

    .box {
        flex: 1;
        background: rgba(0,0,0,.6);
        filter: brightness(50%);
    }
    .agree {
        width: 750px;
        height: 470px;
        background: #ffffff;
        border-radius: 20px 20px 0 0;
        padding: 50px 30px 30px 30px;
        box-sizing: border-box;
        z-index: 999;
        .t {
            color: #616263;
            font-size: 30px;
            font-weight: 400;
            line-height: 46px;
            letter-spacing: 1.04px;
            text-align: left;
            span {
                color: #238ff2;
            }
        }
        .m {
            width: 371px;
            height: 40px;
            font-weight: 400;
            font-size: 32px;
            color: #333333;
            letter-spacing: 0;
            line-height: 40px;
            margin-top: 27px;
        }
        .a {
            margin: 10px 0;
            color: #999999;
        }
        .b {
            display: flex;
            justify-content: space-between;
            margin-top: 33px;
            font-weight: 400;
            font-size: 36px;
            color: #999999;
            div {
                width: 334.15px;
                height: 94px;
                border: 1px solid #999999;
                border-radius: 16px;
                text-align: center;
                line-height: 94px;
            }
            .r {
                background: #238ff2;
                color: white;
            }
        }
    }
}
</style>
