<template>
    <div class="warp">
        <div class="header">
            <div class="text">累计领取流量</div>
            <div class="number">
                {{ amountReceived }}<span>GB</span>
            </div>
        </div>
        <div class="content">
            <div class="head">
                <div class="left">流量</div>
                <div class="right">近三个月明细</div>
            </div>
            <div v-for="(item,index) in flowRecord" :key="index" class="item">
                <div class="left">
                    <div class="top">
                        流量
                    </div>
                    <div class="bottom">
                        {{ item.receiveTime }}
                    </div>
                </div>
                <div class="right">
                    {{ item.flow }}GB
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/common/apiUrls';
import { initPageJs } from '@/common/Page2435_1_fn.js';

export default {
    name: 'traddicRecording',
    components: {},
    data() {
        return {
            amountReceived: 0,
            flowRecord: [],
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_TRADDIC_RECORDING_01_A01'
                }
            ]
        };
    },
    mounted() {
        this.receive();
        initPageJs(this.$route.meta.pageName, this.touchArr);
    },
    methods: {
        // 流量宝领取记录查询
        receive() {
            api.llb.receive()
                .then(res => {
                    this.flowRecord = res.flowRecord;
                    this.amountReceived = res.amountReceived;
                });
        }

    }
};
</script>

<style lang="less" scoped>
.warp {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    .header {
        width: 100%;
        height: 305px;
        background: url("~@/assets/images/traddic/bgr.png") no-repeat;
        background-size: 100% auto;
        padding-top: 110px;
        padding-left: 59px;
        box-sizing: border-box;

        .text {
            width: 195px;
            height: 45px;
            font-weight: 500;
            font-size: 32px;
            color: #575858;
        }

        .number {
            margin-top: 22px;
            font-weight: Bold;
            font-size: 74px;
            color: #3D3E3E;
            margin-left: 47px;

            span {
                font-size: 42px;
                color: #3D3E3E;
                margin-left: 10px;
            }
        }
    }

    .content {
        margin-top: 29px;
        width: 698px;
        background: #FFFFFF;
        border-radius: 10px;
        box-shadow: #E5E5E5 0 0 20px;
        padding: 0 10px;
        box-sizing: border-box;

        .head {
            width: 100%;
            height: 104px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #E5E5E5;
            font-size: 30px;
            color: #3D3E3E;
            font-weight: 500;
            padding: 0 31px 0 34px;
            box-sizing: border-box;

        }

        .item {
            width: 100%;
            height: 130px;
            display: flex;
            padding: 0 83px 0 34px;
            box-sizing: border-box;
            justify-content: space-between;
            border-top: 1px solid #E5E5E5;
            align-items: center;
            font-size: 30px;
            color: #3D3E3E;

            .bottom {
                margin-top: 10px;
                font-size: 22px;
                color: #AFAFAF;
            }
        }
    }
}
</style>
