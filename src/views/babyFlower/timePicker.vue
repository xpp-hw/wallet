<template>
    <div class="time">
        <div class="sure">
            <p @click="cancel">取消</p>
            <p @click="sure">确定</p>
        </div>
        <div class="timePicker">
            <div class="md-example-child md-example-child-date-picker md-example-child-date-picker-0">
                <md-date-picker
                    ref="datePicker"
                    :custom-types="['yyyy','MM']"
                    :default-date="currentDate"
                    :keep-index="true"
                    is-view
                    today-text="今天"
                    type="custom"
                    @change="onDatePickerInitialed"
                    @initialed="onDatePickerInitialed"
                ></md-date-picker>
            </div>
        </div>
    </div>
</template>

<script>
import { DatePicker } from 'mand-mobile';

export default {
    name: 'timePicker',
    props: ['date'],
    components: {
        [DatePicker.name]: DatePicker
    },
    data() {
        return {
            time: '',
            currentDate: new Date(this.date)
        };
    },
    methods: {
        onDatePickerInitialed() {
            this.time = this.$refs.datePicker.getFormatDate('yyyy/MM');
        },
        //取消
        cancel() {
            this.$emit('cancel');
        },
        //确定
        sure() {
            this.$emit('sure', this.time);
        }
    }
};

</script>
<style lang="less" scoped>

.time {
    position: absolute;
    top: 214px;
    left: 50%;
    transform: translateX(-50%);
    width: 700px;
    background-color: white;
    z-index: 99999;
    touch-action: none;

    .sure {
        font-size: 44px;
        color: #00A4E2;
        display: flex;
        justify-content: space-between;
        padding: 20px;

        p {
            flex: 0 25%;
        }

        p:nth-child(2) {
            text-align: right;
        }
    }
}
</style>
