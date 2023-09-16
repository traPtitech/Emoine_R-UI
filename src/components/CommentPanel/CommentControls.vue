<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from '@/components/UI/BaseInput.vue'
import BaseButton from '@/components/UI/BaseButton.vue'
import ColorPicker from '@/components/CommentPanel/ColorPicker.vue'
import AIcon from '@/components/UI/AIcon.vue'
import type { TextColor } from '@/consts/colors'
import { useGeneralConnectClient } from '@/lib/connectClient'

const props = defineProps<{
  eventId: string
}>()

const client = useGeneralConnectClient()

const commentValue = ref('')
const pickedColor = ref<TextColor>('#000000')
const isAnonymous = ref(false)

const toggleIsAnonymous = () => {
  isAnonymous.value = !isAnonymous.value
}
const sendComment = async () => {
  if (!commentValue.value) return
  await client.sendComment({
    eventId: props.eventId,
    text: commentValue.value,
    color: pickedColor.value,
    isAnonymous: isAnonymous.value
  })
  commentValue.value = ''
}
</script>

<template>
  <div :class="$style.commentControls">
    <base-input
      v-model="commentValue"
      :class="$style.input"
      placeholder="メッセージを入力..."
    />
    <div :class="$style.lowerControls">
      <color-picker v-model="pickedColor" />
      <div :class="$style.rightControls">
        <button @click="toggleIsAnonymous">
          <a-icon :name="isAnonymous ? 'mdi:incognito' : 'mdi:incognito-off'" />
        </button>
        <base-button @click="sendComment">コメント</base-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.input {
  width: 100%;
}
.commentControls {
  background-color: $background-primary;
  padding: 0.625rem;
  height: 110px;
}
.lowerControls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.75rem;
}
.rightControls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
</style>
