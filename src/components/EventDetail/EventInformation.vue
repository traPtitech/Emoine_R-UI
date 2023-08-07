<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Meeting } from '@/lib/apis'
import { formatDateTime } from '@/utils/date'
import { useMenuModal } from '@/composables/useMenuModal'
import { MenuItem } from '@/components/UI/MenuModal.vue'
import MenuModal from '@/components/UI/MenuModal.vue'
import AIcon from '@/components/UI/AIcon.vue'

const props = defineProps<{ event: Meeting }>()
const emits = defineEmits<{
  (e: 'updateDescription', description: string): void
  (e: 'delete'): void
}>()

const eventDescription = ref('')
const isDescriptionEditing = ref(false)

onMounted(() => {
  eventDescription.value = props.event.description
})

const changeDescription = () => {
  emits('updateDescription', eventDescription.value)
  isDescriptionEditing.value = false
}

const menuItems: MenuItem[] = [
  {
    key: 'edit',
    label: 'Edit',
    icon: 'majesticons:edit-pen-2',
    onClick: () => (isDescriptionEditing.value = true)
  },
  {
    key: 'delete',
    label: 'Delete',
    icon: 'ph:trash',
    onClick: () => emits('delete')
  }
]

const [isMenuModalOpen, toggleMenuModal, itemButtonRef] = useMenuModal()
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.informationContainer">
      <div :class="$style.titleContainer">
        <p :class="$style.eventTitle">{{ event.title }}</p>
        <div :class="$style.menuModal">
          <button
            ref="itemButtonRef"
            :class="$style.button"
            @click="toggleMenuModal"
          >
            <a-icon name="ci:hamburger-md" :size="36" />
          </button>
          <menu-modal v-if="isMenuModalOpen" :menu-items="menuItems" />
        </div>
      </div>
      <p :class="$style.startedAt">
        {{ `${formatDateTime(new Date(event.startedAt))}~` }}
      </p>
      <div
        :is-editing="isDescriptionEditing"
        :class="$style.descriptionContainer"
      >
        <textarea
          v-model="eventDescription"
          :disabled="!isDescriptionEditing"
          :class="$style.descriptionInput"
        />
        <div
          v-if="isDescriptionEditing"
          :class="$style.descriptionConfirmButton"
        >
          <button :class="$style.button" @click="changeDescription">
            <a-icon name="material-symbols:check-small-rounded" :size="36" />
          </button>
        </div>
      </div>
    </div>
    <a
      :href="`https://youtu.be/${event.videoId}`"
      target="_blank"
      :class="$style.thumbnailImage"
    >
      <img :src="event.thumbnail" :class="$style.thumbnailImage" />
    </a>
  </div>
</template>

<style lang="scss" module>
.container {
  height: 18.75rem;
  padding: 1.25rem;
  display: flex;
  gap: 1.75rem;
  background-color: white;
}
.informationContainer {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.titleContainer {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}
.eventTitle {
  font-size: 2rem;
  font-weight: bold;
  flex-grow: 1;
}
.menuModal {
  position: relative;
}
.button {
  border-radius: 50%;
  padding: 0.5rem;
  color: $text-secondary;
  &:hover {
    background-color: $background-secondary;
  }
}
.startedAt {
  color: $text-secondary;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}
.descriptionContainer {
  flex-grow: 1;
  display: flex;
  gap: 0.5rem;
  border-radius: 0.5rem;
  &[is-editing='true'] {
    padding: 0.5rem;
    border: 1px solid $text-secondary;
  }
  &[is-editing='false'] {
    padding: 0;
    border: none;
  }
}
.descriptionInput {
  width: 100%;
  flex-grow: 1;
  resize: none;
}
.descriptionConfirmButton {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.thumbnailImage {
  height: 100%;
}
</style>
