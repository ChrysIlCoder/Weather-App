import axios, { AxiosRequestConfig } from "axios";

const API_KEY = 'e68bcf1cec35adaa0fe4f5cc3742ef87'
const BASE_URL = 'https://api.openweathermap.org/'

export async function GetWeather(lat: any, lon: any, unit: string) {
    const headers = {
        "Accept": "application/json"
    }

    const options: AxiosRequestConfig<any> = {
        method: 'get',
        url: `${BASE_URL}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`,
        headers: headers
    }

    try {
        const response = await axios.request(options)

        return response.data
    } catch (error) {
        throw error
    }
}

export async function GetCity(city: string) {
    const headers = {
        "Accept": "application/json"
    }

    const options: AxiosRequestConfig<any> = {
        method: 'get',
        url: `${BASE_URL}geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`,
        headers: headers
    }

    try {
        const response = await axios.request(options)

        return response.data
    } catch (error) {
        throw error
    }
}