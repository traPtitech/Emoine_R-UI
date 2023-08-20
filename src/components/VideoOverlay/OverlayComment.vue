<script setup lang="ts">
import { Comment } from '@/lib/apis/generated/proto/emoine_r/v1/schema_pb'

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
.overlayContainer {
  position: relative;
  width: 100%;
}
.comment {
  position: absolute;
  font-size: 2rem;
  font-weight: bold;
  right: 0;
  animation: commentMove 8s linear;
}
.stamp {
  position: absolute;
  width: 100px;
  height: 100px;
  animation: stampZoom 0.4s linear;
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
