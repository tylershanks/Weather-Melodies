
import axios from 'axios';

let searchPlaylists = async (e, token, spotifyPlaylistSearchString) => {
const {data} = await axios.get("https://api.spotify.com/v1/search", {
    headers: {
    Authorization: `Bearer ${token}`
    },
    params: {
    q: spotifyPlaylistSearchString,
    type: "playlist"
    }
})
let url = data.playlists.items[0].uri
return url
}

export default searchPlaylists;