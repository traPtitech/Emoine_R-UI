<script setup lang="ts">
import { ref, watch, computed } from 'vue'
const days = ref(0)

const props = defineProps<{
  time: Date
}>()

const text = computed(() => {
  if (days.value >= 365) return `${Math.floor(days.value / 365)}年前`
  else if (days.value >= 31) return `${Math.floor(days.value / 30.42)}ヶ月前`
  else if (days.value >= 1) return `${days.value}日前`
  else if (days.value == 0) return 'LIVE'
  else return (props.time.getMonth()+1) + '/' + props.time.getDate()
})

function calcDiff() {
  console.log(props.time, `props`);
  if (!props.time) return;
  const prevTime = props.time.getTime();
  const diff = new Date().getTime() - prevTime;
  days.value = Math.floor(diff / (1000 * 60 * 60 * 24));
}

watch(() => props.time, calcDiff)
</script>

<template>
  <div :class="$style.background">
    <p 
      :class="$style.content"
      :is-planned="days.value > 0"
      :is-streaming="" 
      :is-achieved=""
    >{{ text }}</p>
  </div>
</template>

<style lang="scss" module>
.background{
  /* Status=Streaming */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;

  width: 60px;
  height: 30px;
  left: 90px;
  top: 20px;

  background: rgba(255, 0, 0, 0.7);
}
.content{
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #FFFFFF;

  /* オートレイアウト内部 */

  flex: none;
  order: 0;
  flex-grow: 0;
}
</style>