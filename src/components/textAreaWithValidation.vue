<template>
    <ValidationProvider ref="ValidationPro" tag="div" :mode="() => ({ on: mode })" :vid="vid" :name="$attrs.name" :rules="rules" v-slot="{ errors }">
        <md-textarea-item
            :name="$attrs.name"
            :error="errors[0]"
            :title="$attrs.title"
            :value="$attrs.value"
            :autosize="$attrs.autosize"
            :max-height="300"
            :max-length="120"
            :rows="$attrs.rows"
            v-bind="$attrs"
            v-on="$listeners"
            v-model="innerValue">
            <template slot="footer">
                <slot name="footer"></slot>
            </template>
        </md-textarea-item>
    </ValidationProvider>
</template>

<script>
import { TextareaItem } from 'mand-mobile';
import { ValidationProvider } from 'vee-validate';

export default {
    name: 'textAreaWithValidation',
    components: {
        [TextareaItem.name]: TextareaItem,
        ValidationProvider
    },
    props: {
        vid: {
            type: String
        },
        mode: {
            type: Array,
            default() {
                return ['blur'];
            }
        },
        rules: {
            type: [Object, String],
            default: ''
        },
        // must be included in props
        value: {
            type: null
        }
    },
    data: () => ({
        innerValue: ''
    }),
    watch: {
        // Handles internal model changes.
        innerValue(newVal) {
            this.$emit('textarea', newVal);
        },
        // Handles external model changes.
        value(newVal) {
            this.innerValue = newVal;
        }
    },
    created() {
        if (this.value) {
            this.innerValue = this.value;
        }
    },
    methods: {
        validate() {
            return this.$refs.ValidationPro.validate();
        }
    }
};
</script>

<style scoped>

</style>
