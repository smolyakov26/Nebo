<script setup lang="ts">
import { type Component } from 'vue'

interface Props {
  icon: Component
  value: string
  label: string
  iconColor?: 'sky' | 'orange' | 'emerald' | 'rose'
}

withDefaults(defineProps<Props>(), {
  iconColor: 'sky',
})
</script>

<template>
  <div class="bg-slate-900/50 border border-white/10 rounded-xl p-6">
    <component :is="icon" :class="['w-6 h-6 mb-3', `text-${iconColor}-500`]" />
    <div class="text-2xl font-black text-white mb-1">{{ value }}</div>
    <div class="text-[10px] font-bold uppercase tracking-wider text-slate-400">
      {{ label }}
    </div>
  </div>
</template>
