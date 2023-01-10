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
  background-color: #ff007f;
  border-radius: 4px;
  padding: 0.5rem;

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
