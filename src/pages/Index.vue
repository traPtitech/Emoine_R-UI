<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getCurrentPage } from '@/lib/parseQueryParams'
import PaginationBar from '@/components/UI/PaginationBar.vue'
import MeetingThumbnail from '@/components/MeetingThumbnail/MeetingThumbnail.vue'
import EmoineHeader from '@/components/EmoineHeader.vue'
import { useConnectClient } from '@/lib/connectClient'
import { GeneralAPIService } from '@/lib/apis/generated/proto/emoine_r/v1/general_api_connect'
import { Meeting } from '@/lib/apis/generated/proto/emoine_r/v1/schema_pb'

const client = useConnectClient(GeneralAPIService)

const route = useRoute()
const page = ref(getCurrentPage(route.query.page))
watch(
  () => route.query.page,
  async newPage => {
    page.value = getCurrentPage(newPage)
    await fetchMeetings()
  }
)
const meetings = ref<Meeting[]>()
const totalMeetingsCount = ref(0)
const constructLink = (page: number) => `?page=${page}`

const fetchMeetings = async () => {
  //todo: エラーハンドリング
  const res = await client.getMeetings({ limit: 12, offset: page.value })
  meetings.value = res.meetings
  totalMeetingsCount.value = res.total
}

onMounted(fetchMeetings)
</script>

<template>
  <emoine-header />
  <div :class="$style.meetingListContainer">
    <ul :class="$style.meetingList">
      <li v-for="meeting in meetings" :key="meeting.id">
        <meeting-thumbnail :meeting="meeting" />
      </li>
    </ul>
  </div>
  <div :class="$style.paginationBarContainer">
    <pagination-bar
      :current-page="page"
      :total-page="Math.ceil(totalMeetingsCount / 12)"
      :construct-link="constructLink"
    />
  </div>
</template>

<style lang="scss" module>
.meetingListContainer {
  width: fit-content;
  margin: 0 auto;
}
.meetingList {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  background-color: white;
  list-style: none;
  padding: 24px;
}
.paginationBarContainer {
  display: flex;
  justify-content: center;
}
</style>
