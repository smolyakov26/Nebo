<script setup lang="ts">
interface Props {
  variant?: 'default' | 'outline'
  color?: 'sky' | 'orange' | 'emerald' | 'rose'
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  color: 'sky',
})
</script>

<template>
  <span
    :class="[
      'text-[11px] font-bold uppercase tracking-[0.4em] block',
      variant === 'default' ? `text-${color}-500` : `text-${color}-400`,
    ]"
  >
    <slot />
  </span>
</template>
