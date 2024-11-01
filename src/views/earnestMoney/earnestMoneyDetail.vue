<template>
    <div class="wrap" >
     <div class="content">
        <div class="user">尊敬的{{phone}}用户，您好</div>
        <div class="bgbox">
            <div v-for="(item,index) in html" :key="index" :class="item.type" @click="clickhandler(item.name)">
                <p class="text">{{item.text}}</p>
                <p class="money"><span>{{item.hf}}</span>{{item.money}}<span>{{item.yuan}}</span></p>
            </div>
        </div>
        <Property v-if="html[0].show" :assetArr="assetArr"></Property>
        <Earnings v-if="html[1].show" :equityArr="equityArr"></Earnings>
     </div>
     </div>
</template>

<script>
import api from '@/common/apiUrls.js';
import { Toast } from 'mand-mobile';
import * as store2 from '@/common/localstore';
import Property from './property.vue';
import Earnings from './earnings.vue';

export default {
    name: 'earnestMoneyDetail',
    components: {
        Property,
        Earnings
    },
    data() {
        return {
            title: '大额保证金',
            phone: '',
            html: [
                {
                    name: 'property',
                    type: 'active',
                    text: '我的资产',
                    money: 0,
                    yuan: '元',
                    show: true
                },
                {
                    name: 'earnings',
                    type: 'deactive',
                    text: '我的累计奖励',
                    money: 0,
                    yuan: '元',
                    hf: '话费：',
                    show: false
                }
            ],
            assetArr: [], // 订单列表
            equityArr: [] // 权益列表
        };
    },
    methods: {
        clickhandler(name) {
            this.html.map((v) => {
                if (v.name === name) {
                    v.type = 'active';
                    v.show = true;
                } else {
                    v.type = 'deactive';
                    v.show = false;
                }
            });
        },
        assetQuery() {
            api.Bzj.assetQuery({
                usrid: store2.default.get('usrmob')
            })
                .then((data) => {
                    if (data.msgCd === 'BUS00000') {
                        data.list.map(item => this.html[0].money += parseInt(item.transactionAmount));
                        this.assetArr = data.list;
                        this.assetArr.map((v) => {
                            if (v.transactionType === '办理 资金冻结') {
                                return v.color = '#676767';
                            } if (v.transactionType === '中断 资金解冻' || v.transactionType === '中断 奖励扣除' || v.transactionType === '退货 奖励扣除') {
                                return v.color = '#ff601A';
                            }
                        });
                    }
                })
                .catch((error) => {
                    Toast.info(error.msgInfo);
                });
        },
        equityQuery() {
            api.Bzj.equityQuery({
                mobileNo: store2.default.get('usrmob')
            })
                .then((data) => {
                    if (data.msgCd === 'BUS00000') {
                        data.list.forEach((item) => {
                            item.actAmt /= 100;
                            if (item.receiveStuatus !== '发放失败') {
                                this.html[1].money += item.actAmt;
                            }
                        });
                        this.equityArr = data.list;
                    }
                })
                .catch((error) => {
                    Toast.info(error.msgInfo);
                });
        },
        getMblNo() {
            this.phone = store2.default.get('usrmob').replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        }
    },
    computed: {
    },
    created() {
        this.getMblNo();
        this.assetQuery();
        this.equityQuery();
    },
    mounted() {

    }
};
</script>

<style lang="less" scoped>
.wrap{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    .content{
        width: 100%;
        height:574px;
        background: url(../../assets/images/bigEarnestMoney/bg.png) no-repeat;
        background-size: cover;
        padding-top: 0.5px;
        // overflow: hidden;
        .user{
            width: 302px;
            height: 23px;
            font-weight: 500;
            font-size: 22px;
            text-align: center;
            color: #fff;
            margin-left: 39px;
            margin-top: 39px;
            margin-bottom: 28px;
         }
         .bgbox{
            // border: 2px solid red;
            width: 695px;
            height: 234px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-left: 25px;
            .active{
            width: 340px;
            height: 230px;
            background-image: url(../../assets/images/bigEarnestMoney/active.png);
            background-repeat: no-repeat;
            background-size: cover;
            .text{
                font-weight: 500;
                font-size: 26px;
                color: #fff ;
                margin-top: 47px;
                margin-left: 38px;
            }
            .money{
                font-weight: 700;
                font-size: 60px;
                text-align: center;
                color: #fff;
                margin-top: 48px;

                span{
                    font-weight: 500;
                    font-size: 26px;
                    text-align: center;
                    color: #fff;
                    margin-left: 10px;
                }
            }
         }

         .deactive{
            width: 340px;
            height: 230px;
            background-image: url(../../assets/images/bigEarnestMoney/deactive.png);
            background-repeat: no-repeat;
            background-size: cover;
            .text{
                font-weight: 500;
                font-size: 26px;
                color: #9b4608;
                margin-top: 47px;
                margin-left: 38px;
            }
            .money{
                font-weight: 700;
                font-size: 60px;
                text-align: center;
                color: #9b4608;
                margin-top: 48px;

                span{
                    font-weight: 500;
                    font-size: 26px;
                    text-align: center;
                    color: #9b4608;
                    margin-left: 10px;

                }
            }
         }
         }

    }


}
</style>
