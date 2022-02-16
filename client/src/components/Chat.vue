<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { sendToWebSocket, subscribe } from "../lib/api";
const store = useStore();
interface IState {
  addedUser: string;
  userList: string[];
}
const state: IState = reactive({
  addedUser: "",
  userList: [],
});
onMounted(() => {
  getUserList();
  subscribe("userList", (userList: string[]) => {
    state.userList = userList;
  });
});
function addUser() {
  sendToWebSocket({
    action: "addUser",
    user: state.addedUser,
  });
}
function getUserList() {
  sendToWebSocket({
    action: "getUserList",
    user: state.addedUser,
  });
}
</script>

<template>
  <main>
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
  </main>
</template>

<style scoped>
button {
  display: block;
}
</style>
