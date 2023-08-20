<script setup lang="ts">
type ButtonType = 'primary' | 'secondary'
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
  display: flex;
  align-items: center;
  border-radius: 0.375rem;
  padding: 0.375rem 1rem;
  height: 2.25rem;
  min-width: 4rem;
  font-size: 1rem;

  &[data-type='primary'] {
    color: white;
    background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.1) 0%,
        rgba(0, 0, 0, 0.1) 100%
      ),
      #ff007f;
  }
  &[data-type='secondary'] {
    color: $color-secondary;
    background-color: white;
    border: 1px solid $color-secondary;
  }

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
