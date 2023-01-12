<script setup lang="ts">
type ButtonType = 'primary'
const props = withDefaults(
  defineProps<{
    type?: ButtonType
    disabled?: boolean
  }>(),
  { type: 'primary' }
)
</script>

<template>
  <button :class="$style.button" :data-type="props.type" :disabled="disabled">
    <slot />
  </button>
</template>

<style lang="scss" module>
.button {
  color: white;
  background-color: $color-primary;
  border-radius: 0.25rem;
  padding: 0.5rem;
  height: 1.875rem;
  font-size: 0.75rem;

  &:hover {
    opacity: 0.7;
    transition: all 0.2s ease-in-out;
  }
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
}
</style>
