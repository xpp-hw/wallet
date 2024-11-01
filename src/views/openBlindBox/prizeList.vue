<!--
 * @Author: Mr.Zhao 1914689669@qq.com
 * @Date: 2022-09-26 08:54:29
 * @LastEditors: Mr.Zhao 1914689669@qq.com
 * @LastEditTime: 2022-11-24 18:48:23
 * @FilePath: \wallet\src\views\openBlindBox\prizeList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>

    <div class="box">
      <div class="ticketsDiv">
        <div class="tickets" v-for="(item,index) in allList" :key="index" :class="
                    item.prizeDesc.indexOf('流量') > -1 ? 'GB' : (
                    item.prizeDesc.indexOf('话费') > -1 ? 'yuan' : 'lingxi') 
                ">
          <div class="ticketsTip">
            <p v-if="item.prizeDesc.indexOf('灵犀') == -1 && item.prizeDesc.indexOf('888') == -1">{{item.prizeDesc.slice(8)}}</p>
            <p v-if="item.prizeDesc.indexOf('888') > -1">888M流量</p>
            <p v-if="item.prizeDesc.indexOf('灵犀') > -1">{{item.prizeDesc}}</p>
            <p>购买时间：{{item.issureTime}}</p>
          </div>
          <div class="btn" v-if="item.prizeDesc.indexOf('灵犀') > -1" @click="goLingxi">去领取</div>
        </div>
        <!-- <div class="tickets GB" v-for="(item,index) in gbList" :key="index">
                    <div class="ticketsTip">
                        <p>{{item.prizeDesc.slice(8)}}</p>
                        <p>购买时间：{{item.issureTime}}</p>
                    </div>
                </div>
                <div class="tickets yuan" v-for="(item,index) in yuanList" :key="indexList[index]">
                    <div class="ticketsTip">
                        <p>{{item.prizeDesc.slice(8)}}</p>
                        <p>购买时间：{{item.issureTime}}</p>
                    </div>
                </div>
                <div class="tickets lingxi" v-for="(item) in bxList" :key="item.prizeCode">
                    <div class="ticketsTip">
                        <p>{{item.prizeDesc}}</p>
                        <p>购买时间：{{item.issureTime}}</p>
                    </div>
                    <div class="btn" @click="goLingxi">去领取</div>
                </div> -->
      </div>
    </div>

  </div>
</template>

<script>
import * as store2 from "@/common/localstore";
import api from "@/common/apiUrls.js";
export default {
  name: "prizeList",
  data() {
    return {
      allList: [],
      paixuList: [],
      gbList: [],
      yuanList: [],
      bxList: [],
      indexList: [
        100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113,
        114, 115, 116, 117, 118, 119, 120, 121, 122,
      ],
      // rightInfoList:[
      //     {
      //         prizeDesc: '1GB',
      //         issureTime: '1999年'
      //     },
      //     {
      //         prizeDesc: '3GB',
      //         issureTime: '2000年'
      //     },
      //     {
      //         prizeDesc: '3元',
      //         issureTime: '2001年'
      //     },
      //     {
      //         prizeDesc: '5元',
      //         issureTime: '2002年'
      //     },
      //     {
      //         prizeDesc: '灵犀保险',
      //         issureTime: '2003年'
      //     }
      // ]
    };
  },
  mounted() {
    this.usrOnePayOrderQuery();
  },
  methods: {
    dateData(property, bol) {
      //property是你需要排序传入的key,bol为true时是升序，false为降序
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        if (bol) {
          // 升序
          return Date.parse(value1) - Date.parse(value2);
        } else {
          // 降序
          return Date.parse(value2) - Date.parse(value1);
        }
      };
    },
    usrOnePayOrderQuery() {
      api.blindBox
        .usrOnePayOrderQuery({ rightCode: "10024" })
        .then((res) => {
          res.rightInfoList.forEach((data) => {
            if (data.prizeDesc) {
              this.allList.push(data);
              if (data.prizeDesc.indexOf("流量") > -1) {
                this.gbList.push(data);
                // this.distinct3(this.gbList,'prizeDesc')
              } else if (data.prizeDesc.indexOf("话费") > -1) {
                this.yuanList.push(data);
                // this.distinct3(this.yuanList,'prizeDesc')
              } else {
                this.bxList.push(data);
              }
            }
          });
          console.log("ssssssssssssssssssssssb", this.allList);
          // this.paixuList = this.allList.sort(this.dateData("issureTime", false))
          this.allList = this.allList.sort(function (a, b) {
            return b.issureTime - a.issureTime;
          });
          this.getDate(this.allList);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goLingxi() {
      store2.default.set("loginSesion", null);
      window.location.href =
        "https://fintech.12580life.com/fintech-h5/activity/lingxiInsurance?tokenid=" +
        this.$router.history.current.query.tokenid;
    },
    distinct3(arr, key) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[i][key] === arr[j][key]) {
            arr.splice(j, 1);
            j = j - 1;
          }
        }
      }
      return arr;
    },
    getDate(arr) {
      arr.forEach((data) => {
        let year = data.issureTime.slice(0, 4);
        let month = data.issureTime.slice(4, 6);
        let day = data.issureTime.slice(6, 8);
        data.issureTime = year + "." + month + "." + day;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 750px;
  height: 1494px;
  padding-top: 50px;
  background: url("~@/assets/images/openBlindBox/bg_2.png") no-repeat;
  background-size: 100% 100%;
  .ticketsDiv {
    overflow: scroll;
    height: 95%;
  }
  .tickets {
    position: relative;
    width: 680px;
    height: 170px;
    margin-top: 10px;
    .ticketsTip {
      position: absolute;
      top: 40px;
      left: 164px;
      p:first-child {
        font-size: 30px;
        font-weight: 500;
        color: #333333;
      }
      p:nth-of-type(2) {
        color: #999999;
        margin-top: 30px;
      }
    }
    .btn {
      position: absolute;
      top: 50px;
      right: 40px;
      width: 135px;
      height: 60px;
      border-radius: 14px 14px 14px 14px;
      background: rgba(15, 138, 255, 1);
      font-size: 26px;
      font-weight: 500;
      text-align: center;
      color: #ffffff;
      line-height: 60px;
    }
  }
  .GB {
    background: url("~@/assets/images/openBlindBox/pic_1_1.png") no-repeat;
    background-size: 100% 100%;
  }
  .yuan {
    background: url("~@/assets/images/openBlindBox/pic_3.png") no-repeat;
    background-size: 100% 100%;
  }
  .lingxi {
    background: url("~@/assets/images/openBlindBox/pic_2.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>

