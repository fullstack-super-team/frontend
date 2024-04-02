<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import Input from "@/components/Input.vue";
import button from "@/components/Button.vue";

</script>

<template>
  <MainLayout>
    <div class="profile">
      <RouterLink to="/login">
        <button class="logout">Logout</button>
      </RouterLink>
      <h1>My profile</h1>
      <Input label="First name:" placeholder="Enter your first name here" :disabled="true"/>
      <Input label="Last name:" placeholder="Enter your last name here" :disabled="true"/>
      <Input label="Username:" placeholder="Enter your username here" :disabled="true"/>
      <Input label="Email: " placeholder="Enter your email here" :disabled="true"/>
    </div>
  </MainLayout>

</template>

<style scoped>

</style>