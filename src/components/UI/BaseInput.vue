<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
    haveStampPicker?: boolean
  }>(),
  {
    placeholder: ''
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
  display: flex;
  padding: 0.375rem 0.625rem;
  align-items: center;
  flex: 1 0 0;
  border-radius: 0.375rem;
  height: 2.5rem;
  font-size: 1.25rem;
  border: 1px solid $color-secondary;

  &::placeholder {
    color: $text-secondary;
  }
  &:focus {
    border-color: black;
  }
}
</style>
