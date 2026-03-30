<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { User, Phone, Calendar, Users, MessageSquare } from 'lucide-vue-next'
import BaseModal from './BaseModal.vue'
import FormInput from './FormInput.vue'
import FormSelect from './FormSelect.vue'
import FormTextarea from './FormTextarea.vue'
import FormSuccess from './FormSuccess.vue'
import FormError from './FormError.vue'
import { useBookingModal } from '@/composables/useBookingModal'
import { useEmail } from '@/composables/useEmail'
import { bookingContent } from '@/content'
import { PHONE_REGEX, JUMP_TYPES, type JumpType } from '@/constants'
import { formatPhone } from '@/utils/phone'

const { isOpen, selectedJumpType, closeModal } = useBookingModal()
const { sendForm, error: submitError, clearError } = useEmail()

const {
  title,
  subtitle,
  callbackTitle,
  callbackSubtitle,
  fields,
  jumpTypes,
  submit,
  submitting,
  privacy,
  success,
} = bookingContent

const isCallbackMode = computed(() => selectedJumpType.value === JUMP_TYPES.CALLBACK)

const formData = ref<{
  name: string
  phone: string
  date: string
  jumpType: JumpType
  message: string
}>({
  name: '',
  phone: '',
  date: '',
  jumpType: JUMP_TYPES.TANDEM,
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
  if (!formData.value.name || !formData.value.phone) return
  if (!validatePhone(formData.value.phone)) return

  isSubmitting.value = true
  clearError()

  const result = await sendForm('booking', {
    name: formData.value.name,
    phone: formatPhone(formData.value.phone),
    jumpType: formData.value.jumpType,
    date: formData.value.date,
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
    formData.value.name = ''
    formData.value.phone = ''
    formData.value.date = ''
    formData.value.jumpType = JUMP_TYPES.TANDEM
    formData.value.message = ''
  }, 3000)
}

watch(isOpen, (val) => {
  if (!val) {
    isSubmitted.value = false
    isSubmitting.value = false
    clearError()
  } else {
    formData.value.jumpType = selectedJumpType.value
  }
})

const handleBackdropClick = () => {
  closeModal()
}
</script>

<template>
  <BaseModal
    :is-open="isOpen"
    color="sky"
    title-id="booking-title"
    @close="closeModal"
    @backdrop-click="handleBackdropClick"
  >
    <FormSuccess v-if="isSubmitted" :title="success.title" :message="success.message" />

    <form v-else @submit.prevent="handleSubmit" class="p-8">
      <h2 id="booking-title" class="text-3xl font-black text-white mb-2 uppercase italic">
        {{ isCallbackMode ? callbackTitle : title }}
      </h2>
      <p class="text-slate-400 text-sm mb-8">
        {{ isCallbackMode ? callbackSubtitle : subtitle }}
      </p>

      <div class="space-y-6">
        <FormInput
          :id="'name'"
          :label="fields.name"
          :placeholder="fields.namePlaceholder"
          :model-value="formData.name"
          :icon="User"
          required
          @update:model-value="formData.name = $event"
        />

        <FormInput
          :id="'phone'"
          :label="fields.phone"
          :placeholder="fields.phonePlaceholder"
          :model-value="formData.phone"
          :icon="Phone"
          :error="phoneError"
          error-id="phone-error"
          type="tel"
          required
          @update:model-value="formData.phone = $event"
        />

        <FormSelect
          v-if="!isCallbackMode"
          :id="'jumpType'"
          :label="fields.jumpType"
          :model-value="formData.jumpType"
          :options="jumpTypes"
          :icon="Users"
          @update:model-value="formData.jumpType = $event as JumpType"
        />

        <FormInput
          v-if="!isCallbackMode"
          :id="'date'"
          :label="fields.date"
          :model-value="formData.date"
          :icon="Calendar"
          type="date"
          @update:model-value="formData.date = $event"
        />

        <FormTextarea
          v-if="!isCallbackMode"
          :id="'message'"
          :label="fields.message"
          :placeholder="fields.messagePlaceholder"
          :model-value="formData.message"
          :icon="MessageSquare"
          @update:model-value="formData.message = $event"
        />
      </div>

      <FormError v-if="submitError" :message="submitError" class="mt-6" />

      <button
        type="submit"
        :disabled="isSubmitting || !formData.name || !formData.phone"
        class="w-full mt-8 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white py-4 text-[11px] font-black uppercase tracking-widest transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
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
