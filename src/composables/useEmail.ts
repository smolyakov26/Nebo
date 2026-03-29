import { ref } from 'vue'
import type { FormType } from '@/constants'

interface EmailResponse {
  success: boolean
  error?: string
}

export function useEmail() {
  const GAS_URL = import.meta.env.VITE_GAS_URL as string | undefined
  const error = ref<string | null>(null)

  const sendForm = async (formType: FormType, data: Record<string, string>): Promise<boolean> => {
    error.value = null

    if (!GAS_URL) {
      console.warn('VITE_GAS_URL not configured — form submission skipped')
      error.value = 'Форма временно недоступна. Попробуйте позвонить нам.'
      return false
    }

    try {
      const response = await fetch(GAS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formType, ...data }),
      })

      if (response.type === 'opaque') {
        return true
      }

      const result = (await response.json()) as EmailResponse
      return result.success
    } catch (err) {
      console.error('Form submission failed:', err)
      error.value = 'Ошибка отправки. Пожалуйста, попробуйте ещё раз или позвоните нам.'
      return false
    }
  }

  const clearError = () => {
    error.value = null
  }

  return { sendForm, error, clearError }
}
