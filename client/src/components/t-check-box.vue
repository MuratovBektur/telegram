<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
function updateModelValue(e: Event) {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.checked);
}
</script>

<template>
  <label class="control control-checkbox">
    <input type="checkbox" :checked="modelValue" @click="updateModelValue" />
    <div class="control_indicator"></div>
  </label>
</template>

<style lang="scss">
.control {
  font-family: arial;
  display: block;
  position: relative;
  padding-left: 30px;
  margin-bottom: 5px;
  padding-top: 3px;
  cursor: pointer;
  font-size: 16px;
  height: 20px;
  width: 20px;
}

.control input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.control input:checked ~ .control_indicator {
  border: 2px solid var(--color-primary);
  background: #3390ec;
}

.control_indicator {
  position: absolute;
  top: 2px;
  left: 0;
  height: 20px;
  width: 20px;
  border: 2px solid var(--color-borders-input);
  border-radius: 0.25rem;
  background-color: var(--color-background);
}

.control input:checked ~ .control_indicator:after {
  display: block;
}

.control-checkbox .control_indicator:after {
  left: 4px;
  top: -1px;
  width: 5px;
  height: 11px;
  border: solid #ffffff;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}

.control_indicator:after {
  box-sizing: unset;
  content: "";
  position: absolute;
  display: none;
}
</style>
