<script setup lang="ts">
import { computed } from 'vue'
import { getDateDiffText } from '@/utils/date'
import dayjs, { Dayjs } from 'dayjs'

type LiveStatus = 'isPlanned' | 'isStreaming' | 'isArchived'

const props = defineProps<{
  startedTime: Dayjs
  endedTime: Dayjs
}>()

const status = computed((): LiveStatus => {
  /* todo: endedTimeが存在しないときのサーバーからのデータの仕様に合わせる */
  if (dayjs().unix() < props.startedTime.unix()) return 'isPlanned'
  if (!props.endedTime.isValid()) return 'isStreaming'
  return 'isArchived'
})

const dateDiffText = computed(() => {
  switch (status.value) {
    case 'isPlanned':
      return `${props.startedTime.month() + 1}/${props.startedTime.date()}`
    case 'isStreaming':
      return 'LIVE'
    case 'isArchived': {
      if (!props.endedTime) return 'LIVE'
      return getDateDiffText(props.endedTime)
    }
    default:
      throw new Error(status.value satisfies never)
  }
})
</script>

<template>
  <div :class="$style.container" :data-status="status">
    <p :class="$style.content">{{ dateDiffText }}</p>
  </div>
</template>

<style lang="scss" module>
.container {
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
