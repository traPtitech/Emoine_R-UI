<script setup lang="ts">
import AIcon from '@/components/UI/AIcon.vue'

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
    <button
      :class="$style.showOverlayButton"
      :data-show-overlay="showOverlay"
      @click="emit('toggleShowOverlay')"
    >
      <a-icon name="" />
    </button>
    <p>コメント</p>
    <button :class="$style.popupButton" @click="emit('popupCommentPanel')">
      <a-icon name="" />
    </button>
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
.showOverlayButton {
  color: $color-secondary;
  &[data-show-overlay='true'] {
    color: $color-primary;
  }
}
.popupButton {
  color: $color-secondary;
}
</style>
