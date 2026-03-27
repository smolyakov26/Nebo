import { ref } from 'vue'

const isOpen = ref(false)
const selectedJumpType = ref('tandem')

export function useBookingModal() {
  const openModal = (jumpType: string = 'tandem') => {
    selectedJumpType.value = jumpType
    isOpen.value = true
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    isOpen.value = false
    document.body.style.overflow = ''
  }

  return {
    isOpen,
    selectedJumpType,
    openModal,
    closeModal,
  }
}
