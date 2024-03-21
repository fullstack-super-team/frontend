<script setup>
import { RouterView } from "vue-router";
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
