import axios from "axios";
import getAuthToken from "../utils/getToken";

export default class RestApi {
  constructor() {
    this.config = {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    };
  }
  get = async (url, isAuth = false, appendString = false) => {
    try {
      if (appendString) {
        url += appendString;
      }
      if (isAuth) {
        let result = await axios.get(url, this.config);
        return result;
      }
      let result = await axios.get(url);
      return result;
    } catch (error) {
      return error.response;
    }
  };

  post = async (url, body, isAuth = false) => {
    try {
      if (isAuth) {
        let result = await axios.post(url, body, this.config);
        return result;
      }
      let result = await axios.post(url, body);
      return result;
    } catch (error) {
      return error.response;
    }
  };

  delete = async (url, isAuth = false, appendString = false) => {
    try {
      if (appendString) {
        url += appendString;
      }
      if (isAuth) {
        let result = await axios.delete(url, this.config);
        return result;
      }
      let result = await axios.delete(url);
      return result;
    } catch (error) {
      return error.response;
    }
  };

  put = async (url, body, isAuth = false) => {
    try {
      if (isAuth) {
        let result = await axios.put(url, body, this.config);
        return result;
      }
      let result = await axios.put(url);
      return result;
    } catch (error) {
      return error.response;
    }
  };
}
