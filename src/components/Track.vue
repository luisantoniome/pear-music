<template lang="pug">
  .card(v-if="track && track.album")
    .card-image
      figure.image.is-1by1
        img(:src="track.album.images[1]['url']")

    .card-content
      .media
        .media-left
          figure.image.is-48x48
            img(:src="track.album.images[2]['url']")
        .media-content
          p.title.is-6
            strong {{ track.name }} ({{ track.duration_ms | ms-to-mm }})
          p.subtitle.is-6 {{ track.artists[0]['name'] }}
      
      .content
        nav.level
          .level-left
            button.button.is-primary.level-item(@click="selectTrack")
              span.icon.is-small ▶
            button.button.is-warning.level-item(@click="goToTrack(track.id)")
              span.icon.is-small ➕

</template>

<script>
  import trackMixin from '@/mixins/track'

  export default {
    mixins: [ trackMixin ],
    props: {
      track: { type: Object, required: true }
    },

    methods: {
      goToTrack (id) {
        if (!this.track.preview_url) { return }
        this.$router.push({ name: 'track', params: { id } })
      }
    }
  }
</script>
