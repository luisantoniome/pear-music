<template lang="pug">
  section.hero.is-success
    .hero-head
      .navbar
        .navbar-brand
          router-link.navbar-item(to="/")
            strong 🎵 Pear Music
          .navbar-burger(@click="toggleMenu")
            span
            span
            span
        .navbar-menu(:class="{ 'is-active': isActive }")
          .navbar-end
            .navbar-item
              router-link(to="/") Search
            .navbar-item
              router-link(to="about") About
    .hero-body
      .container.has-text-centered
        h1.title Pear Music
        h2.subtitle 50 million songs. Zero ads.
        pm-player
</template>

<script>
  import PmPlayer from '@/components/Player.vue'

  export default {
    components: { PmPlayer },

    data () {
      return {
        isActive: false
      }
    },

    methods: {
      toggleMenu () {
        this.isActive = !this.isActive
      }
    }
  }
</script>
