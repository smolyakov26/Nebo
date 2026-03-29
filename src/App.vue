<script setup lang="ts">
import BookingModal from '@/components/BookingModal.vue'
import CertificateModal from '@/components/CertificateModal.vue'
import { SpeedInsights } from '@vercel/speed-insights/vue'
</script>

<template>
  <router-view />
  <BookingModal />
  <CertificateModal />
  <SpeedInsights />
</template>
