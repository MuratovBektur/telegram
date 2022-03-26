<script setup lang="ts">
import { reactive, defineEmits } from "vue";
import { sendToWebSocket, subscribe, unsubscribe } from "../lib/api";

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

function login() {
  if (isNaN(+state.token)) return;
  sendToWebSocket({
    action: "login",
    token: "t" + state.token,
  });
  subscribe('login', (status: string) => {
    if (!status) {
      emit("setLoginState", false);
      return;
    }
    emit("setLoginState", true);
    unsubscribe('login');
  });
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
