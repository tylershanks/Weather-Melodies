# Weather Melodies

## What tools were used?

This project uses JavaScript, React, HTML, CSS, MaterialUI, Webpack, JSON

This project also uses the Spotify Web API, the Open Weather API, and the GeoDB Cities API.

## Why did you build this project?

I realized that one of my weaker points in Web Development was my ability to fully utilize REST API's. This project gave me a chance to combine the REST principles used in Spotify's incredible API with the data received and filtered from the Open Weather API as well as the GeoDB Cities API. Pulling information from one API in order to determine the search strings to specify the information needed from the other API was a fun way for me to solidfy my knowledge of getting 3 separate API's to work together with one another.

### Spotify API

The Spotify API was the most complicated API to integrate. Spotify has great dev tools and documentation to help developers out and they put a lot of effort into making their software useable in many different projects. Learning how to let users sign in and authenticate their accounts was valuable practice that I was not able to get with other, simpler APIs. 

The Spotify API is used by searching for a playlist based on key pieces of information given to us by our other 2 APIs. The search string generated will find relevant playlists in Spotify's database.

### Open Weather API

This API is the main source of information for us. With the help of the GeoDB Cities API, these allow users to reliably search and find specific cities. The Open Weather API then finds the accurate, current weather data of that city and displays it to the user as well as sends it to the Spotify API to search for a related playlist.

### GeoDB Cities API

Lastly, the GeoDB Cities API has the smallest, but still very important role. To avoid typos and to give users a realistic selection of cities to choose from, the GeoDB Cities API gives us a fully functional search bar that gives autocomplete options to the user. It gives the project a much more completed feel. Without autocomplete, user error could mess with the other 2 APIs and how they work and significantly degrade the user's experience. A simple autocomplete feature really alleviates those problems.

## What makes your project stand out?

The quality that makes this project stand out is how powerful the final product ends up being. When I initially thought of this idea, it was just a way to learn about API's more. However, once everything clicked together and my city searches were producing unique music, it changed my perspective on this project. In the early afternoon on the East Coast of the USA, I was searching the weather in Paris. It happened to be a colder, rainy night and "Trop beau" by Lomepal began playing through my app. It was a song I have never heard of but I could almost feel like I was in an apartment in Paris on that cold night.

## Features
  - Log in with Spotify to fully utilize the application.
  - Search for over 200,000 cities and recive information about the current weather.
  - Use the search bar's autocomplete feature to easily and accurately search for a specific city.
  - Based on city searches, receive and music from Spotify that matches the current mood of that City based on:
    - The city itself, or the country of the specified city.
    - The current weather (i.e. rainy, cloudy, sunny, clear, etc.)
    - The current temperature (summer mood or more winter-y)
    - The time of day. Night songs will be different than morning songs.

