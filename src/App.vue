<template lang="pug">
  #app
    h1 {{ msg }}
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Pear Music'
    }
  }
}
</script>

<style lang="scss">
  @import './scss/main.scss'
</style>
