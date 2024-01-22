import { createSlice } from "@reduxjs/toolkit";

interface ISelectedLanguageSlice {
    selectedLanguage: string;
}

const initialState: ISelectedLanguageSlice = {
    selectedLanguage: 'it'
}

const selectedLanguageSlice = createSlice({
    name: 'selectedLanguage',
    initialState,
    reducers: {
        setSelectedLanguage: (state, action) => {
            state.selectedLanguage = action.payload
        }
    }
})

const getSelectedLanguage = (state: { selectedLanguage: ISelectedLanguageSlice }) => state.selectedLanguage.selectedLanguage

export const selectedLanguageSelector = {
    getSelectedLanguage,
}

export const { actions, reducer } = selectedLanguageSlice