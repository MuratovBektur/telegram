<script setup lang="ts">
import { onMounted, reactive, defineEmits } from "vue";
import { useStore } from "vuex";

const emit = defineEmits(["setLoginState"]);
function stringify(obj: any) {
  return JSON.stringify(obj);
}
interface IState {
  token: string;
}
const state: IState = reactive({
  token: "",
});
const store = useStore();
function connectToWebSocket() {
  const socket: WebSocket = new WebSocket("ws://localhost:8000/api");
  socket.onopen = function (e: Event) {
    store.commit("setSocket", socket);
    console.log("e", e);
  };
  socket.onerror = function (e: Event) {
    console.log("e", e);
    store.commit("unSetSocket");
  };
}
onMounted(() => {
  connectToWebSocket();
});
function login() {
  if (store.state.socket === null || isNaN(+state.token)) return;
  store.state.socket.send(
    stringify({
      type: "login",
      token: "t" + state.token,
    })
  );
  emit("setLoginState", true);
}
</script>

<template>
  <main>
    <input type="text" v-model="state.token" />
    <button @click="login">Join to chat</button>
  </main>
</template>

<style scoped>
button {
  display: block;
}
</style>
