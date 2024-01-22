import { all } from "redux-saga/effects";
import { weatherSagas } from "./weather/sagas";

interface ISAGA_FLOW_NAMES {
    GET_WEATHER: string;
    GET_CITY: string;
}

export const SAGA_FLOW_NAMES: ISAGA_FLOW_NAMES = {
    GET_WEATHER: "GET_WEATHER",
    GET_CITY: "GET_CITY"
}

export default function* rootSaga() {
    yield all([ ...weatherSagas ])
}