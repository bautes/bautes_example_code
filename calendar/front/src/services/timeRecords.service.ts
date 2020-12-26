import axios from "axios";
// import mockAxios from "axios-mock-adapter";
import { axios_config } from "../config";
import { ResponseModel } from "./response.model";
// const mockResponse = require("./mocks/recordsPerMonth.response.json");

export const getForMonth = (month: number, year: number) => {
  const uri = `timesheet/${year}/${month}`;
  // const useMock = new mockAxios(axios);
  // useMock.onGet(uri).reply(200, mockResponse);
  return axios.get<ResponseModel>(uri, axios_config);
};
