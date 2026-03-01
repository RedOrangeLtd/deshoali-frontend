<template>
  <div class="home-container">
    <videos-list/>
  </div>
</template>

<script>
import VideosList from '@/components/VideosList.vue'
export default {
  name: 'VideosView',
  components: {
    VideosList
  }
}
</script>

<style lang="css" scoped>
.home-container {
  background: #ffffff;
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 !important;
}
</style>
