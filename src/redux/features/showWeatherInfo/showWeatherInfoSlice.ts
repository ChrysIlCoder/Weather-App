import { createSlice } from "@reduxjs/toolkit";

interface IShowWeatherInfoInitalState {
    show: boolean;
}

const initialState: IShowWeatherInfoInitalState = {
    show: false
}

const showWeatherInfoSlice = createSlice({
    name: 'showWeatherInfo',
    initialState,
    reducers: {
        setShowWeatherInfo: (state, action) => {
            state.show = action.payload
        }
    }
})

const getShowWeatherInfo = (state: { showWeatherInfo: IShowWeatherInfoInitalState }) => state.showWeatherInfo.show

export const showWeatherInfoSelector = {
    getShowWeatherInfo,
}

export const { actions, reducer } = showWeatherInfoSlice