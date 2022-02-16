<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";
function stringify(obj: any) {
  return JSON.stringify(obj);
}
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
  if (store.state.socket === null) return;
  store.state.socket.onerror = function (e: Event) {
    console.log("e", e);
    store.commit("unSetSocket");
  };
  store.state.socket.onmessage = function (e: MessageEvent) {
    const data = JSON.parse(e.data);
    if (data.type === "userList") {
      state.userList = data.userList;
    }
  };
  getUserList();
});
function addUser() {
  if (store.state.socket === null) return;
  store.state.socket.send(
    stringify({
      type: "addUser",
      user: state.addedUser,
    })
  );
}
function getUserList() {
  if (store.state.socket === null) return;
  store.state.socket.send(
    stringify({
      type: "getUserList",
    })
  );
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
