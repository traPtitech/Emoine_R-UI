<script setup lang="ts">
import EmoineHeader from '@/components/EmoineHeader.vue'
</script>

<template>
  <div :class="$style.container">
    <emoine-header />
    <img src="/not_found.png" alt="not found" :class="$style.notFound" />
  </div>
</template>

<style module lang="scss">
.container {
  text-align: center;
  .notFound {
    margin-top: 7.5rem;
  }
}
</style>
