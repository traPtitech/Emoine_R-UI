<script setup lang="ts">
import { ref } from 'vue'
import type { TextColor } from '@/consts/colors'
import { Stamp } from '@/components/StampList/StampList.vue'

interface Comment {
  comment: string
  color: TextColor
}

/**todo: スタンプをコンポーネント分けてonMountedから数秒で消えるとかにする？ */

const comments = ref<Comment[]>([
  {
    comment: 'コメント',
    color: '#000000'
  },
  {
    comment: 'aaaaaa',
    color: '#00FFFF'
  },
  {
    comment: 'afeagfaegea',
    color: '#FFFF00'
  }
])

const stamps: Stamp[] = Array(10).fill({
  stampId: 'aaa',
  stampName: 'bbb',
  image: 'https://q.trap.jp/api/v3/public/icon/mehm8128'
})
</script>

<template>
  <div :class="$style.overlayContainer">
    <slot />
    <p
      v-for="comment in comments"
      :key="comment.comment"
      :class="$style.comment"
      :style="{
        color: comment.color,
        top: `${Math.random() * 90}%`
      }"
    >
      {{ comment.comment }}
    </p>
    <img
      v-for="stamp in stamps"
      :key="stamp.stampId"
      :src="stamp.image"
      :style="{
        top: `${Math.random() * 90}%`,
        left: `${Math.random() * 90}%`
      }"
      :class="$style.stamp"
    />
  </div>
</template>

<style lang="scss" module>
.overlayContainer {
  position: relative;
  width: 100%;
}
.comment {
  position: absolute;
  font-size: 2rem;
  font-weight: bold;
  right: 0;
  animation: commentMove 8s linear;
}
.stamp {
  position: absolute;
  width: 100px;
  height: 100px;
  animation: stampZoom 0.4s linear;
}
@keyframes commentMove {
  0% {
    right: 0;
  }
  100% {
    right: 100%;
  }
}
@keyframes stampZoom {
  0% {
    transform: scale(0.4);
  }
  100% {
    transform: scale(1);
  }
}
</style>
