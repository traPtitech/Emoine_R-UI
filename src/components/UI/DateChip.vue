<script setup lang="ts">
import { computed } from 'vue'
import { getEventStatus, getDateDiffText } from '@/lib/date'
import { Dayjs } from 'dayjs'

const props = defineProps<{
  startedTime: Dayjs
  endedTime: Dayjs
}>()

const status = computed(() =>
  getEventStatus(props.startedTime, props.endedTime)
)

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
    default: {
      const exhaustivenessCheck: never = status.value
      throw new Error(`Unexpected Type : ${exhaustivenessCheck}`)
    }
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
