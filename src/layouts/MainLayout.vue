<template>
  <Navbar />

  <main>
    <slot></slot>
  </main>

  <Footer />
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

</script>

<style scoped>
main {
  width: 100%;
  padding: 20px;
  flex-grow: 1;
}
</style>
