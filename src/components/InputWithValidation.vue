<template>
    <ValidationProvider
        ref="ValidationPro"
        tag="div"
        :mode="() => ({ on: mode })"
        :vid="vid"
        :name="$attrs.name"
        :rules="rules"
        v-slot="{ errors }"
    >
        <div :class="{ noBorder: hasNoBorder }">
            <md-input-item
                :name="$attrs.name"
                :error="errors[0]"
                :title="$attrs.title"
                :value="$attrs.value"
                v-bind="$attrs"
                v-on="$listeners"
                v-model="innerValue"
            >
                <template slot="left">
                    <slot name="left"></slot>
                </template>
                <template slot="right">
                    <slot name="right"></slot>
                </template>
            </md-input-item>
        </div>
    </ValidationProvider>
</template>

<script>
import { InputItem } from "mand-mobile";
import { ValidationProvider } from "vee-validate";

export default {
    components: {
        [InputItem.name]: InputItem,
        ValidationProvider,
    },
    props: {
        vid: {
            type: String,
        },
        mode: {
            type: Array,
            default() {
                return ["blur"];
            },
        },
        rules: {
            type: [Object, String],
            default: "",
        },
        hasNoBorder: {
            type: null,
        },
        // must be included in props
        value: {
            type: null,
        },
    },
    data: () => ({
        innerValue: "",
    }),
    watch: {
        // Handles internal model changes.
        innerValue(newVal) {
            this.$emit("input", newVal);
        },
        // Handles external model changes.
        value(newVal) {
            this.innerValue = newVal;
        },
    },
    created() {
        if (this.value) {
            this.innerValue = this.value;
        }
    },
    methods: {
        validate() {
            return this.$refs.ValidationPro.validate();
        },
    },
};
</script>
<style lang="less" scoped>
.noBorder {
    /deep/.md-field-item-content:before {
        border-bottom: 0;
    }
}
</style>
