import trae from 'trae'
import configService from './config'

const pearMusicApiKey = configService.apiKey

const pearMusicService = trae.create({
  baseUrl: configService.apiUrl
})

export { pearMusicApiKey }
export { pearMusicService }
