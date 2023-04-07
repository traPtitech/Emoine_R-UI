<script lang="ts" setup>
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { toPage } from '@/lib/parseQueryParams'
import { Meeting } from '@/lib/apis'
import AdminTabs from '@/components/UI/AdminTabs.vue'
import MeetingItem from '@/components/Meetings/MeetingItem.vue'
import AIcon from '@/components/UI/AIcon.vue'

const route = useRoute()
const page = ref(toPage(route.query.page))

watch(
  () => route.query.page,
  newPage => {
    page.value = toPage(newPage)
  }
)

const totalMeetingsCount = ref(2)
const meetings: Meeting[] = [
  {
    id: 'id',
    video_id: 'video_id111',
    title: 'title',
    thumbnail:
      'https://connpass-tokyo.s3.amazonaws.com/thumbs/b0/fc/b0fcaa37725965741cada4eaf9b730af.png',
    started_at: '2023-01-22',
    ended_at: '2023-01-22',
    description: 'description'
  },
  {
    id: 'id2',
    video_id: 'video_id222',
    title: 'title2',
    thumbnail:
      'https://connpass-tokyo.s3.amazonaws.com/thumbs/b0/fc/b0fcaa37725965741cada4eaf9b730af.png',
    started_at: '2023-01-23',
    ended_at: '2023-01-23',
    description: 'description2'
  }
]
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
  <pagination-bar :current-page="page" :total-pages="totalMeetingsCount" />
</template>

<style lang="scss" module>
.titleContainer {
  padding: 50px 0;
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
  &:not(:last-child) {
    margin-bottom: 4px;
  }
}
.newEventButtonContainer {
  display: flex;
  justify-content: center;
  padding: 4px 0px;
  margin: 0px 4px;
  border-top: 1px solid $background-secondary;
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
</style>
