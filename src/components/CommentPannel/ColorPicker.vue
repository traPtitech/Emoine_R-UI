<script setup lang="ts">
import { textColors } from '@/consts/colors'
import type { TextColor } from '@/consts/colors'

defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: TextColor): void
}>()

const pickColor = (color: TextColor) => {
  emit('update:modelValue', color)
}
</script>

<template>
  <div :class="$style.container">
    <button
      v-for="color in textColors"
      :key="color"
      :class="$style.button"
      :style="{
        backgroundColor: color,
        position: modelValue === color ? 'relative' : 'static'
      }"
      @click="pickColor(color)"
    >
      <div v-if="modelValue === color" :class="$style.cover" />
    </button>
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.button {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 1px solid #bbbbbb;
}
.cover {
  width: 1rem;
  height: 1rem;
  position: absolute;
  top: 0.1875rem;
  left: 0.1875rem;
  background-color: #000000;
  opacity: 0.2;
  border-radius: 50%;
}
</style>
