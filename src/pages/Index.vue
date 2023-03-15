<script setup lang="ts">
import apis from '@/lib/apis'
import { onMounted } from 'vue'

onMounted(async () => {
  const res = await apis.getAllMeeting()
  console.log(res.data)
})
</script>
<template>Emoine</template>
