<template>
    <div class="warp">
        <div class="content">
            <div v-html="agreementContent"></div>
        </div>
    </div>
</template>

<script>
import api from '@/common/apiUrls';

export default {
    name: 'exple',
    components: {},
    data() {
        return {
            agreementContent: ''
        };
    },
    mounted() {
        this.getAgreement();
    },
    methods: {
        getAgreement() {
            api.huataiAgreement({
                businessCode: 'ydqb0yb'
            }).then((res) => {
                this.agreementContent = res.content.replaceAll(
                    'px',
                    ''
                );
            });
        }
    }
};
</script>

<style lang="less" scoped>
.warp {
    width: 100%;
    min-height: 100vh;
    padding: 20px;
    box-sizing: border-box;
    color: #824702;
    font-size: 24px;
    h2 {
        text-align: center;
        margin-top: 10px;
        font-weight: 700;
        font-size: 38px;
    }
    h3 {
        line-height: 45px;
        margin-top: 30px;
        margin-bottom: 10px;
         font-size: 30px;
    }
    p {
        line-height: 39px;
        text-align: justify;
    }
    .table {
        width: 695px;
        //height: 112px;
        //border: 2px solid white;
        #customers {
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
            width: 100%;
            border-collapse: collapse;
        }
        #customers td,
        #customers th {
            font-size: 22px;
            border: 1px solid #824702;
            text-align: center;
            //padding: 3px 7px 2px 7px;
        }
        #customers th {
            font-size: 22px;
            text-align: center;
            padding-top: 5px;
            padding-bottom: 4px;
            color: #824702;
        }
    }
    .red {
        color: red;
    }
}
</style>
