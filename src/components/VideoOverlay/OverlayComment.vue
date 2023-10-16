<script setup lang="ts">
import { Comment } from '@/lib/apis'

defineProps<{
  comment: Comment
}>()
</script>

<template>
  <p
    :class="$style.comment"
    :style="{
      color: comment.color,
      top: `${Math.random() * 90}%`
    }"
  >
    {{ comment.text }}
  </p>
</template>

<style lang="scss" module>
.comment {
  position: absolute;
  font-size: 2rem;
  right: 0;
  animation: commentMove 8s linear;
  pointer-events: none;
}
@keyframes commentMove {
  0% {
    right: 0;
  }
  100% {
    right: 100%;
  }
}
</style>
