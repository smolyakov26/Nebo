import { ref } from 'vue'

const isOpen = ref(false)
const selectedDenomination = ref('')

export function useCertificateModal() {
  const openModal = (denomination: string = '') => {
    selectedDenomination.value = denomination
    isOpen.value = true
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    isOpen.value = false
    selectedDenomination.value = ''
    document.body.style.overflow = ''
  }

  return {
    isOpen,
    selectedDenomination,
    openModal,
    closeModal
  }
}
