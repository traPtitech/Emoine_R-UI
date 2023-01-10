<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
    haveStampPicker: boolean
  }>(),
  {
    placeholder: '',
    haveStampPicker: false
  }
)
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
</script>

<template>
  <input v-model="value" :class="$style.input" :placeholder="placeholder" />
  <!--todo:スタンプピッカーつける-->
</template>

<style lang="scss" module>
.input {
  background-color: white;
  padding: 0.5rem 0.675rem;
  border-radius: 4px;
}
</style>
