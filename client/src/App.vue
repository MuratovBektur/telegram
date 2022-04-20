///
<reference path="globals.d.ts" />
<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import channel from "@/lib/channel";

import api from "@/lib/api";
import { AxiosError } from "axios";

const router = useRouter();
const token = localStorage.getItem("token");

async function start() {
  try {
    console.log(channel);
    channel.send("test", {});
    if (token) {
      await api.post("verify", { token });
      router.push("/chat");
    } else {
      router.push("/login");
    }
  } catch (error) {
    const err = error as AxiosError;
    if (err instanceof Error && err.response?.status === 401) {
      localStorage.removeItem("token");
      router.push("/login");
    }
  }
}

start();
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@import "@/assets/styles/main.scss";
@import "@/assets/styles/_variables.scss";
</style>
