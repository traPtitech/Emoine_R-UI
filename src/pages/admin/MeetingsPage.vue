<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { toPage } from '@/lib/parseQueryParams'
import AdminTabs from '@/components/UI/AdminTabs.vue'
import MeetingItem from '@/components/Meetings/MeetingItem.vue'
import AIcon from '@/components/UI/AIcon.vue'
import PaginationBar from '@/components/UI/PaginationBar.vue'
import apis, { Meeting } from '@/lib/apis'

//todo: 型定義がない
interface AllMeetings {
  meetings: Meeting[]
  total_meetings: number
}

const route = useRoute()
const page = ref(toPage(route.query.page))

watch(
  () => route.query.page,
  newPage => {
    page.value = toPage(newPage)
  }
)

const meetings = ref<Meeting[]>([])
const totalMeetingsCount = ref()
const constructLink = (page: number) => `?page=${page}`

onMounted(async () => {
  //todo: エラーハンドリング
  const res = (await apis.getAllMeeting(10, page.value)).data as AllMeetings // todo: api定義に型がついていない
  meetings.value = res.meetings
  totalMeetingsCount.value = res.total_meetings
})
</script>

<template>
  <div :class="$style.titleContainer">
    <h1 :class="$style.title">Emoine Admin</h1>
  </div>
  <admin-tabs current-tab="events" :class="$style.tabs">
    <ul :class="$style.meetingList">
      <li
        v-for="meeting in meetings"
        :key="meeting.id"
        :class="$style.meetingListItem"
      >
        <meeting-item :meeting="meeting" />
      </li>
      <li :class="$style.newEventButtonContainer">
        <router-link to="/admin/meetings/new" :class="$style.newEventLink">
          <a-icon name="mdi:plus-circle-outline" />
          新しいイベントを作成
        </router-link>
      </li>
    </ul>
  </admin-tabs>
  <div :class="$style.paginationBarContainer">
    <pagination-bar
      :current-page="page"
      :total-page="Math.ceil(totalMeetingsCount / 10)"
      :construct-link="constructLink"
    />
  </div>
</template>

<style lang="scss" module>
.titleContainer {
  padding: 3.125rem 0;
  text-align: center;
}
.tabs {
  margin: 0 20%;
}
.meetingList {
  list-style: none;
  background-color: white;
}
.meetingListItem {
  padding: 4px 0px;
  &:not(:last-child) {
    border-bottom: 1px solid $background-secondary;
  }
}
.newEventButtonContainer {
  display: flex;
  justify-content: center;
  padding: 4px 0px;
  margin: 0px 4px;
}
.newEventLink {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 4px 12px;
  font-weight: bold;
  color: $color-secondary;
  text-decoration: none;
  &:hover {
    color: $color-primary;
    background-color: $background-secondary;
  }
}
.paginationBarContainer {
  display: flex;
  justify-content: center;
}
</style>
