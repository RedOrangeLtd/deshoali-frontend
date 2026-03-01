<template>
  <div class="home-container">
    <documents-list/>
  </div>
</template>

<script>
import DocumentsList from '@/components/DocumentsList.vue'
export default {
  name: 'DocumentsView',
  components: {
    DocumentsList
  }
}
</script>

<style lang="css" scoped>
.home-container {
  margin-top: 20px;
  max-width: 1320px;
}
</style>
