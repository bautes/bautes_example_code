import axios from 'axios';
import mockAxios from 'axios-mock-adapter';

const instance = axios.create({
  baseURL: "http://localhost:3001/",
  timeout: 2000,
  headers: {
    Origin: 'http://localhost:3000/',
    Referer: 'http://localhost:3000/'
  }
});

export const useMock = new mockAxios(instance);

export default instance;
