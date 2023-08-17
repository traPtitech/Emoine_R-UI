<script lang="ts" setup>
import { Meeting } from '@/lib/apis/generated/proto/emoine_r/v1/schema_pb'
import { RouterLink } from 'vue-router'
import AIcon from '@/components/UI/AIcon.vue'
import DateChip from '@/components/UI/DateChip.vue'
import { toDayjs } from '@/lib/date'

defineProps<{
  event: Meeting
}>()
</script>

<template>
  <router-link
    :to="{ name: 'AdminEventDetail', params: { eventId: event.id } }"
    :class="$style.link"
  >
    <div :class="$style.container">
      <img
        :height="44"
        :width="80"
        :src="event.thumbnail"
        :class="$style.thumbnail"
      />
      <div :class="$style.leftContainer">
        <p :class="$style.title">{{ event.title }}</p>
        <a-icon name="tabler:certificate" :size="32" color="#ff007f" />
      </div>
      <div :class="$style.middleContainer">
        <p :class="$style.videoId">{{ event.videoId }}</p>
      </div>
      <div :class="$style.rightContainer">
        <date-chip
          :started-time="toDayjs(event.startedAt)"
          :ended-time="toDayjs(event.endedAt)"
        />
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" module>
.link {
  text-decoration: none;
}
.container {
  display: flex;
  align-items: center;
  height: 3.75rem;
  padding: 8px;
  &:hover {
    background-color: $background-secondary;
  }
}
.leftContainer {
  display: flex;
  align-items: center;
  flex-grow: 1;
  border-right: 1px solid $color-secondary;
  height: 70%;
  padding-right: 20px;
}
.thumbnail {
  width: 5rem;
  height: 2.75rem;
  object-fit: cover;
}
.title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-left: 20px;
  color: $text-primary;
  flex-grow: 1;
}
.middleContainer {
  display: flex;
  align-items: center;
  border-right: 1px solid $color-secondary;
  padding: 0 1.25rem;
  width: 8.75rem;
  height: 70%;
}
.videoId {
  color: $color-secondary;
}
.rightContainer {
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  width: 120px;
  height: 70%;
}
</style>
