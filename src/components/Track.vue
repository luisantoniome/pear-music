<template lang="pug">
  .card
    .card-image
      figure.image.is-1by1
        img(:src="track.image[3]['#text']")

    .card-content
      .media
        .media-left
          figure.image.is-48x48
            img(:src="track.image[1]['#text']")
        .media-content
          p.title.is-6
            strong {{ track.name }}
          p.subtitle.is-6 {{ track.artist }}
      
      .content
        small {{ duration }}
        nav.level
          .level-left
            a.level-item
              span.icon.is-small(@click="selectTrack") ▶
</template>

<script>
  import trackService from '@/services/track'

  export default {
    props: {
      track: { type: Object, required: true }
    },

    data () {
      return {
        duration: ''
      }
    },

    created () {
      trackService.getTrackInfo(this.track.name, this.track.artist)
        .then(res => {
          this.duration = res.track.duration
        })
    },

    methods: {
      selectTrack () {
        this.$emit('select', this.track.url)
      }
    }
  }
</script>
