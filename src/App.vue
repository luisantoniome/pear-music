<template lang="pug">
  #app
    pm-header

    pm-loader(v-show="isLoading")

    section.section(v-show="!isLoading")
      nav.nav
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
              pm-track(
                :class="{ 'is-active': t.url == selectedTrack }",
                :track="t",
                @select="setSelectedTrack"
              )

    pm-footer
</template>

<script>
import trackService from '@/services/track'
import PmHeader from '@/components/layout/Header.vue'
import PmFooter from '@/components/layout/Footer.vue'
import PmTrack from '@/components/Track.vue'
import PmLoader from '@/components/shared/Loader.vue'

export default {
  name: 'app',

  components: {
    PmHeader,
    PmFooter,
    PmTrack,
    PmLoader
  },
  data () {
    return {
      searchQuery: '',
      tracks: [],
      isLoading: false,
      selectedTrack: ''
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

      this.isLoading = true

      trackService.search(this.searchQuery)
        .then(res => {
          this.tracks = res.results.trackmatches.track
          this.isLoading = false
        })
    },

    setSelectedTrack (url) {
      this.selectedTrack = url
    }
  }
}
</script>

<style lang="scss">
  @import './scss/main.scss';

  .is-active {
    border: 3px solid #23d160;
  }
</style>
