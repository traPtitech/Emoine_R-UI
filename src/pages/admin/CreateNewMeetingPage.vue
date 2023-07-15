<script lang="ts" setup>
import { ref } from 'vue'
import apis, { CreateMeetingRequest } from '@/lib/apis'
import BaseInput from '@/components/UI/BaseInput.vue'
import BaseButton from '@/components/UI/BaseButton.vue'
import EmoineHeader from '@/components/EmoineHeader.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

//todo: 専用ヘッダー画像のアップロード
const headerLogo = '/logo.png'

const liveUrl = ref('')
const isValidURL = ref(true)

const getLiveIdFromUrl = (liveUrl: string) => {
  const params = new URL(liveUrl).searchParams
  const videoId = params.get('v')
  if (!videoId) throw new Error('Invalid URL')
  return videoId
}

const createMeeting = async () => {
  let id = ''
  try {
    const videoId = getLiveIdFromUrl(liveUrl.value)
    const meetingInfo: CreateMeetingRequest = {
      video_id: videoId,
      description: ''
    }
    const res = (await apis.createMeeting(meetingInfo)).data
    id = res.id
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message)
      isValidURL.value = false
      return
    }
  }

  router.push({ name: 'admin/events/:eventId', params: { id: id } })
}
</script>

<template>
  <emoine-header />
  <div :class="$style.content">
    <h2 :class="$style.title">
      <img :src="headerLogo" />
    </h2>
    <div :class="$style.cotainer">
      <div :class="$style.subTitleContainer">
        <h3 :class="$style.subTitleText">LIVE URL</h3>
        <div v-if="!isValidURL" :class="$style.errorText">
          ※ 存在しないURLです
        </div>
      </div>
      <div :class="$style.newEventInputCotainer">
        <div :class="$style.input">
          <base-input
            v-model="liveUrl"
            placeholder="YouTubeのライブURLを入力..."
          />
        </div>
        <base-button @click="createMeeting">追加</base-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.content {
  display: flex;
  width: 1144px;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
  margin: 0 auto;
}
.cotainer {
  display: flex;
  padding: 1rem 1.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
  background-color: white;
}
.title {
  display: flex;
  padding: 0.4375rem 0rem;
  align-items: center;
  gap: 0.875rem;
  align-self: stretch;
}
.subTitleContainer {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  align-self: stretch;
}
.subTitleText {
  color: #141414;
  font-size: 1.25rem;
  font-weight: 700;
}
.errorText {
  color: #ff007f;
  font-size: 1.25rem;
}
.newEventInputCotainer {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;
}
</style>
