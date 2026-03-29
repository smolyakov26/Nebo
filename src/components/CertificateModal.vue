<script setup lang="ts">
import { ref, watch } from 'vue'
import { X, User, Phone, Gift, MessageSquare, Check, AlertCircle } from 'lucide-vue-next'
import { useCertificateModal } from '@/composables/useCertificateModal'
import { useEmail } from '@/composables/useEmail'
import { certificateModalContent } from '@/content/sections/certificateModal'
import { PHONE_REGEX, FORM_TYPES } from '@/constants'

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

const formatPhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, '')
  // Strip leading 7 or 8 (country/trunk code), keep last 10 digits
  const number = digits.length > 10 ? digits.slice(-10) : digits
  return '+7' + number
}

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

  const success = await sendForm(FORM_TYPES.CERTIFICATE, {
    recipientName: formData.value.recipientName,
    recipientLastName: formData.value.recipientLastName,
    recipientPhone: formatPhone(formData.value.recipientPhone),
    denomination: formData.value.denomination,
    customAmount: formData.value.customAmount,
    senderName: formData.value.senderName,
    message: formData.value.message,
  })

  if (!success) {
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

const handleBackdropClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    closeModal()
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        @click="handleBackdropClick"
      >
        <div class="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" />

        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div
            v-if="isOpen"
            class="relative bg-slate-900 border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-title"
          >
            <button
              @click="closeModal"
              class="absolute top-4 right-4 w-11 h-11 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              aria-label="Закрыть"
            >
              <X class="w-5 h-5 text-white" />
            </button>

            <div v-if="isSubmitted" class="p-12 text-center">
              <div
                class="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6"
              >
                <Check class="w-10 h-10 text-green-500" />
              </div>
              <h3 class="text-2xl font-black text-white mb-2">{{ success.title }}</h3>
              <p class="text-slate-400">{{ success.message }}</p>
            </div>

            <form v-else @submit.prevent="handleSubmit" class="p-8">
              <h2
                id="certificate-title"
                class="text-3xl font-black text-white mb-2 uppercase italic"
              >
                {{ title }}
              </h2>
              <p class="text-slate-400 text-sm mb-8">{{ subtitle }}</p>

              <div class="space-y-5">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      for="recipientName"
                      class="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2"
                    >
                      {{ fields.recipientName }}
                    </label>
                    <div class="relative">
                      <User
                        class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
                      />
                      <input
                        id="recipientName"
                        v-model="formData.recipientName"
                        type="text"
                        required
                        :placeholder="fields.recipientNamePlaceholder"
                        class="w-full bg-slate-800 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      for="recipientLastName"
                      class="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2"
                    >
                      {{ fields.recipientLastName }}
                    </label>
                    <div class="relative">
                      <User
                        class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
                      />
                      <input
                        id="recipientLastName"
                        v-model="formData.recipientLastName"
                        type="text"
                        required
                        :placeholder="fields.recipientLastNamePlaceholder"
                        class="w-full bg-slate-800 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    for="recipientPhone"
                    class="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2"
                  >
                    {{ fields.recipientPhone }}
                  </label>
                  <div class="relative">
                    <Phone
                      class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
                    />
                    <input
                      id="recipientPhone"
                      v-model="formData.recipientPhone"
                      type="tel"
                      required
                      :placeholder="fields.recipientPhonePlaceholder"
                      :aria-invalid="!!phoneError"
                      :aria-describedby="phoneError ? 'cert-phone-error' : undefined"
                      :class="[
                        'w-full bg-slate-800 border rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors',
                        phoneError
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-white/10',
                      ]"
                    />
                  </div>
                  <div
                    v-if="phoneError"
                    id="cert-phone-error"
                    role="alert"
                    class="flex items-center gap-2 mt-2 text-red-400 text-sm"
                  >
                    <AlertCircle class="w-4 h-4" />
                    <span>{{ phoneError }}</span>
                  </div>
                </div>

                <div>
                  <label
                    for="denomination"
                    class="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2"
                  >
                    {{ fields.denomination }}
                  </label>
                  <div class="relative">
                    <Gift class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <select
                      id="denomination"
                      v-model="formData.denomination"
                      class="w-full bg-slate-800 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors appearance-none cursor-pointer"
                    >
                      <option
                        v-for="denom in denominations"
                        :key="denom.value"
                        :value="denom.value"
                      >
                        {{ denom.label }}
                      </option>
                    </select>
                  </div>
                </div>

                <div v-if="formData.denomination === 'custom'">
                  <label
                    for="customAmount"
                    class="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2"
                  >
                    {{ fields.customAmount }}
                  </label>
                  <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">₽</span>
                    <input
                      id="customAmount"
                      v-model="formData.customAmount"
                      type="number"
                      min="1000"
                      required
                      placeholder="5000"
                      class="w-full bg-slate-800 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="senderName"
                    class="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2"
                  >
                    {{ fields.senderName }}
                  </label>
                  <div class="relative">
                    <User class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      id="senderName"
                      v-model="formData.senderName"
                      type="text"
                      :placeholder="fields.senderNamePlaceholder"
                      class="w-full bg-slate-800 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="message"
                    class="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2"
                  >
                    {{ fields.message }}
                  </label>
                  <div class="relative">
                    <MessageSquare class="absolute left-4 top-4 w-5 h-5 text-slate-500" />
                    <textarea
                      id="message"
                      v-model="formData.message"
                      rows="3"
                      :placeholder="fields.messagePlaceholder"
                      class="w-full bg-slate-800 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>

              <div
                v-if="submitError"
                role="alert"
                class="flex items-center gap-2 mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
              >
                <AlertCircle class="w-5 h-5 flex-shrink-0" />
                <span>{{ submitError }}</span>
              </div>

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
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  .transition-opacity,
  .transition-all {
    transition: none !important;
  }
}
</style>
