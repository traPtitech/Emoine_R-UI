<script setup lang="ts">
import CommentList from '@/components/CommentPannel/CommentList.vue'
import { Comment } from '@/lib/apis/generated'
import CommentControls from '@/components/CommentPannel/CommentControls.vue'
import CommentPanelHeader from '@/components/CommentPannel/CommentPanelHeader.vue'

defineProps<{
  comments: Comment[]
  shouldShowCommentsOnScreen: boolean
}>()
const emit = defineEmits<{
  (e: 'toggleShowCommentsOnScreen'): void
  (e: 'closeCommentPannel'): void
}>()
</script>

<template>
  <div :class="$style.commentPannel">
    <comment-panel-header
      :should-show-comments-on-screen="shouldShowCommentsOnScreen"
      @toggle-show-comments-on-screen="emit('toggleShowCommentsOnScreen')"
      @close-comment-pannel="emit('closeCommentPannel')"
    />
    <comment-list :comments="comments" />
    <comment-controls />
  </div>
</template>

<style lang="scss" module>
.commentPannel {
  width: 340px;
  height: 100vh;
  border: 1px solid $color-secondary;
}
</style>
