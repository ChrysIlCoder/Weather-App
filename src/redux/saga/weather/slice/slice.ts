import { createSlice } from "@reduxjs/toolkit";
import { SAGA_FLOW_NAMES } from "../../saga";
import { IWeather } from "../../../../../models/services/Weather";
import { ICity } from '../../../../../models/services/City'

interface IWeatherIntialState {
    loading: boolean;
    weather: IWeather;
    city: ICity;
}

const initialState: IWeatherIntialState = {
    loading: false,
    weather: {} as IWeather,
    city: {} as ICity,
}

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false

            state.weather = {} as IWeather
            state.city = {} as ICity
        },
        setIsLoading: (state, action) => {
            state.loading = action.payload
        },
        setWeather: (state, action) => {
            state.weather = action.payload
        },
        setCity: (state, action) => {
            state.city = action.payload
        }
    }
})

const getIsLoading = (state: {weather: IWeatherIntialState}) => state.weather.loading

const getWeather = (state: {weather: IWeatherIntialState}) => state.weather.weather

const getCity = (state: {weather: IWeatherIntialState}) => state.weather.city

export const weatherSelector = {
    getIsLoading,
    getWeather,
    getCity,
}

export const { actions, reducer } = weatherSlice

export const sagaActions = {
    sagaGetWeather: ({ type: SAGA_FLOW_NAMES.GET_WEATHER }),
    sagaGetCity: (payload: { city: string; unit: string }) => ({ type: SAGA_FLOW_NAMES.GET_CITY, payload: payload })
}