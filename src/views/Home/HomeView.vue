<template>
  <div class="home-view">
    <!-- Hero Slider -->
    <CarouselSection
      :items="carouselItems"
    />

    <!-- About Section -->
    <div id="about-us" class="anchor-section">
      <AboutUsSection
        :item="about"
      />
    </div>

    <!-- Team Section   -->
    <div id="project-team" class="anchor-section">
      <TeamSection
        :items="teamMembers"
      />
    </div>

    <!-- Project Activities Section   -->
    <div id="activities" class="anchor-section">
      <ProjectActivitiesSection
        :item="projectActivity"
      />
    </div>

    <!-- Videos Section   -->
    <div id="srhr-contents" class="anchor-section">
      <VideosList/>
    </div>

    <!-- Map Section   -->
    <MapSection
      :map-data="location"
    />

<!--    &lt;!&ndash; Footer Section   &ndash;&gt;-->
<!--    <FooterSection-->
<!--      :social-medias="socialMedias"-->
<!--    />-->
  </div>
</template>

<script>
import CarouselSection from '@/components/CarouselSection.vue'
import AboutUsSection from '@/components/AboutUsSection.vue'
import TeamSection from '@/components/TeamSection.vue'
import ProjectActivitiesSection from '@/components/ProjectActivitiesSection.vue'
import VideosList from '@/components/VideosList.vue'
import MapSection from '@/components/MapSection.vue'
import apiUrl from '@/constants/apiUrl.js'
import FooterSection from '@/components/FooterSection.vue'

export default {
  name: 'HomeView',
  components: {
    FooterSection,
    CarouselSection,
    AboutUsSection,
    TeamSection,
    ProjectActivitiesSection,
    VideosList,
    MapSection
  },
  data() {
    return {
      carouselItems: [],
      teamMembers: [],
      projectActivity: {},
      about: {},
      location: {},
      socialMedias: {}
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      const url = apiUrl + '/home'
      this.$axios.get(url)
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            const responseData = response.data.data
            this.carouselItems = responseData.carousels
            this.teamMembers = responseData.teams
            this.projectActivity = responseData.project_activity
            this.about = responseData.about
            this.location = responseData.location
            this.socialMedias = responseData.socialMedias
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.home-view {
  background: #ffffff;
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 !important;
}

/* Ensure scrolled-to sections are not hidden under the sticky navbar */
.anchor-section {
  scroll-margin-top: 120px; /* adjust if navbar/banner height changes */
}
</style>
