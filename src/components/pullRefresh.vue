<template>
    <div class="pull-refresh" ref="scrollBox">
        <!-- 下拉刷新文字，下拉状态 -->
        <div class="pull-refreshing-text" id="scrollTip" v-if="moveState > 0">
            <!-- moveState为0和1的时候   下拉即可刷新，释放即可刷新 -->
            <div class="cont" v-if="moveState < 2">
                <!-- 下拉刷新 箭头图片 moveState从0变成1的时候箭头图片旋转180度，这个由css实现-->
                {{ moveState === 0 ? '下拉即可刷新...' : '释放即可刷新...' }}
            </div>
            <!-- 加载中 moveState=2 -->
            <div class="cont" v-else>
                <!-- loading状态的图片+文字 -->
                <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon> 下拉刷新...
            </div>
        </div>
         <slot></slot>
    </div>

</template>

<script>

export default {
    name: 'pullRefresh',
    props: {
        isrefresh: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            moveState: 0,
            moveDistance: 0,
            startY: 0
        };
    },
    watch: {
        isrefresh(newVal) {
            if (!newVal && this.moveState === 2) {
                this.moveState = 0;
            }
        }
    },
    mounted() {
        const el = this.$refs.scrollBox;
        console.log(el);
        el.addEventListener('touchstart', (e) => {
            this.touchStart(e);
        });
        el.addEventListener('touchmove', (e) => {
            this.touchMove(e);
        });
        el.addEventListener('touchend', (e) => {
            this.touchEnd(e);
        });
    },
    methods: {
        touchStart(e) {
            // 如果正在加载 则阻住触发
            if (this.moveState === 2) return;
            // 触摸开始时，动画时间，移动距离归0
            this.distance = 0;
            this.moveDistance = 0;
            // 获取初始y轴位置
            this.startY = e.targetTouches[0].clientY;
        },
        touchMove(e) {
            // 如果正在加载 则阻止触发
            if (this.moveState === 2) return;
            // 首先计算当前页面是否有滚动条，有滚动条，那么触摸滑动就是页面简单的上下滚动
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop > 0) return;

            const move = e.targetTouches[0].clientY - this.startY;
            // 判断手指滑动的距离，只有为正数才代表用户下拉了。
            if (move > 0) {
                // 阻止默认事件
                // e.preventDefault();
                // 增加滑动阻力的感觉
                this.moveDistance = Math.pow(move, 0.8);
                if (this.moveDistance > 50) {
                    // 如果滑动距离大于100 ，moveState状态更新为释放即可刷新
                    if (this.moveState === 1) return;
                    this.moveState = 1;
                } else {
                    // 否则 恢复原样
                    if (this.moveState === 0) return;
                    this.moveState = 0;
                }
            }
        },
        touchEnd(e) {
            // 如果正在加载 则阻住触发
            if (this.moveState === 2) return;
            // 只要手指拿开，加上结束时的动画

            this.duration = 300;
            if (this.moveDistance > 50) {
                // 手指松开之后，就开始变成加载中的状态了
                this.moveState = 2;
                this.moveDistance = 50;
                // 在家中，开始刷新页面数据，刷新之后有一个回调函数
                this.$emit('refresh', () => {
                    // 这里就是成功后的回调了，如果该函数被调用，那就以为着加载数据完成，所以状态要回到0，当然需要在父组件调用。
                    this.moveState = 0;
                    this.moveDistance = 0;
                });
            } else {
                // 否则 回到初始状态
                this.moveDistance = 0;
            }
        }
    }
};
</script>
<style lang="less" scoped>
.pull-refreshing-text {
    font-size: 18px;
    color: #5a5a5a;
    text-align: center;
    .cont{
        height: 60px;
        line-height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    // 下拉即可刷新
    .pull_icon {
        height: 30px;
        display: inline-block;
        margin-right: 10px;
        transition: transform 0.28s;  // 箭头旋转动画时间
        vertical-align: middle;
        // 释放即可刷新
        &.pull_icon-rotate {
            transform: rotate(-180deg);  // 箭头旋转180度
        }
    }
    // 加载中
    .pull_loading {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-size: 20px 20px;
        vertical-align: middle;
    }
}

</style>
