<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import TInput from "@/components/t-input.vue";

const store = useStore();
const router = useRouter();

if (!store.state.country) {
  router.push("/login");
}

const state = reactive({
  code: "",
});
</script>

<template>
  <div class="verify">
    <div>
      <img class="verify__logo" src="../assets/monkey.png" alt="monkey-logo" />
      <div class="verify__user-phone">
        <div>
          {{ store.state.country.phone }}
          <svg
            @click="router.push('/login')"
            style="width:24px; height:24px; cursor: pointer;" 
            viewBox="0 0 24 24"
          >
              <path fill="#6F6F6F" ng-attr-d="{{icon.data}}" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z"></path>
          </svg>
        </div>
      </div>
      <div class="verify__title">
        We've sent the code to the Telegram app on your other device.
      </div>
      <t-input label="Code" :focus="true" v-model="state.code" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.verify {
  display: flex;
  justify-content: center;
  padding-top: 100px;
  min-height: 800px;
  & > div {
    max-width: 360px;
  }
  &__logo {
    width: 160px;
    display: block;
    margin: 20px auto 50px;
  }
  &__user-phone {
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    & > div {
      font-size: 2rem;
      line-height: 1.5;
    }
  }
  &__title {
    text-align: center;
    font-size: 1rem;
    margin-bottom: 3rem;
  }
}
</style>
