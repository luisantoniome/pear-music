<template lang="pug">
  #app
    pm-header

    section.section
      nav.nav.has-shadow
        .container
          .field.has-addons
            .control.is-expanded
              input.input.is-large(
                type="text",
                placeholder="Search songs",
                v-model="searchQuery")
            .control
              a.button.is-info.is-large(@click="search") Search
            .control
              a.button.is-danger.is-large &times;
      .container
        p
          small {{ searchMessage }}              
              
      section.section
        .container
          .columns.is-multiline
            .column.is-one-quarter(v-for="t in tracks")
              pm-track(:track="t")

    pm-footer
</template>

<script>
import trackService from '@/services/track'
import PmHeader from '@/components/layout/Header.vue'
import PmFooter from '@/components/layout/Footer.vue'
import PmTrack from '@/components/Track.vue'

export default {
  name: 'app',

  components: {
    PmHeader,
    PmFooter,
    PmTrack
  },
  data () {
    return {
      searchQuery: '',
      tracks: []
    }
  },

  computed: {
    searchMessage () {
      return `Found: ${this.tracks.length}`
    }
  },

  methods: {
    search () {
      if (!this.searchQuery) { return }
      trackService.search(this.searchQuery)
        .then(res => {
          this.tracks = res.results.trackmatches.track
        })
    }
  }
}
</script>

<style lang="scss">
  @import './scss/main.scss'
</style>
