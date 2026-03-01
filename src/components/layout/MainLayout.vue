<template>
  <v-app class="app-layout">
    <Navbar />
    <div class="container content">
      <RouterView />
      <FooterSection />
    </div>
    <!--    <FooterComponent />-->
  </v-app>
</template>

<script>
import Navbar from '../Navbar.vue'
import FooterSection from '@/components/FooterSection.vue'
export default {
  components: { FooterSection, Navbar },
}
</script>

<style lang="css">
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1 0 auto; /* take available space to push footer down when content is short */
  width: 100%;
  max-width: 1320px;
  padding: 0 16px 0 16px;
  box-sizing: border-box;
}
</style>
