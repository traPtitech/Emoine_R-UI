<script lang="ts" setup>
import { ref } from 'vue'
import EmoineHeader from '@/components/EmoineHeader.vue'

//todo: 専用ヘッダー画像のアップロード
const headerLogo = '/logo.png'

const liveUrl = ref('')
</script>

<template>
  <emoine-header />
  <div :class="$style.content">
    <h2 :class="$style.title">
      <img :src="headerLogo" />
    </h2>
    <div :class="$style.cotainer">
      <h3 :class="$style.subTitleText">LIVE URL</h3>
      <div :class="$style.newEventInputCotainer">
        <div :class="$style.input">
          <input v-model="liveUrl" placeholder="Input URL..." />
        </div>
        <div :class="$style.button">
          <button @click="toggle">toggle</button>
        </div>
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
.subTitleText {
  color: #141414;
  font-size: 24px;
  font-family: Arial;
  font-weight: 700;
}
.newEventInputCotainer {
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: stretch;
}
.input {
  display: flex;
  padding: 6px 0px 6px 10px;
  align-items: center;
  flex: 1 0 0;
  border-radius: 6px;
  border: 1px solid #d9d9d9;
}
.button {
  display: flex;
  height: 36px;
  padding: 6px 16px;
  align-items: center;
  border-radius: 6px;
  background: #ff007f;
  color: white;
  font-size: 16px;
  font-family: Arial;
}
</style>
