<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const colors = ['#FF007F', '#00FFFF', '#00FF00', '#FFFF00', '#FFFFFF']

const pickColor = (color: string) => {
  emit('update:modelValue', color)
}
</script>

<template>
  <div :class="$style.container">
    <button
      v-for="color in colors"
      :key="color"
      :class="$style.button"
      :style="{
        backgroundColor: color,
        position: modelValue === color ? 'relative' : 'static'
      }"
      @click="pickColor(color)"
    >
      <div :class="$style.cover" />
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
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid #bbbbbb;
}
.cover {
  width: 16px;
  height: 16px;
  position: absolute;
  top: 3px;
  left: 3px;
  background-color: #000000;
  opacity: 0.2;
  border-radius: 50%;
}
</style>
