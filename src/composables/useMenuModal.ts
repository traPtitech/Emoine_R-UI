import { ref, onMounted, onUnmounted } from 'vue'

export const useMenuModal = () => {
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

  return [isMenuModalOpen, toggleMenuModal, itemButtonRef]
}
