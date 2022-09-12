import SpotifyPlayer from "react-spotify-web-playback";

export default function Player ({ accessToken, songInfo }) {
    if (!accessToken || !songInfo) return null
    return (
        <SpotifyPlayer 
            token={accessToken}
            uris={[songInfo]}
        />
    )
}