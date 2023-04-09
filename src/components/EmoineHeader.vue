<script lang="ts" setup>
interface Props {
  isAdminPage?: boolean
}
const props = defineProps<Props>()
const headerLogo = props.isAdminPage
  ? '/public/logo_admin.png'
  : '/public/logo.png'
</script>

<template>
  <div :class="$style.titleContainer">
    <h1 :class="$style.title">
      <img :src="headerLogo" />
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
