import { call, put } from "redux-saga/effects";
import { fetchTimesheet } from "../index";
import * as timeRecordsService from "../../../services/timeRecords.service";
import * as actions from "../../../redux/actions";

const date = new Date();
const response = {
  data: {
    monthly: {
      foo: [
        {
          hours: 0,
          description: "string",
          project: "string | number",
        },
      ],
    },
  },
};

// expects a call instruction
test("SAGA fetchTimesheet", () => {
  const iterator = fetchTimesheet({payload: date});
  expect(iterator.next().value).toEqual(
    call(timeRecordsService.getForMonth, date.getMonth() + 1, date.getFullYear())
  );
  expect(iterator.next(response).value).toEqual(
    put(actions.loadTimeSheet(date, response.data.monthly))
  );
});
