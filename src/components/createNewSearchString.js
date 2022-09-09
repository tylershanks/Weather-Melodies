

let createNewSearchString = (responseTemperature, responseWeather, gmtTimeStampHours, gmtTimeStampMinutes, responseCountryCode, responseCurrentLocation, responseTime) => {
    let secondsOfGMT = ((gmtTimeStampHours*60)+gmtTimeStampMinutes)*60
      let secondsOfSelectedCity = ((gmtTimeStampHours*60)+gmtTimeStampMinutes)*60+responseTime
      let TotalMinutesOfSelectedCity = 0
      if (secondsOfGMT < Math.abs(responseTime)){
        TotalMinutesOfSelectedCity = (86400-secondsOfGMT+responseTime)/60
      }else{
        TotalMinutesOfSelectedCity = secondsOfSelectedCity/60
      }

    // hot or cold
    let searchStringTemp = ''
    // whatever weather they give us
    let searchStringWeather = responseWeather
    // morning, afternoon, night
    let searchStringTime = ''
    // whatever country code they give us
    let searchStringCountry = responseCountryCode
    // city we searched
    let searchStringCity = responseCurrentLocation

    if (responseTemperature > 283){
      searchStringTemp = 'hot'
    }else{
      searchStringTemp = 'cold'
    }

    if (TotalMinutesOfSelectedCity < 660){
      searchStringTime = 'morning'
    }else if (660 <= TotalMinutesOfSelectedCity && TotalMinutesOfSelectedCity < 1020){
      searchStringTime = 'afternoon'
    }else{
      searchStringTime = 'night'
    }
    return(searchStringTime + ' in ' + searchStringCity)
    //setSpotifyPlaylistSearchString(searchStringTime + ' in ' + searchStringCity)
    // if nothing comes up from this search, i want to default the search to 
    // removing temperature first then weather
    // 'time in city' almost always comes up with something
    // last change, switch city to country
  }

  export default createNewSearchString;