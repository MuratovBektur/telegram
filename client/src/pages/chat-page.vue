///
<reference path="../globals.d.ts" />
<script setup lang="ts">
import channel from "@/lib/channel";
console.log("in");
console.log(channel);
channel.send("test", {});
</script>

<template>
  <div>test</div>
</template>

<style lang="scss" scoped></style>
