<script setup lang="ts">
import { ref, watch } from 'vue'
import { User, Phone, Gift, MessageSquare } from 'lucide-vue-next'
import BaseModal from './BaseModal.vue'
import FormInput from './FormInput.vue'
import FormSelect from './FormSelect.vue'
import FormTextarea from './FormTextarea.vue'
import FormSuccess from './FormSuccess.vue'
import FormError from './FormError.vue'
import { useCertificateModal } from '@/composables/useCertificateModal'
import { useEmail } from '@/composables/useEmail'
import { certificateModalContent } from '@/content'
import { PHONE_REGEX } from '@/constants'
import { formatPhone } from '@/utils/phone'

const { isOpen, selectedDenomination, closeModal } = useCertificateModal()
const { sendForm, error: submitError, clearError } = useEmail()

const { title, subtitle, denominations, fields, submit, submitting, privacy, success } =
  certificateModalContent

const formData = ref({
  recipientName: '',
  recipientLastName: '',
  recipientPhone: '',
  denomination: selectedDenomination.value || '',
  customAmount: '',
  senderName: '',
  message: '',
})

const isSubmitted = ref(false)
const isSubmitting = ref(false)
const phoneError = ref('')

const validatePhone = (phone: string): boolean => {
  const formatted = formatPhone(phone)
  if (!PHONE_REGEX.test(formatted)) {
    phoneError.value = 'Введите корректный номер телефона'
    return false
  }
  phoneError.value = ''
  return true
}

const handleSubmit = async () => {
  if (
    !formData.value.recipientName ||
    !formData.value.recipientLastName ||
    !formData.value.recipientPhone ||
    !formData.value.denomination
  )
    return

  if (formData.value.denomination === 'custom' && !formData.value.customAmount) return

  if (!validatePhone(formData.value.recipientPhone)) return

  isSubmitting.value = true
  clearError()

  const result = await sendForm('certificate', {
    recipientName: formData.value.recipientName,
    recipientLastName: formData.value.recipientLastName,
    recipientPhone: formatPhone(formData.value.recipientPhone),
    denomination: formData.value.denomination,
    customAmount: formData.value.customAmount,
    senderName: formData.value.senderName,
    message: formData.value.message,
  })

  if (!result) {
    isSubmitting.value = false
    return
  }

  isSubmitted.value = true
  isSubmitting.value = false

  setTimeout(() => {
    closeModal()
    isSubmitted.value = false
    formData.value = {
      recipientName: '',
      recipientLastName: '',
      recipientPhone: '',
      denomination: '',
      customAmount: '',
      senderName: '',
      message: '',
    }
  }, 3000)
}

watch(isOpen, (val) => {
  if (val) {
    formData.value.denomination = selectedDenomination.value || denominations?.[0]?.value || '18000'
  }
  if (!val) {
    isSubmitted.value = false
    isSubmitting.value = false
    clearError()
  }
})

const handleBackdropClick = () => {
  closeModal()
}
</script>

<template>
  <BaseModal
    :is-open="isOpen"
    color="rose"
    title-id="certificate-title"
    @close="closeModal"
    @backdrop-click="handleBackdropClick"
  >
    <FormSuccess v-if="isSubmitted" :title="success.title" :message="success.message" />

    <form v-else @submit.prevent="handleSubmit" class="p-8">
      <h2 id="certificate-title" class="text-3xl font-black text-white mb-2 uppercase italic">
        {{ title }}
      </h2>
      <p class="text-slate-400 text-sm mb-8">{{ subtitle }}</p>

      <div class="space-y-5">
        <div class="grid grid-cols-2 gap-4">
          <FormInput
            :id="'recipientName'"
            :label="fields.recipientName"
            :placeholder="fields.recipientNamePlaceholder"
            :model-value="formData.recipientName"
            :icon="User"
            color="rose"
            required
            @update:model-value="formData.recipientName = $event"
          />
          <FormInput
            :id="'recipientLastName'"
            :label="fields.recipientLastName"
            :placeholder="fields.recipientLastNamePlaceholder"
            :model-value="formData.recipientLastName"
            :icon="User"
            color="rose"
            required
            @update:model-value="formData.recipientLastName = $event"
          />
        </div>

        <FormInput
          :id="'recipientPhone'"
          :label="fields.recipientPhone"
          :placeholder="fields.recipientPhonePlaceholder"
          :model-value="formData.recipientPhone"
          :icon="Phone"
          :error="phoneError"
          error-id="cert-phone-error"
          type="tel"
          color="rose"
          required
          @update:model-value="formData.recipientPhone = $event"
        />

        <FormSelect
          :id="'denomination'"
          :label="fields.denomination"
          :model-value="formData.denomination"
          :options="denominations"
          :icon="Gift"
          color="rose"
          @update:model-value="formData.denomination = $event"
        />

        <FormInput
          v-if="formData.denomination === 'custom'"
          :id="'customAmount'"
          :label="fields.customAmount"
          placeholder="5000"
          :model-value="formData.customAmount"
          type="number"
          color="rose"
          @update:model-value="formData.customAmount = $event"
        />

        <FormInput
          :id="'senderName'"
          :label="fields.senderName"
          :placeholder="fields.senderNamePlaceholder"
          :model-value="formData.senderName"
          :icon="User"
          color="rose"
          @update:model-value="formData.senderName = $event"
        />

        <FormTextarea
          :id="'message'"
          :label="fields.message"
          :placeholder="fields.messagePlaceholder"
          :model-value="formData.message"
          :icon="MessageSquare"
          color="rose"
          @update:model-value="formData.message = $event"
        />
      </div>

      <FormError v-if="submitError" :message="submitError" class="mt-6" />

      <button
        type="submit"
        :disabled="
          isSubmitting ||
          !formData.recipientName ||
          !formData.recipientLastName ||
          !formData.recipientPhone
        "
        class="w-full mt-8 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white py-4 text-[11px] font-black uppercase tracking-widest transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
      >
        <span v-if="isSubmitting">{{ submitting }}</span>
        <span v-else>{{ submit }}</span>
      </button>

      <p class="text-[10px] text-slate-500 text-center mt-4">
        {{ privacy }}
      </p>
    </form>
  </BaseModal>
</template>
