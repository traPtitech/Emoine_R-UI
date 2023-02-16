<script lang="ts" setup>
import { Meeting } from '@/lib/apis'
import { RouterLink } from 'vue-router'
import AIcon from '@/components/UI/AIcon.vue'

defineProps<{
  meeting: Meeting
}>()
</script>

<template>
  <router-link :to="`/admin/meetings/${meeting.id}`" :class="$style.link">
    <div :class="$style.container">
      <img :src="meeting.thumbnail" :class="$style.thumbnail" />
      <div :class="$style.leftContainer">
        <p :class="$style.title">{{ meeting.title }}</p>
        <a-icon
          name="tabler:certificate"
          :zise="32"
          :class="$style.certificateIcon"
        />
      </div>
      <div :class="$style.middleContainer">
        <p :class="$style.videoId">{{ meeting.video_id }}</p>
      </div>
      <div :class="$style.rightContainer">
        <date-chip :date="meeting.started_at" />
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
  height: 60px;
  padding: 8px 8px;
  &:hover {
    background-color: $background-secondary;
  }
}
.leftContainer {
  display: flex;
  align-items: center;
  flex-grow: 2;
  border-right: 1px solid $color-secondary;
  height: 70%;
}
.thumbnail {
  width: 80px;
  height: 45px;
}
.title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-left: 20px;
  color: $text-primary;
  flex-grow: 2;
}
.certificateIcon {
  margin-right: 20px;
}
.middleContainer {
  display: flex;
  align-items: center;
  border-right: 1px solid $color-secondary;
  padding: 0 20px;
  width: 140px;
  height: 70%;
}
.videoId {
  color: $color-secondary;
}
.rightContainer {
  display: flex;
  align-items: center;
  padding: 0 20px;
  width: 120px;
  height: 70%;
}
</style>
