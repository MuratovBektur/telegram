<script setup lang="ts">
import { defineProps, defineEmits, ref, watchEffect } from "vue";
const emit = defineEmits(["update:modelValue", "on-input"]);
function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.value);
  emit("on-input", e);
}
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    default: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  errorLabel: {
    type: String,
  },
  focus: {
    type: Boolean,
    default: false,
  },
  isDropdownMenu: {
    type: Boolean,
    default: false,
  },
  openDropdown: {
    type: Boolean,
    default: false,
  },
  selectAllTextOnFocus: {
    type: Boolean,
    default: false,
  },
});

const elemRef: { value: null | HTMLInputElement } = ref(null);

function elemFocus() {
  if (elemRef.value) {
    elemRef.value.focus();
  }
}

function highlightCountryText() {
  if (props.selectAllTextOnFocus && elemRef.value) {
    elemRef.value.select();
  }
}

watchEffect(() => {
  if (props.focus) {
    elemFocus();
  }
});
</script>

<template>
  <div class="t-input__container">
    <input
      class="t-input"
      :class="{ 't-input_error': !isValid }"
      type="text"
      autocomplete="off"
      ref="elemRef"
      :id="label"
      placeholder=" "
      @input="onInput"
      @focus="highlightCountryText"
      :value="modelValue"
    />
    <label
      :for="label"
      class="t-input__label"
      :class="{ 't-input__label_error': !isValid }"
    >
      {{ isValid ? label : errorLabel }}
    </label>
    <i
      v-if="isDropdownMenu"
      class="t-input__dropdown-icon"
      :class="{ 't-input__dropdown-icon_active': openDropdown }"
    ></i>
  </div>
</template>

<style lang="scss" scoped>
.t-input {
  padding: 1.125rem 1rem;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--color-borders-input);
  border-radius: 0.75rem;
  color: var(--color-text);
  background-color: var(--color-background);
  outline: none;
  font-size: 1rem;
  &:hover,
  &:focus {
    border-color: var(--color-primary);
    box-shadow: inset 0 0 0 1px var(--color-primary);
  }
  &:focus ~ &__label,
  &:not(:placeholder-shown):not(:focus) ~ &__label {
    top: -0.375rem;
    color: var(--color-primary);
    font-size: 0.75rem;
    left: 0.5rem;
    &_error {
      color: var(--color-error);
    }
  }
  &_error {
    border-color: var(--color-error);
    box-shadow: inset 0 0 0 1px var(--color-error);
    &:focus,
    &:hover {
      border-color: var(--color-error);
      box-shadow: inset 0 0 0 1px var(--color-error);
    }
  }
  &__container {
    position: relative;
  }
  &__label {
    position: absolute;
    color: var(--color-placeholders);
    left: 0.75rem;
    top: 1.125rem;
    padding: 0 0.125rem;
    cursor: text;
    transition: top 200ms ease-in, left 200ms ease-in, font-size 200ms ease-in;
    background-color: white;
    &_error {
      color: var(--color-error);
    }
  }
  &__dropdown-icon {
    position: absolute;
    top: 1.125rem;
    right: 1rem;
    width: 0.75rem;
    height: 0.75rem;
    border: 2px solid var(--color-text-secondary);
    border-top: 0;
    border-left: 0;
    cursor: pointer;
    transform: scaleY(1) rotate(45deg);
    transition: color 0.2s ease, transform 0.2s ease, top 0.2s ease;
    &_active {
      border-color: var(--color-primary);
      transform: scaleY(-1) rotate(45deg);
      top: 1.5rem;
    }
  }
}
</style>
