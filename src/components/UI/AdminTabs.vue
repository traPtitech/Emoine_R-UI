<script lang="ts" setup>
import { RouterLink } from 'vue-router'

type AdminTabType = 'events' | 'tokens'

defineProps<{
  currentTab: AdminTabType
}>()
</script>

<template>
  <div>
    <div :class="$style.tabs">
      <router-link
        to="/admin/meetings"
        :data-is-active="currentTab === 'events'"
        :class="$style.tab"
      >
        Events
      </router-link>
      <router-link
        to="/admin/tokens"
        :data-is-active="currentTab === 'tokens'"
        :class="$style.tab"
      >
        Tokens
      </router-link>
    </div>
    <div><slot /></div>
  </div>
</template>

<style lang="scss" module>
.tabs {
  display: flex;
  align-items: center;
  gap: 4px;
}
.tab {
  width: 10rem;
  height: 2.25rem;
  background-color: white;
  border-radius: 0.75rem 0.75rem 0 0;
  color: $color-secondary;
  text-align: center;
  font-size: 1.25rem;
  position: relative;
  text-decoration: none;
  padding: 4px 0;
  &[data-is-active='true'] {
    color: $color-primary;
    cursor: default;
    pointer-events: none;
  }
  &::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 4px;
    background-color: $background-primary;
  }
  &[data-is-active='true']::after {
    background-color: white;
  }

  &[data-is-active='false']:hover {
    color: $color-primary;
    background-color: $background-secondary;
  }
}
</style>
