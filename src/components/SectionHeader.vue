<script setup lang="ts">
interface Props {
  badge: string
  title: string
  subtitle?: string
  description?: string
  align?: 'left' | 'center'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  accentColor?: 'sky' | 'orange' | 'emerald' | 'rose'
}

withDefaults(defineProps<Props>(), {
  align: 'left',
  size: 'xl',
  accentColor: 'sky',
})
</script>

<template>
  <div :class="['mb-16 md:mb-24', align === 'center' ? 'text-center' : '']">
    <span class="text-sky-500 text-[11px] font-bold uppercase tracking-[0.4em] mb-4 block">
      {{ badge }}
    </span>
    <h2
      :class="[
        'font-black text-white mb-6 uppercase italic leading-none',
        {
          'text-4xl sm:text-5xl md:text-6xl': size === 'sm',
          'text-3xl sm:text-4xl md:text-5xl': size === 'md',
          'text-5xl md:text-6xl': size === 'lg',
          'text-4xl sm:text-5xl md:text-7xl': size === 'xl',
        },
      ]"
    >
      {{ title }}
      <template v-if="subtitle">
        <br />
        <span class="text-slate-600">{{ subtitle }}</span>
      </template>
    </h2>
    <p
      v-if="description"
      :class="[
        'text-slate-400 text-sm leading-relaxed',
        align === 'center' ? 'max-w-xl mx-auto' : 'max-w-xl',
      ]"
    >
      {{ description }}
    </p>
  </div>
</template>
