import './App.css'
import LanguageSelector from './components/LanguageSelector/LanguageSelector'
import SearchBar from './components/SearchBar/SearchBar'
import WeatherInfo from './components/WeatherInfo/WeatherInfo'

export default function App(): JSX.Element {
  

  return (
    <div className='weather_app_container'>
      <SearchBar />
      <WeatherInfo />
      <LanguageSelector />
    </div>
  )
}
