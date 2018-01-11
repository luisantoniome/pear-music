<template lang="pug">
  section.hero.is-success
    .hero-head
      header.nav
        .container
          .nav-left
            .nav-item
              strong 🎵 Pear Music
          .nav-right.nav-menu
    .hero-body
      .container.has-text-centered
        h1.title Pear Music
        h2.subtitle 50 million songs. Zero ads.
        pm-player
</template>

<script>
  import PmPlayer from '@/components/Player.vue'

  export default {
    components: { PmPlayer }
  }
</script>
