<script setup lang="ts">
interface Props {
  modelValue: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div :class="$style.container">
    <input
      :class="$style.input"
      :data-is-blank="props.modelValue === ''"
      type="datetime-local"
      :value="props.modelValue"
      @input="handleInput"
    />
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid $color-secondary;
  border-radius: 0.25rem;
  height: 2.5rem;
  font-size: 0.875rem;
  &:focus-within {
    border-color: black;
  }
}
.input {
  &[data-is-blank='true'] {
    color: $color-secondary;
  }
}
</style>
