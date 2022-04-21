import axios from "axios";
const baseUrl = "http://localhost:3001";
function makeRequest({ url = "/", method = "get", params = {}, data = {} }) {
  url = baseUrl + url;
  return axios({ url, method, params, data });
}

export default makeRequest;
