<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getCurrentPage } from '@/lib/parseQueryParams'
import EventItem from '@/components/Events/EventItem.vue'
import AIcon from '@/components/UI/AIcon.vue'
import PaginationBar from '@/components/UI/PaginationBar.vue'
import apis, { Meeting } from '@/lib/apis'
import EmoineHeader from '@/components/EmoineHeader.vue'

const route = useRoute()
const page = ref(getCurrentPage(route.query.page))

watch(
  () => route.query.page,
  async newPage => {
    page.value = getCurrentPage(newPage)
    await fetchEvents()
  }
)

const events = ref<Meeting[]>([])
const totalEventsCount = ref()
const constructLink = (page: number) => `?page=${page}`

const fetchEvents = async () => {
  //todo: エラーハンドリング
  const res = (await apis.getMeetings(10, page.value)).data
  events.value = res.meetings
  totalEventsCount.value = res.total
}

onMounted(fetchEvents)
</script>

<template>
  <emoine-header />
  <ul :class="$style.eventList">
    <li v-for="event in events" :key="event.id" :class="$style.eventListItem">
      <event-item :event="event" />
    </li>
    <li :class="$style.newEventButtonContainer">
      <router-link to="/admin/events/new" :class="$style.newEventLink">
        <a-icon name="mdi:plus-circle-outline" />
        新しいイベントを作成
      </router-link>
    </li>
  </ul>
  <div :class="$style.paginationBarContainer">
    <pagination-bar
      :current-page="page"
      :total-page="Math.ceil(totalEventsCount / 10)"
      :construct-link="constructLink"
    />
  </div>
</template>

<style lang="scss" module>
.eventList {
  margin: 0 20%;
  list-style: none;
  background-color: white;
}
.eventListItem {
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
