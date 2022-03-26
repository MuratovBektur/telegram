<script setup lang="ts">
// import Login from "../components/Login.vue";
// import Chat from "../components/Chat.vue";
import { reactive } from "vue";
interface IState {
  isLogged: boolean;
}
const state: IState = reactive({
  isLogged: false,
});
function setLoginState(data: boolean) {
  state.isLogged = data;
}
</script>

<template>
<div>test</div>
  <!-- <Login @setLoginState="setLoginState" v-if="!state.isLogged" />
  <Chat v-else /> -->
</template>

<style scoped>
button {
  display: block;
}
</style>
