<!--
 * @Author: zhf 1914689669@.com
 * @Date: 2023-05-09 10:27:46
 * @LastEditors: zhf 1914689669@.com
 * @LastEditTime: 2023-08-22 10:51:46
 * @FilePath: \wallet\src\views\telephoneCharges\cumRight.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
      <right-list
        :isCum="isCum"
        :topNum="topNum"
        :rightList="rightList"
        :rightType="rightType"
      ></right-list>
    </div>
</template>

<script>
import api from '@/common/apiUrls';
// import * as store2 from '@/common/localstore';
import RightList from '../../components/rightList.vue';

export default {
    components: {
        RightList
    },
    data() {
        return {
            isCum: true,
            topTit: '累计话费(元)',
            topNum: '0.00',
            contTit: '话费',
            rightList: [],
            rightType: ''
        };
    },
    mounted() {
        this.rightType = this.$route.query.type;
        this.rightList = [];
        let typeCode
        if(this.rightType.indexOf('Flow') > -1) {
            typeCode = '02'
        } else {
            typeCode = '01'
        }
        api.hfb.income({
            rightType: typeCode
        }).then((res) => {
            if(typeCode == '01') {
                this.topNum = res.countAmount || '0.00';
                if (res.incomeRecord.length > 0) {
                    res.incomeRecord.forEach((item) => {
                        this.rightList.push({
                            time: item.time,
                            num: item.amount
                        });
                    });
                }
            } else if(typeCode == '02') {
                if(res.lcountAmount) {
                    if(res.lcountAmount.indexOf('GB') > -1) {
                        this.topNum = res.lcountAmount.slice(0,-2)
                    } else if(res.lcountAmount.indexOf('MB') > -1) {
                        this.topNum = res.lcountAmount.slice(0,-2) / 1000
                    }
                } else {
                    this.topNum = res.lcountAmount || '0.00';
                }
                if (res.lincomeRecord.length > 0) {
                    res.lincomeRecord.forEach((item) => {
                        this.rightList.push({
                            time: item.time,
                            num: item.amount
                        });
                    });
                }
            }
        }).catch((err) => {
            this.$toast.info(err.msgInfo);
            this.$router.go(-1);
        });
    },
    methods: {
    }
};
</script>
