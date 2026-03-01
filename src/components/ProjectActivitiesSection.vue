<template>
  <div>
    <section ref="paSection" class="activities-section py-5">
      <!-- Animated background elements -->
      <div class="bg-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
      </div>

      <v-container>
        <v-row>
          <v-col cols="12" class="text-center">
            <transition name="title-fade">
              <div v-if="showTitle">
                <div class="title-wrapper">
                  <div class="title-icon">
                    <v-icon color="white" size="large">mdi-clipboard-list</v-icon>
                  </div>
                  <h2 class="section-title mb-2">Project Activities</h2>
                </div>
<!--                <p class="section-subtitle">Transforming Lives Through Meaningful Action</p>-->
              </div>
            </transition>
          </v-col>
        </v-row>

        <v-row class="align-center mt-5">
          <!-- Left Media (Image or Video) -->
          <v-col cols="12" md="6" class="media-col">
            <transition name="zoom-in">
              <div v-if="showImage" class="media-wrapper">
                <!-- Decorative elements -->
                <div class="decorative-ring ring-1"></div>
                <div class="decorative-ring ring-2"></div>
                <div class="glow-effect"></div>

                <div class="media-container animate-float">
                  <!-- Media content - works for both image and video -->
                  <div class="media-content">
                    <!-- For Image -->
                    <img
                      v-if="mediaType === 'image'"
                      :src="mediaUrl"
                      alt="Project Activities"
                      class="media-element"
                    />
                    <!-- For Video -->
                    <video
                      v-else-if="mediaType === 'video'"
                      :src="mediaUrl"
                      class="media-element"
                      controls
                      playsinline
                    ></video>
                  </div>

                  <!-- Overlay gradient -->
                  <div class="media-overlay"></div>

                  <!-- Info badge -->
                  <div class="media-badge">
                    <v-icon size="small" color="white">
                      {{ mediaType === 'video' ? 'mdi-play-circle' : 'mdi-image' }}
                    </v-icon>
                    <span>{{ mediaType === 'video' ? 'Video' : 'Gallery' }}</span>
                  </div>

                  <!-- Decorative corner -->
                  <div class="corner-frame corner-tl"></div>
                  <div class="corner-frame corner-tr"></div>
                  <div class="corner-frame corner-bl"></div>
                  <div class="corner-frame corner-br"></div>
                </div>
              </div>
            </transition>
          </v-col>

          <!-- Right Text Content -->
          <v-col cols="12" md="6" class="text-section">
            <transition name="fade-slide">
              <div v-if="showText">
                <div class="content-wrapper">
                  <!-- Content header -->
<!--                  <div class="content-header">-->
<!--                    <div class="header-line"></div>-->
<!--                    <h3 class="content-label">Our Mission</h3>-->
<!--                  </div>-->

                  <!-- Main text content (dynamic from API) -->
                  <div class="text-content">
                    <div class="about-text" v-html="formattedText"></div>
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
import baseApiUrl from '@/constants/baseApiUrl.js'

export default {
  name: 'ProjectActivitiesSection',
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      showImage: false,
      showText: false,
      showTitle: false,
      mediaType: 'image', // 'image' or 'video'
      mediaUrl: '',
      textContent: '',
    }
  },
  computed: {
    formattedText() {
      return this.textContent
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
    observer.observe(this.$refs.paSection)
  },
  watch: {
    item: {
      immediate: true,
      handler(newItem) {
        if (newItem) {
          this.textContent = newItem.activity
          this.mediaUrl = `${baseApiUrl}${newItem.file}`
          if (newItem.file_type && newItem.file_type.includes('video')) {
            this.mediaType = 'video'
          }else {
            this.mediaType = 'image'
          }
        }
      },
    }
  }
}
</script>

<style lang="css" scoped>
.activities-section {
  background: linear-gradient(180deg, #ffffff 0%, #f0f9ff 50%, #fff8f0 100%);
  color: #333;
  overflow: hidden;
  position: relative;
  min-height: 100vh;
  width: 100%;
  padding: 80px 20px;
}

/* Animated background shapes */
.bg-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
}

.shape {
  position: absolute;
  opacity: 0.04;
  animation: shape-float 20s infinite ease-in-out;
}

.shape-1 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #4d870f, #7cb342);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  top: 10%;
  left: 5%;
}

.shape-2 {
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, #2196F3, #03A9F4);
  border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
  top: 60%;
  right: 10%;
  animation-delay: 5s;
}

.shape-3 {
  width: 180px;
  height: 180px;
  background: linear-gradient(135deg, #E91E63, #F06292);
  border-radius: 50%;
  bottom: 15%;
  left: 15%;
  animation-delay: 10s;
}

.shape-4 {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #FF9800, #FFC107);
  border-radius: 40% 60% 60% 40% / 60% 40% 60% 40%;
  top: 30%;
  right: 20%;
  animation-delay: 15s;
}

@keyframes shape-float {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(30px, -30px) rotate(90deg);
  }
  50% {
    transform: translate(0, -50px) rotate(180deg);
  }
  75% {
    transform: translate(-30px, -20px) rotate(270deg);
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

/* Media section (supports both image and video) */
.media-col {
  position: relative;
  z-index: 1;
}

.media-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.decorative-ring {
  position: absolute;
  border: 3px solid;
  border-radius: 24px;
  opacity: 0.3;
  animation: ring-pulse 4s infinite ease-in-out;
}

.ring-1 {
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  border-color: #4d870f;
  top: 10px;
  left: 10px;
}

.ring-2 {
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  border-color: #2196F3;
  top: 20px;
  left: 20px;
  animation-delay: 2s;
}

@keyframes ring-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.02);
    opacity: 0.1;
  }
}

.glow-effect {
  position: absolute;
  width: 80%;
  height: 80%;
  background: radial-gradient(circle, rgba(77, 135, 15, 0.15) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: blur(40px);
  animation: glow-pulse 3s infinite ease-in-out;
}

@keyframes glow-pulse {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

.media-container {
  position: relative;
  width: 100%;
  max-width: 500px;
  overflow: hidden;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

.media-content {
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1 aspect ratio - adjust as needed */
  background: #f0f0f0;
  border-radius: 24px;
  overflow: hidden;
}

.media-element {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.8s ease;
}

.media-container:hover .media-element {
  transform: scale(1.08);
}

.media-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(77, 135, 15, 0.1) 0%, rgba(33, 150, 243, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.media-container:hover .media-overlay {
  opacity: 1;
}

.media-badge {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6));
  backdrop-filter: blur(10px);
  color: white;
  padding: 10px 20px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  z-index: 3;
  animation: badge-float 3s infinite ease-in-out;
}

@keyframes badge-float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

/* Decorative corner frames */
.corner-frame {
  position: absolute;
  width: 30px;
  height: 30px;
  border: 3px solid white;
  z-index: 3;
  opacity: 0.8;
}

.corner-tl {
  top: 10px;
  left: 10px;
  border-right: none;
  border-bottom: none;
  border-radius: 8px 0 0 0;
}

.corner-tr {
  top: 10px;
  right: 10px;
  border-left: none;
  border-bottom: none;
  border-radius: 0 8px 0 0;
}

.corner-bl {
  bottom: 10px;
  left: 10px;
  border-right: none;
  border-top: none;
  border-radius: 0 0 0 8px;
}

.corner-br {
  bottom: 10px;
  right: 10px;
  border-left: none;
  border-top: none;
  border-radius: 0 0 8px 0;
}

/* Text content section */
.text-section {
  position: relative;
  z-index: 1;
}

.content-wrapper {
  position: relative;
}

.content-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.header-line {
  width: 4px;
  height: 40px;
  background: linear-gradient(180deg, #4d870f, #7cb342);
  border-radius: 2px;
}

.content-label {
  font-size: 1.4rem;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.text-content {
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(77, 135, 15, 0.1);
  position: relative;
}

/*.text-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #4d870f, #2196F3, #E91E63);
  border-radius: 20px 20px 0 0;
}*/

.about-text {
  line-height: 1.5;
  font-size: 1.05rem;
  color: #555;
  margin: 0;
}

/* Ensure any paragraphs coming from formattedText have no default spacing
   Note: content rendered via v-html is outside scoped CSS unless we use a deep selector. */
.about-text :deep(p) {
  margin: 0;
  padding: 0;
}

/* CTA buttons */
.cta-section {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.cta-btn {
  background: linear-gradient(135deg, #4d870f, #7cb342) !important;
  color: #fff !important;
  transition: all 0.4s ease;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 8px 20px rgba(77, 135, 15, 0.3);
}

.cta-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(77, 135, 15, 0.4);
}

.secondary-btn {
  border: 2px solid #4d870f !important;
  color: #4d870f !important;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.4s ease;
}

.secondary-btn:hover {
  background: #4d870f !important;
  color: white !important;
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(77, 135, 15, 0.3);
}

/* Highlights section */
.highlights-section {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.highlight-item {
  flex: 1;
  min-width: 150px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.highlight-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #4d870f;
}

.highlight-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.highlight-content {
  flex: 1;
}

.highlight-value {
  font-size: 1.4rem;
  font-weight: 900;
  color: #333;
  line-height: 1;
}

.highlight-label {
  font-size: 0.85rem;
  color: #666;
  margin-top: 4px;
}

/* Animations */
.zoom-in-enter-active {
  animation: zoomIn 1s ease forwards;
}

.fade-slide-enter-active {
  animation: fadeSlide 1s ease forwards;
}

@keyframes zoomIn {
  0% {
    transform: scale(0.9);
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
  .activities-section {
    padding: 20px 5px; /* reduce overall section padding on mobile */
  }

  .section-title {
    font-size: 1.4rem; /* further reduced title size on mobile */
  }

  .title-wrapper {
    flex-direction: row; /* keep icon and title side-by-side on mobile */
    gap: 6px; /* tighter gap */
  }

  .title-icon {
    width: 48px;
    height: 48px;
    box-shadow: 0 6px 18px rgba(77, 135, 15, 0.25);
  }

  .title-icon :deep(.v-icon) {
    font-size: 20px !important; /* smaller icon */
  }

  .media-wrapper {
    padding: 12px; /* reduce wrapper padding */
  }

  .media-container {
    max-width: 100%;
    margin-bottom: 20px; /* reduce margin under media */
  }

  .media-badge {
    bottom: 12px;
    left: 12px;
    padding: 6px 12px; /* reduce badge padding */
    border-radius: 40px;
    font-size: 0.75rem; /* smaller text */
    gap: 6px; /* tighter icon-text gap */
  }

  .corner-frame {
    width: 22px;
    height: 22px;
    border-width: 2px; /* thinner frame borders */
  }
  .corner-tl { top: 6px; left: 6px; }
  .corner-tr { top: 6px; right: 6px; }
  .corner-bl { bottom: 6px; left: 6px; }
  .corner-br { bottom: 6px; right: 6px; }

  .text-content {
    padding: 16px; /* reduce content padding */
  }

  .about-text {
    font-size: 0.95rem; /* slightly smaller body text on mobile */
  }

  .cta-section {
    flex-direction: column;
    gap: 8px; /* reduce buttons gap */
  }

  .cta-btn,
  .secondary-btn {
    width: 100%;
  }

  .highlights-section {
    flex-direction: column;
  }

  .highlight-item {
    min-width: 100%;
    padding: 12px; /* reduce card padding */
  }

  .highlight-icon {
    width: 40px; /* smaller highlight icon container */
    height: 40px;
  }

  .highlight-value {
    font-size: 1.2rem; /* smaller numbers */
  }

  .highlight-label {
    font-size: 0.8rem; /* smaller label */
  }
}
</style>
