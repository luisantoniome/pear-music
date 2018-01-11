import trae from 'trae'
import configService from './config'

const pearMusicService = trae.create({
  baseUrl: configService.apiUrl
})

export default pearMusicService
