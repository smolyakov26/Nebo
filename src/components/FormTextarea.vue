<script setup lang="ts">
import { computed, type Component } from 'vue'
interface Props {
  label: string
  id: string
  icon?: Component
  placeholder?: string
  modelValue: string
  color?: 'sky' | 'rose' | 'orange' | 'emerald'
  rows?: number
}

const props = withDefaults(defineProps<Props>(), {
  color: 'sky',
  rows: 3,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const focusClasses = computed(() => {
  const colors = {
    sky: 'focus:border-sky-500 focus:ring-sky-500',
    rose: 'focus:border-rose-500 focus:ring-rose-500',
    orange: 'focus:border-orange-500 focus:ring-orange-500',
    emerald: 'focus:border-emerald-500 focus:ring-emerald-500',
  }
  return colors[props.color]
})

const handleInput = (e: Event) => {
  const target = e.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div>
    <label
      :for="id"
      class="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2"
    >
      {{ label }}
    </label>
    <div class="relative">
      <component :is="icon" v-if="icon" class="absolute left-4 top-4 w-5 h-5 text-slate-500" />
      <textarea
        :id="id"
        :value="modelValue"
        :placeholder="placeholder"
        :rows="rows"
        @input="handleInput"
        :class="[
          'w-full bg-slate-800 border border-white/10 rounded-xl py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors resize-none',
          focusClasses,
          icon ? 'pl-12 pr-4' : 'px-4',
        ]"
      />
    </div>
  </div>
</template>
