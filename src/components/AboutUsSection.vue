<template>
  <div>
    <section ref="aboutSection" class="about-section py-5">
      <!-- Animated background elements -->
      <div class="bg-circles">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
        <div class="circle circle-3"></div>
      </div>

      <v-container>
        <v-row>
          <v-col cols="12" class="text-center">
            <transition name="title-fade">
              <div v-if="showTitle">
                <div class="title-wrapper">
                  <div class="title-icon">
                    <v-icon color="white" size="large">mdi-information</v-icon>
                  </div>
                  <h2 class="section-title mb-2">About Our Mission</h2>
                </div>
<!--                <p class="section-subtitle">Empowering Communities Through Healthcare Innovation</p>-->
              </div>
            </transition>
          </v-col>
        </v-row>

        <v-row class="align-center mt-5">
          <!-- Left Image with decorative elements -->
          <v-col cols="12" md="6" class="text-center">
            <transition name="zoom-in">
              <div v-if="showImage" class="image-wrapper">
                <div class="decorative-blob blob-1"></div>
                <div class="decorative-blob blob-2"></div>
                <div class="about-image-container animate-float">
                  <div class="image-overlay"></div>
                  <img
                    :src="imagePath"
                    alt="About Us"
                    class="about-image"
                  />
                </div>
              </div>
            </transition>
          </v-col>

          <!-- Right Text with enhanced styling -->
          <v-col cols="12" md="6" class="text-section">
            <transition name="fade-slide">
              <div v-if="showText">
                <!-- Stats cards -->
<!--                <v-row class="mb-4">-->
<!--                  <v-col cols="6" v-for="(stat, index) in stats" :key="index">-->
<!--                    <div-->
<!--                      class="stat-card"-->
<!--                      :style="{ animationDelay: `${index * 0.2}s` }"-->
<!--                      @mouseenter="stat.hovered = true"-->
<!--                      @mouseleave="stat.hovered = false"-->
<!--                    >-->
<!--                      <v-icon :color="stat.color" size="large" class="stat-icon">-->
<!--                        {{ stat.icon }}-->
<!--                      </v-icon>-->
<!--                      <div class="stat-number">{{ stat.number }}</div>-->
<!--                      <div class="stat-label">{{ stat.label }}</div>-->
<!--                    </div>-->
<!--                  </v-col>-->
<!--                </v-row>-->

                <!-- Main content with highlight box -->
                <div class="content-box">
<!--                  <div class="highlight-badge">-->
<!--                    <v-icon color="white" size="small">mdi-information</v-icon>-->
<!--                    <span>Our Focus</span>-->
<!--                  </div>-->

                  <p class="about-text" v-html="aboutText"></p>

<!--                  <v-btn-->
<!--                    class="about-btn mt-4"-->
<!--                    size="large"-->
<!--                    elevation="0"-->
<!--                    rounded="lg"-->
<!--                  >-->
<!--                    Learn More-->
<!--                    <v-icon class="ml-2" size="small">mdi-arrow-right</v-icon>-->
<!--                  </v-btn>-->
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
import baseApiUrl from '@/constants/baseApiUrl.js'
export default {
  name: 'AboutUsSection',
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      showImage: false,
      imagePath: '#',
      showText: false,
      showTitle: false,
      aboutText: '',
      stats: [
        { icon: 'mdi-account-group', number: '5+', label: 'Modules', color: '#4d870f', hovered: false },
        { icon: 'mdi-map-marker', number: 'Sylhet', label: 'Location', color: '#2196F3', hovered: false }
      ],
      modules: [
        { name: 'Contraception & Family Planning', icon: 'mdi-shield-heart', color: '#4d870f' },
        { name: 'Maternal Health', icon: 'mdi-mother-heart', color: '#E91E63' },
        { name: 'Adolescent SRH', icon: 'mdi-human-child', color: '#9C27B0' },
        { name: 'Menstrual Health', icon: 'mdi-calendar-heart', color: '#FF5722' },
        { name: 'Gender-based Violence', icon: 'mdi-shield-account', color: '#F44336' }
      ]
    }
  },
  mounted() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => { this.showTitle = true }, 100)
          setTimeout(() => { this.showImage = true }, 300)
          setTimeout(() => { this.showText = true }, 500)
          observer.disconnect()
        }
      })
    })
    observer.observe(this.$refs.aboutSection)
  },
  watch: {
    item: {
      immediate: true,
      handler(newItem) {
        if (newItem) {
          if (newItem.image) {
            this.showImage = true
            this.imagePath = baseApiUrl + newItem.image
          }
          this.aboutText = newItem.description
        }
      }
    }
  }
}
</script>

<style lang="css" scoped>
.about-section {
  color: #333;
  overflow: hidden;
  position: relative;
  min-height: 100vh;
  width: 100%;
  margin: 0 auto;
  padding: 60px 20px;
}

/* Animated background */
.bg-circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
}

.circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.05;
  animation: float-circle 20s infinite ease-in-out;
}

.circle-1 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #4d870f, #7cb342);
  top: -100px;
  left: -100px;
  animation-delay: 0s;
}

.circle-2 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #2196F3, #03A9F4);
  bottom: 100px;
  right: -50px;
  animation-delay: 5s;
}

.circle-3 {
  width: 250px;
  height: 250px;
  background: linear-gradient(135deg, #E91E63, #F06292);
  top: 50%;
  left: 50%;
  animation-delay: 10s;
}

@keyframes float-circle {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

/* Title animations */
.section-title {
  font-weight: 900;
  font-size: 2.8rem;
  background: linear-gradient(135deg, #4d870f 0%, #7cb342 50%, #2196F3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  display: inline-block;
  letter-spacing: -1px;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #666;
  font-weight: 500;
  margin-top: 8px;
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

/* Image section with decorative elements */
.image-wrapper {
  position: relative;
  display: inline-block;
}

.decorative-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  z-index: 0;
  animation: blob-animate 8s infinite ease-in-out;
}

.blob-1 {
  width: 200px;
  height: 200px;
  background: rgba(77, 135, 15, 0.2);
  top: -50px;
  left: -50px;
}

.blob-2 {
  width: 150px;
  height: 150px;
  background: rgba(33, 150, 243, 0.2);
  bottom: -30px;
  right: -30px;
  animation-delay: 4s;
}

@keyframes blob-animate {
  0%, 100% {
    transform: scale(1) translate(0, 0);
  }
  50% {
    transform: scale(1.1) translate(10px, 10px);
  }
}

.about-image-container {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  width: 500px;
  height: 500px;
  margin: 0 auto;
  z-index: 1;
  border: 4px solid white;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(77, 135, 15, 0.2) 0%, rgba(33, 150, 243, 0.2) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 1;
}

.about-image-container:hover .image-overlay {
  opacity: 1;
}

.about-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.8s ease;
}

.about-image-container:hover .about-image {
  transform: scale(1.1) rotate(2deg);
}

.image-badge {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: linear-gradient(135deg, #4d870f, #7cb342);
  color: white;
  padding: 10px 20px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 8px 20px rgba(77, 135, 15, 0.4);
  z-index: 2;
  animation: badge-pulse 2s infinite;
}

@keyframes badge-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Stats cards */
.stat-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  animation: slideUp 0.6s ease forwards;
  opacity: 0;
  border: 2px solid transparent;
}

.stat-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  border-color: #4d870f;
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
  from {
    opacity: 0;
    transform: translateY(20px);
  }
}

.stat-icon {
  margin-bottom: 8px;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 900;
  color: #333;
  margin: 8px 0;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

/* Content box */
.content-box {
  background: white;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  border: 1px solid rgba(77, 135, 15, 0.1);
}

.highlight-badge {
  position: absolute;
  top: -15px;
  left: 30px;
  background: linear-gradient(135deg, #2196F3, #03A9F4);
  color: white;
  padding: 8px 16px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 15px rgba(33, 150, 243, 0.4);
}

.about-text {
  line-height: 1.9;
  font-size: 1.05rem;
  color: #555;
  margin-bottom: 20px;
}

.text-highlight {
  background: linear-gradient(135deg, #4d870f20, #7cb34220);
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
  color: #4d870f;
}

.info-box {
  background: linear-gradient(135deg, #f8fdf4, #e8f5e0);
  border-left: 4px solid #4d870f;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: start;
  margin: 20px 0;
  box-shadow: 0 4px 15px rgba(77, 135, 15, 0.1);
}

/* Modules section */
.modules-section {
  background: linear-gradient(135deg, #f5f5f5, #fafafa);
  border-radius: 16px;
  padding: 24px;
}

.modules-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}

.modules-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.module-chip {
  background: white;
  border-radius: 50px;
  padding: 10px 18px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #555;
  display: inline-flex;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  animation: chipFade 0.5s ease forwards;
  opacity: 0;
  border: 2px solid transparent;
}

.module-chip:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  border-color: currentColor;
}

@keyframes chipFade {
  to {
    opacity: 1;
  }
}

/* Button */
.about-btn {
  background: linear-gradient(135deg, #4d870f, #7cb342) !important;
  color: #fff !important;
  transition: all 0.4s ease;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 8px 20px rgba(77, 135, 15, 0.3);
}

.about-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(77, 135, 15, 0.4);
}

/* Transitions */
.zoom-in-enter-active {
  animation: zoomIn 1s ease forwards;
}

.fade-slide-enter-active {
  animation: fadeSlide 1s ease forwards;
}

@keyframes zoomIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fadeSlide {
  0% {
    opacity: 0;
    transform: translateX(40px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .about-section {
    padding: 20px 5px; /* reduce section padding on mobile */
  }

  .section-title {
    font-size: 1.4rem; /* further reduce title size on mobile */
  }

  .title-wrapper {
    flex-direction: row; /* keep icon and title side-by-side on mobile */
    gap: 6px; /* tighter gap on mobile */
  }

  .title-icon {
    width: 48px !important;
    height: 48px !important;
    box-shadow: 0 4px 14px rgba(77, 135, 15, 0.22);
  }

  .title-icon :deep(.v-icon) {
    font-size: 24px !important;
  }

  .about-image-container {
    width: 280px;
    height: 280px;
  }

  .content-box {
    padding: 12px; /* tighter content padding on mobile */
  }

  .modules-grid {
    justify-content: center;
    gap: 8px; /* reduce chips gap */
  }

  .stat-card {
    margin-bottom: 8px;
    padding: 14px; /* reduce padding inside stat cards */
  }

  .info-box {
    flex-direction: column;
    padding: 14px; /* reduce padding in info boxes */
    margin: 12px 0; /* smaller vertical spacing */
  }

  .about-text {
    font-size: 0.95rem;
    line-height: 1.7;
    margin-bottom: 16px;
  }

  .module-chip {
    padding: 8px 12px; /* smaller chip padding */
    font-size: 0.8rem; /* smaller chip text */
  }
}

/* Title section (match Project Activities) */
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
</style>

