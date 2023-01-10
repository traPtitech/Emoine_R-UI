<script setup lang="ts">
import type { Comment } from '@/lib/apis/generated'
import CommentItem from '@/components/CommentPannel/CommentItem.vue'

defineProps<{
  comments: Comment[]
}>()
</script>

<template>
  <ul :class="$style.commentList">
    <li v-for="comment in comments" :key="comment.id">
      <comment-item :comment="comment" :class="$style.commentItem" />
    </li>
  </ul>
</template>

<style lang="scss" module>
.commentList {
  list-style: none;
  padding: 0.5rem 1.25rem;
}
.commentItem {
  margin-bottom: 0.5rem;
}
</style>
