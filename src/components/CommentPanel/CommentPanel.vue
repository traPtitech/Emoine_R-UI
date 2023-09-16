<script setup lang="ts">
import CommentList from '@/components/CommentPanel/CommentList.vue'
import { Comment } from '@/lib/apis'
import CommentControls from '@/components/CommentPanel/CommentControls.vue'
import CommentPanelHeader from '@/components/CommentPanel/CommentPanelHeader.vue'

defineProps<{
  eventId: string
  comments: Comment[]
  showOverlay: boolean
}>()
const emit = defineEmits<{
  (e: 'toggleShowOverlay'): void
  (e: 'popupCommentPanel'): void
}>()
</script>

<template>
  <div :class="$style.commentPanel">
    <comment-panel-header
      :show-overlay="showOverlay"
      @toggle-show-overlay="emit('toggleShowOverlay')"
      @close-comment-panel="emit('popupCommentPanel')"
    />
    <comment-list :comments="comments" :class="$style.commentList" />
    <comment-controls :event-id="eventId" />
  </div>
</template>

<style lang="scss" module>
.commentList {
  height: calc(100% - 160px);
}
.commentPanel {
  width: 30rem;
  height: 100%;
  border-left: 1px solid $color-secondary;
}
</style>
