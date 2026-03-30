<script setup lang="ts">
interface Props {
  icon?: boolean
  color?: 'sky' | 'orange' | 'emerald' | 'rose'
}

withDefaults(defineProps<Props>(), {
  icon: true,
  color: 'sky',
})
</script>

<template>
  <div
    :class="[
      'absolute top-0 left-0 w-full h-full bg-grid pointer-events-none',
      {
        'opacity-5': color === 'sky',
        'opacity-10': color === 'orange' || color === 'emerald',
        'opacity-20': color === 'rose',
      },
    ]"
    aria-hidden="true"
  />
</template>
