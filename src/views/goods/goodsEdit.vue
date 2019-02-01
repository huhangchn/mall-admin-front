<template>
  <div class="app-container">
    <goods :edit="true"></goods>
  </div>
</template>

<script>
  import goods from './components/goods'
  export default {
    components: {
      goods
    }
  }
</script>

<style>
</style>
