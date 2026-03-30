<script setup lang="ts">
import { type Component } from 'vue'

interface Props {
  icon: Component
  title: string
  description: string
  iconColor?: 'sky' | 'orange' | 'emerald' | 'rose'
}

withDefaults(defineProps<Props>(), {
  iconColor: 'sky',
})
</script>

<template>
  <div
    tabindex="0"
    class="flex gap-4 sm:gap-6 p-4 sm:p-6 bg-slate-800/50 border border-white/5 shadow-sm hover:border-sky-500/50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-lg"
  >
    <div
      :class="[
        'w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center shrink-0',
        `bg-${iconColor}-500/20`,
      ]"
    >
      <component :is="icon" :class="['w-5 sm:w-6 h-5 sm:h-6', `text-${iconColor}-500`]" />
    </div>
    <div>
      <h4 class="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2 uppercase">
        {{ title }}
      </h4>
      <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">
        {{ description }}
      </p>
    </div>
  </div>
</template>
