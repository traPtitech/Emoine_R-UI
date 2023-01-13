<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    name: string
    size?: number
  }>(),
  { size: 24 }
)

const styles = computed(() => ({
  height: `${props.size}px`,
  width: `${props.size}px`
}))
</script>

<template>
  <icon :icon="name" :style="styles" :class="$style.icon" />
</template>

<style lang="scss" module>
.icon {
  display: flex;
}
</style>
