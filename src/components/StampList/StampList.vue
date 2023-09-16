<script setup lang="ts">
import { useGeneralConnectClient } from '@/lib/connectClient'

export interface Stamp {
  stampId: string
  stampName: string
  image: string
}

const props = defineProps<{
  eventId: string
  stamps: Stamp[]
}>()

const client = useGeneralConnectClient()

const handlePutStamp = async (stampId: string) => {
  await client.sendReaction({ eventId: props.eventId, stampId })
}
</script>

<template>
  <ul :class="$style.stampList">
    <li v-for="stamp in stamps" :key="stamp.stampId">
      <button
        :class="$style.stampButton"
        @click="handlePutStamp(stamp.stampId)"
      >
        <img
          :src="stamp.image"
          :alt="stamp.stampName"
          :width="100"
          :height="100"
        />
      </button>
    </li>
  </ul>
</template>

<style lang="scss" module>
.stampList {
  display: flex;
  list-style: none;
}
.stampButton {
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  &:hover {
    background-color: gray;
  }
}
</style>
