<script setup lang="ts">
import { computed, type Component } from 'vue'

interface Option {
  value: string
  label: string
}

interface Props {
  label: string
  id: string
  icon?: Component
  modelValue: string
  options: Option[]
  color?: 'sky' | 'rose' | 'orange' | 'emerald'
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'sky',
  required: false,
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

const handleChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
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
      <component
        :is="icon"
        v-if="icon"
        class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none"
      />
      <select
        :id="id"
        :value="modelValue"
        :required="required"
        @change="handleChange"
        :class="[
          'w-full bg-slate-800 border border-white/10 rounded-xl py-4 text-white focus:outline-none focus:ring-1 transition-colors appearance-none cursor-pointer',
          focusClasses,
          icon ? 'pl-12 pr-4' : 'px-4',
        ]"
      >
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <svg
        class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</template>
