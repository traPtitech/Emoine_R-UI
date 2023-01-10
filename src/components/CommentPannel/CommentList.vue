<script setup lang="ts">
import type { Comment } from '@/lib/apis/generated'
import CommentItem from '@/components/CommentPannel/CommentItem.vue'

defineProps<{
  comments: Comment[]
}>()
</script>

<template>
  <div :class="$style.container">
    <ul :class="$style.commentList">
      <li v-for="comment in comments" :key="comment.id">
        <comment-item :comment="comment" :class="$style.commentItem" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" module>
.container {
  height: calc(100% - 160px);
  overflow-y: scroll;
}
.commentList {
  list-style: none;
  padding: 0.5rem 1.25rem;
}
.commentItem {
  margin-bottom: 0.5rem;
}
</style>
