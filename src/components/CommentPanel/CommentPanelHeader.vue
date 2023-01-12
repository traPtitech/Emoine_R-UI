<script setup lang="ts">
defineProps<{
  showOverlay: boolean
}>()
const emit = defineEmits<{
  (e: 'toggleShowOverlay'): void
  (e: 'popupCommentPanel'): void
}>()
</script>

<template>
  <div :class="$style.container">
    <button @click="emit('toggleShowOverlay')">*</button>
    <p>コメント</p>
    <button @click="emit('popupCommentPanel')">*</button>
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 1.25rem;
  background-color: $background-primary;
  border-bottom: $color-secondary solid 1px;
}
</style>
