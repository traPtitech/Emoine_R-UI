<script lang="ts" setup>
import AIcon from '@/components/UI/AIcon.vue'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

interface Props {
  currentPage: number
  totalPages: number
  constructLink: (page: number) => string
}

const props = defineProps<Props>()

const pageButtons = computed(() => {
  if (props.currentPage <= 3) {
    return [...Array(5).keys()].map(i => i + 1)
  }
  if (props.currentPage >= props.totalPages - 2) {
    return [...Array(5).keys()].map(i => i + props.totalPages - 4)
  }
  return [...Array(5).keys()].map(i => i - 2 + props.currentPage)
})
</script>

<template>
  <div :class="$style.container">
    <router-link
      :to="constructLink(1)"
      :class="$style.linkButton"
      :disabled="currentPage === 1"
    >
      <a-icon name="mdi:chevron-double-left" :class="$style.chevronIcon" />
    </router-link>
    <router-link
      :to="constructLink(currentPage - 1)"
      :class="$style.linkButton"
      :disabled="currentPage === 1"
    >
      <a-icon name="mdi:chevron-left" :class="$style.chevronIcon" />
    </router-link>

    <div :class="$style.pageButtonContainer">
      <router-link
        v-for="page in pageButtons"
        :key="page"
        :class="$style.linkButton"
        :disabled="page === currentPage"
        :to="constructLink(page)"
      >
        {{ page }}
      </router-link>
    </div>

    <router-link
      :to="constructLink(currentPage + 1)"
      :class="$style.linkButton"
      :disabled="currentPage === totalPages"
    >
      <a-icon name="mdi:chevron-right" :class="$style.chevronIcon" />
    </router-link>
    <router-link
      :to="constructLink(totalPages)"
      :class="$style.linkButton"
      :disabled="currentPage === totalPages"
    >
      <a-icon name="mdi:chevron-double-right" :class="$style.chevronIcon" />
    </router-link>
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: #f6f6f6;
  padding: 100px;
}
.pageButtonContainer {
  display: flex;
  align-items: center;
  gap: 4px;
}
.linkButton {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #818181;
  background-color: #fff;
  text-decoration: none;
  cursor: pointer;
  font-size: 24px;

  &[disabled='true'] {
    color: #fff;
    background-color: #818181;
    cursor: default;
    pointer-events: none;
  }
  &:hover {
    color: #fff;
    background-color: #818181;
  }
}
</style>
