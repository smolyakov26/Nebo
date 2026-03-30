<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  color?: 'sky' | 'rose' | 'orange' | 'emerald'
  fullWidth?: boolean
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  href?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  color: 'sky',
  fullWidth: false,
  disabled: false,
  loading: false,
  type: 'button',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const classes = computed(() => {
  const base =
    'inline-flex items-center justify-center gap-3 font-black uppercase tracking-widest transition-all rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed'

  const colors = {
    sky: 'bg-sky-600 hover:bg-sky-500 focus-visible:ring-sky-400',
    rose: 'bg-rose-600 hover:bg-rose-500 focus-visible:ring-rose-400',
    orange: 'bg-orange-600 hover:bg-orange-500 focus-visible:ring-orange-400',
    emerald: 'bg-emerald-600 hover:bg-emerald-500 focus-visible:ring-emerald-400',
  }

  const sizes = {
    sm: 'px-6 py-3 text-[11px]',
    md: 'px-8 py-4 text-[11px]',
    lg: 'px-12 py-5 text-[11px]',
  }

  const variants = {
    primary: `${colors[props.color]} text-white`,
    secondary: 'bg-slate-800 hover:bg-slate-700 text-white focus-visible:ring-slate-500',
    outline: 'border-2 border-current hover:bg-current/10 focus-visible:ring-current',
  }

  const stateClasses =
    props.disabled || props.loading
      ? 'bg-slate-700 text-slate-400 disabled:bg-slate-700'
      : variants[props.variant]

  const widthClass = props.fullWidth ? 'w-full' : ''

  return `${base} ${stateClasses} ${widthClass} ${sizes[props.size]}`
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :class="classes"
    :type="href ? undefined : type"
    :href="href"
    :disabled="href ? undefined : disabled"
    @click="handleClick"
  >
    <span v-if="loading" class="i-lucide-loader-2 animate-spin" />
    <slot />
  </component>
</template>
