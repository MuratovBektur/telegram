///
<reference path="../globals.d.ts" />
<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed, onMounted, reactive, ref } from "vue";
import api from "@/lib/api";
import helpers from "@/helpers";
import CountryList from "@/components/t-country-list.vue";
import TCheckBox from "@/components/t-check-box.vue";
import TInput from "@/components/t-input.vue";

const router = useRouter();
const store = useStore();

const phoneInput = reactive({
  focus: false,
  isValid: true,
});

const state = reactive({
  showCountries: false,
  keepUserSignedIn: true,
});

async function getGeo() {
  try {
    const country = store.state.country;
    if (country.code) {
      onSelectCountry(country);
    } else {
      const [countries, countryNameByIp] = await Promise.all([
        api.get("get-countries"),
        api.get("get-country-code"),
      ]);
      store.commit("SET_COUNTRIES", countries);
      if (countryNameByIp) {
        const country = countries.find(
          (country: CountryType) => country.code === countryNameByIp
        );
        if (country) {
          onSelectCountry(country);
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
}

onMounted(() => {
  getGeo();
});
function toggleCountriesMenu() {
  state.showCountries = !state.showCountries;
}
function closeCountriesMenu() {
  state.showCountries = false;
}
function onInputCountry() {
  if (showAllCountries.value) {
    showAllCountries.value = false;
  }
  state.showCountries = true;
}
function onInputPhone(e: InputEvent) {
  const inputLength = selectedCountry.phone.length;
  const isCanAddSpace = e.data && selectedCountry.format[inputLength] === " ";
  // insert space after phone operator code like => +1 123 4567890
  if (isCanAddSpace) {
    selectedCountry.phone += " ";
  }
}

function toggleKeepUserSignedIn() {
  state.keepUserSignedIn = !state.keepUserSignedIn;
}

const selectedCountry = reactive({
  name: "",
  phone: "",
  format: "",
  code: "",
});

const showAllCountries = ref(false);

const showSubmitBtn = computed(() => {
  const phone = selectedCountry.phone.replaceAll(/\s/g, "");
  const format = selectedCountry.format.replaceAll(/\s/g, "");
  return phone.startsWith("+") && phone.length === format.length;
});

const isCheckingPhoneNumber = ref(false);

function onSelectCountry(country: CountryType) {
  if (!country.phone && country.phoneCode) {
    country.phone = `+${country.phoneCode} `;
  }
  Object.assign(selectedCountry, country);

  phoneInput.focus = true;
  showAllCountries.value = true;
}

async function submitForm() {
  if (isCheckingPhoneNumber.value) return;
  isCheckingPhoneNumber.value = true;
  const isValid = /\+[\d\s]+/.test(selectedCountry.phone);
  if (!isValid) {
    phoneInput.isValid = false;
    isCheckingPhoneNumber.value = false;
    return;
  }
  await helpers.sleep(500);
  store.commit("SET_COUNTRY", selectedCountry);
  store.commit("SET_COUNTRY_NAME_BY_IP", selectedCountry.code);
  let path = "/verify-phone";
  if (state.keepUserSignedIn) {
    path += "?keepUserSignedIn=true";
  }
  router.push(path);
}
</script>

<template>
  <div class="register">
    <div>
      <img
        alt="telegram logo"
        class="register__logo"
        src="../assets/logo.svg"
      />
      <h2 class="register__title">Telegram</h2>
      <p class="register__subtitle">
        Please confirm your country code and enter your phone number.
      </p>

      <div class="register__form">
        <t-input
          class="register__form-item"
          label="Your country"
          isDropdown="true"
          @click="toggleCountriesMenu"
          v-click-outside="closeCountriesMenu"
          :openDropdown="state.showCountries"
          :selectAllTextOnFocus="true"
          @on-input="onInputCountry"
          v-model="selectedCountry.name"
        />
        <CountryList
          :countries="store.state.countries"
          :showAllCountries="showAllCountries"
          v-if="state.showCountries"
          @onSelectCountry="onSelectCountry"
          :countrySearch="selectedCountry.name"
        />
        <t-input
          class="register__form-item"
          label="Your phone number"
          errorLabel="Invalid phone number"
          @on-input="onInputPhone"
          :isValid="phoneInput.isValid"
          :focus="phoneInput.focus"
          @keyup.enter="submitForm"
          v-model="selectedCountry.phone"
        />
        <div @click="toggleKeepUserSignedIn" class="register__form-keep-user">
          <t-check-box v-model="state.keepUserSignedIn" />
          <span>Keep me signed in</span>
        </div>
        <button
          v-if="showSubmitBtn"
          @click="submitForm"
          class="register__form-submit-btn"
        >
          <template v-if="isCheckingPhoneNumber">
            <div class="loader"></div>
          </template>
          <div v-else>Next</div>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register {
  display: flex;
  justify-content: center;
  padding-top: 100px;
  min-height: 800px;
  & > div {
    padding: 0 1rem;
    max-width: 360px;
  }
  &__logo {
    width: 10rem;
    display: block;
    margin: 20px auto 50px;
    @media (max-width: $desktop-width) {
      width: 120px;
      margin-bottom: 25px;
    }
  }
  &__title {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    text-align: center;
    @media (max-width: $desktop-width) {
      font-size: 1.25rem;
    }
  }
  &__subtitle {
    text-align: center;
    color: var(--color-text-secondary);
    line-height: 1.35;
    margin-bottom: 3rem;
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
  &__form {
    &-item {
      position: relative;
      margin-bottom: 1.5rem;
    }
    &-input {
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
      &:focus,
      &_focus {
        border-color: var(--color-primary);
        box-shadow: inset 0 0 0 1px var(--color-primary);
      }
      &_error {
        border-color: var(--color-error);
        box-shadow: inset 0 0 0 1px var(--color-error);
      }
    }
    &-label {
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
    &-keep-user {
      display: flex;
      margin-left: 10px;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      user-select: none;
      & > input {
        // only with scale we can change size of checkbox
        transform: scale(1.3);
        margin-right: 10px;
      }
    }
    &-submit-btn {
      background-color: var(--color-primary);
      border: 0;
      border-radius: var(--border-radius-default);
      color: var(--color-white);
      text-transform: uppercase;
      line-height: 19px;
      padding: 10px;
      margin-top: 44px;
      height: 3.5rem;
      width: 100%;
      cursor: pointer;
      .loader {
        margin: auto;
        border: 3px solid var(--color-primary);
        border-radius: 50%;
        border-top: 3px solid var(--color-white);
        border-right: 3px solid var(--color-white);
        width: 20px;
        height: 20px;
        -webkit-animation: spin 1s linear infinite; /* Safari */
        animation: spin 1 linear infinite;
      }

      /* Safari */
      @-webkit-keyframes spin {
        0% {
          -webkit-transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
        }
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
}
.register__form-input_focus ~ .register__form-label,
.register__form-input:focus ~ .register__form-label,
.register__form-input:not(:placeholder-shown).register__form-input:not(:focus)
  ~ .register__form-label {
  top: -0.375rem;
  color: var(--color-primary);
  font-size: 0.75rem;
  left: 0.5rem;
  &_error {
    color: var(--color-error);
  }
}
</style>
