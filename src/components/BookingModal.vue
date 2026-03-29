<script setup lang="ts">
import { ref, watch } from 'vue'
import { X, User, Phone, Calendar, Users, MessageSquare, Check, AlertCircle } from 'lucide-vue-next'
import { useBookingModal } from '@/composables/useBookingModal'
import { useEmail } from '@/composables/useEmail'
import { bookingContent } from '@/content'
import { PHONE_REGEX } from '@/constants'

const { isOpen, selectedJumpType, closeModal } = useBookingModal()
const { sendForm } = useEmail()

const { title, subtitle, fields, jumpTypes, submit, submitting, privacy, success } = bookingContent

const formData = ref({
  name: '',
  phone: '',
  date: '',
  jumpType: 'tandem',
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
  if (!formData.value.name || !formData.value.phone) return
  if (!validatePhone(formData.value.phone)) return

  isSubmitting.value = true

  await sendForm('booking', {
    name: formData.value.name,
    phone: formatPhone(formData.value.phone),
    jumpType: formData.value.jumpType,
    date: formData.value.date,
    message: formData.value.message,
  })

  isSubmitted.value = true
  isSubmitting.value = false

  setTimeout(() => {
    closeModal()
    isSubmitted.value = false
    formData.value = {
      name: '',
      phone: '',
      date: '',
      jumpType: 'tandem',
      message: '',
    }
  }, 2000)
}

watch(isOpen, (val) => {
  if (!val) {
    isSubmitted.value = false
    isSubmitting.value = false
  } else {
    formData.value.jumpType = selectedJumpType.value
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
            aria-labelledby="booking-title"
          >
            <button
              @click="closeModal"
              class="absolute top-4 right-4 w-11 h-11 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
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
              <h2 id="booking-title" class="text-3xl font-black text-white mb-2 uppercase italic">
                {{ title }}
              </h2>
              <p class="text-slate-400 text-sm mb-8">{{ subtitle }}</p>

              <div class="space-y-6">
                <div>
                  <label
                    for="name"
                    class="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2"
                  >
                    {{ fields.name }}
                  </label>
                  <div class="relative">
                    <User class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      id="name"
                      v-model="formData.name"
                      type="text"
                      required
                      :placeholder="fields.namePlaceholder"
                      class="w-full bg-slate-800 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="phone"
                    class="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2"
                  >
                    {{ fields.phone }}
                  </label>
                  <div class="relative">
                    <Phone
                      class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
                    />
                    <input
                      id="phone"
                      v-model="formData.phone"
                      type="tel"
                      required
                      :placeholder="fields.phonePlaceholder"
                      :aria-invalid="!!phoneError"
                      :aria-describedby="phoneError ? 'phone-error' : undefined"
                      :class="[
                        'w-full bg-slate-800 border rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors',
                        phoneError
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-white/10',
                      ]"
                    />
                  </div>
                  <div
                    v-if="phoneError"
                    id="phone-error"
                    role="alert"
                    class="flex items-center gap-2 mt-2 text-red-400 text-sm"
                  >
                    <AlertCircle class="w-4 h-4" />
                    <span>{{ phoneError }}</span>
                  </div>
                </div>

                <div>
                  <label
                    for="jumpType"
                    class="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2"
                  >
                    {{ fields.jumpType }}
                  </label>
                  <div class="relative">
                    <Users
                      class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
                    />
                    <select
                      id="jumpType"
                      v-model="formData.jumpType"
                      class="w-full bg-slate-800 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors appearance-none cursor-pointer"
                    >
                      <option v-for="type in jumpTypes" :key="type.value" :value="type.value">
                        {{ type.label }}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    for="date"
                    class="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2"
                  >
                    {{ fields.date }}
                  </label>
                  <div class="relative">
                    <Calendar
                      class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
                    />
                    <input
                      id="date"
                      v-model="formData.date"
                      type="date"
                      class="w-full bg-slate-800 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors cursor-pointer"
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
                      class="w-full bg-slate-800 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>

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
