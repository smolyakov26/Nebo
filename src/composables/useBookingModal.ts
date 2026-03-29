import { ref } from 'vue'
import { JUMP_TYPES, type JumpType } from '@/constants'

const isOpen = ref(false)
const selectedJumpType = ref<JumpType>(JUMP_TYPES.TANDEM)

const isValidJumpType = (value: string): value is JumpType => {
  return Object.values(JUMP_TYPES).includes(value as JumpType)
}

export function useBookingModal() {
  const openModal = (jumpType: string = JUMP_TYPES.TANDEM) => {
    selectedJumpType.value = isValidJumpType(jumpType) ? jumpType : JUMP_TYPES.TANDEM
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
