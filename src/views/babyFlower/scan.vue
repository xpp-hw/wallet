<template>
    <div>
        <!--        <p class="error">{{ error }}</p>-->
        <!--        &lt;!&ndash;错误信息&ndash;&gt;-->

        <!--        <p class="decode-result">-->
        <!--            扫描结果:-->
        <!--            <b>{{ result }}</b>-->
        <!--        </p>-->
        <!--扫描结果-->

        <qrcode-stream style="height: 100vh;" @decode="onDecode" @init="onInit">
            <div>
                <div class="qr-scanner">
                    <div class="box">
                        <div class="line"></div>
                        <div class="angle"></div>
                    </div>
                </div>
            </div>
        </qrcode-stream>
    </div>
</template>

<script>
// 下载插件
// cnpm install --save  vue-qrcode-readers

// 引入
import { QrcodeStream } from 'vue-qrcode-reader';
import api from '@/common/apiUrls';

export default {
    // 注册
    components: { QrcodeStream },

    data() {
        return {
            result: '', // 扫码结果信息
            error: '' // 错误信息
        };
    },

    methods: {
        onDecode(result) {
            let a = result.indexOf('code=');
            // alert(result.slice(a + 5));
            this.result = result.slice(a + 5);

            // this.$router.push({
            //     path: 'setting',
            //     query: {
            //         result: this.result
            //     }
            // });
            api.decrypt({ stuId: this.result })
                .then(res => {
                    console.log(res.stuId);
                    this.$router.push({
                        path: 'setting',
                        query: {
                            result: res.stuId
                        }
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },

        async onInit(promise) {
            try {
                await promise;
            } catch (error) {
                if (error.name === 'NotAllowedError') {
                    this.error = 'ERROR: 您需要授予相机访问权限';
                } else if (error.name === 'NotFoundError') {
                    this.error = 'ERROR: 这个设备上没有摄像头';
                } else if (error.name === 'NotSupportedError') {
                    this.error = 'ERROR: 所需的安全上下文(HTTPS、本地主机)';
                } else if (error.name === 'NotReadableError') {
                    this.error = 'ERROR: 相机被占用';
                } else if (error.name === 'OverconstrainedError') {
                    this.error = 'ERROR: 安装摄像头不合适';
                } else if (error.name === 'StreamApiNotSupportedError') {
                    this.error = 'ERROR: 此浏览器不支持流API';
                }
                alert(this.error);
            }
        }
    }
};
</script>

<style scoped>
.error {
    font-weight: bold;
    color: red;
}
</style>

<style scoped>
/* * {
  margin: 0;
  padding: 0;
}
body {
  height: 700px;
  margin: 0;
} */

.qr-scanner {
    background-image: linear-gradient(0deg,
    transparent 24%,
    rgba(32, 255, 77, 0.1) 25%,
    rgba(32, 255, 77, 0.1) 26%,
    transparent 27%,
    transparent 74%,
    rgba(32, 255, 77, 0.1) 75%,
    rgba(32, 255, 77, 0.1) 76%,
    transparent 77%,
    transparent),
    linear-gradient(90deg,
        transparent 24%,
        rgba(32, 255, 77, 0.1) 25%,
        rgba(32, 255, 77, 0.1) 26%,
        transparent 27%,
        transparent 74%,
        rgba(32, 255, 77, 0.1) 75%,
        rgba(32, 255, 77, 0.1) 76%,
        transparent 77%,
        transparent);
    background-size: 3rem 3rem;
    background-position: -1rem -1rem;
    width: 100%;
    /* height: 100%; */
    height: 100vh;
    position: relative;
    background-color: #1110;

    /* background-color: #111; */
}

.qr-scanner .box {
    width: 500px;
    height: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    border: 0.1rem solid rgba(0, 255, 51, 0.2);
    /* background: url('http://resource.beige.world/imgs/gongconghao.png') no-repeat center center; */
}

.qr-scanner .line {
    height: calc(100% - 2px);
    width: 100%;
    background: linear-gradient(180deg, rgba(0, 255, 51, 0) 43%, #00ff33 211%);
    border-bottom: 3px solid #00ff33;
    transform: translateY(-100%);
    animation: radar-beam 2s infinite alternate;
    animation-timing-function: cubic-bezier(0.53, 0, 0.43, 0.99);
    animation-delay: 1.4s;
}

.qr-scanner .box:after,
.qr-scanner .box:before,
.qr-scanner .angle:after,
.qr-scanner .angle:before {
    content: '';
    display: block;
    position: absolute;
    width: 50px;
    height: 50px;

    border: 10px solid transparent;
}

.qr-scanner .box:after,
.qr-scanner .box:before {
    top: 0;
    border-top-color: #00ff33;
}

.qr-scanner .angle:after,
.qr-scanner .angle:before {
    bottom: 0;
    border-bottom-color: #00ff33;
}

.qr-scanner .box:before,
.qr-scanner .angle:before {
    left: 0;
    border-left-color: #00ff33;
}

.qr-scanner .box:after,
.qr-scanner .angle:after {
    right: 0;
    border-right-color: #00ff33;
}

@keyframes radar-beam {
    0% {
        transform: translateY(-100%);
    }

    100% {
        transform: translateY(0);
    }
}
</style>

