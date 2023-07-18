<script lang="ts" setup>
import AIcon from '@/components/UI/AIcon.vue'

export interface MenuItem {
  key: string
  label: string
  icon: string
  onClick: () => void
}

defineProps<{
  menuItems: MenuItem[]
}>()
</script>

<template>
  <div :class="$style.container">
    <ul :class="$style.menuItemList">
      <li v-for="item in menuItems" :key="item.key" :class="$style.menuItem">
        <button :class="$style.itemButton" @click="item.onClick">
          <a-icon :name="item.icon" :size="20" :class="$style.buttonIcon" />
          {{ item.label }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" module>
.container {
  background-color: white;
  position: absolute;
  right: 0;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
}
.menuItemList {
  list-style: none;
}
.itemButton {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  &:hover {
    background-color: $background-secondary;
  }
}
.buttonIcon {
  color: $text-secondary;
}
</style>
