<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { quoteContent } from '@/content'

const quoteRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

onMounted(() => {
  if (quoteRef.value) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true
          }
        })
      },
      { threshold: 0.3 },
    )
    observer.observe(quoteRef.value)
    return () => observer.disconnect()
  }
})
</script>

<template>
  <section ref="quoteRef" class="py-48 text-center relative overflow-hidden bg-slate-900">
    <div class="absolute inset-0 bg-aurora opacity-40" aria-hidden="true" />
    <div class="max-w-4xl mx-auto px-6 relative z-10">
      <p
        :class="[
          'text-3xl md:text-5xl font-black text-white leading-tight uppercase italic',
          isVisible ? 'animate-fade-in' : 'opacity-0',
        ]"
      >
        "{{ quoteContent.text }}"
      </p>
      <div
        :class="['w-24 h-1 bg-sky-500 mx-auto mt-12', isVisible ? 'animate-scale-in' : 'scale-0']"
      />
    </div>
  </section>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1.5s ease-out forwards;
}

.animate-scale-in {
  animation: scaleIn 0.8s ease-out 0.5s forwards;
}

@media (prefers-reduced-motion: reduce) {
  .animate-fade-in,
  .animate-scale-in {
    animation: none;
  }
  .animate-fade-in {
    opacity: 1;
  }
  .animate-scale-in {
    transform: scaleX(1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
</style>
