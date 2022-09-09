
    // given the gmt timestamp of hours, minutes, and our current time given from the api response,
  // we convert the time to seconds (so we can apply the api's time zone adjustment) then back to hours and minutes
  let convertTime = (gmtTimeStampHours, gmtTimeStampMinutes, responseTime) => {
    //if seconds of gmt < |response time|, do 86,400-gmt as gmt
    let secondsOfGMT = ((gmtTimeStampHours*60)+gmtTimeStampMinutes)*60
    let secondsOfSelectedCity = ((gmtTimeStampHours*60)+gmtTimeStampMinutes)*60+responseTime
    let TotalMinutesOfSelectedCity = 0
    if (secondsOfGMT < Math.abs(responseTime)){
      TotalMinutesOfSelectedCity = (86400-secondsOfGMT+responseTime)/60
    }else{
      TotalMinutesOfSelectedCity = secondsOfSelectedCity/60
    }
    // mod 60 will give us the minutes of whatever hour we are in
    let mins = TotalMinutesOfSelectedCity % 60;
    // if the time is 12:02 it will say 12:2. This is to fix that
    if(mins < 10){
        mins = '0' + mins
    }
    let hours = Math.floor(TotalMinutesOfSelectedCity/60);
    let finalConvertedTime = ''
    // AM or PM
    if(hours === 12){
        finalConvertedTime = hours + ':' + mins + ' PM';
    }else if(hours > 12){
        finalConvertedTime = (hours-12) + ':' + mins + ' PM';
    }else{
        finalConvertedTime = hours + ':' + mins + ' AM';
    }
    return finalConvertedTime;
}

export default convertTime;