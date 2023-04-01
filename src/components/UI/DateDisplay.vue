<script setup lang="ts">
import { computed } from 'vue'
import { dayFormat } from '@/utils/DayFormat.vue'

type LiveStatus = 'isPlanned' | 'isStreaming' | 'isArchived'

const props = defineProps<{
  startedTime: Date
  endedTime: Date
}>()

const status = computed((): LiveStatus => {
  /* todo: endedTimeが存在しないときのサーバーからのデータの仕様に合わせる */
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
      return dayFormat(props.endedTime)
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
  display: flex;
  justify-content: center;
  align-items: center;

  width: 64px;
  height: 32px;

  /* todo: styles/common.scssにまとめる */
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
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
}
</style>
