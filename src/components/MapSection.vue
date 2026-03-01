<template>
  <div>
    <section ref="mapSection" class="map-section py-5">
      <!-- Animated background elements -->
      <div class="bg-pattern">
        <div class="pattern-circle pattern-1"></div>
        <div class="pattern-circle pattern-2"></div>
        <div class="pattern-circle pattern-3"></div>
      </div>

      <v-container>
        <v-row>
          <v-col cols="12" class="text-center">
            <transition name="title-fade">
              <div v-if="showTitle">
                <div class="title-wrapper">
                  <div class="title-icon">
                    <v-icon color="white" size="large">mdi-map-marker</v-icon>
                  </div>
                  <h2 class="section-title mb-2">Find Us</h2>
                </div>
<!--                <p class="section-subtitle">Visit Our Location</p>-->
              </div>
            </transition>
          </v-col>
        </v-row>

        <v-row class="justify-center mt-5">
          <v-col cols="12" lg="10">
            <transition name="fade-up">
              <div v-if="showMap" class="map-wrapper">
                <!-- Map container with decorative frame -->
                <div class="map-container">
                  <!-- Corner decorations -->
                  <div class="corner-frame corner-tl"></div>
                  <div class="corner-frame corner-tr"></div>
                  <div class="corner-frame corner-bl"></div>
                  <div class="corner-frame corner-br"></div>

                  <!-- Google Map iframe -->
                  <iframe
                    :src="mapEmbedUrl"
                    class="google-map"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>

                  <!-- Overlay badge -->
                  <div class="map-badge">
                    <v-icon size="small" color="white">mdi-google-maps</v-icon>
                    <span>Google Maps</span>
                  </div>
                </div>
              </div>
            </transition>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
export default {
  name: 'MapSection',
  props: {
    mapData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      showTitle: false,
      showMap: false,
      // Default location: Bashundhara Shopping Complex, Dhaka
      defaultLocation: {
        name: 'Bashundhara Shopping Complex',
        address: 'Bashundhara Road, Dhaka 1229, Bangladesh',
        lat: 23.8103,
        lng: 90.4125
      }
    }
  },
  computed: {
    locationData() {
      // Use mapData from props if available, otherwise use default
      if (this.mapData && this.mapData.name) {
        return this.mapData
      }
      return this.defaultLocation
    },
    mapEmbedUrl() {
      const { lat, lng } = this.locationData
      return `https://maps.google.com/maps?q=${lat},${lng}&z=19&output=embed`
    }
  },
  mounted() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => { this.showTitle = true }, 100)
          setTimeout(() => { this.showMap = true }, 400)
          observer.disconnect()
        }
      })
    })
    observer.observe(this.$refs.mapSection)
  }
}
</script>

<style lang="css" scoped>
.map-section {
  background: linear-gradient(180deg, #f8fdf4 0%, #ffffff 50%, #f0f9ff 100%);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  padding: 80px 20px;
}

/* Animated background pattern */
.bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
}

.pattern-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.03;
  animation: pattern-float 25s infinite ease-in-out;
}

.pattern-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #4d870f, #7cb342);
  top: -150px;
  right: -100px;
}

.pattern-2 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #2196F3, #03A9F4);
  bottom: -100px;
  left: -80px;
  animation-delay: 8s;
}

.pattern-3 {
  width: 250px;
  height: 250px;
  background: linear-gradient(135deg, #E91E63, #F06292);
  top: 40%;
  left: 30%;
  animation-delay: 15s;
}

@keyframes pattern-float {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(50px, -50px) rotate(120deg);
  }
  66% {
    transform: translate(-30px, 30px) rotate(240deg);
  }
}

/* Title section */
.title-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 8px;
}

.title-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4d870f, #7cb342);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(77, 135, 15, 0.3);
  animation: icon-bounce 2s infinite;
}

@keyframes icon-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.section-title {
  font-weight: 900;
  font-size: 2.8rem;
  background: linear-gradient(135deg, #4d870f 0%, #7cb342 50%, #2196F3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;
  margin: 0;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #666;
  font-weight: 500;
  margin-top: 4px;
}

.title-fade-enter-active {
  animation: titleFade 1s ease forwards;
}

@keyframes titleFade {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Map wrapper */
.map-wrapper {
  position: relative;
  z-index: 1;
}

/* Map container */
.map-container {
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border: 4px solid white;
}

.google-map {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
  filter: saturate(1.1) contrast(1.05);
}

/* Corner decorations */
.corner-frame {
  position: absolute;
  width: 40px;
  height: 40px;
  border: 4px solid #4d870f;
  z-index: 3;
  opacity: 0.8;
}

.corner-tl {
  top: 12px;
  left: 12px;
  border-right: none;
  border-bottom: none;
  border-radius: 12px 0 0 0;
}

.corner-tr {
  top: 12px;
  right: 12px;
  border-left: none;
  border-bottom: none;
  border-radius: 0 12px 0 0;
}

.corner-bl {
  bottom: 12px;
  left: 12px;
  border-right: none;
  border-top: none;
  border-radius: 0 0 0 12px;
}

.corner-br {
  bottom: 12px;
  right: 12px;
  border-left: none;
  border-top: none;
  border-radius: 0 0 12px 0;
}

/* Map badge */
.map-badge {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  color: white;
  padding: 10px 20px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  z-index: 2;
}

/* Fade up animation */
.fade-up-enter-active {
  animation: fadeUpAnim 0.8s ease forwards;
}

@keyframes fadeUpAnim {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  /* Reduce overall section height/padding on mobile to remove extra space below the map */
  .map-section {
    min-height: auto !important; /* override 100vh to prevent large empty area */
    padding: 40px 16px !important; /* override py-5 utility padding on smaller screens */
  }

  .section-title {
    font-size: 1.6rem;
  }

  .title-wrapper {
    flex-direction: row; /* keep icon and title side-by-side */
    gap: 6px; /* standardize with AboutUsSection */
  }

  .title-icon {
    width: 48px !important;
    height: 48px !important;
    box-shadow: 0 4px 14px rgba(77, 135, 15, 0.22);
  }

  .title-icon :deep(.v-icon) {
    font-size: 20px !important;
  }

  .map-container {
    height: 400px;
  }

  .corner-frame {
    width: 30px;
    height: 30px;
    border-width: 3px;
  }
}

@media (max-width: 576px) {
  .map-section {
    min-height: auto !important;
    padding: 32px 12px !important;
  }

  .map-container {
    height: 350px;
  }
}
</style>
