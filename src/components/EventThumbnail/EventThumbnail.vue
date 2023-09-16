<script setup lang="ts">
import { Event } from '@/lib/apis/generated/proto/emoine_r/v1/schema_pb'
import DateChip from '@/components/UI/DateChip.vue'
import { toDayjs } from '@/lib/date'

defineProps<{ event: Event }>()
</script>

<template>
  <router-link
    :to="{ name: 'Event', params: { id: event.id } }"
    :class="$style.container"
  >
    <date-chip
      :class="$style.dateChip"
      :started-time="toDayjs(event.startedAt)"
      :ended-time="toDayjs(event.endedAt)"
    />
    <img
      :width="266"
      :height="150"
      :src="event.thumbnail"
      :alt="`${event.title}のサムネイル画像`"
      :class="$style.thumbnail"
    />
    <div :class="$style.textContainer">
      <p :class="$style.title">{{ event.title }}</p>
      <p :class="$style.description">{{ event.description }}</p>
    </div>
  </router-link>
</template>

<style lang="scss" module>
.container {
  width: 16.625rem;
  display: flex;
  flex-direction: column;
  background-color: white;
  color: black;
  text-decoration: none;
  position: relative;
}
.dateChip {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
}
.thumbnail {
  object-fit: cover;
}
.textContainer {
  max-height: 8rem;
  padding: 0.5rem 0.625rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.title {
  font-weight: bold;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.description {
  font-size: 0.75rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
