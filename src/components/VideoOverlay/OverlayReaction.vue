<script setup lang="ts">
import { Reaction } from '@/lib/apis/generated/proto/emoine_r/v1/schema_pb'

defineProps<{
  reaction: Reaction
}>()
</script>

<template>
  <img
    :src="'https://q.trap.jp/api/v3/public/icon/mehm8128'"
    :style="{
      top: `${Math.random() * 90}%`,
      left: `${Math.random() * 90}%`
    }"
    :class="$style.reaction"
  />
</template>

<style lang="scss" module>
.reaction {
  position: absolute;
  width: 100px;
  height: 100px;
  animation: stampZoom 0.4s linear;
}
@keyframes stampZoom {
  0% {
    transform: scale(0.4);
  }
  100% {
    transform: scale(1);
  }
}
</style>
