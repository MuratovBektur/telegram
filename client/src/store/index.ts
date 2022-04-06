import { createStore } from "vuex";

interface ICountry {
  name: string;
  phone: string;
  format: string;
}

interface IState {
  country: ICountry;
  countries: ICountry[];
  countryNameByIp: string;
}

const store = createStore<IState>({
  state() {
    return {
      country: {
        name: "",
        phone: "",
        format: "",
        code: "",
      },
      countries: [],
      countryNameByIp: "",
    };
  },
  mutations: {
    SET_COUNTRY(state: IState, country: ICountry) {
      state.country = country;
    },
    SET_COUNTRIES(state: IState, countries: ICountry[]) {
      state.countries = countries;
    },
    SET_COUNTRY_NAME_BY_IP(state: IState, countryNameByIp: string) {
      state.countryNameByIp = countryNameByIp;
    },
  },
});

export default store;
