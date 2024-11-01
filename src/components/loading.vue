<template>
    <div class="loading-box" :class="{ index: loading.type === 'index' }" v-show="loading.isShow">
        <div class="loadingDiv">
            <template v-if="loading.type === 'index'">
                <md-activity-indicator :size="100" vertical type="spinner" color="light">
                </md-activity-indicator>
            </template>
            <template v-else>
                <md-activity-indicator :size="80" :text-size="30" vertical type="spinner" color="light" text-color="#FFF">
                    加载中
                </md-activity-indicator>
            </template>
        </div>
    </div>
</template>

<script>
import {
    ActivityIndicator
} from 'mand-mobile';
import { mapState } from 'vuex';

export default {
    name: 'loading',
    components: {
        [ActivityIndicator.name]: ActivityIndicator
    },
    computed: {
        ...mapState(['loading'])
    }
};
</script>

<style lang="less">
    .loading-box{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        z-index: 9999;

        .loadingDiv{
            display: flex;
            justify-content: center;
            width: 100%;
            height: 100%;

            .md-activity-indicator{
                background: rgba(0, 0, 0, 0.5);
                border-radius: 8px;
                width: 150px;
                padding: 20px;
                margin: auto;

                .md-activity-indicator-text{
                    font-size: 30px !important;
                }

                .md-activity-indicator-svg{
                    width: 80px !important;
                    height: 80px !important;
                }
            }
        }

        &.index {
            .md-activity-indicator{
                background: transparent;

                .md-activity-indicator-svg{
                    width: 100px !important;
                    height: 100px !important;
                }
            }
        }
    }
</style>
