<template>
  <div :class="$style.container">
    <router-view />
  </div>
</template>

<style lang="scss" module>
.container {
  color: $text-primary;
  background-color: $background-primary;
  min-height: 100vh;
}
</style>
