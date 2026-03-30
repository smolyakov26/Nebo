<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next'

interface Props {
  message: string
}

defineProps<Props>()
</script>

<template>
  <div
    role="alert"
    class="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
  >
    <AlertCircle class="w-5 h-5 flex-shrink-0" />
    <span>{{ message }}</span>
  </div>
</template>
