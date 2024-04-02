<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const user = store.state.user;

const logout = () => {
  store.dispatch("user/logout");
  router.push("/login");
};
</script>

<template>
  <MainLayout>
    <div class="profile">
      <div class="profile-header">
        <h1>My profile</h1>
        <Button class="logout" @click="logout">Logout</Button>
      </div>
      <Input label="First name:" :placeholder="user.firstName" :model-value="user.firstName" :disabled="true"/>
      <Input label="Last name:" :placeholder="user.lastName" :model-value="user.lastName" :disabled="true"/>
      <Input label="Username:" :placeholder="user.username" :model-value="user.username" :disabled="true"/>
      <Input label="Email: " :placeholder="user.email" :model-value="user.email" :disabled="true"/>
    </div>
  </MainLayout>

</template>

<style scoped>
.profile-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>