
export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo"

export const geoApiOptions = {
    method: 'GET',
    url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
    params: {minPopulation: '400000', namePrefix: null},
    headers: {
      'X-RapidAPI-Key': '36de61466cmsh87aaf5c0ec7d80ap14af4djsn2016e7313843',
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
  };


