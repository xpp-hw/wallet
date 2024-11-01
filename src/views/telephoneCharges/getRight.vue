<!--
 * @Author: zhf 1914689669@.com
 * @Date: 2023-05-09 10:27:46
 * @LastEditors: zhf 1914689669@.com
 * @LastEditTime: 2023-08-22 10:45:54
 * @FilePath: \wallet\src\views\telephoneCharges\getRight.vue
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
import RightList from '../../components/rightList.vue';

export default {
    components: {
        RightList
    },
    data() {
        return {
            isCum: false,
            topNum: '0.00',
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
        api.hfb.receive({
            rightType: typeCode
        }).then((res) => {
            if(typeCode == '01') {
                this.topNum = res.amountReceived || '0.00';
                if (res.incomeRecord.length > 0) {
                    res.incomeRecord.forEach((item) => {
                        this.rightList.push({
                            time: item.receiveTime,
                            num: item.income,
                            isSucc: item.receiveStatus
                        });
                    });
                }
            } else if(typeCode == '02') {
                if(res.lamountReceived) {
                    if(res.lamountReceived.indexOf('GB') > -1) {
                        this.topNum = res.lamountReceived.slice(0,-2)
                    } else if(res.lamountReceived.indexOf('MB') > -1) {
                        this.topNum = res.lamountReceived.slice(0,-2) / 1000
                    }
                } else {
                    this.topNum = res.lamountReceived || '0.00';
                }
                if (res.lincomeRecord.length > 0) {
                    res.lincomeRecord.forEach((item) => {
                        this.rightList.push({
                            time: item.receiveTime,
                            num: item.income,
                            isSucc: item.receiveStatus
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
