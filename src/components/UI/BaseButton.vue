<script setup lang="ts">
type ButtonType = 'primary'
const props = withDefaults(
  defineProps<{
    type: ButtonType
  }>(),
  { type: 'primary' }
)
</script>

<template>
  <button :class="$style.button" :data-type="props.type">
    <slot />
  </button>
</template>

<style lang="scss" module>
.button {
  color: white;
  background-color: #ff007f;
  border-radius: 4px;
  padding: 0.5rem;
}
</style>
