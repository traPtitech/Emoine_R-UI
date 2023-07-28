<script lang="ts" setup>
import { Token } from '@/lib/modelTypes'
import EventTokenItem from './EventTokenItem.vue'
import AIcon from '@/components/UI/AIcon.vue'
import { ref } from 'vue'
import EventTokenNew from './EventTokenNew.vue'

defineProps<{
  tokens: Token[]
}>()
const emit = defineEmits<{
  (e: 'addNewToken', token: Token): void
}>()

const isNewTokenOpen = ref(false)
const toggleNewToken = () => {
  isNewTokenOpen.value = !isNewTokenOpen.value
}
</script>

<template>
  <div>
    <ul :class="$style.tokenList">
      <li
        v-for="token in tokens"
        :key="token.raw"
        :class="$style.tokenListItem"
      >
        <event-token-item :token="token" />
      </li>
      <li :class="$style.newTokenButtonContainer">
        <button
          v-if="!isNewTokenOpen"
          :class="$style.newTokenButton"
          @click="toggleNewToken"
        >
          <a-icon name="mdi:plus-circle-outline" />
          新しいトークンを追加
        </button>
        <event-token-new
          v-else
          @close="toggleNewToken"
          @add-new-token="emit('addNewToken', $event)"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" module>
.tokenList {
  list-style: none;
  background-color: white;
}
.tokenListItem {
  padding: 0.25rem 0;
  margin-top: 1rem;
  &:not(:last-child) {
    border-bottom: 1px solid $background-secondary;
  }
}
.newTokenButtonContainer {
  display: flex;
  justify-content: center;
  padding: 4px 0px;
}
.newTokenButton {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 4px 12px;
  font-weight: bold;
  color: $color-secondary;
  text-decoration: none;
  &:hover {
    color: $color-primary;
    background-color: $background-secondary;
  }
}
.paginationBarContainer {
  display: flex;
  justify-content: center;
}
</style>
