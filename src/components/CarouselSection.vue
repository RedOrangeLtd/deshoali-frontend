<template>
  <div id="heroCarousel" class="carousel slide hero-carousel" data-bs-ride="carousel" data-bs-interval="5000">
    <!-- Enhanced Indicators -->
    <div class="carousel-indicators custom-indicators">
      <button
        v-for="(item, index) in items"
        :key="`indicator-${index}`"
        type="button"
        data-bs-target="#heroCarousel"
        :data-bs-slide-to="index"
        :class="{ active: index === 0 }"
        :aria-current="index === 0 ? 'true' : undefined"
        :aria-label="`Slide ${index + 1}`"
      >
        <span class="indicator-line"></span>
      </button>
    </div>

    <div class="carousel-inner">
      <div
        v-for="(item, index) in items"
        :key="`slide-${index}`"
        :class="['carousel-item', 'hero-slide', { active: index === 0 }]"
      >
        <img
          class="d-block w-100 hero-img"
          :src="baseApiUrl() + item.image"
          alt="Slide image"
          :loading="index === 0 ? 'eager' : 'lazy'"
        >

        <!-- Enhanced gradient overlay -->
        <div class="gradient-overlay"></div>

        <div class="hero-overlay">
          <div class="container px-3 px-md-4">
            <div class="hero-caption">
              <!-- Dynamic Title -->
              <component :is="index === 0 ? 'h1' : 'h2'" class="display-6 display-md-5 fw-bold mb-3 hero-title">
                {{ item.title }}
              </component>

              <!-- Dynamic Description -->
              <p v-if="item.description" class="lead mb-4 hero-description">
                {{ item.description }}
              </p>

              <!-- Optional Button -->
              <a
                v-if="item.show_btn !== false && (item.btn_text || item.btn_link)"
                :href="item.btn_link || '#'"
                class="btn btn-lg hero-btn"
              >
                {{ item.btn_text || 'Learn More' }}
                <v-icon size="small" class="ml-2">mdi-arrow-right</v-icon>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Controls -->
    <button class="carousel-control-prev custom-control" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev" aria-label="Previous">
      <span class="control-icon">
        <v-icon color="white" size="large">mdi-chevron-left</v-icon>
      </span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next custom-control" type="button" data-bs-target="#heroCarousel" data-bs-slide="next" aria-label="Next">
      <span class="control-icon">
        <v-icon color="white" size="large">mdi-chevron-right</v-icon>
      </span>
      <span class="visually-hidden">Next</span>
    </button>

    <!-- Scroll indicator -->
    <div class="scroll-indicator">
      <div class="scroll-icon">
        <v-icon color="white">mdi-chevron-down</v-icon>
      </div>
      <span class="scroll-text">Scroll to explore</span>
    </div>
  </div>
</template>

<script>
import baseApiUrl from '@/constants/baseApiUrl.js'

export default {
  name: 'CarouselComponent',
  methods: {
    baseApiUrl() {
      return baseApiUrl
    }
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="css" scoped>
.hero-carousel {
  position: relative;
  width: 100vw;
  max-width: 100vw !important;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  padding: 0 !important;
  overflow: hidden;
}

.hero-slide {
  height: clamp(500px, 85vh, 950px);
  background: #0b1220;
  position: relative;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  animation: ken-burns 20s ease-in-out infinite alternate;
}

@keyframes ken-burns {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}

/* Enhanced gradient overlay */
.gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(126, 163, 87, 0.4) 0%,
    rgba(33, 150, 243, 0.3) 100%
  );
  z-index: 1;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  color: #fff;
  padding-left: 30px;
  padding-right: 30px;
  z-index: 3;
}

.hero-caption {
  max-width: 920px;
}

.hero-title {
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.3);
  font-weight: 900 !important;
  letter-spacing: -1px;
}

.gradient-text {
  background: linear-gradient(135deg, #7cb342 0%, #4d870f 50%, #2196F3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}

.hero-description {
  text-shadow: 0 2px 15px rgba(0, 0, 0, 0.5);
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.6;
}

/* Single button styling */
.hero-btn {
  padding: 14px 32px;
  border-radius: 50px;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.4s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: linear-gradient(135deg, #4d870f, #7cb342) !important;
  color: white !important;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.hero-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(77, 135, 15, 0.5);
}

/* Custom indicators */
.custom-indicators {
  bottom: 30px;
  z-index: 10;
  gap: 12px;
}

.custom-indicators button {
  width: 50px;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  opacity: 1;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.custom-indicators button.active {
  background: white;
  width: 80px;
}

.indicator-line {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, #4d870f, #7cb342);
  transition: width 5s linear;
}

.custom-indicators button.active .indicator-line {
  width: 100%;
}

/* Custom controls */
.custom-control {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
}

.custom-control:hover {
  background: linear-gradient(135deg, #4d870f, #7cb342);
  border-color: #4d870f;
  transform: scale(1.1);
  opacity: 1;
}

.carousel-control-prev {
  left: 30px;
  margin-top: 5px;
}

.carousel-control-next {
  right: 30px;
  margin-top: 5px;
}

.control-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Scroll indicator */
.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  animation: scroll-bounce 2s infinite;
}

@keyframes scroll-bounce {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-10px);
  }
}

.scroll-icon {
  width: 30px;
  height: 45px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 6px;
}

.scroll-icon .v-icon {
  animation: scroll-arrow 2s infinite;
}

@keyframes scroll-arrow {
  0%, 100% {
    transform: translateY(0);
    opacity: 0;
  }
  50% {
    transform: translateY(8px);
    opacity: 1;
  }
}

.scroll-text {
  font-size: 0.75rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

/* Entrance animations */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translate3d(0, 40px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.hero-caption > * {
  opacity: 0;
  transform: translateY(30px);
  will-change: opacity, transform;
}

.carousel-item.active .hero-caption > * {
  animation: fadeUp 800ms ease-out forwards;
}

.carousel-item.active .hero-caption > *:nth-child(1) { animation-delay: 0.1s; }
.carousel-item.active .hero-caption > *:nth-child(2) { animation-delay: 0.3s; }
.carousel-item.active .hero-caption > *:nth-child(3) { animation-delay: 0.5s; }

/* Responsive */
@media (max-width: 992px) {
  .hero-caption h1,
  .hero-caption h2 {
    font-size: clamp(1.6rem, 5vw, 2.5rem);
  }

  .hero-description {
    font-size: clamp(1rem, 3vw, 1.2rem);
  }

  .hero-slide {
    height: clamp(450px, 70vh, 800px);
  }

  .scroll-indicator {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero-btn {
    width: 100%;
    justify-content: center;
  }

  .custom-control {
    width: 45px;
    height: 45px;
  }

  .carousel-control-prev {
    left: 10px;
  }

  .carousel-control-next {
    right: 10px;
  }

  .custom-indicators {
    bottom: 20px;
  }

  .custom-indicators button {
    width: 40px;
  }

  .custom-indicators button.active {
    width: 60px;
  }
}

@media (max-width: 576px) {
  .hero-slide {
    height: clamp(400px, 65vh, 700px);
  }

  .hero-btn {
    padding: 12px 24px;
    font-size: 0.95rem;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .hero-caption > *,
  .carousel-item.active .hero-caption > *,
  .hero-img {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>
