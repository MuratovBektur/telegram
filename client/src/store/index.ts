import { createStore } from "vuex";

interface IState {
  socket: WebSocket | null;
}

const store = createStore<IState>({
  state() {
    return {
      socket: null,
    };
  },
  mutations: {
    setSocket(state: IState, socket: WebSocket) {
      state.socket = socket;
    },
    unSetSocket(state: IState) {
      state.socket = null;
    },
  },
});

export default store;
