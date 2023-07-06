<script lang="ts" setup>
import { Token } from '@/lib/apis'
import { formatDate } from '@/utils/date'
import AIcon from '@/components/UI/AIcon.vue'
import EmoineIcon from '@/components/UI/EmoineIcon.vue'
import { MenuItem } from '@/components/EventDetail/MenuModal.vue'
import MenuModal from '@/components/EventDetail/MenuModal.vue'
import { onMounted, onUnmounted, ref } from 'vue'

defineProps<{
  token: Token
}>()

const menuItems: MenuItem[] = [
  {
    key: 'delete',
    label: 'Delete',
    icon: 'ph:trash',
    onClick: async () => {
      try {
        console.log('delete')
      } catch {
        console.error('error')
      }
    }
  }
]

const isMenuModalOpen = ref(false)
const toggleMenuModal = () => {
  isMenuModalOpen.value = !isMenuModalOpen.value
}

const itemButtonRef = ref<HTMLButtonElement | undefined>()
const handleClick = (e: MouseEvent) => {
  if (!itemButtonRef.value) return
  if (!itemButtonRef.value.contains(e.target as Node)) {
    isMenuModalOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClick)
})
onUnmounted(() => {
  document.removeEventListener('click', handleClick)
})
</script>

<template>
  <div :class="$style.container">
    <emoine-icon />
    <div :class="$style.leftContainer">
      <p :class="$style.userId">{{ token.user_id }}</p>
      <p :class="$style.description">{{ token.description }}</p>
    </div>
    <div :class="$style.middleContainer">
      <p :class="$style.expireDate">
        {{ formatDate(new Date(token.expire_at)) }}
      </p>
    </div>
    <div :class="$style.rightContainer">
      <button
        ref="itemButtonRef"
        :class="$style.dotsButton"
        @click="toggleMenuModal"
      >
        <a-icon name="ph:dots-three-light" :size="32" />
      </button>
    </div>
    <menu-modal v-if="isMenuModalOpen" :menu-items="menuItems" />
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
  height: 3.75rem;
  padding: 8px;
  position: relative;
}
.leftContainer {
  display: flex;
  align-items: center;
  flex-grow: 1;
  border-right: 1px solid $color-secondary;
  height: 70%;
  padding-right: 20px;
}
.userId {
  font-size: 1.25rem;
  font-weight: bold;
  margin-left: 20px;
  color: $text-primary;
}
.description {
  font-size: 1.25rem;
  margin-left: 20px;
  color: $text-secondary;
}
.middleContainer {
  display: flex;
  align-items: center;
  border-right: 1px solid $color-secondary;
  padding: 0 1.25rem;
  width: 8.75rem;
  height: 70%;
}
.expireDate {
  color: $color-secondary;
}
.rightContainer {
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  width: 5rem;
  height: 70%;
}
.dotsButton {
  border-radius: 50%;
  padding: 0.5rem;
  &:hover {
    background-color: $background-secondary;
  }
}
</style>
