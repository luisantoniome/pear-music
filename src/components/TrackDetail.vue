<template lang="pug">
  .container(v-if="track && track.album")
    pm-loader(v-show="isLoading")
    .columns
      .column.is-3.has-text-centered
        figure.media-left
          p.image
            img(:src="track.album.images[1]['url']")
          p
            button.button.is-primary.is-large
              span.icon(@click="selectTrack") ▶
      .column.is-8
        .panel
          .panel-heading
            h1.title {{ track.name }} ({{ track.duration_ms | ms-to-mm }})
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
  import trackMixin from '@/mixins/track'
  import trackService from '@/services/track'
  import PmLoader from '@/components/shared/Loader.vue'

  export default {
    mixins: [ trackMixin ],
    components: {
      PmLoader
    },

    data () {
      return {
        track: {},
        isLoading: false
      }
    },

    created () {
      const id = this.$route.params.id

      this.isLoading = true

      trackService.getById(id)
        .then(res => {
          this.track = res
          this.isLoading = false
        })
    }
  }
</script>

<style lang="scss" scoped>
  .columns {
    margin: 20px;
  }
</style>
