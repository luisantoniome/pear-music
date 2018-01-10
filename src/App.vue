<template lang="pug">
  #app
    pm-header

    pm-notification(v-show="showNotification")
      p(slot="body") No songs found.

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
import PmNotification from '@/components/shared/Notification.vue'

export default {
  name: 'app',

  components: {
    PmHeader,
    PmFooter,
    PmTrack,
    PmLoader,
    PmNotification
  },
  data () {
    return {
      searchQuery: '',
      tracks: [],
      isLoading: false,
      showNotification: false,
      selectedTrack: ''
    }
  },

  computed: {
    searchMessage () {
      return `Found: ${this.tracks.length}`
    }
  },

  watch: {
    showNotification () {
      if (this.showNotification) {
        setTimeout(() => {
          this.showNotification = false
        }, 3000)
      }
    }
  },

  methods: {
    search () {
      if (!this.searchQuery) { return }

      this.isLoading = true

      trackService.search(this.searchQuery)
        .then(res => {
          this.showNotification = res.results['opensearch:totalResults'] === '0'
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
