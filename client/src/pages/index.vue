<script setup lang="ts">
import { useRouter } from "vue-router";

const token = localStorage.getItem("token");

if (!token) {
  const router = useRouter();
  router.push("/login");
}
</script>

<template>
  <div></div>
  <!-- <main>
    <div class="chat">
      <input
        type="text"
        v-model="state.addedUser"
        class="chat__user-add-input"
      />
      <button class="chat__user-add-btn" @click="addUser">addUser</button>
      <div class="chat__user-list">
        <div v-for="user in state.userList" :key="user">{{ user }}</div>
      </div>
      <div></div>
    </div>
    <div>in chat</div>
  </main> -->
</template>

<style scoped>
button {
  display: block;
}
</style>
