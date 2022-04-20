import axios from "./axios";

export interface IRequest {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  get(url: string): Promise<any>;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  post(url: string, data?: any): Promise<any>;
}

class Request implements IRequest {
  async get(url: string) {
    try {
      const res = await axios.get("/" + url);
      return res.data;
    } catch (error) {
      console.log(error);
      throw error
    }
  }
  async post(url: string, data?: any) {
    try {
      const res = await axios.post("/" + url, data);
      return res.data;
    } catch (error) {
      console.log(error);
      throw error
    }
  }
}

export default new Request();
