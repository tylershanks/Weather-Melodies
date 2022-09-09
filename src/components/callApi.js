import { useEffect, useState } from 'react';
import axios from 'axios';


function GetWeatherFromApi() {

    // default call is NYC
    const [weatherCall, setWeatherCall] = useState('new york');
    const [weatherResponse, setWeatherResponse] = useState();
    const [searchBoxText, setSearchBoxText] = useState();

    const [responseCurrentLocation, setResponseCurrentLocation] = useState();
    const [responseWeather, setResponseWeather] = useState();

    const [responseTemperature, setResponseTemperature] = useState();
        const [temperatureUnitToggle, setTemperatureUnitToggle] = useState(1);
        const [convertedTemperature, setConvertedTemperature] = useState();
    const [responseTime, setResponseTime] = useState();
        const [gmtTimeStampHours, setGmtTimeStampHours] = useState(new Date().getUTCHours());
        const [gmtTimeStampMinutes, setGmtTimeStampMinutes] = useState(new Date().getUTCMinutes());
        const [convertedTime, setConvertedTime] = useState();

    // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    // https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}
    // https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}

    // this useEffect fires whenever someone presses the search button
    useEffect(() => {
        // set callByCity to our API call plus the city we are searching for
        let callByCity = 'https://api.openweathermap.org/data/2.5/weather?q='+weatherCall+'&appid=7de8f44fad04f72374228c446e773690'
        const res = axios.get(callByCity)
        .then(res => {
                // all of our relevant information will be in weatherResponse
                setWeatherResponse(res.data)
            })
    }, [weatherCall])


    // this useEffect fires when we get a new response from our weather API
    useEffect(() => {
        if(weatherResponse === undefined){
            return console.log('weather response undefined rn')
        }else{
            // uses our returned JSON to set the current city/location
            setResponseCurrentLocation(weatherResponse.name)
            setResponseTemperature(weatherResponse.main.temp)
            setResponseWeather(weatherResponse.weather[0].main)
            setResponseTime(weatherResponse.timezone)
            setGmtTimeStampHours(new Date().getUTCHours())
            setGmtTimeStampMinutes(new Date().getUTCMinutes())
        }
    }, [weatherResponse])

    // this useEffect fires when we get a new response, it changes the time associated with the location
    useEffect(() => {
        if(responseTime === undefined){
            return console.log('response time undefined rn')
        }else{
            setConvertedTime(convertTime(gmtTimeStampHours, gmtTimeStampMinutes, responseTime))
        }
    }, [responseTime])

    // this useEffect fires when we get a new response, it changes the temperature associated with the location
    useEffect(() => {
        if(responseTemperature === undefined){
            return console.log('response temperature undefined rn')
        }else{
            setConvertedTemperature(convertTemperature(responseTemperature, temperatureUnitToggle))
        }
    }, [responseTemperature])

    // setWeatherCall when the button is clicked
    let handleClick = () => {
        setWeatherCall(searchBoxText)
    }
    // update searchBoxText as the search bar data changes
    let handleSearchBarChange = (e) => {
        setSearchBoxText(e.target.value)
    }

    // given the gmt timestamp of hours, minutes, and our current time given from the api response,
    // we convert the time to seconds (so we can apply the api's time zone adjustment) then back to hours and minutes
    let convertTime = (gmtTimeStampHours, gmtTimeStampMinutes, responseTime) => {
        let secondsOfSelectedCity = ((gmtTimeStampHours*60)+gmtTimeStampMinutes)*60+responseTime
        let TotalMinutesOfSelectedCity = secondsOfSelectedCity/60
        // mod 60 will give us the minutes of whatever hour we are in
        let mins = TotalMinutesOfSelectedCity % 60;
        // if the time is 12:02 it will say 12:2. This is to fix that
        if(mins < 10){
            mins = '0' + mins
        }
        let hours = Math.floor(TotalMinutesOfSelectedCity/60);
        let finalConvertedTime = ''
        // AM or PM
        if(hours > 12){
            finalConvertedTime = (hours-12) + ':' + mins + ' PM';
        }else{
            finalConvertedTime = hours + ':' + mins + ' AM';
        }
        return finalConvertedTime;
    }

    // converts the temperature to a whole number of C or F
    // the Temperature Unit Toggle will tell this function which unit to return
    let convertTemperature = (responseTemperature, temperatureUnitToggle) => {
        let convertedCelciusTempurature = (Math.floor(responseTemperature - 273.15)) + '°C'
        let convertedFahrenheitTempurature = (Math.floor((responseTemperature - 273.15) * (9/5) + 32)) + '°F'
        
        return (temperatureUnitToggle ? convertedFahrenheitTempurature : convertedCelciusTempurature)
    }

    // on search bar change, change a state variable of what is being searched
    // on button press, use that state to re-call api
    return (
        <div>
            <input 
                type='search' 
                id='cityEntry'
                onChange={handleSearchBarChange}
            ></input>
            <button onClick={handleClick}>enter city</button>
            <> | </>
            <>{responseCurrentLocation}</>
            <> | </>
            <>{responseWeather}</>
            <> | </>
            <>{convertedTime}</>
            <> | </>
            <>{convertedTemperature}</>
        </div>
    )
}

export default GetWeatherFromApi;