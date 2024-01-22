import { ICONS } from '../../constants/icons'
import './WeatherInfo.scss'

import { useSelector } from 'react-redux'
import { weatherSelector } from '../../redux/saga/weather/slice/slice';

import { useTranslation } from 'react-i18next';
import { showWeatherInfoSelector } from '../../redux/features/showWeatherInfo/showWeatherInfoSlice';
import { useEffect, useState } from 'react';
import { selectedLanguageSelector } from '../../redux/features/selectedLanguage/selectedLanguageSlice';

interface IInfoBuilder {
    icon: string;
    data: any;
    unit: string;
}

interface IWeatherData {
    [key: string]: IInfoBuilder
}

export default function WeatherInfo() {
    const [unit, setUnit] = useState<string>('C')
    const { t } = useTranslation()

    const weather = useSelector(weatherSelector.getWeather)
    const showWeatherInfo = useSelector(showWeatherInfoSelector.getShowWeatherInfo)
    const language = useSelector(selectedLanguageSelector.getSelectedLanguage)

    const InfoBuilder = ({ ...props }: IInfoBuilder) => {
        return (
            <div className='weather_info__weather__info'>
                <img src={props.icon} className='weather_info__weather__info__icon'/>
                <div className='weather_info__weather__info__data'>
                    <span className='weather_info__weather__info__data__data'>{props.data}</span>
                    <span className='weather_info__weather__info__data__unit'>{props.unit}</span>
                </div>
            </div>
        )
    }

    const WEATHER_DATA: IWeatherData = {
        wind: {
            icon: ICONS.wind,
            data: weather?.wind?.speed.toFixed(1) ?? 0,
            unit: language === 'it' ? 'm/s' : 'mph',
        },
        rain: {
            icon: ICONS.rain,
            data: weather?.rain?.['1h'] ?? 0,
            unit: '%',
        },
        humidity: {
            icon: ICONS.water_drop,
            data: weather?.main?.humidity ?? 0,
            unit: '%',
        },
    }

    const choseIcon = (weather: string) => {
        switch (weather.toUpperCase()) {
            case 'CLOUDS':
                return ICONS.clouds
            case 'CLEAR':
                return ICONS.sun
            case 'SNOW':
                return ICONS.snow
            case 'RAIN':
                return ICONS.raining
            
            default:
                return ICONS.question_mark
        }
    }

    useEffect(() => {
        showWeatherInfo && setUnit(language === 'it' ? 'C' : 'F')
    }, [language])

    return showWeatherInfo && (
        <div className='weather_info'>
            <div className='weather_info__main'>
                <img src={weather?.weather?.[0]?.main ? choseIcon(weather?.weather?.[0]?.main) : choseIcon('NONE')} className='weather_info__main__weather_icon' />
                <span className='weather_info__main__weather_main'>{t(weather?.weather?.[0]?.main)}</span>
                <span className='weather_info__main__weather_description'>{t(weather?.weather?.[0]?.description)}</span>
            </div>
            <div className='weather_info__temperature'>
                <span className='weather_info__temperature__current'>{weather?.main?.temp.toFixed(1)} {unit}°</span>
                <span className='weather_info__temperature__minmax'>{weather?.main?.temp_min.toFixed(1)} {unit}° / {weather?.main?.temp_max.toFixed(1)} {unit}°</span>
            </div>
            <div className='weather_info__weather'>
                {Object.values(WEATHER_DATA).map((data, index) => (
                    <InfoBuilder
                        key={index}
                        icon={data.icon}
                        data={data.data}
                        unit={data.unit}
                    />
                ))}
            </div>
        </div>
    )
}
