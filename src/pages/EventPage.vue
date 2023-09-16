<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getEventId } from '@/lib/parsePathParams'
import CommentPanel from '@/components/CommentPanel/CommentPanel.vue'
import StampList from '@/components/StampList/StampList.vue'
import { Stamp } from '@/components/StampList/StampList.vue'
import { useGeneralConnectClient } from '@/lib/connectClient'
import { Event, Comment } from '@/lib/apis'

const route = useRoute()
const client = useGeneralConnectClient()

const eventId = getEventId(route.params.id)
const event = ref<Event>()
const comments = ref<Comment[]>()

//TODO: スタンプをなんらかの方法で取ってくる
const stamps: Stamp[] = Array(10).fill({
  stampId: 'aaa',
  stampName: 'bbb',
  image: 'https://q.trap.jp/api/v3/public/icon/mehm8128'
})

const fetchevent = async () => {
  //todo: エラーハンドリング
  const res = await client.getEvent({ id: eventId })
  if (!res.event) {
    throw new Error('res.event is undefined')
  }
  event.value = res.event
}
const fetchComments = async () => {
  //todo: エラーハンドリング
  const res = await client.getEventComments({ eventId: eventId })
  if (!res.comments) {
    throw new Error('res.comment is undefined')
  }
  comments.value = res.comments
}

onMounted(() => {
  fetchevent()
  fetchComments()
})
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.leftContainer">
      <iframe
        v-if="event"
        :src="`https://www.youtube.com/embed/${event.videoId}`"
        :class="$style.video"
      />
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
