<template lang="pug">
  .content(v-if="track && track.album")
    p.is-128x128
      img(:src="track.album.images[1]['url']")
    p
      strong {{ track.artists[0].name }} - 
      strong {{ track.name }} 
      small [{{ track.duration_ms | ms-to-mm }}]
    p
      audio(controls, :src="track.preview_url")
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState(['track'])
    }
  }
</script>
