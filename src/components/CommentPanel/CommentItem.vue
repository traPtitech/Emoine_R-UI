<script setup lang="ts">
import type { Comment } from '@/lib/apis/generated'

const props = defineProps<{
  comment: Comment
}>()

const shownName = props.comment.is_anonymous
  ? '匿名ユーザー'
  : props.comment.user_id
</script>

<template>
  <p :class="$style.comment">
    <span>{{ shownName }}:</span>
    <span
      :class="$style.commentContent"
      :style="{
        color: props.comment.color
      }"
    >
      {{ props.comment.text }}
    </span>
  </p>
</template>

<style lang="scss" module>
.comment {
  word-break: break-all;
}
.commentContent {
  margin-left: 0.5rem;
}
</style>
