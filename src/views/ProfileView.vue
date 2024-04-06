<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {ref} from "vue";

const store = useStore();
const router = useRouter();

const user = store.state.user;

const userEditable = ref({ ...store.state.user});

const isEditMode = ref(false);
const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value;
  console.log("Edit mode:", isEditMode.value);
};

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
        <div class="editLogoutButtons">
          <Button class="edit" @click="toggleEditMode">
            {{ isEditMode ? 'Save' : 'Edit' }}
          </Button>
          <Button class="logout" @click="logout">Logout</Button>
        </div>

      </div>
      <div class="profile-input">
        <Input label="First name" :placeholder="userEditable.firstName" v-model="userEditable.firstName"
               :disabled="!isEditMode" :class="{ editable: isEditMode }"/>
        <Input label="Last name" :placeholder="userEditable.lastName" v-model="userEditable.lastName"
               :disabled="!isEditMode" :class="{ editable: isEditMode }"/>
        <Input label="Username" :placeholder="userEditable.username" v-model="userEditable.username"
               :disabled="!isEditMode" :class="{ editable: isEditMode }"/>
        <Input label="Email" :placeholder="userEditable.email" v-model="userEditable.email"
               :disabled="!isEditMode" :class="{ editable: isEditMode }"/>
      </div>
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

.profile {
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 16px;
}

.profile-input {
  display: flex;
  flex-direction: column;
  gap: 16px;
}



.edit {
  padding: 10px;
  margin: 10px;
}

.logout {
  background-color: red;
}

.logout:hover {
  background-color: #ff3838;
}
</style>