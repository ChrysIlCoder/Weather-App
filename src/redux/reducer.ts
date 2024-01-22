import { combineReducers } from "@reduxjs/toolkit";
import { weatherReducer } from "./saga/weather/slice";
import { showWeatherInfoReducer } from "./features/showWeatherInfo";
import { selectedLanguageReducer } from "./features/selectedLanguage";

export default combineReducers({
    weather: weatherReducer,
    showWeatherInfo: showWeatherInfoReducer,

    selectedLanguage: selectedLanguageReducer,
})