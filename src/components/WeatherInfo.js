import { useEffect, useState } from 'react';
import convertTime from './convertTime';
import convertTemperature from './convertTemperature';

// responseCurrentLocation={responseCurrentLocation} responseWeather={responseWeather} responseTime={responseTime} responseTemperature={responseTemperature
export default function WeatherInfo({responseCurrentLocation, responseWeather, responseTime, responseTemperature}) {

    const [gmtTimeStampHours, setGmtTimeStampHours] = useState(new Date().getUTCHours());
    const [gmtTimeStampMinutes, setGmtTimeStampMinutes] = useState(new Date().getUTCMinutes());
    const [convertedTime, setConvertedTime] = useState();

    const [temperatureUnitToggle, setTemperatureUnitToggle] = useState(1);
    const [convertedTemperature, setConvertedTemperature] = useState();

    // this useEffect fires when we get a new response, it changes the time associated with the location
    useEffect(() => {
        setGmtTimeStampHours(new Date().getUTCHours())
        setGmtTimeStampMinutes(new Date().getUTCMinutes())
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

  return (
    <div>
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
