<template lang="pug">
  #app
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
          p
            small {{ searchMessage }}              
              
      section.section
        .container
          .columns
            .column(v-for="t in tracks") {{ t.name }} - {{ t.artist }}
</template>

<script>
const tracks = [
  { name: 'Old Friends', artist: 'Jasmine Thompson' },
  { name: 'Baby Who', artist: 'The Aces' },
  { name: 'The Cure', artist: 'Lady Gaga' }
]

export default {
  name: 'app',
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
      this.tracks = tracks
    }
  }
}
</script>

<style lang="scss">
  @import './scss/main.scss'
</style>
