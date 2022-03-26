import axios from "./axios";

export interface IRequest {
  getCoutries(): Promise<any>;
  getGeo(): Promise<any>;
}

class Request implements IRequest {
  async getCoutries() {
    try {
      const res = await axios.get("/get-countries");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getGeo() {
    try {
      const res = await axios.get("/get-geo");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Request();
