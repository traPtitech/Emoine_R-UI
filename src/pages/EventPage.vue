<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import apis, { Meeting, Comment } from '@/lib/apis'
import { parseId } from '@/lib/parsePathParams'
import CommentPanel from '@/components/CommentPanel/CommentPanel.vue'
import StampList from '@/components/StampList/StampList.vue'
import { Stamp } from '@/components/StampList/StampList.vue'

const route = useRoute()
const eventId = parseId(route.params.id)
const event = ref<Meeting>()
const comments = ref<Comment[]>([])

const stamps: Stamp[] = Array(10).fill({
  stampId: 'aaa',
  stampName: 'bbb',
  image: 'https://q.trap.jp/api/v3/public/icon/mehm8128'
})

const fetchMeeting = async () => {
  //todo: エラーハンドリング
  const res = (await apis.getMeeting(eventId)).data
  event.value = res
}
const fetchComments = async () => {
  //todo: エラーハンドリング
  const res = (await apis.getComment(eventId)).data
  comments.value = res
}

onMounted(() => {
  fetchMeeting()
  fetchComments()
})
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.leftContainer">
      <iframe
        src="https://www.youtube.com/embed/8Yxrw4GDqg4"
        :class="$style.video"
      />
      <div :class="$style.stampListContainer">
        <stamp-list :stamps="stamps" :class="$style.stampList" />
      </div>
    </div>
    <comment-panel :comments="comments" :show-overlay="false" />
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
  padding: 1rem 4rem;
}
.video {
  width: 100%;
  aspect-ratio: 16 / 9;
}
.stampListContainer {
  padding-top: 1rem;
}
.stampList {
  width: fit-content;
  margin: auto auto;
}
</style>
