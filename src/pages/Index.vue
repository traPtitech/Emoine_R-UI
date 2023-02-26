<script setup lang="ts">
import { ref } from 'vue'
import DateDisplay from '@/components/UI/DateDisplay.vue'

const inputDate = ref('')
const newDate = ref(new Date())

function applyDate() {
  newDate.value = new Date(inputDate.value);
}
</script>

<template>
  <form @submit.prevent="applyDate">
    <input type='date' v-model="inputDate">
    <button>Apply</button>    
  </form>
  <DateDisplay :time="newDate"/>
</template>
