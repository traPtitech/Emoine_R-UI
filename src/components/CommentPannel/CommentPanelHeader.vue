<script setup lang="ts">
defineProps<{
  shouldShowCommentsOnScreen: boolean
}>()
const emit = defineEmits<{
  (e: 'toggleShowCommentsOnScreen'): void
  (e: 'closeCommentPannel'): void
}>()
</script>

<template>
  <div :class="$style.container">
    <button @click="emit('toggleShowCommentsOnScreen')">*</button>
    <p>コメント</p>
    <button @click="emit('closeCommentPannel')">*</button>
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 1.25rem;
  background-color: #f6f6f6;
  border-bottom: #bbbbbb solid 1px;
}
</style>
