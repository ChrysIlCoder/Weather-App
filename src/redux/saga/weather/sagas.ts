import { put, takeLatest, fork, call } from "redux-saga/effects";
import { SAGA_FLOW_NAMES } from "../saga";

import { GetCity, GetWeather } from '../../../../hook/fetchData'
import { weatherActions } from "./slice";
import { IWeather } from '../../../../models/services/Weather'
import { ICity } from "../../../../models/services/City";

function* getWeather(lat: number, lon: number, unit: string): any {
    const method = '[🌤️] getWeather'

    console.log(`[📣] callingMethod - ${method}`)

    try {
        yield put(weatherActions.setIsLoading(true))
        const data: IWeather  = yield call(GetWeather, lat, lon, unit)
        console.log(`${method} - data: ${JSON.stringify(data)}`)

        yield put(weatherActions.setWeather(data))
    } catch (error) {
        yield put(weatherActions.setIsLoading(false))
        console.log(`${method} - error: ${JSON.stringify(error)}`)
    } finally {
        yield put(weatherActions.setIsLoading(false))
        console.log(`${method} - end`)
    }
}

function* getCity(action: any) {
    const method = '[🏚️] getCity'

    const { payload } = action

    console.log(`[📣] callingMethod - ${method}`)

    try {
        yield put(weatherActions.setIsLoading(true))
        const data: ICity  = yield call(GetCity, payload.city)
        console.log(`${method} - data: ${JSON.stringify(data)}`)

        yield getWeather(data[0].lat, data[0].lon, payload.unit)
        yield put(weatherActions.setCity(data))
    } catch (error) {
        console.log(`${method} - error: ${JSON.stringify(error)}`)
        yield put(weatherActions.setIsLoading(false))
    } finally {
        yield put(weatherActions.setIsLoading(false))
        console.log(`${method} - end`)
    }
}

/* Watcher */

function* watchGetCity() {
    yield takeLatest(SAGA_FLOW_NAMES.GET_CITY, getCity)
}

/* Saga */

export const weatherSagas = [fork(watchGetCity)]

/* FLows */

export const weatherFlows = {
    weatherSagas,
}