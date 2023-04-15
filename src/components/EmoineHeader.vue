<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const headerLogo = route.path.startsWith('/admin')
  ? '/logo_admin.png'
  : '/logo.png'
</script>

<template>
  <div :class="$style.titleContainer">
    <h1 :class="$style.title">
      <router-link to="/">
        <img :src="headerLogo" />
      </router-link>
    </h1>
  </div>
</template>

<style lang="scss" module>
.titleContainer {
  padding: 3.125rem 0;
  text-align: center;
}
.tabs {
  margin: 0 20%;
}
</style>
