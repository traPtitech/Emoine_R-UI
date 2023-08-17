<script setup lang="ts">
import { onMounted, ref } from 'vue'
import EventTokens from '@/components/EventDetail/EventTokens.vue'
import { useRoute, useRouter } from 'vue-router'
import { getEventId } from '@/lib/parsePathParams'
import AIcon from '@/components/UI/AIcon.vue'
import EmoineHeader from '@/components/EmoineHeader.vue'
import EventInformation from '@/components/EventDetail/EventInformation.vue'
import {
  Meeting,
  Token
} from '@/lib/apis/generated/proto/emoine_r/v1/schema_pb'
import {
  useGeneralConnectClient,
  useAdminConnectClient
} from '@/lib/connectClient'

const client = useGeneralConnectClient()
const adminClient = useAdminConnectClient()

const route = useRoute()
const router = useRouter()
const eventId = getEventId(route.params.eventId)

const eventDetail = ref<Meeting>()
const tokens = ref<Token[]>()

const fetchEventInformation = async () => {
  const res = await client.getMeeting({ id: eventId })
  if (!res.meeting) throw new Error('res.meeting is undefined')
  eventDetail.value = res.meeting
}
const fetchTokens = async () => {
  const res = await adminClient.getTokens({ meetingId: eventId })
  tokens.value = res.tokens
}
const updateDescription = async (description: string) => {
  if (!eventDetail.value) return
  await adminClient.updateMeeting({
    meetingId: eventId,
    videoId: eventDetail.value.videoId,
    description: description
  })
}
const deleteEvent = async () => {
  const result = confirm('本当にこのイベントを削除しますか？')
  if (!result) return
  await adminClient.deleteMeeting({ meetingId: eventId })
  router.push({ name: 'AdminEvents' })
}

onMounted(async () => {
  await fetchEventInformation()
  await fetchTokens()
})
</script>

<template>
  <div :class="$style.container">
    <emoine-header />
    <section>
      <h2 :class="$style.heading">
        <a-icon name="akar-icons:youtube-fill" :size="56" color="#ff007f" />
        <p>Event Information</p>
      </h2>
      <event-information
        v-if="eventDetail"
        :event="eventDetail"
        @update-description="updateDescription($event)"
        @delete="deleteEvent"
      />
    </section>
    <section :class="$style.tokensSection">
      <h2 :class="$style.heading">
        <a-icon name="tabler:certificate" :size="56" color="#ff007f" />
        <p>Tokens</p>
      </h2>
      <event-tokens
        :tokens="tokens ?? []"
        @add-new-token="tokens?.unshift($event)"
      />
    </section>
  </div>
</template>

<style lang="scss" module>
.container {
  padding: 0 15%;
}
.heading {
  display: flex;
  align-items: center;
  font-size: 2rem;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.tokensSection {
  margin-top: 1rem;
}
</style>
