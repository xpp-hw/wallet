<template>
    <div class="warp">
        <div class="header">请确认您的身份证扫描结果</div>
        <!--        基本信息-->
        <div class="top">
            <div class="item">
                <div>姓名</div>
                <div>{{ queryList.userName }}</div>
            </div>
            <div class="item">
                <div>身份证号</div>
                <div>{{ queryList.idNo }}</div>
            </div>
            <div class="item">
                <div>性别</div>
                <div>{{ queryList.genderTpCode == "1" ? "男" : "女" }}</div>
            </div>
            <div class="item">
                <div>民族</div>
                <div>{{ queryList.nation }}</div>
            </div>
            <div class="item">
                <div>证件有效期</div>
                <div>
                    {{ queryList.validDate}}
                </div>
            </div>
            <div class="item">
                <div>住址</div>
                <div>
                    {{ queryList.address}}
                </div>
            </div>
        </div>
        <!--        提交-->
        <div class="submitWarp">
            <div
                class="submit"
                @click="submit"
            >
                确认
            </div>
        </div>

    </div>
</template>

<script>
import api from "@/common/apiUrls.js";

export default {
    name: 'infomation',
    data() {
        return {
            queryList: {},
        };
    },
    mounted() {
        let queryList = {}
        if(this.$route.query.queryData) {
            queryList = JSON.parse(decodeURIComponent(this.$route.query.queryData))
            this.queryList.userName = queryList.userName || ''
            this.queryList.idNo = queryList.idNo || ''
            this.queryList.genderTpCode = queryList.genderTpCode || ''
            this.queryList.imageOrderNo = queryList.imageOrderNo || ''
            this.queryList.nation = queryList.nation || ''
            this.queryList.validDate = queryList.validDate || ''
            this.queryList.address = queryList.address || ''
            console.log(this.queryList,'+++++')
            console.log(this.queryList.userName ,'---00')
            this.$forceUpdate()
        }
    },
    methods: {
        // 授权校验
        submit() {
            this.$store.commit('LOADING', true);
            let backUrl = `https://fintech.12580life.com${process.env.BASE_URL}allAccount?hasaccount=&parchn=wdqbzh&gytype=001624&typeId=10010`
            if(window.sessionStorage.getItem('bocm_backUrl')) {
                backUrl = window.sessionStorage.getItem('bocm_backUrl')
            }
            api.accountOrder({
                backUrl: backUrl,
                docId: this.queryList.imageOrderNo || null
            })
            .then(data => {
                this.$store.commit('LOADING', false);
                if(data.pageUrl) {
                    window.location.href = data.pageUrl
                }
            })
            .catch(() => {
                this.$store.commit('LOADING', false);
                this.$toast.info('系统开小差了，请重新尝试~')
            })

        },
    }
};
</script>

<style lang="less" scoped>
.warp {
    width: 100%;
    min-height: 100vh;
    background: #f9f9fb;
    .readPop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        overflow-y: scroll;
        background: white;
        z-index: 99999;
        padding: 30px;
        box-sizing: border-box;
        h2 {
            text-align: center;
            font-size: 0.36rem;
            color: #333;
            font-weight: 700;
            margin-bottom: 0.2rem;
        }
        h3 {
            font-size: 0.32rem;
            margin-bottom: 0.1rem;
            margin-top: 0.2rem;
        }
        p {
            font-size: 0.26rem;
            color: #666666;
            line-height: 0.4rem;
            text-indent: 0.52rem;
        }
        .btn {
            width: 6.9rem;
            height: 0.82rem;
            font-size: 0.36rem;
            line-height: 0.82rem;
            color: #fff;
            background: #238ff2;
            text-align: center;
            border-radius: 0.08rem;
            margin-top: 40px;
        }
    }
    .header {
        width: 100%;
        //height: 48px;
        font-weight: 400;
        font-size: 34px;
        color: #171717;
        padding: 50px 321px 26px 21px;
        white-space: nowrap;
    }
    .top {
        width: 100%;
        //height: 493px;
        background: #ffffff;
        padding: 0 27.5px;
        box-sizing: border-box;
        margin-bottom: 30px;
        .item {
            width: 100%;
            height: 98px;
            border-bottom: 1px solid #e1e1e1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 400;
            font-size: 32px;
            color: #171717;
            div:nth-of-type(1) {
                white-space: nowrap;
                margin-right: 80px;
            }
        }
    }
    .change {
        width: 100%;
        background: #ffffff;
        padding-bottom: 40px;
        box-sizing: border-box;
        .item {
            padding: 29px 0 25.5px;
            box-sizing: border-box;
            width: 100%;
            height: 159px;
            border-bottom: 1px solid #e1e1e1;
            margin-bottom: 30px;
            /deep/ .md-field {
                .md-field-header {
                    font-weight: 400;
                    font-size: 28px;
                    color: #171717;
                    margin-bottom: 20px;
                }
                .md-field-title {
                    font-size: 28px;
                    color: #171717;
                }
                .md-field-content {
                    font-size: 32px;
                    color: #171717;
                    .md-field-item-control {
                        font-size: 32px;
                    }
                }
            }
        }
    }
    .typeOfTax {
        /deep/ .md-popup-box {
            .title-bar-title {
                &:before {
                    content: "";
                    position: absolute;
                    z-index: 2;
                    -webkit-transform-origin: 100% 50%;
                    transform-origin: 100% 50%;
                    -webkit-transform: scaleY(0.5) translateY(100%);
                    transform: scaleY(0.5) translateY(100%);
                    bottom: 0;
                    left: 0;
                    right: auto;
                    top: auto;
                    width: 100%;
                    border-bottom: solid 0.02rem #e1e1e1;
                    -webkit-transform-origin: 50% 100%;
                    transform-origin: 50% 100%;
                }
                .title {
                    font-weight: 400;
                    font-size: 36px;
                    color: #333333;
                }
            }
            .no-border {
                visibility: hidden;
            }
            .md-cell-item-body::before {
                border-bottom: solid 0.02rem #e1e1e1;
            }
            p {
                text-align: left;
            }
        }
    }
    .jobBox {
        background: #ffffff;
        display: flex;
        padding-bottom: 67px;
        margin-top: -2px;
        padding-top: 20px;
        .list {
            //width: 100%;
            height: 80px;
            box-sizing: border-box;
            font-size: 24px;

            color: #333333;
            position: relative;
        }
        //.active{
        //
        //}
        .left {
            width: 308px;
            height: 960px;
            border-right: 1px solid #eaeaea;
            padding-left: 12px;
            padding-right: 20px;
            box-sizing: border-box;
            .list {
                width: 266px;
                font-weight: 500;
            }
            .active {
                &:before {
                    content: "";
                    position: absolute;
                    top: 2px;
                    left: -12px;
                    width: 8px;
                    height: 25px;
                    background: #1b7aee;
                    border-radius: 0 2px 2px 0;
                    border-radius: 0 2px 2px 0;
                }
            }
        }
        .right {
            padding-left: 22px;
            height: 976px;
            overflow-y: scroll;
            -ms-overflow-style: none;
            overflow: -moz-scrollbars-none;
            font-weight: 400;
            &::-webkit-scrollbar {
                width: 0 !important;
            }
            .color {
                color: #1b7aee;
            }
        }
        .custom {
            width: 80%;
            border: 2px solid #666666;
            text-indent: 10px;
        }
    }
    .mailingAddress {
        /deep/ .md-popup-box {
            width: 100%;
            height: 897px;
            .md-popup-title-bar .title-bar-title {
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .md-popup-title-bar .title-bar-title p.title {
                font-weight: 500;
                font-size: 32px;
                color: #999999;
                text-align: center;
            }
            .distpicker-address-wrapper .address-container ul {
                height: 706px;
                min-height: 706px;
                overflow-y: scroll;
                li {
                    height: 72px;
                    line-height: 72px;
                    font-weight: 400;
                    font-size: 30px;
                    color: #333333;
                    padding-left: 36px;
                }
            }
            .distpicker-address-wrapper .address-header {
                height: 90px;
                background: #f6f6f6;
                margin-top: -1px;
                margin-bottom: -1px;
                ul {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    li {
                        border: none;
                        font-weight: 400;
                        font-size: 34px;
                        color: #333333;
                        text-align: center;
                        width: 25%;
                        padding: 0;
                    }
                    li:nth-child(2) {
                        width: 50%;
                    }
                    .active {
                        color: #1b7aee;
                    }
                }
            }
        }
    }
    .address {
        width: 100%;
        height: 97px;
        padding: 0 30px;
        box-sizing: border-box;

        input {
            width: 100%;
            height: 100%;
            line-height: 100%;
            outline: none;
            border: none;
            font-weight: 400;
            font-size: 32px;
            border-bottom: 1px solid #e1e1e1;
            //color: #909396;
            &::placeholder {
                color: #909396;
            }
        }
    }
    .submitWarp {
        width: 100%;
        height: 271px;
        display: flex;
        justify-content: center;
        align-items: center;
        .submit {
            width: 646px;
            height: 100px;
            text-align: center;
            line-height: 100px;
            background: #1b7aee;
            border-radius: 55px;
            font-weight: 400;
            font-size: 36px;
            color: #ffffff;
        }
    }

    .authorizationBox {
        height: 947px;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
            width: 329px;
            height: 329px;
            margin-top: 23px;
            margin-bottom: 18px;
        }
        .text {
            width: 650px;
            height: 173px;
            font-weight: 400;
            font-size: 28px;
            color: #383838;
            letter-spacing: 1px;
            text-align: center;
            line-height: 54px;
        }
        .agreement {
            font-size: 22px;
        }
        .ok {
            width: 627px;
            height: 90px;
            background: #1b7aee;
            border-radius: 12px;
            text-align: center;
            line-height: 90px;
            margin-top: 57px;
            font-weight: 400;
            font-size: 36px;
            color: #ffffff;
        }
        .not {
            background: #bdd9f8;
        }
        .no {
            margin-top: 40px;
            width: 627px;
            height: 90px;
            border: 2px solid #1b7aee;
            text-align: center;
            line-height: 90px;
            border-radius: 12px;
            font-weight: 400;
            font-size: 36px;
            color: #1b7aee;
        }
    }
}
/deep/ .md-dialog-body {
    text-align: center;
}
  .error{
    float: left;
    width: 100%;
    color :#ff0000;
    position: relative;
    border-top: 1px solid;
    font-size: 24px;
    padding-top: 5px;
  }
  .error1{
    float: left;
    width: 100%;
    color :#ff0000;
    margin-left:30px;
    margin-top: -28px;
  }
</style>
