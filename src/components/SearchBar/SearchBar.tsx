import { useEffect, useState } from 'react'

import './SearchBar.scss'

import { useDispatch, useSelector } from 'react-redux'
import { sagaActions } from '../../redux/saga/weather/slice/slice'
import { showWeatherInfoActions } from '../../redux/features/showWeatherInfo'
import { showWeatherInfoSelector } from '../../redux/features/showWeatherInfo/showWeatherInfoSlice'

import { useTranslation } from 'react-i18next'
import { selectedLanguageSelector } from '../../redux/features/selectedLanguage/selectedLanguageSlice'

export default function SearchBar(): JSX.Element {
    const [input, setInput] = useState<string>('')
    const language = useSelector(selectedLanguageSelector.getSelectedLanguage)

    const { t } = useTranslation()

    const showWeatherInfo = useSelector(showWeatherInfoSelector.getShowWeatherInfo)
    const dispatch = useDispatch()

    useEffect(() => {
        showWeatherInfo && dispatch(sagaActions.sagaGetCity({ city: input, unit: language === 'it' ? 'metric' : 'imperial' }))
    }, [language])

    return (
        <div className='search_bar'>
            <input className='search_bar__search_input' placeholder={t('City')} value={input} type='search' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)} />
            <button className='search_bar__search_button' onClick={() => {
                if (input !== ''){
                    dispatch(sagaActions.sagaGetCity({ city: input, unit: language === 'it' ? 'metric' : 'imperial' }))
                    !showWeatherInfo && dispatch(showWeatherInfoActions.setShowWeatherInfo(true))
                }
            }}>{'->'}</button>
            <input type="submit" hidden/>
        </div>
    )
}