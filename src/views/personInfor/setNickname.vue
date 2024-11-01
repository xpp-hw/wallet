<template>
    <div class="contain">
        <md-field>
            <md-input-item
                v-model="emailValue"
                placeholder=""
                align="left"
                type="text"
                autocomplete="off"
                @change="inputChange"
            ></md-input-item>
        </md-field>
        <md-button :type="btnType" @click="saveInfo">保存</md-button>
        <div class="tips">移动钱包</div>
    </div>
</template>

<script>
import mdHeader from '@/components/mdHeader';
// import api from '@/common/apiUrls';

export default {
    name: 'setNickname',
    components: {
        mdHeader
    },
    data() {
        return {
            emailValue: '张三',
            btnType: 'disabled' // default
        };
    },
    mounted() {
    },
    methods: {
        inputChange() {
            console.log('输入框');
            // setTimeout(() => {
            //     this.emailValue = this.emailValue.replace(//g, '');
            // }, 0);
            // this.btnType = this.emailValue ? 'default' : 'disabled';
        },
        saveInfo() {
            console.log('保存');
            // const reg = this.emailValue.indexOf('@');
            // if (this.emailValue && reg !== -1 && reg !== 0 && reg !== this.emailValue.length - 1) {
            //     this.$store.commit('LOADING', true);
            //     api.userInfo.saveEmailUrl({
            //         // eslint-disable-next-line no-irregular-whitespace
            //         email: this.emailValue.replace(//g, '')
            //     }).then(() => {
            //         this.$store.commit('LOADING', false);
            //         this.$toast.info('保存成功', 3000, true);
            //         setTimeout(() => {
            //             this.$router.replace({ name: 'personalInfo' });
            //         }, 3000);
            //     }).catch((data) => {
            //         this.$store.commit('LOADING', false);
            //         this.$toast.info(data.msgInfo || '保存失败，请稍后再试', 3000, true);
            //     });
            // } else {
            //     this.$toast.info('邮箱格式有误，请重新输入', 3000, true);
            // }
        }
    }
    // beforeRouteEnter(to, from, next) {
    //     document.querySelectorAll('html')[0].className = 'white-bgc';
    //     next();
    // },
    // beforeRouteLeave(to, from, next) {
    //     document.querySelectorAll('html')[0].className = '';
    //     next();
    // }
};
</script>
<style lang="less" scoped>
.contain {
    /deep/.md-field {
        background-color: #f5f5f5;
        .md-field-content{
            .md-input-item{
            &.is-android{
                .md-input-item-input{
                    font-weight: 400;
                }
            }
            .md-field-item-content{
                min-height: 120px;
                padding-bottom: 0;
                padding-top: 0;
                .md-field-item-title{
                    color: #000;
                    font-size: 32px;
                    width: 152px;
                    margin-right: 0;
                    padding-left: 30px;
                }

                .md-field-item-control{
                    .md-input-item-input{
                        font-size: 32px;
                        color: #5A6164;
                        height: 120px;
                        line-height: 1.5;
                        padding-right: 30px;
                        border-bottom: 1px solid #E1E1E1;
                    }
                    .md-input-item-input::-webkit-input-placeholder{
                        color: #AEAFAF;
                    }
                    .md-input-item-input:-moz-placeholder{
                        color: #AEAFAF;
                    }
                    .md-input-item-input::-moz-placeholder{
                        color: #AEAFAF;
                    }
                    .md-input-item-input:-ms-input-placeholder{
                        color: #AEAFAF;
                    }
                }
            }
            .md-field-item-content:before{
                border-bottom: none;
            }
            }
        }
    }
    /deep/ .md-button {
        border-radius: 10px;
        height: 90px;
        line-height: 90px;
        display: block;
        margin: 266px auto 579px;
        border: none;
        font-size: 32px;
        width: 660px;
        &.active:active{
            background: linear-gradient(270deg,rgba(140,112,235,1) 0%,rgba(113,101,231,1) 100%);
        }
        &.disabled{
            background: #D2CFEE;
            &:active{
                background: #D2CFEE;
            }
        }

        &.disabled:after{
            border:none;
        }

        &.block{
            width: 660px;
        }
        &.default{
            color: #FFF;
            background:linear-gradient(270deg,rgba(140,112,235,1) 0%,rgba(113,101,231,1) 100%);
        }
        &.default:after{
            border:none;
        }
    }
    .tips {
        width: 300px;
        height: 50px;
        opacity: 1;
        font-size: 36px;
        font-weight: 500;
        text-align: center;
        color: #d2d2d2;
        line-height: 50px;
        margin: auto;
    }
}
</style>
