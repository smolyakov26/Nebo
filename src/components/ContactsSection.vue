<script setup lang="ts">
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-vue-next'
import SectionHeader from './SectionHeader.vue'
import GridBackground from './GridBackground.vue'
import BaseButton from './BaseButton.vue'
import { useBookingModal } from '@/composables/useBookingModal'
import { contactsContent } from '@/content'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { openModal } = useBookingModal()
const { isVisible, elementRef } = useScrollAnimation()

const iconMap: Record<string, typeof MapPin> = {
  MapPin,
  Phone,
  Mail,
  Clock,
}

const contacts = [
  { icon: 'MapPin', label: 'Адрес', value: contactsContent.address },
  {
    icon: 'Phone',
    label: 'Телефон',
    value: contactsContent.phone,
    href: `tel:${contactsContent.phone.replace(/\s/g, '')}`,
  },
  {
    icon: 'Mail',
    label: 'Email',
    value: contactsContent.email,
    href: `mailto:${contactsContent.email}`,
  },
  { icon: 'Clock', label: 'Режим работы', value: contactsContent.hours },
]
</script>

<template>
  <section id="contacts" ref="elementRef" class="py-32 bg-slate-900 relative overflow-hidden">
    <GridBackground color="sky" />

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <SectionHeader
        :badge="contactsContent.badge"
        :title="contactsContent.title"
        :subtitle="contactsContent.titleAccent"
        align="center"
      />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div :class="['space-y-6', isVisible ? 'animate-slide-in-left' : 'opacity-0']">
          <div class="bg-slate-950/50 border border-white/10 rounded-2xl p-8 space-y-6">
            <div v-for="(contact, idx) in contacts" :key="idx" class="flex items-start gap-4">
              <div
                class="w-12 h-12 rounded-xl bg-sky-600/20 flex items-center justify-center shrink-0"
              >
                <component :is="iconMap[contact.icon]" class="w-5 h-5 text-sky-500" />
              </div>
              <div>
                <div class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {{ contact.label }}
                </div>
                <a
                  v-if="contact.href"
                  :href="contact.href"
                  class="text-white hover:text-sky-400 transition-colors cursor-pointer"
                >
                  {{ contact.value }}
                </a>
                <div v-else class="text-white">{{ contact.value }}</div>
              </div>
            </div>
          </div>

          <BaseButton color="sky" size="lg" full-width @click="openModal('tandem')">
            <Send class="w-5 h-5" />
            {{ contactsContent.cta }}
          </BaseButton>

          <div class="hidden md:flex justify-center gap-4">
            <a
              v-for="social in contactsContent.socials"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.name"
              class="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-600 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              <span class="text-sm font-bold text-white">{{ social.name }}</span>
            </a>
          </div>
        </div>

        <div
          :class="[
            'rounded-2xl overflow-hidden border border-white/10 shadow-xl h-[400px] lg:h-[500px]',
            isVisible ? 'animate-slide-in-right' : 'opacity-0',
          ]"
        >
          <iframe
            :src="contactsContent.mapUrl"
            width="100%"
            height="100%"
            style="border: 0; background: #1e293b"
            title="Карта НЕБО КАВКАЗА"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-slide-in-left {
  animation: slideInLeft 0.8s ease-out forwards;
}

.animate-slide-in-right {
  animation: slideInRight 0.8s ease-out forwards;
}

@media (prefers-reduced-motion: reduce) {
  .animate-slide-in-left,
  .animate-slide-in-right {
    animation: none;
    opacity: 1;
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
