// import { pearMusicApiKey } from './pear-music'
import { pearMusicApiKey, pearMusicService } from './pear-music'

const trackService = {}

trackService.search = function (q) {
  const method = 'track.search'
  const track = q
  const apiKey = pearMusicApiKey
  const format = 'json'

  return pearMusicService.get('/2.0', {
    params: { method, track, api_key: apiKey, format }
  })
    .then(res => res.data)
}

export default trackService
