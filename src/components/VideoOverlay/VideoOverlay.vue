<script setup lang="ts">
import OverlayComment from './OverlayComment.vue'
import OverlayReaction from './OverlayReaction.vue'
import { Comment, Reaction } from '@/lib/apis'

defineProps<{
  comments: Comment[]
  reactions: Reaction[]
}>()
</script>

<template>
  <div :class="$style.overlayContainer">
    <slot />
    <overlay-comment
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
    />
    <overlay-reaction
      v-for="reaction in reactions"
      :key="reaction.stampId"
      :reaction="reaction"
    />
  </div>
</template>

<style lang="scss" module>
.overlayContainer {
  position: relative;
  width: 100%;
}
</style>
