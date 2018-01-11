import pearMusicService from './pear-music'

const trackService = {}

trackService.search = function (q) {
  const type = 'track'

  return pearMusicService.get('/search', {
    params: { q, type }
  })
    .then(res => res.data)
}

export default trackService
