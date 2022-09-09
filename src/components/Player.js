import React, { useState, useEffect } from 'react';

// import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player ({ accessToken, songInfo }) {
    if (!accessToken) return null
    return (
        <SpotifyPlayer 
            token={accessToken}
            uris={[songInfo]}
        />
    )
}