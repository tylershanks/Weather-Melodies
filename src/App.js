import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Player from './components/Player';
import createNewSearchString from './components/createNewSearchString';
import WeatherInfo from './components/WeatherInfo';
import SearchBarAutoComplete from './components/searchBarAutoComplete';

function App() {

  // ===========================================================================
  // spotify stuff
  const CLIENT_ID = "b0c24cad0036460f9601c6de7011d0a8"
  const REDIRECT_URI = "http://localhost:3000/callback"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  let AUTH_SCOPE = 'user-read-email user-read-private user-read-playback-state user-modify-playback-state user-library-read user-library-modify streaming'

  const [token, setToken] = useState("");

  // fires on page load. checks for token (if we dont have one, it will prompt user to sign into spotify)
  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if(!token && hash){
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }
    setToken(token)
  }, [])

  const logout = () => {
    setToken("");
    window.localStorage.removeItem('token')
  }
 // ===========================================================================

  const [weatherResponse, setWeatherResponse] = useState();
    const [responseCurrentLocation, setResponseCurrentLocation] = useState();
    const [responseCountryCode, setResponseCountryCode] = useState();
    const [responseWeather, setResponseWeather] = useState();
    const [responseTemperature, setResponseTemperature] = useState();
    const [responseTime, setResponseTime] = useState();
      const [gmtTimeStampHours, setGmtTimeStampHours] = useState(new Date().getUTCHours());
      const [gmtTimeStampMinutes, setGmtTimeStampMinutes] = useState(new Date().getUTCMinutes());

  const [spotifyPlaylistSearchString, setSpotifyPlaylistSearchString] = useState('');
    const [songInfo, setSongInfo] = useState();

  const handleOnSearchChange = (searchData) => {
    let cityName = searchData.cityName;
    let countryCode = searchData.countryCode;
    let callByCity ='https://api.openweathermap.org/data/2.5/weather?q='+cityName+','+countryCode+'&appid=7de8f44fad04f72374228c446e773690'
      const res = axios.get(callByCity)
      .then(res => {
              // all of our relevant information will be in weatherResponse
              setWeatherResponse(res.data)
          })
  }
  // this useEffect fires when we get a new response from our weather API
  useEffect(() => {
      if(weatherResponse === undefined){
          return console.log('weather response undefined rn')
      }else{
          // uses our returned JSON to set the current city location/temp/weather conditions/time/GMT time stamp for conversion
          setResponseCurrentLocation(weatherResponse.name)
          setResponseCountryCode(weatherResponse.sys.country)
          setResponseTemperature(weatherResponse.main.temp)
          setResponseWeather(weatherResponse.weather[0].main)
          setResponseTime(weatherResponse.timezone)
          setGmtTimeStampHours(new Date().getUTCHours())
          setGmtTimeStampMinutes(new Date().getUTCMinutes())
      }
  }, [weatherResponse])
  
  // once the above useEffect changes, we set a new search string for Spotify to find us new songs
  useEffect(() => {
    setSpotifyPlaylistSearchString(createNewSearchString(responseTemperature, responseWeather, gmtTimeStampHours, gmtTimeStampMinutes, responseCountryCode, responseCurrentLocation, responseTime));
  }, [responseCurrentLocation])

   // fires when the search string changes, fires the searchPlaylists function
   useEffect (() => {
    searchPlaylists();
  }, [spotifyPlaylistSearchString])

  let searchPlaylists = async (e) => {
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: spotifyPlaylistSearchString,
        type: "playlist"
      }
    })
    console.log(data.playlists.items[0].uri)
    if (data.playlists.items[0].uri === undefined){
      return
    }else{
      console.log(setSongInfo)
      let url = data.playlists.items[0].uri
      setSongInfo(url)
    }
  }

  

  
  return (
    <div>

      <SearchBarAutoComplete onSearchChange={handleOnSearchChange}/>

      <WeatherInfo responseCurrentLocation={responseCurrentLocation} responseWeather={responseWeather} responseTime={responseTime} responseTemperature={responseTemperature}/>

      {token==="" ? 
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${AUTH_SCOPE}`}>Login to Spotify</a>
        :
        <button onClick={logout}>Logout</button>
      }

      {token!=='' ?
        <div>
          <Player accessToken={token} songInfo={songInfo}/>
        </div>
        :
        <h2>no token</h2>
      }
    </div>
  );
}

export default App;
