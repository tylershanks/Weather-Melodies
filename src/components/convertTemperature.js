  // the Temperature Unit Toggle will tell this function which unit to return
  let convertTemperature = (responseTemperature, temperatureUnitToggle) => {
    let convertedCelciusTempurature = (Math.floor(responseTemperature - 273.15)) + '°C'
    let convertedFahrenheitTempurature = (Math.floor((responseTemperature - 273.15) * (9/5) + 32)) + '°F'
    
    return (temperatureUnitToggle ? convertedFahrenheitTempurature : convertedCelciusTempurature)
}

export default convertTemperature;