type FormType = 'booking' | 'certificate'

interface EmailResponse {
  success: boolean
  error?: string
}

export function useEmail() {
  const GAS_URL = import.meta.env.VITE_GAS_URL as string | undefined

  const sendForm = async (formType: FormType, data: Record<string, string>): Promise<boolean> => {
    if (!GAS_URL) {
      console.warn('VITE_GAS_URL not configured — form submission skipped')
      return false
    }

    try {
      const response = await fetch(GAS_URL, {
        method: 'POST',
        mode: 'no-cors', // Google Apps Script requires no-cors
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formType, ...data }),
      })

      // no-cors mode returns opaque response, we can't read it
      // If fetch didn't throw, assume success
      if (response.type === 'opaque') {
        return true
      }

      // If we can read the response (shouldn't happen with no-cors)
      const result = (await response.json()) as EmailResponse
      return result.success
    } catch (error) {
      console.error('Form submission failed:', error)
      return false
    }
  }

  return { sendForm }
}
