<script setup lang="ts">
export interface Stamp {
  stampId: string
  stampName: string
  image: string
}

defineProps<{
  stamps: Stamp[]
}>()

const handlePutStamp = (stampId: string) => {
  console.log(`stamp: ${stampId}`)
}
</script>

<template>
  <ul :class="$style.stampList">
    <li v-for="stamp in stamps" :key="stamp.stampId" :class="$style.stamp">
      <button
        :class="$style.stampButton"
        @click="handlePutStamp(stamp.stampId)"
      >
        <img
          :src="stamp.image"
          :alt="stamp.stampName"
          :width="100"
          :height="100"
        />
      </button>
    </li>
  </ul>
</template>

<style lang="scss" module>
.stampList {
  display: flex;
  list-style: none;
}
.stamp {
  padding: 0;
}
.stampButton {
  padding: 0 0.5rem;
  &:hover {
    background-color: gray; // fixme: 下部になぜかpaddingらしきものがついている
  }
}
</style>
