<template>
    <div class="contaioner">
    </div>
</template>

<script>
import api from '@/common/apiUrls';
import * as store2 from '@/common/localstore';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import babycheck from '@/views/babyFlower/getCode.vue';
import checkCode from '@/views/traffic/checkCode';

export default {
    components: {
        babycheck,
        checkCode
    },
    data() {
        return {
            walletNum: '',
            freeze: '',
            isShowKuang: false,
            imgshow: true,
            jtImg: true,
            babyGetCode: false,
            changeList: [],
            hebaoList: [],
            ylBankList: [],
            shubiList: [], // 数币集合
            colorList: ['#FFFAF6', '#F3F4F8', '#FFF1F9', '#F7F4FE'],
            defaultBg: require('../../assets/images/banks/default_bg.png'),
            mobileNo: '',
            hasaccount: '',
            defaultOrgcode: '',
            accountPlus: 0
        };
    },
    created() {
        this.$store.commit('LOADING', true);
        this.hasaccount = this.$route.query.hasaccount;
        this.mobileNo = store2.default
            .get('usrmob')
            .replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        this.getChangeList();
        this.getInfoRefresh();
    },
    mounted() {

    },
    methods: {
        // 获取零钱账户信息
        getChangeList() {
            const qbBankListsIn = JSON.parse(sessionStorage.getItem('qbBankListsInfos') || '[]');
            if (!qbBankListsIn || qbBankListsIn.length < 1) {
                api.qrySmallChangeAcc({})
                    .then((res) => {
                        this.changeList = [];
                        res.list.forEach((item) => {
                            if (
                                item.fullAccNbr
                                && item.defaultAccFlg === '01'
                                && item.orgCode !== 'ICBC-DIGICCY'
                            ) {
                                this.changeList.unshift(item);
                                this.defaultOrgcode = item.orgCode;
                            } else if (item.fullAccNbr && item.orgCode !== 'ICBC-DIGICCY') {
                                if (this.changeList.length == 0) {
                                    this.changeList.push(item);
                                } else if (this.changeList.length == 1) {
                                    if (this.changeList[0].defaultAccFlg != '01') {
                                        if (item.orgCode == 'BOCM') {
                                            this.changeList.unshift(item);
                                        } else {
                                            this.changeList.push(item);
                                        }
                                    } else if (this.changeList[0].defaultAccFlg == '01') {
                                        this.changeList.push(item);
                                    }
                                } else if (this.changeList.length == 2) {
                                    if (this.changeList[0].defaultAccFlg != '01') {
                                        if (item.orgCode == 'BOCM') {
                                            this.changeList.unshift(item);
                                        } else if (item.orgCode == 'CMB') {
                                            console.log(this.changeList, '111');
                                            this.changeList.splice(1, 0, item);
                                        } else {
                                            this.changeList.push(item);
                                        }
                                    } else if (this.changeList[0].defaultAccFlg == '01') {
                                        if (item.orgCode == 'BOCM') {
                                            this.changeList.splice(1, 0, item);
                                        } else if (item.orgCode == 'CMB') {
                                            if (this.changeList[1].orgCode == 'SPDB') {
                                                this.changeList.splice(1, 0, item);
                                            } else {
                                                this.changeList.push(item);
                                            }
                                        } else {
                                            this.changeList.push(item);
                                        }
                                    }
                                }
                            }
                        });
                        this.accountPlus++;
                        store2.default.set('qbBankListsInfo', this.changeList);
                        window.sessionStorage.setItem('qbBankListsInfos', JSON.stringify(this.changeList));
                        setTimeout(() => {
                            this.getBankImg();
                        }, 1000);
                    })
                    .catch((err) => {
                        console.log(err.msgInfo);
                        this.accountPlus++;
                        // this.$toast.info(err.msgInfo);
                    });
            } else {
                this.changeList = [];
                const qbBankListsInfos = JSON.parse(sessionStorage.getItem('qbBankListsInfos') || '[]');
                qbBankListsInfos.forEach(
                    (item) => {
                        if (
                            item.fullAccNbr
                                && item.defaultAccFlg === '01'
                                && item.orgCode !== 'ICBC-DIGICCY'
                        ) {
                            this.changeList.unshift(item);
                            this.defaultOrgcode = item.orgCode;
                        } else if (item.fullAccNbr && item.orgCode !== 'ICBC-DIGICCY') {
                            if (this.changeList.length == 0) {
                                this.changeList.push(item);
                            } else if (this.changeList.length == 1) {
                                if (this.changeList[0].defaultAccFlg != '01') {
                                    if (item.orgCode == 'BOCM') {
                                        this.changeList.unshift(item);
                                    } else {
                                        this.changeList.push(item);
                                    }
                                } else if (this.changeList[0].defaultAccFlg == '01') {
                                    this.changeList.push(item);
                                }
                            } else if (this.changeList.length == 2) {
                                if (this.changeList[0].defaultAccFlg != '01') {
                                    if (item.orgCode == 'BOCM') {
                                        this.changeList.unshift(item);
                                    } else if (item.orgCode == 'CMB') {
                                        this.changeList.splice(1, 0, item);
                                    } else {
                                        this.changeList.push(item);
                                    }
                                } else if (this.changeList[0].defaultAccFlg == '01') {
                                    if (item.orgCode == 'BOCM') {
                                        this.changeList.splice(1, 0, item);
                                    } else if (item.orgCode == 'CMB') {
                                        if (this.changeList[1].orgCode == 'SPDB') {
                                            this.changeList.splice(1, 0, item);
                                        } else {
                                            this.changeList.push(item);
                                        }
                                    } else {
                                        this.changeList.push(item);
                                    }
                                }
                            }
                        }
                    }
                );
                setTimeout(() => {
                    this.getBankImg();
                }, 1000);
            }

            console.log(this.changeList);
        },
        // 获取卡面信息
        getBankImg() {
            const bankList = JSON.parse(JSON.stringify(this.changeList) || '[]');
            const lengthNum = bankList.length;
            if (!store2.default.get('bankImgList')) {
                api.cardImageQuery({ accountType: '01' })
                    .then((res) => {
                        const imgList = res.list;
                        store2.default.set('bankImgList', imgList);
                        if (bankList.length < imgList.length) {
                            imgList.forEach((item) => {
                                let isHad = false;
                                bankList.forEach((part) => {
                                    if (part.orgCode === item.orgcode) {
                                        isHad = true;
                                    }
                                });
                                let a = '00';
                                if (
                                    store2.default.get('djList')
                                    && store2.default
                                        .get('djList')
                                        .filter(
                                            i => i.orgCode == item.orgcode
                                        ).length > 0
                                ) {
                                    a = store2.default
                                        .get('djList')
                                        .filter(
                                            i => i.orgCode == item.orgcode
                                        )[0].accsts;
                                }
                                if (!isHad) {
                                    if (item.orgcode == 'BOCM') {
                                        if (lengthNum == 0) {
                                            bankList.unshift({
                                                orgName: item.orgname,
                                                image: item.image,
                                                orgCode: item.orgcode,
                                                accsts: a
                                            });
                                        } else if (lengthNum == 1) {
                                            bankList.splice(1, 0, {
                                                orgName: item.orgname,
                                                image: item.image,
                                                orgCode: item.orgcode,
                                                accsts: a
                                            });
                                        } else {
                                            bankList.push({
                                                orgName: item.orgname,
                                                image: item.image,
                                                orgCode: item.orgcode,
                                                accsts: a
                                            });
                                        }
                                    } else if (item.orgcode == 'CMB') {
                                        if (lengthNum == 0) {
                                            if (bankList.length > 0) {
                                                if (bankList[0].orgCode == 'BOCM') {
                                                    bankList.splice(1, 0, {
                                                        orgName: item.orgname,
                                                        image: item.image,
                                                        orgCode: item.orgcode,
                                                        accsts: a
                                                    });
                                                } else if (bankList[0].orgCode == 'SPDB') {
                                                    bankList.unshift({
                                                        orgName: item.orgname,
                                                        image: item.image,
                                                        orgCode: item.orgcode,
                                                        accsts: a
                                                    });
                                                }
                                            } else {
                                                bankList.push({
                                                    orgName: item.orgname,
                                                    image: item.image,
                                                    orgCode: item.orgcode,
                                                    accsts: a
                                                });
                                            }
                                        } else if (lengthNum == 1) {
                                            if (bankList.length > 0) {
                                                bankList.splice(1, 0, {
                                                    orgName: item.orgname,
                                                    image: item.image,
                                                    orgCode: item.orgcode,
                                                    accsts: a
                                                });
                                            } else {
                                                bankList.push({
                                                    orgName: item.orgname,
                                                    image: item.image,
                                                    orgCode: item.orgcode,
                                                    accsts: a
                                                });
                                            }
                                        }
                                    } else if (item.orgcode == 'SPDB') {
                                        console.log(11111111111);
                                        bankList.push({
                                            orgName: item.orgname,
                                            image: item.image,
                                            orgCode: item.orgcode,
                                            accsts: '00'
                                        });
                                    }
                                    this.changeList = bankList;
                                    console.log(this.changeList, '+++', bankList, '----');
                                }
                            });
                        }
                        this.accountPlus++;
                        this.goOpenOrSearch(this.changeList[0]);
                    })
                    .catch((err) => {
                        console.log(err.msgInfo);
                        this.accountPlus++;
                    });
            } else {
                const imgList = store2.default.get('bankImgList');
                if (bankList.length < imgList.length) {
                    imgList.forEach((item) => {
                        let isHad = false;
                        bankList.forEach((part) => {
                            if (part.orgCode === item.orgcode) {
                                isHad = true;
                            }
                        });
                        console.log(isHad);
                        let a = '00';
                        if (
                            store2.default.get('djList')
                            && store2.default
                                .get('djList')
                                .filter(i => i.orgCode == item.orgcode)
                                .length > 0
                        ) {
                            a = store2.default
                                .get('djList')
                                .filter(
                                    i => i.orgCode == item.orgcode
                                )[0].accsts;
                        }
                        if (!isHad) {
                            if (item.orgcode == 'BOCM') {
                                if (lengthNum == 0) {
                                    bankList.unshift({
                                        orgName: item.orgname,
                                        image: item.image,
                                        orgCode: item.orgcode,
                                        accsts: a
                                    });
                                } else if (lengthNum == 1) {
                                    bankList.splice(1, 0, {
                                        orgName: item.orgname,
                                        image: item.image,
                                        orgCode: item.orgcode,
                                        accsts: a
                                    });
                                } else {
                                    bankList.push({
                                        orgName: item.orgname,
                                        image: item.image,
                                        orgCode: item.orgcode,
                                        accsts: a
                                    });
                                }
                            } else if (item.orgcode == 'CMB') {
                                if (lengthNum == 0) {
                                    if (bankList.length > 0) {
                                        if (bankList[0].orgCode == 'BOCM') {
                                            bankList.splice(1, 0, {
                                                orgName: item.orgname,
                                                image: item.image,
                                                orgCode: item.orgcode,
                                                accsts: a
                                            });
                                        } else if (bankList[0].orgCode == 'SPDB') {
                                            bankList.unshift({
                                                orgName: item.orgname,
                                                image: item.image,
                                                orgCode: item.orgcode,
                                                accsts: a
                                            });
                                        }
                                    } else {
                                        bankList.push({
                                            orgName: item.orgname,
                                            image: item.image,
                                            orgCode: item.orgcode,
                                            accsts: a
                                        });
                                    }
                                } else if (lengthNum == 1) {
                                    if (bankList.length > 0) {
                                        bankList.splice(1, 0, {
                                            orgName: item.orgname,
                                            image: item.image,
                                            orgCode: item.orgcode,
                                            accsts: a
                                        });
                                    } else {
                                        bankList.push({
                                            orgName: item.orgname,
                                            image: item.image,
                                            orgCode: item.orgcode,
                                            accsts: a
                                        });
                                    }
                                }
                            } else if (item.orgcode == 'SPDB') {
                                console.log(11111111111, bankList);
                                bankList.push({
                                    orgName: item.orgname,
                                    image: item.image,
                                    orgCode: item.orgcode,
                                    accsts: '00'
                                });
                            }
                            this.changeList = bankList;
                            console.log(this.changeList, '+++', bankList, '----');
                        }
                    });
                }
                this.accountPlus++;
                this.goOpenOrSearch(this.changeList[0]);
            }
            console.log('111111111', this.changeList);
            // var arrList = this.changeList
            // this.changeList = []
            // if(arrList.length > 0) {
            //     arrList.forEach(data => {
            //         if(data.orgCode != "BOCM") {
            //             this.changeList.push(data)
            //         }
            //     })
            // }
        },
        goOpenOrSearch(item) {
            if (item.accsts === '01') {
                // 去查看
                this.$router.push({
                    name: 'moveWallet',
                    query: {
                        accNbr: item.accNbr,
                        fullAccNbr: item.fullAccNbr,
                        orgName: item.orgName
                    }
                });
            } else if (item.accsts === '00') {
                let tyid;
                if (this.$route.query.typeId) {
                    tyid = this.$route.query.typeId;
                } else {
                    tyid = '10010';
                }
                // 去开通
                this.$router.push({
                    name: 'khEmpower',
                    query: {
                        typeId: tyid,
                        orgCode: item.orgCode,
                        sourcechannel: this.$route.query.sourcechannel || '',
                        localSign: this.localSign
                    }
                });
            } else if (item.accsts == '03') {
                this.freeze = item.orgCode;
                this.isShowKuang = true;
            }
        },
        // 重新获取数据
        getInfoRefresh() {
            const changeList = [];
            api.qrySmallChangeAcc({}).then((res) => {
                // 零钱账户开通标识(00:未开户 01:开户正常 04:开户中)
                if (res.totalBalance) {
                    this.walletNum = Number(res.totalBalance).toFixed(2);
                }
                res.list.forEach((item) => {
                    if (
                        item.fullAccNbr
                        && item.defaultAccFlg === '01'
                        && item.orgCode !== 'ICBC-DIGICCY'
                    ) {
                        changeList.unshift(item);
                    } else if (item.fullAccNbr && item.orgCode !== 'ICBC-DIGICCY') {
                        changeList.push(item);
                    }
                });
                window.sessionStorage.setItem('qbBankListsInfos', JSON.stringify(changeList));
                store2.default.set('walletNum', this.walletNum);
                store2.default.set('qbBankListsInfo', changeList);
            });
        }
    },
    watch: {
        accountPlus: {
            handler(newVal, old) {
                console.log('newVal', newVal);
                if (newVal >= 1) {
                    this.$store.commit('LOADING', false);
                }
            }
        }
    },
    destroyed() {
        this.$store.commit('LOADING', false);
    }
};
</script>

<style lang="less" scoped>
.contaioner{
  background: #F7F8FA;
  height: 100vh;
  overflow-y: auto;
  padding-bottom: 30px;
}
.account-warp {
    width: 100%;
    margin: 40px auto;
}
.account-video {
    width: -moz-calc(100% - 60px);
    width: -webkit-calc(100% - 60px);
    width: calc(100% - 60px);
    position: relative;
    margin: 0 30px;
    height: 320px;

    video {
        width: 100%;
        height: 100%;
        object-fit: fill;
    }

    .fenmian {
        // width: 100%;
        // height: 100%;
        // position: absolute;
        // z-index: 999;
        width: -moz-calc(100% + 2px);
        width: -webkit-calc(100% + 2px);
        width: calc(100% + 2px);
        height: -moz-calc(100% + 1px);
        height: -webkit-calc(100% + 1px);
        height: calc(100% + 1px);
        position: absolute;
        z-index: 999;
        left: -1px;

        div {
            width: 100%;
            height: 100%;
            // background-color: rgba(0, 0, 0, 0.4);
            display: flex;
            justify-content: center;
            align-items: center;
        }
        img {
            width: 100px;
            height: 100px;
        }
    }
    .fenmian2 {
        background: url(../../assets/images/accountVideoImg.png) #fff no-repeat;
        background-size: 100% 100%;
    }
}

.smallchange,
.hebao,
.shubi,
.bankcard {
    font-family: PingFangSC-Medium;
}

.top {
    height: 42px;
    line-height: 42px;
    display: flex;
    justify-content: space-between;
    padding: 30px;
    color: #1e1e1e;
    font-weight: 600;
    font-size: 30px;

    .set {
        font-size: 24px;
        font-weight: 400;
        color: #333333;
    }
}

.content {
    .contentList {
        height: 160px;
        margin: 0 30px 20px;
        padding: 0 21px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        border-radius: 12px;

        .cardImg {
            width: 170px;
            height: 108px;

            img {
                width: 170px;
                height: 108px;
            }
        }
        .shubiImg{
          img {
               width: 180px;
                height: 114px;
            }
        }
        .imgCont {
            display: flex;
            align-self: center;
            position: absolute;
            top: 35px;
            left: 35px;

            img {
                width: 20px;
                height: 20px;
                margin-top: 5px;
            }

            span {
                line-height: 30px;
                margin-left: 10px;
                color: #fff;
                font-size: 12px;
            }
        }

        .btn {
            width: 95px;
            height: 30px;
            line-height: 30px;
            background: #e58985;
            color: #fff;
            font-size: 20px;
            text-align: center;
            border-radius: 12px;
        }

        .main {
            flex-grow: 1;
            padding-left: 20px;

            .account {
                font-size: 30px;
                color: #4d4d4d;
                font-weight: 400;
                line-height: 42px;

                span {
                    font-size: 24px;
                    color: #7c7c7c;
                    margin-left: 20px;
                }
            }

            .code {
                font-size: 24px;
                color: #7c7c7c;
                margin-top: 10px;

                img {
                    width: 72px;
                    height: 21px;
                }
            }

            .openBtn {
                background: #00aaee;
                margin-top: 10px;
            }
        }
    }

    .contentList:last-of-type {
        margin-bottom: 0;
    }
}

.hebao .content .contentList .cardImg {
    width: 96px;
    height: 96px;
}
.shubi .content .contentList .cardImg {
    width: 87px;
    height: 85px;
    img{
       width: 87px;
    height: 85px;
    }
}
.noBank {
    height: 160px;
    display: flex;
    margin: 0 0.3rem 0.2rem;
    justify-content: space-between;
    align-items: center;
    position: relative;
    background: url("../../assets/images/banks/bankXC.png") no-repeat;
    background-size: 100% 100%;

    .cont {
        margin-left: 207px;
        font-size: 20px;
        font-weight: 500;
        color: #cc6200;

        .title {
            font-size: 28px;
            font-weight: 600;
            color: #bf6824;
            margin-bottom: 20px;
        }
    }

    .btn {
        width: 110px;
        height: 50px;
        line-height: 50px;
        border: 2px solid #f09949;
        border-radius: 8px;
        font-size: 24px;
        text-align: center;
        color: #f09949;
        background: #fff;
        margin-right: 30px;
    }
}

.addBtn {
    height: 76px;
    line-height: 76px;
    margin: 50px 30px;
    border: 2px solid #009bff;
    border-radius: 12px;
    font-size: 30px;
    color: #00a4e2;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 36px;
        height: 36px;
        margin-right: 6px;
    }
}

/deep/ .defaultAnddelete {
    .pouTitle {
        border-radius: 36px 36px 0px 0px;
        background: #ffffff;
        height: 106px;
        width: 100%;
        font-size: 30px;
        display: flex;
        justify-content: left;
        align-items: center;
        border: 1px solid #d5d5d5;

        img {
            margin-left: 30px;
            width: 36px;
            height: 36px;
        }

        span {
            width: 100%;
            text-align: center;
            font-weight: 500;
            color: #333333;
            font-size: 30px;
            font-weight: 400;
        }
    }

    .pouContain {
        // height: 265px;
        background: #ffffff;

        .setDefault {
            height: 96px;
            opacity: 1;
            font-size: 28px;
            font-weight: 400;
            text-align: left;
            color: #333333;
            padding-left: 30px;
            line-height: 96px;
            border: 1px solid #d5d5d5;
        }

        .deleteBank {
            height: 96px;
            opacity: 1;
            background: #ffffff;
            font-size: 28px;
            font-weight: 400;
            text-align: left;
            color: #333333;
            padding-left: 30px;
            line-height: 96px;
            border: 1px solid #d5d5d5;
        }
    }
}

/deep/ .defaultAnddelete {
    .pouTitle {
        border-radius: 36px 36px 0px 0px;
        background: #ffffff;
        height: 106px;
        width: 100%;
        font-size: 30px;
        display: flex;
        justify-content: left;
        align-items: center;
        border: 1px solid #d5d5d5;

        img {
            margin-left: 30px;
            width: 36px;
            height: 36px;
        }

        span {
            width: 100%;
            text-align: center;
            font-weight: 500;
            color: #333333;
            font-size: 30px;
            font-weight: 400;
        }
    }

    .pouContain {
        // height: 265px;
        background: #ffffff;

        .setDefault {
            height: 96px;
            opacity: 1;
            font-size: 28px;
            font-weight: 400;
            text-align: left;
            color: #333333;
            padding-left: 30px;
            line-height: 96px;
            border: 1px solid #d5d5d5;
        }

        .deleteBank {
            height: 96px;
            opacity: 1;
            background: #ffffff;
            font-size: 28px;
            font-weight: 400;
            text-align: left;
            color: #333333;
            padding-left: 30px;
            line-height: 96px;
            border: 1px solid #d5d5d5;
        }
    }
}

.msgDialog {
    /deep/ .md-popup {
        .md-popup-box {
            .md-dialog-content {
                width: 640px;
                border-radius: 20px;

                .md-dialog-body {
                    color: #13252e;
                    font-size: 30px;
                    text-align: center;
                    padding: 0;
                    min-height: 430px;
                    display: unset;

                    .md-dialog-title {
                        font-size: 32px;
                        color: #333;
                        font-weight: 600;
                        margin: 60px 0 20px;
                    }

                    .msgTips {
                        font-size: 26px;
                        color: #999;
                    }

                    .errorTips {
                        background: #ffffff;
                        width: 200px;
                        margin-left: 220px;
                        margin-bottom: 20px;
                    }

                    .md-codebox-wrapper {
                        margin: 40px 0 30px;

                        .md-codebox {
                            .md-codebox-box:last-child {
                                margin-right: 0;
                            }

                            .md-codebox-box {
                                &:before {
                                    border-bottom: none;
                                }

                                flex: 0 1 80px;
                                width: 80px;
                                height: 80px;
                                // background: #F5F5F5;
                                border: 2px solid #0195ff !important;
                                border-radius: 8px;
                                margin-right: 15px;
                                color: #333;
                                font-size: 42px;
                                font-weight: 600;
                                margin-left: 0;
                                line-height: 80px !important;
                                // border: none;
                            }
                        }
                    }

                    .errorTips {
                        color: #0195ff;
                        font-size: 24px;
                        word-break: break-all;
                        height: 50px;
                    }
                }

                .md-dialog-actions {
                    .md-dialog-btn {
                        color: #0195ff;
                        width: 2.8rem;
                        opacity: 1;
                        background: #ffffff;
                        border: 0.02rem solid #0195ff;
                        border-radius: 0.08rem;
                        font-weight: 500;
                        height: 0.75rem;
                        margin-top: 0.2rem;
                        margin-right: 30px;
                        margin-left: 30px;
                        // &.disabled{
                        //     color: #0195ff!important;
                        // }
                    }

                    .md-dialog-btn:last-child {
                        // color: #0195ff;
                        width: 200px;
                        height: 0.75rem;
                        opacity: 1;
                        background: #0195ff;
                        border-radius: 8px;
                        margin-top: 0.2rem;
                        margin-bottom: 40px;
                        margin-right: 30px;
                        color: #ffffff;
                    }
                }
            }
        }
    }
}

.babyPopup {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .box {
        width: 650px;
        height: 400px;
        box-sizing: border-box;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40px;
        flex-wrap: wrap;
        border-radius: 20px;

        .top {
            font-size: 36px;
        }

        .mid {
            font-size: 32px;
        }

        .bottom {
            width: 100%;
            padding: 0 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            div {
                width: 200px;
                height: 80px;
                border: 2px solid #ffab00;
                border-radius: 10px;
                text-align: center;
                line-height: 80px;
                font-size: 32px;
                color: #ffab00;
            }

            .right {
                background: #ffab00;
                color: white;
            }
        }
    }
}
.maskBox {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: rgba(5, 5, 5, 0.6);

    .kuang {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 561px;
        height: 425px;
        background: #ffffff;
        border-radius: 25.2px;
        padding: 0.3rem;
    }

    .tips {
        text-align: center;
        font-size: 0.4rem;
    }

    .hr {
        height: 0.01rem;
        margin: 0.3rem auto;
        background-color: #dddddd;
    }

    .contentBox {
        display: flex;
        align-items: center;
        height: 1.5rem;
        overflow-y: scroll;

        .content {
            width: 100%;
            font-size: 28px;

            font-weight: 500;
            line-height: 50px;
        }
    }

    .btn {
        position: absolute;
        left: 50%;
        right: 50%;
        transform: translate(-50%, -50%);
        bottom: 0.25rem;
        width: 341px;
        height: 70px;
        background: #238ff2;
        border-radius: 38px;
        color: white;
        font-size: 0.32rem;
        line-height: 0.8rem;
        text-align: center;
    }
}
#freeze {
    background-color: #a5abb7;
}
</style>
