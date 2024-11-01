// 再次输入
<template>
  <div class="reconfirm">
    <passwordPage :dataList="lis" v-on:childByVal="childByVal"></passwordPage>
    <popups :popusList="poplis" v-on:isShow="isShow"></popups>
  </div>
</template>

<script>
import api from '@/common/apiUrls';
import { Toast } from 'mand-mobile';
import * as store2 from '@/common/localstore';
import popups from '../../components/popups.vue';
import passwordPage from '../../components/passwordPage.vue';

export default {
    inject: ['reload'],
    components: {
        passwordPage,
        popups
    },
    data() {
        return {
            lis: {
                briefVal: '提示：支付密码不要输入重复或连续的数字',
                isTitle: '请再次输入6位数字密码'
            },
            poplis: {
                title: '设置成功',
                content: '支付密码设置成功，请牢记',
                alone: '确认',
                showMask: false,
                show: true
            }
        };
    },
    mounted() {
        if (this.$route.params.title == 1) {
            window.document.title = '设置支付密码';
        } else if (this.$route.params.title == 2) {
            window.document.title = '修改支付密码';
        } else if (this.$route.params.title == 3) {
            window.document.title = '重置支付密码';
        }
    },
    methods: {
        childByVal(val) {
            let zhi = '';
            if (this.$route.params.title == 1) {
                zhi = '01';
            } else if (this.$route.params.title == 2) {
                zhi = '02';
            } else if (this.$route.params.title == 3) {
                zhi = '03';
            }
            console.log(zhi, '------', store2.default.get('mima'));
            if (val.subId === this.$route.query.subVal1) {
                // 支付密码受理;
                api.paymentApi
                    .PaymentPasswordAcceptance({
                        // 新密码
                        encpwd: val.mima,
                        // 旧密码
                        oldencpwd:
              this.$route.params.title == 2 ? store2.default.get('mima') : '',
                        opttyp: zhi,
                        pwdtyp: '01',
                        usrid: store2.default.get('usrmob') // store2.default.get("usrmob");
                    })
                    .then((data) => {
                        console.log(data);
                        console.log(this.$route.params.title);
                        if (
                            data.smsjrn !== null
              || data.smsjrn !== ''
              || data.code !== null
              || data.code !== ''
                        ) {
                            if (this.$route.params.title == 2) {
                                if (data.code == 'RMP0000') {
                                    this.poplis.showMask = true;
                                } else {
                                    this.$toast('办理失败，请稍后重试');
                                }
                            } else {
                                console.log('跳转');
                                if (sessionStorage.getItem('babyUrl')) {
                                    const url = sessionStorage.getItem('babyUrl');
                                    sessionStorage.removeItem('babyUrl');
                                    window.location.href = url;
                                }
                                this.$router.push({
                                    path: `/VerificationCode/${data.smsjrn}`
                                });
                            }
                        } else {
                            console.log('失败');
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                setTimeout(() => {
                    Toast.info('两次密码输入不一致，请重新输入');
                    this.reload();
                }, 200);
            }
        },
        isShow() {
            this.$router.push({ name: 'newFortune' });
        }
    },
    created() {}
};
</script>

<style lang="less" scoped>
.reconfirm {
  height: 100vh;
  background-color: #f5f5f5;
}
</style>
