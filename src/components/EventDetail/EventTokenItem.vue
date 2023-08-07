<script lang="ts" setup>
import { Token } from '@/lib/modelTypes'
import { formatDate } from '@/utils/date'
import AIcon from '@/components/UI/AIcon.vue'
import EmoineIcon from '@/components/UI/EmoineIcon.vue'
import MenuModal from '@/components/UI/MenuModal.vue'
import { MenuItem } from '@/components/UI/MenuModal.vue'
import { useMenuModal } from '@/composables/useMenuModal'

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
        //todo: deleteのAPIが生えてない
        console.log('delete')
      } catch {
        console.error('error')
      }
    }
  }
]

const [isMenuModalOpen, toggleMenuModal, itemButtonRef] = useMenuModal()
</script>

<template>
  <div :class="$style.container">
    <emoine-icon />
    <div :class="[$style.containerBase, $style.leftContainer]">
      <p :class="$style.userId">{{ token.username }}</p>
      <p :class="$style.description">{{ token.description }}</p>
    </div>
    <div :class="[$style.containerBase, $style.middleContainer]">
      <p :class="$style.expireDate">
        {{ formatDate(token.expireAt) }}
      </p>
    </div>
    <div :class="[$style.containerBase, $style.rightContainer]">
      <div :class="$style.menuModal">
        <button
          ref="itemButtonRef"
          :class="$style.dotsButton"
          @click="toggleMenuModal"
        >
          <a-icon name="ph:dots-three-light" :size="32" />
        </button>
        <menu-modal v-if="isMenuModalOpen" :menu-items="menuItems" />
      </div>
    </div>
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
.containerBase {
  display: flex;
  align-items: center;
  height: 70%;
}
.leftContainer {
  flex-grow: 1;
  border-right: 1px solid $color-secondary;
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
  width: 36rem;
  color: $text-secondary;
  overflow: hidden;
  text-overflow: ellipsis;
}
.middleContainer {
  border-right: 1px solid $color-secondary;
  padding: 0 1.25rem;
  width: 8.75rem;
}
.expireDate {
  color: $color-secondary;
}
.rightContainer {
  padding: 0 1.25rem;
  width: 5rem;
}
.menuModal {
  position: relative;
}
.dotsButton {
  border-radius: 50%;
  padding: 0.5rem;
  &:hover {
    background-color: $background-secondary;
  }
}
</style>
