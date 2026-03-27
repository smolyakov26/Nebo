<script setup lang="ts">
import BookingModal from '@/components/BookingModal.vue'
import CertificateModal from '@/components/CertificateModal.vue'
</script>

<template>
  <router-view />
  <BookingModal />
  <CertificateModal />
</template>
