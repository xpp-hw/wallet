<!--
 * @Author: Mr.Zhao 1914689669@qq.com
 * @Date: 2023-02-06 10:19:42
 * @LastEditors: Mr.Zhao 1914689669@qq.com
 * @LastEditTime: 2023-02-08 14:16:34
 * @FilePath: \wallet\src\views\middleVideo\middleVideo.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="box">
        <div class="vide">
            <!-- <div class="play" v-show="imgshow"></div> -->
            <video
                id="video"
                ref="video"
                autoplay
                muted
                controls
                webkit-playsinline="true"
                playsinline="true"
                x5-video-player-type="h5"
                x5-video-player-fullscreen="true"
                x5-video-orientation="portraint"
                style="object-fit:fill"
                src="~@/assets/video/video_0207.mp4"></video>
        </div>
        <div class="bg" @click="goUrl()">
            <div class="btn"></div>
        </div>
        <!-- <div class="other" @click="player()"></div> -->
    </div>
</template>

<script>
export default {
    name: 'middleVideo',
    data() {
        return {
            imgshow: false
        };
    },
    mounted() {
        if (this.$client.IOS) {
            window.onload = function () {
                undefined;
                const local1 = document.getElementById('video'); // 获取，函数执行完成后local内存释放
                local1.play();
                document.addEventListener(
                    'WeixinJSBridgeReady',
                    () => {
                        local1.play();
                    },
                    false
                );
                document.addEventListener(
                    'YixinJSBridgeReady',
                    () => {
                        local1.play();
                    },
                    false
                );
                setTimeout(() => {
                    local1.pause();
                    local1.load();
                }, 10);
                local1.autoplay = true; // 自动播放

                local1.muted = true; // 关闭声音，如果为false,视频无法自动播放

                if (local1.paused) { // 判断是否处于暂停状态
                    local1.play(); // 开启播放
                    this.imgshow = true;
                } else if (local1.play) {
                    this.imgshow = false;
                }
            };
        }
    },
    methods: {
        player() {
            if (this.$refs.video.paused) {
                this.imgshow = false;
                this.$refs.video.play();
            } else {
                this.$refs.video.pause();
                this.imgshow = true;
            }
        },
        goUrl() {
            this.$router.push({
                name: 'baiRongLoan'
            });
        }
    }
};
</script>

<style lang="less" scoped>
.box {
    position: relative;
    overflow: hidden;
    padding-bottom: 120px;
    .other {
        width: 698px;
        height: 393px;
        position: absolute;
        top: 18px;
        left: 20px;
        z-index: 20;
    }
    .vide {
        position: relative;
        width: 698px;
        height: 393px;
        margin: 19px auto;
        z-index: 11;
    }
    .play {
        position: absolute;
        transform: translateX(-50%);
        left: 50%;
        bottom: 145px;
        width: 139px;
        height: 70px;
        background: url('~@/assets/images/play_0206.png') no-repeat;
        background-size: 100%;
    }
    video {
        width: 100%;
        height: 100%;
        border-radius: 25px;
    }
    .bg {
        position: relative;
        width: 750px;
        height: 1160px;
        margin-top: -254px;
        background: url('~@/assets/images/bg_0206.png') no-repeat;
        background-size: 100%;
        .btn {
            width: 406px;
            height: 80px;
            background: url('~@/assets/images/btn_0206.png') no-repeat;
            background-size: 100%;
            position: absolute;
            transform: translateX(-50%);
            left: 50%;
            bottom: 0;
        }
    }
}
</style>
