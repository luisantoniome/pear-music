<template lang="pug">
  .container(v-if="track && track.album")
    pm-loader(v-show="isLoading")
    .columns
      .column.is-3.has-text-centered
        figure.media-left
          p.image
            img(:src="track.album.images[1]['url']")
          p.button-bar
            button.button.is-primary.is-large
              span.icon(@click="selectTrack") ▶
      .column.is-8
        .panel
          .panel-heading
            h1.title {{ trackTitle }} ({{ track.duration_ms | ms-to-mm }})
          .panel-block
            article.media
              .media-content
                .content
                  ul
                    li
                      strong Album:&nbsp;
                      span {{ track.album.name }}
                    li
                      strong Artists:&nbsp;
                      ul
                        li(v-for="artist in track.artists")
                          span {{ artist.name }}
              nav.level
                .level-left
                  a.level-item
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  
  import trackMixin from '@/mixins/track'
  import PmLoader from '@/components/shared/Loader.vue'

  export default {
    mixins: [ trackMixin ],
    components: {
      PmLoader
    },

    data () {
      return {
        isLoading: false
      }
    },

    computed: {
      ...mapState(['track']),
      ...mapGetters(['trackTitle'])
    },

    created () {
      const id = this.$route.params.id

      if (!this.track || !this.track.id || this.track.id !== id) {
        this.isLoading = true

        this.getTrackById({ id })
          .then(() => {
            this.isLoading = false
          })
      }
    },

    methods: {
      ...mapActions(['getTrackById'])
    }
  }
</script>

<style lang="scss" scoped>
  .columns {
    margin: 20px;
  }

  .button-bar {
    margin-top: 20px;
  }
</style>
