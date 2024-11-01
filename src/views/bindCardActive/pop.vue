<template>
  <div class="pop_continer">
    <div class="wrap" v-if="!showFlah">

      <div class="prize_wrap">
        <div class="prize_class" v-for="(item, index) in prizeList" :key="index">
          <div>1GB流量</div>
          <div>{{ item.txdt }}</div>
          <div  :style=" item.txsts =='已领取'?'color:#FF6C0A':'color:#979797'">{{ item.txsts }}</div>
        </div>
      </div>
       <div class="radio_class">
        <div v-for="(item, index) in list" :key="index">
          <img :src="item.icon" alt="" srcset="" />
        </div>
      </div>
      <div @click="close">
      <img class="foot_btn" src="../../assets/images/bindCardActive/btn.png" alt="" srcset="">
      </div>
    </div>
    <div class="wrap_not" v-if="showFlah">
      <p>这里空空的，去充值一笔即享1GB流量赠送哦～</p>
      <div class="foot">
        <div class="not_close_btn" @click="close"></div>
        <div class="not_go_btn" @click="subimt"></div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/common/apiUrls';

export default {
    data() {
        return {
            showFlah: false,
            list: [
                {
                    icon: require('../../assets/images/bindCardActive/prize_icon.png')
                },
                {
                    icon: require('../../assets/images/bindCardActive/time_icon.png')
                },
                {
                    icon: require('../../assets/images/bindCardActive/zt_icon.png')
                }
            ],
            prizeList: [
            ]
        };
    },
    mounted() {
        this.query();
    },
    methods: {
        query() {
            // const atyId = process.env.VUE_APP_ENV == 'prod' ? 'ATY230807007299531' : 'ATY230807000175530';
            // api.hbPrizeList({ atyId }).then((res) => {
            //     this.prizeList = res.list || [];
            //     for (let i = 0; i < 10; i++) {
            //         this.prizeList.push(...res.list);
            //     }
            //     if (this.prizeList.length === 0) {
            //         this.showFlah = true;
            //     }
            // });
            api.rightQueryList({ capchl: 'CMPACC' })
                .then((res) => {
                    console.log('++', res);
                    this.prizeList = res.rightList;
                    this.prizeList.forEach((data) => {
                        if (data.txsts == '1') {
                            data.txsts = '已领取';
                        } else {
                            data.txsts = '领取失败';
                        }
                        data.txdt = `${data.txdt.slice(0, 4)}.${data.txdt.slice(4, 6)}.${data.txdt.slice(6, 8)}`;
                    });
                    if (this.prizeList.length === 0) {
                        this.showFlah = true;
                    }
                })
                .catch((err) => {
                    this.showFlah = true;
                    console.log('------', err);
                });
        },
        close() {
            this.$emit('closePop');
        },
        // 去充值
        subimt() {
            this.$emit('toRecharge');
        }
    }
};
</script>

<style lang="less" scoped>
.pop_continer {
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  .wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: url("../../assets/images/bindCardActive/pop_bg.png") no-repeat;
    background-size: 100%;
    width: 602px;
    height: 689px;
    box-sizing: border-box;
    padding: 310px 24px 0;
    text-align: center;
    .radio_class {
      display: flex;
      justify-content: space-between;
      position: absolute;
      top: 240px;
      left: 50%;
      transform: translate(-50%);
      width: 90%;
      div {
        width: 31%;
      }
      img {
        width: 100%;
      }
    }
    .prize_wrap {
      height: 220px;
      overflow-y: auto;
      line-height: 1.5;
      .prize_class {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        font-size: 28px;
        padding: 5px 0;
        div {
          width: 31%;
        }
      }
    }
    .foot_btn {
      width: 372px;
      height: 128px;
    }
  }
  .wrap_not {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: url("../../assets/images/bindCardActive/pop_bg_not.png")
      no-repeat;
    background-size: 100%;
    width: 602px;
    height: 789px;
    box-sizing: border-box;
    padding: 440px 24px 0;
    text-align: center;
    .foot {
      display: flex;
      justify-content: space-between;
      .not_close_btn {
        background: url("../../assets/images/bindCardActive/pop_close.png")
          no-repeat;
        background-size: 100% 100%;
        width: 244px;
        height: 89px;
      }
      .not_go_btn {
        background: url("../../assets/images/bindCardActive/pop_go_btn.png")
          no-repeat;
        background-size: 100% 100%;
        width: 284px;
        height: 89px;
      }
    }
    p {
      width: 80%;
      margin: auto;
      font-size: 32px;
      text-align: center;
      line-height: 1.8;
      padding-bottom: 80px;
    }
  }
}
</style>
