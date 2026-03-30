<script setup lang="ts">
import { Check } from 'lucide-vue-next'

interface Props {
  title: string
  message: string
}

defineProps<Props>()

const iconBgClass =
  'w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6'
</script>

<template>
  <div class="p-12 text-center">
    <div :class="iconBgClass">
      <Check class="w-10 h-10 text-green-500" />
    </div>
    <h3 class="text-2xl font-black text-white mb-2">{{ title }}</h3>
    <p class="text-slate-400">{{ message }}</p>
  </div>
</template>
