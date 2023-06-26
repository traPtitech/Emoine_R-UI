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
  padding: 0.75rem 0.625rem;
  border-radius: 0.25rem;
  height: 2.5rem;
  font-size: 0.875rem;
  border: 1px solid $color-secondary;

  &::placeholder {
    color: $text-secondary;
  }
  &:focus {
    border-color: black;
  }
}
</style>
