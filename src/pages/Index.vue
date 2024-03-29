<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getCurrentPage } from '@/lib/parseQueryParams'
import PaginationBar from '@/components/UI/PaginationBar.vue'
import EventThumbnail from '@/components/EventThumbnail/EventThumbnail.vue'
import EmoineHeader from '@/components/EmoineHeader.vue'
import { Event } from '@/lib/apis'
import { useGeneralConnectClient } from '@/lib/connectClient'

const client = useGeneralConnectClient()

const route = useRoute()
const page = ref(getCurrentPage(route.query.page))
watch(
  () => route.query.page,
  async newPage => {
    page.value = getCurrentPage(newPage)
    await fetchEvents()
  }
)
const events = ref<Event[]>()
const totalEventsCount = ref(0)
const constructLink = (page: number) => `?page=${page}`

const fetchEvents = async () => {
  //todo: エラーハンドリング
  const res = await client.getEvents({ limit: 12, offset: page.value })
  events.value = res.events
  totalEventsCount.value = res.total
}

onMounted(fetchEvents)
</script>

<template>
  <emoine-header />
  <div :class="$style.eventListContainer">
    <ul :class="$style.eventList">
      <li v-for="event in events" :key="event.id">
        <event-thumbnail :event="event" />
      </li>
    </ul>
  </div>
  <div :class="$style.paginationBarContainer">
    <pagination-bar
      :current-page="page"
      :total-page="Math.ceil(totalEventsCount / 12)"
      :construct-link="constructLink"
    />
  </div>
</template>

<style lang="scss" module>
.eventListContainer {
  width: fit-content;
  margin: 0 auto;
}
.eventList {
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
