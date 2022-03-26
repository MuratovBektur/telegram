<script setup lang="ts">
import { RouterView } from "vue-router";
import channel from "@/lib/channel";
function start() {
  try {
    console.log(channel);
    channel.send("test", {});
    setInterval(() => {
      channel.send("test", 123);
    }, 3000);
    channel.subscribe("connection", () => {
      console.log("ws connected");
    });
    // channel.removeAllEventListener("test2");
    channel.subscribe("getUserList", (data) => {
      console.log(data);
      console.log("asdfasdfgetUserList");
    });
    channel.subscribe("error", (data) => {
      console.log("error", data);
    });
  } catch (error) {
    console.error(error);
  }
}

start();
</script>

<template>
  <!-- <header>
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <nav> -->
  <!-- <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink> -->
  <!-- </nav>
    </div>
  </header> -->

  <RouterView />
</template>

<style lang="scss">
@import "@/assets/styles/main.scss";
@import "@/assets/styles/_variables.scss";
</style>
