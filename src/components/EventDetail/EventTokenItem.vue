<script lang="ts" setup>
import { Token } from '@/lib/apis'
import { formatDate } from '@/utils/date'
import AIcon from '@/components/UI/AIcon.vue'

defineProps<{
  token: Token
}>()
</script>

<template>
  <div :class="$style.container">
    <a-icon name="tabler:certificate" :size="32" color="#ff007f" />
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
      <button :class="$style.dotsButton">
        <a-icon name="solar:menu-dots-bold" :size="32" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
  height: 3.75rem;
  padding: 8px;
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
  width: 120px;
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
