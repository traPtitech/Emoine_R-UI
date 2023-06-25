<script lang="ts" setup>
import apis, { Token } from '@/lib/apis'
import { onMounted, ref } from 'vue'
import EventTokens from '@/components/EventDetail/EventTokens.vue'

const tokens = ref<Token[]>()

const fetchMeetings = async () => {
  //todo: エラーハンドリング
  const res = (
    await apis.getMeetingTokens('3fa85f64-5717-4562-b3fc-2c963f66afa6')
  ).data
  tokens.value = res
}

onMounted(fetchMeetings)
</script>

<template>
  <event-tokens v-if="!!tokens" :tokens="tokens" />
</template>

<style lang="scss" module></style>
