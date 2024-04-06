<script setup>
/**
 * The setup component script for managing user settings within the application.
 * It leverages Vue's Composition API to handle user state and interactions
 * such as editing user details and logging out.
 */

 import MainLayout from "@/layouts/MainLayout.vue";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {ref} from "vue";

/**
 * The Vuex store instance, used to access and dispatch state.
 * @type {Store}
 */
const store = useStore();

/**
 * The Vue Router instance, used for navigating between routes.
 * @type {Router}
 */
const router = useRouter();

/**
 * Direct reference to the user object in the Vuex store state.
 * @type {Object}
 */
const user = store.state.user;

/**
 * A reactive reference to a clone of the user object,
 * allowing for local modifications without affecting the store's state.
 * @type {Ref<Object>}
 */
const userEditable = ref({ ...store.state.user});


/**
 * A reactive boolean flag to toggle edit mode on and off.
 * @type {Ref<Boolean>}
 */
const isEditMode = ref(false);

/**
 * Toggles the edit mode state and logs the current state to the console.
 * @function toggleEditMode
 * @returns {void}
 */
const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value;
  console.log("Edit mode:", isEditMode.value);
};

/**
 * Logs the user out by dispatching the logout action and redirects to the login page.
 * @function logout
 * @returns {void}
 */
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 600px) {
  .profile-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .editLogoutButtons {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding-top: 10px;
  }

  .editLogoutButtons .edit {
    order: 2;
    margin-left: 0;
    margin-right: 10px;
  }

  .editLogoutButtons .logout {
    order: 1;
  }
}

@media (min-width: 601px) {
  .editLogoutButtons {
    display: flex;
    align-items: center;
  }
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

.edit, .logout {
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