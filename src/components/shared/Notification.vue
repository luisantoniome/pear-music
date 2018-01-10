<template lang="pug">
  .container
    .columns
      .column.is-5.is-offset-4
        .notification(:class="type")
          slot(name="body") Something went wrong.
</template>

<script>
  export default {
    props: {
      type: { type: String, required: true }
    }
  }
</script>


<style lang="scss" scoped>
  .notification {
    margin: 10px;
  }
</style>
