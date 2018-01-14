<template lang="pug">
  main

    pm-loader(v-show="isLoading")

    section.section(v-show="!isLoading")
      nav.nav
        .container
          .field.has-addons
            .control.is-expanded
              input.input.is-large(
                type="text",
                placeholder="Search songs",
                v-model="searchQuery",
                @keyup.enter="search"
              )
            .control
              a.button.is-info.is-large(@click="search") Search
            .control
              a.button.is-danger.is-large &times;

      pm-notification(v-show="notification.show", :type="notification.type")
        p(slot="body") {{ notification.message }}
              
      section.section
        .container
          .columns.is-multiline
            .column.is-one-quarter(v-for="t in tracks")
              pm-track(
                v-blur="t.preview_url"
                :class="{ 'is-active': t.id == selectedTrack }",
                :track="t",
                @select="setSelectedTrack"
              )
</template>

<script>
import trackService from '@/services/track'

import PmTrack from '@/components/Track.vue'

import PmLoader from '@/components/shared/Loader.vue'
import PmNotification from '@/components/shared/Notification.vue'

export default {
  name: 'app',

  components: {
    PmTrack,
    PmLoader,
    PmNotification
  },
  data () {
    return {
      searchQuery: '',
      tracks: [],
      isLoading: false,
      notification: {
        show: false,
        message: '',
        type: ''
      },
      selectedTrack: ''
    }
  },

  watch: {
    'notification.type': function () {
      if (this.notification.type === 'is-danger') {
        setTimeout(() => {
          this.notification.show = false
        }, 3000)
      }
    }
  },

  methods: {
    search () {
      if (!this.searchQuery) { return }

      this.isLoading = true
      this.tracks = []

      trackService.search(this.searchQuery)
        .then(res => {
          const results = res.tracks.total

          this.notification.show = true
          this.notification.message = (results === 0) ? 'No songs found' : `${results} songs found`
          this.notification.type = (results === 0) ? 'is-danger' : 'is-success'

          this.tracks = res.tracks.items
          this.isLoading = false
        })
    },

    setSelectedTrack (id) {
      this.selectedTrack = id
    }
  }
}
</script>

<style lang="scss">
  .is-active {
    border: 3px solid #23d160;
  }
</style>
