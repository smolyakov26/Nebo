<script setup lang="ts">
import { computed } from 'vue'
import { X } from 'lucide-vue-next'

interface Props {
  isOpen: boolean
  color?: 'sky' | 'rose' | 'orange' | 'emerald'
  titleId?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'sky',
  titleId: 'modal-title',
})

const emit = defineEmits<{
  close: []
  backdropClick: [event: MouseEvent]
}>()

const colorClasses = computed(() => {
  const colors = {
    sky: 'focus-visible:ring-sky-500 focus-visible:ring-offset-slate-900',
    rose: 'focus-visible:ring-rose-500 focus-visible:ring-offset-slate-900',
    orange: 'focus-visible:ring-orange-500 focus-visible:ring-offset-slate-900',
    emerald: 'focus-visible:ring-emerald-500 focus-visible:ring-offset-slate-900',
  }
  return colors[props.color]
})

const handleClose = () => emit('close')

const handleBackdropClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    emit('backdropClick', e)
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        @click="handleBackdropClick"
      >
        <div class="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" />

        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div
            v-if="isOpen"
            class="relative bg-slate-900 border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="titleId"
          >
            <button
              @click="handleClose"
              :class="[
                'absolute top-4 right-4 w-11 h-11 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2',
                colorClasses,
              ]"
              aria-label="Закрыть"
            >
              <X class="w-5 h-5 text-white" />
            </button>

            <slot />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  .transition-opacity,
  .transition-all {
    transition: none !important;
  }
}
</style>
