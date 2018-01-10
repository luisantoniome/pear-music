// import { pearMusicApiKey } from './pear-music'
import { pearMusicApiKey, pearMusicService } from './pear-music'

const trackService = {}

const apiKey = pearMusicApiKey
const format = 'json'

trackService.search = function (q) {
  const method = 'track.search'
  const track = q

  return pearMusicService.get('/2.0', {
    params: { method, track, api_key: apiKey, format }
  })
    .then(res => res.data)
}

trackService.getTrackInfo = function (name, theArtist) {
  const method = 'track.getInfo'
  const track = name
  const artist = theArtist

  return pearMusicService.get('/2.0', {
    params: { method, track, artist, api_key: apiKey, format }
  })
    .then(res => res.data)
}

export default trackService
