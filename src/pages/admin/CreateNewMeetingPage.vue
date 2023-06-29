<script lang="ts" setup>
import { ref } from 'vue'
import apis, { CreateMeeting, Meeting } from '@/lib/apis'
import BaseInput from '@/components/UI/BaseInput.vue'
import BaseButton from '@/components/UI/BaseButton.vue'
import EmoineHeader from '@/components/EmoineHeader.vue'
import router from '@/router'

//todo: 専用ヘッダー画像のアップロード
const headerLogo = '/logo.png'

const liveUrl = ref('')
const isUrlValidated = ref(true)

function getLiveIdFromUrl(): string {
  const params = new URL(liveUrl.value).searchParams
  if (params.has('v')) return
  return params.get('v')
}

const createMeeting = async () => {
  let id = ''
  try {
    const meetingInfo: CreateMeeting = {
      video_id: getLiveIdFromUrl(),
      description: ''
    }
    const res = (await apis.createMeeting(meetingInfo)).data
    id = res.id
  } catch (e: unknown) {
    console.log(e)
    isUrlValidated.value = false
    return
  }

  // TODO: 遷移先の名前決定したらここに書く
  router.push({ name: 'hoge', params: { id: id } })
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
        <div v-if="!isUrlValidated" :class="$style.errorText">
          ※ 存在しないURLです
        </div>
      </div>
      <div :class="$style.newEventInputCotainer">
        <div :class="$style.input">
          <base-input placeholder="Input URL..." />
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
  gap: 10px;
  margin: 0 auto;
}
.cotainer {
  display: flex;
  padding: 16px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  background-color: white;
}
.title {
  display: flex;
  padding: 7px 0px;
  align-items: center;
  gap: 14px;
  align-self: stretch;
}
.subTitleContainer {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
}
.subTitleText {
  color: #141414;
  font-size: 24px;
  font-family: Arial;
  font-weight: 700;
}
.errorText {
  color: #ff007f;
  font-size: 24px;
  font-family: Arial;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.newEventInputCotainer {
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: stretch;
}
</style>
