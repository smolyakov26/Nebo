import { ref, onMounted, onUnmounted } from 'vue'

interface ScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px' } = options

  const isVisible = ref(false)
  const elementRef = ref<HTMLElement | null>(null)
  let observer: IntersectionObserver | null = null

  const initObserver = () => {
    if (elementRef.value && !observer) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              isVisible.value = true
              // Once visible, stop observing for performance
              observer?.disconnect()
            }
          })
        },
        { threshold, rootMargin },
      )
      observer.observe(elementRef.value)
    }
  }

  onMounted(() => {
    initObserver()
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })

  return { isVisible, elementRef }
}
