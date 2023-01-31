<script setup lang="ts">
import { Meeting } from '@/lib/apis'

defineProps<{ meeting: Meeting }>()
</script>

<template>
  <router-link
    :to="{ name: 'Meeting', params: { id: meeting.id } }"
    :class="$style.container"
  >
    <!-- TODO: 日付コンポーネントを表示する -->
    <img :src="meeting.thumbnail" :alt="`${meeting.title}のサムネイル画像`" />
    <div :class="$style.textContainer">
      <p :class="$style.title">{{ meeting.title }}</p>
      <p :class="$style.description">{{ meeting.description }}</p>
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
}

.textContainer {
  height: 8rem;
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
