<template>
    <div class="warp">
        <!--        账户-->
        <div class="account">
            <div v-for="(item,index) in studyList" :style="bg" class="item">
                <div class="img" @click="go(false,item.stuId)">
                    <img alt="" src="@/assets/images/babyFlower/cardimg.png">
                </div>
                <div class="text" @click="go(false,item.stuId)">
                    <span>日剩余可用额度（元）</span>
                    <p>{{ item.dailyLimit }}</p>
                    <div>{{ item.stuId }}</div>
                </div>
                <div v-if="item.nickName==null" class="setting" @click="setName(index)">
                    <p id="A01">设置昵称</p>
                </div>
                <div v-else class="name">
                    <div class="setnameWarp" @click="setName(index)">
                        <div class="setname">{{ item.nickName }}</div>
                        <img id="B01" alt="" src="@/assets/images/babyFlower/pen.png" >
                    </div>
                    <div class="null" @click="go(false,item.stuId)"></div>
                </div>
            </div>

        </div>
        <!--        添加小宝花账户-->
        <div id="D01" class="btn-add-account" @click="go(true)">
            <img alt="" src="@/assets/images/babyFlower/add.png">
            <p>添加小宝花账户</p>
        </div>
        <!--        修改名字-->
        <md-dialog
            v-model="basicDialog.open"
            :btns="basicDialog.btns"
            :closable="false"
            title="修改昵称"
            @show="show"
        >
            <input v-model="changeName" style="width: 100%;height: 0.8rem;outline: none;border: none;text-align: center;font-size: 0.4rem" type="text">
        </md-dialog>
    </div>
</template>

<script>
import { Dialog, Toast } from 'mand-mobile';
import api from '@/common/apiUrls';
import { initPageJs } from '@/common/Page2435_1_fn.js';

export default {
    name: 'index',
    components: {
        Dialog,
        Toast
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            api.accountInfoQuery()
                .then(res => {
                    // alert(sessionStorage.getItem('alreadySee'))
                    if(sessionStorage.getItem('alreadySee')){
                        vm.$router.push({
                            path:'setting',
                            query:{
                                ...vm.$route.query,
                            }
                        });
                    }else {
                        vm.studyList = res.list;
                        console.log(res);
                    }

                })
                .catch(err => {
                    if(vm.$route.query.code){
                        // alert(sessionStorage.getItem('alreadySee'))
                        if(sessionStorage.getItem('alreadySee')){
                            vm.$router.push({
                                path:'setting',
                                query:{
                                    ...vm.$route.query,
                                }
                            });
                        }else {
                            vm.$router.push({
                                path: '/babyFlower/openFlower',
                                query:{
                                    code:vm.$route.query.code
                                }
                            });
                        }

                    }else {
                        vm.$router.push({
                            path: '/babyFlower/openFlower'
                        });
                    }
                });
        });
    },
    data() {
        return {
            // name: '',
            index: '',
            changeName: '',
            studyList: [],
            bg: {
                backgroundImage: `url(${require('@/assets/images/babyFlower/itembg.png')})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%'
            },
            basicDialog: {
                open: false,
                btns: [
                    {
                        text: '取消',
                        id: 'C02',
                        handler: this.onBasicCancel
                    },
                    {
                        text: '确认修改',
                        id: 'C01',
                        handler: this.onBasicConfirm
                    }
                ]
            },
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_BABYFLOWER_INDEX_01_A01'
                },
                {
                    id: 'B01',
                    touchCode: 'WAP_T_BABYFLOWER_INDEX_01_B01'
                },
                {
                    id: 'C01',
                    touchCode: 'WAP_T_BABYFLOWER_INDEX_01_C01'
                },
                {
                    id: 'C02',
                    touchCode: 'WAP_T_BABYFLOWER_INDEX_01_C02'
                },
                {
                    id: 'D01',
                    touchCode: 'WAP_T_BABYFLOWER_INDEX_01_D01'
                },
                {
                    id: 'E01',
                    touchCode: 'WAP_T_BABYFLOWER_INDEX_01_E01'
                },
                {
                    id: 'E02',
                    touchCode: 'WAP_T_BABYFLOWER_INDEX_01_E02'
                },
                {
                    id: 'F01',
                    touchCode: 'WAP_T_BABYFLOWER_INDEX_01_F01'
                },
                {
                    id: 'F02',
                    touchCode: 'WAP_T_BABYFLOWER_INDEX_01_F02'
                },
                {
                    id: 'F03',
                    touchCode: 'WAP_T_BABYFLOWER_INDEX_01_F03'
                }
            ]
        };
    },
    mounted() {
        initPageJs(this.$route.meta.pageName, this.touchArr);
    },
    methods: {
        onBasicCancel() {
            this.basicDialog.open = false;
        },
        onBasicConfirm() {
            if (this.changeName == '') {
                Toast({
                    content: '昵称不能为空'
                });
            } else {
                let a = this.studyList[this.index].nickName;
                this.studyList[this.index].nickName = this.changeName;
                // 添加属性
                this.studyList[this.index] = {
                    ...this.studyList[this.index],
                    synFlag: '02'
                };
                // this.name = this.changeName;
                this.basicDialog.open = false;
                api.accountInfoSyn(
                    this.studyList[this.index]
                )
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                        this.studyList[this.index].nickName = a;
                        Toast({
                            content: err.msgInfo
                        });
                    });
            }
        },
        show() {
            this.changeName = this.name;
        },
        go(type, stuId) {
            this.$router.push({
                path: 'setting',
                query: {
                    type: type,
                    stuId: stuId
                }
            });
        },
        // 设置名字
        setName(index) {
            setTimeout(() => {
                this.basicDialog.open = true;
            }, 1000);
            this.name = this.studyList[index].nickName;
            this.index = index;
            console.log(index);
        }
    }


};
</script>

<style lang="less" scoped>
.warp {
    width: 100%;
    background-color: #F7F7F7;
    min-height: 100vh;
    //账户
    .account {
        width: 700px;
        margin: 37px auto 0;

        .item {
            width: 700px;
            height: 180px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            padding: 30px 20px;
            box-sizing: border-box;

            .img {
                width: 190px;
                height: 120px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .text {
                flex: 1;
                display: flex;
                flex-direction: column;
                color: #FFB034;
                padding-left: 22px;

                span {
                    font-size: 16px;
                    margin-bottom: 5px;
                }

                p {
                    font-size: 42px;
                    font-weight: bold;
                    margin-bottom: 20px;
                }

                div {
                    font-size: 22px;
                    color: #C76D39;
                }
            }

            .setting {
                width: 108.03px;
                height: 38.66px;
                border-radius: 8px;
                background: rgba(255, 176, 52, 1);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
            }

            .name {
                width: 211.91px;
                display: flex;
                flex-wrap: wrap;
                align-self: flex-start;
.setnameWarp{
    display: flex;
}

                .setname {
                    width: 190px;
                    text-align: right;
                    font-size: 24px;
                    color: #FFB034;
                    font-weight: bold;
                    background-color: rgba(255, 255, 255, 0.05);
                    border: none;
                    overflow: hidden;
                    white-space:nowrap;
                    //outline: none;
                }
.null{
    width: 100%;
    height: 100px;
    //background: red;
}
                img {
                    margin-left: 10px;
                    width: 21px;
                    height: 21px;
                }
            }
        }
    }

    .btn-add-account {
        width: 681px;
        height: 81px;
        border-radius: 10px 10px 10px 10px;
        border: 1px solid rgba(255, 176, 52, 1);
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 40px auto 0;

        img {
            width: 46px;
            height: 46px;
        }

        p {
            font-weight: 400;
            font-size: 34px;
            color: #FFB034;
            margin-left: 20px;
        }
    }
}
</style>
