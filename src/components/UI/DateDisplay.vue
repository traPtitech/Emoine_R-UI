<script setup lang="ts">
import { computed } from 'vue'

type LiveStatus = 'isPlanned' | 'isStreaming' | 'isArchived'

const props = defineProps<{
  startedTime: Date
  endedTime: Date
}>()

const status = computed((): LiveStatus => {
  if (new Date().getTime() < props.startedTime.getTime()) return 'isPlanned'
  if (isNaN(props.endedTime.getTime())) return 'isStreaming'
  return 'isArchived'
})

const text = computed(() => {
  switch (status.value) {
    case 'isPlanned':
      return `${
        props.startedTime.getMonth() + 1
      }/${props.startedTime.getDate()}`
    case 'isStreaming':
      return 'LIVE'
    case 'isArchived': {
      if (!props.endedTime) return 'LIVE'
      const prevTime = props.endedTime.getTime()
      const diff = new Date().getTime() - prevTime
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))

      if (days >= 365) return `${Math.floor(days / 365)}年前`
      if (days >= 31) return `${Math.floor(days / 30.42)}ヶ月前`
      if (days >= 1) return `${days}日前`
      return `${Math.floor(diff / (1000 * 60 * 60))}時間前`
    }
    default: {
      const exhaustivenessCheck: never = status.value
      throw new Error(`Unexpected Type : ${exhaustivenessCheck}`)
    }
  }
})
</script>

<template>
  <div :class="$style.background" :data-status="status">
    <p :class="$style.content">{{ text }}</p>
  </div>
</template>

<style lang="scss" module>
.background {
  /* Status=Streaming */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;

  width: 60px;
  height: 30px;
  left: 90px;
  top: 20px;

  &[data-status='isPlanned'] {
    background: #00b500;
  }
  &[data-status='isStreaming'] {
    background: rgba(255, 0, 0, 0.7);
  }
  &[data-status='isArchived'] {
    background: rgba(0, 0, 0, 0.5);
  }
}
.content {
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #ffffff;

  /* オートレイアウト内部 */

  flex: none;
  order: 0;
  flex-grow: 0;
}
</style>
