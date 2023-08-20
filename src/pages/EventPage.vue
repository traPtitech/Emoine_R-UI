<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getEventId } from '@/lib/parsePathParams'
import CommentPanel from '@/components/CommentPanel/CommentPanel.vue'
import { useGeneralConnectClient } from '@/lib/connectClient'
import { Event, Comment, Reaction } from '@/lib/apis'
import StampList, { Stamp } from '@/components/StampList/StampList.vue'
import VideoOverlay from '@/components/VideoOverlay/VideoOverlay.vue'
import { getEventStatus, toDayjs } from '@/lib/date'

const route = useRoute()
const client = useGeneralConnectClient()

const eventId = getEventId(route.params.id)
const event = ref<Event>()
const comments = ref<Comment[]>()
const reactions = ref<Reaction[]>()

//TODO: スタンプをなんらかの方法で取ってくる
const stamps: Stamp[] = Array(10).fill({
  stampId: 'aaa',
  stampName: 'bbb',
  image: 'https://q.trap.jp/api/v3/public/icon/mehm8128'
})

const fetchEvent = async () => {
  //todo: エラーハンドリング
  const res = await client.getEvent({ id: eventId })
  if (!res.event) {
    throw new Error('res.event is undefined')
  }
  event.value = res.event
  return res.event
}
const fetchComments = async () => {
  //todo: エラーハンドリング
  const res = await client.getEventComments({ eventId })
  if (!res.comments) {
    throw new Error('res.comment is undefined')
  }
  comments.value = res.comments
}
const fetchStamps = async () => {
  //todo: エラーハンドリング
  const res = await client.getEventReactions({ eventId })
  if (!res.reactions) {
    throw new Error('res.comment is undefined')
  }
  reactions.value = res.reactions
}

const connectToEventStream = async () => {
  for await (const res of client.connectToEventStream({
    eventId
  })) {
    const type = res.streamEvent.case
    switch (type) {
      case 'event': {
        const event = res.streamEvent.value
        if (!event) {
          throw new Error('event is undefined')
        }
        break
      }
      case 'comment': {
        const comment = res.streamEvent.value
        if (!comment) {
          throw new Error('comment is undefined')
        }
        if (!comments.value) {
          comments.value = [comment]
        } else {
          comments.value.push(comment)
        }
        break
      }
      case 'reaction': {
        const reaction = res.streamEvent.value
        if (!reaction) {
          throw new Error('reaction is undefined')
        }
        if (!reactions.value) {
          reactions.value = [reaction]
        } else {
          reactions.value.push(reaction)
        }
        break
      }
      case undefined:
        throw new Error('res.event.case is undefined')
      default: {
        const exhaustivenessCheck: never = type
        throw new Error(`Unexpected Type: ${exhaustivenessCheck}`)
      }
    }
  }
}

onMounted(async () => {
  const event = await fetchEvent()
  const eventStatus = getEventStatus(
    toDayjs(event.startedAt),
    toDayjs(event.endedAt)
  )
  switch (eventStatus) {
    case 'isPlanned':
      connectToEventStream()
      break
    case 'isStreaming':
      connectToEventStream()
      break
    case 'isArchived':
      fetchComments()
      fetchStamps()
      break
    default: {
      const exhaustivenessCheck: never = eventStatus
      throw new Error(`Unexpected Type: ${exhaustivenessCheck}`)
    }
  }
})
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.leftContainer">
      <video-overlay :reactions="reactions ?? []" :comments="comments ?? []">
        <iframe
          v-if="event"
          :src="`https://www.youtube.com/embed/${event.videoId}`"
          :class="$style.video"
        />
      </video-overlay>
      <div :class="$style.stampListContainer">
        <stamp-list
          :stamps="stamps"
          :class="$style.stampList"
          :event-id="eventId"
        />
      </div>
    </div>
    <comment-panel
      :comments="comments ?? []"
      :show-overlay="false"
      :event-id="eventId"
    />
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  justify-content: space-between;
  height: 100vh;
}
.leftContainer {
  width: 100%;
  padding: 1rem 0;
  margin: 1rem 4rem;
}
.video {
  width: 100%; // TODO: でかすぎ
  aspect-ratio: 16 / 9;
}
.stampList {
  width: fit-content;
  margin: auto auto;
}
</style>
