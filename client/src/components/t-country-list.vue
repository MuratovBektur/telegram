///
<reference path="globals.d.ts" />
<script setup lang="ts">
import {
  onMounted,
  ref,
  defineProps,
  defineEmits,
  computed,
  PropType,
} from "vue";

const props = defineProps({
  countries: {
    type: Array as PropType<CountryType[]>,
    required: true,
  },
  countrySearch: {
    type: String,
    default: "",
  },
  showAllCountries: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["onSelectCountry"]);

const countryListRef = ref(null);

const filteredCountries = computed(() => {
  if (props.showAllCountries || !props.countrySearch) return props.countries;
  return props.countries.filter((country: CountryType) => {
    return country.name
      .toLowerCase()
      .includes(props.countrySearch.toLowerCase());
  });
});

function onSelectCountry(country: CountryType) {
  emit("onSelectCountry", { ...country });
}

function getElementTopPositions(node: HTMLElement) {
  const rec = node.getBoundingClientRect();
  return rec.top + window.scrollY;
}
onMounted(() => {
  setTimeout(() => {
    const node = countryListRef.value;
    if (node) {
      window.scrollTo({
        top: getElementTopPositions(node) + 100,
        behavior: "smooth",
      });
    }
  }, 200);
});
</script>

<template>
  <div class="country-list" ref="countryListRef">
    <div class="country-list__items-wrapper custom-scroll">
      <template v-if="filteredCountries.length">
        <div
          class="country-list__item"
          v-for="(country, i) in filteredCountries"
          @click="onSelectCountry(country)"
          :key="country.name + i"
        >
          <div class="country-list__flag">
            {{ country.flag }}
          </div>
          <div class="country-list__name">
            {{ country.name }}
          </div>
          <div>
            {{ country.phoneCode }}
          </div>
        </div>
      </template>
      <div v-else class="country-list__item country-list__no-result">
        Country not found
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.country-list {
  padding: 0;
  position: relative;
  &__items-wrapper {
    padding: 8px 0;
    padding-left: 0;
    z-index: 3;
    top: -15px;
    margin: 0;
    width: 100%;
    max-height: 376px;
    list-style: none;
    overflow: auto;
    position: absolute;
    background-color: var(--color-background);
    box-shadow: 0 0.25rem 0.5rem 0.125rem var(--color-default-shadow);
    border-radius: var(--border-radius-default);
  }
  &__item {
    padding: 12px 16px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: var(--color-chat-hover);
    }
  }
  &__flag {
    font-size: 22px;
    margin-right: 32px;
  }
  &__name {
    flex-grow: 1;
  }
  &__no-result {
    opacity: 0.5;
    cursor: unset;
    &:hover {
      background-color: var(--color-background);
    }
  }
}
</style>
