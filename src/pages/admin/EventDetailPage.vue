<script setup lang="ts">
import { onMounted, ref } from 'vue'
import apis, { CreateMeetingRequest, Meeting, Token } from '@/lib/apis'
import EventTokens from '@/components/EventDetail/EventTokens.vue'
import { useRoute, useRouter } from 'vue-router'
import { getMeetingId } from '@/lib/parsePathParams'
import AIcon from '@/components/UI/AIcon.vue'
import EmoineHeader from '@/components/EmoineHeader.vue'
import EventInformation from '@/components/EventDetail/EventInformation.vue'

const route = useRoute()
const router = useRouter()
const eventId = getMeetingId(route.params.eventId)

const eventInformation = ref<Meeting>()
const tokens = ref<Token[]>([])

const fetchEventInformation = async () => {
  const res = (await apis.getMeeting(eventId)).data
  eventInformation.value = res
}
const fetchTokens = async () => {
  const res = (await apis.getMeetingTokens(eventId)).data
  tokens.value = res
}
const updateDescription = async (description: string) => {
  if (!eventInformation.value) return
  const updateMeetingRequest: CreateMeetingRequest = {
    videoId: eventInformation.value.videoId,
    description: description
  }
  await apis.updateMeeting(eventId, updateMeetingRequest)
}
const deleteEvent = async () => {
  const result = confirm('本当にこのイベントを削除しますか？')
  if (!result) return
  await apis.deleteMeeting(eventId)
  router.push({ name: 'AdminMeetings' })
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
        v-if="eventInformation"
        :meeting="eventInformation"
        @update-description="updateDescription($event)"
        @delete="deleteEvent"
      />
    </section>
    <section :class="$style.tokensSection">
      <h2 :class="$style.heading">
        <a-icon name="tabler:certificate" :size="56" color="#ff007f" />
        <p>Tokens</p>
      </h2>
      <event-tokens :tokens="tokens" />
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
}
.tokensSection {
  margin-top: 1rem;
}
</style>
