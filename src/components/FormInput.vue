<script setup lang="ts">
import { computed, type Component } from 'vue'
import { AlertCircle } from 'lucide-vue-next'

interface Props {
  label: string
  id: string
  type?: 'text' | 'tel' | 'email' | 'number' | 'date'
  icon?: Component
  placeholder?: string
  modelValue: string
  color?: 'sky' | 'rose' | 'orange' | 'emerald'
  error?: string
  errorId?: string
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
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

const borderClasses = computed(() => {
  if (props.error) return 'border-red-500 focus:border-red-500 focus:ring-red-500'
  return `border-white/10 ${focusClasses.value}`
})

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
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
        class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
      />
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :aria-invalid="!!error"
        :aria-describedby="error ? errorId : undefined"
        @input="handleInput"
        :class="[
          'w-full bg-slate-800 border rounded-xl py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors',
          borderClasses,
          icon ? 'pl-12 pr-4' : 'px-4',
        ]"
      />
    </div>
    <div
      v-if="error"
      :id="errorId"
      role="alert"
      class="flex items-center gap-2 mt-2 text-red-400 text-sm"
    >
      <AlertCircle class="w-4 h-4" />
      <span>{{ error }}</span>
    </div>
  </div>
</template>
