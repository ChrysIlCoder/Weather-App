import { useTranslation } from 'react-i18next'

import './LanguageSelector.scss'

import { useDispatch, useSelector } from 'react-redux'
import { CSSProperties } from 'react'
import { selectedLanguageActions } from '../../redux/features/selectedLanguage'
import { selectedLanguageSelector } from '../../redux/features/selectedLanguage/selectedLanguageSlice'

export default function LanguageSelector() {
    const language = useSelector(selectedLanguageSelector.getSelectedLanguage)
    const { i18n } = useTranslation()

    const dispatch = useDispatch()

    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang)
        dispatch(selectedLanguageActions.setSelectedLanguage(lang))
    }

    const selectedLanguageStyle: CSSProperties = {
        borderBottom: 'solid 2px black'
    }

    return (
        <div className='language_selector'>
            <button className='language_selector__button' style={{ borderBottom: language === 'it' ? selectedLanguageStyle.borderBottom : '' }} onClick={() => handleLanguageChange('it')}>🇮🇹</button>
            <span>|</span>
            <button className='language_selector__button' style={{ borderBottom: language === 'en' ? selectedLanguageStyle.borderBottom : '' }} onClick={() => handleLanguageChange('en')}>🇺🇸</button>
        </div>
    )
}
