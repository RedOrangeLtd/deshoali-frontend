<template>
  <div class="team-body">
    <section ref="teamSection" class="team-section py-5">
      <!-- Animated background elements -->
      <div class="bg-pattern">
        <div class="pattern-circle pattern-1"></div>
        <div class="pattern-circle pattern-2"></div>
        <div class="pattern-circle pattern-3"></div>
      </div>

      <v-container>
        <v-row>
          <v-col cols="12" class="text-center mb-0 pb-0">
            <transition name="title-fade">
              <div v-if="showTitle">
                <div class="title-wrapper">
                  <div class="title-icon">
                    <v-icon color="white" size="large">mdi-account-group</v-icon>
                  </div>
                  <h2 class="section-title mb-2">Meet Our Team</h2>
                </div>
<!--                <p class="section-subtitle">Dedicated Professionals Making a Difference</p>-->
              </div>
            </transition>
          </v-col>
        </v-row>

        <v-row class="justify-center mt-5">
          <v-col cols="12">
            <div class="slider-container position-relative">
              <!-- Slider -->
              <div
                class="slider-wrapper"
                :style="{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }"
                :class="{ 'centered-items': members.length < visibleCount }"
              >
                <div
                  v-for="(member, index) in members"
                  :key="index"
                  class="slider-item cursor-pointer"
                  :style="{ animationDelay: `${index * 0.1}s` }"
                  @click="goToDetails(member)"
                >
                  <div class="team-card" @mouseenter="member.hovered = true" @mouseleave="member.hovered = false">
                    <!-- Image container with overlay -->
                    <div class="image-container">
                      <img :src="member.image" alt="team member" class="team-image" />
<!--                      <div class="image-overlay" :class="{ 'active': member.hovered }">-->
<!--                        <div class="social-links">-->
<!--                          <button class="social-btn">-->
<!--                            <v-icon color="white">mdi-linkedin</v-icon>-->
<!--                          </button>-->
<!--                          <button class="social-btn">-->
<!--                            <v-icon color="white">mdi-email</v-icon>-->
<!--                          </button>-->
<!--                          <button class="social-btn">-->
<!--                            <v-icon color="white">mdi-phone</v-icon>-->
<!--                          </button>-->
<!--                        </div>-->
<!--                      </div>-->
                      <!-- Badge -->
<!--                      <div class="member-badge">-->
<!--                        <v-icon size="small" color="white">mdi-account-star</v-icon>-->
<!--                      </div>-->
                    </div>

                    <!-- Card body -->
                    <div class="card-body">
                      <h5 class="member-name">{{ member.name }}</h5>
                      <p class="member-role">{{ member.role }}</p>

                      <!-- Decorative line -->
                      <div class="role-divider"></div>

                      <!-- Stats or info -->
                      <div class="member-stats">
                        <div class="stat-item">
                          <v-icon size="small" color="#4d870f">mdi-briefcase</v-icon>
                          <span>Expert</span>
                        </div>
                      </div>
                    </div>

                    <!-- Decorative corner -->
                    <div class="corner-decoration"></div>
                  </div>
                </div>
              </div>

              <!-- Navigation -->
              <button class="nav-btn prev-btn ml-3" @click="prevSlide">
                <v-icon icon="mdi-chevron-left" size="large"></v-icon>
              </button>
              <button class="nav-btn next-btn mr-3" @click="nextSlide">
                <v-icon icon="mdi-chevron-right" size="large"></v-icon>
              </button>

              <!-- Progress dots -->
              <div class="progress-dots">
                <button
                  v-for="(dot, index) in Math.ceil(members.length / visibleCount)"
                  :key="index"
                  class="dot"
                  :class="{ active: currentIndex === index }"
                  @click="goToSlide(index)"
                ></button>
              </div>
            </div>
          </v-col>
        </v-row>

<!--        &lt;!&ndash; Additional info section &ndash;&gt;-->
<!--        <v-row class="mt-5">-->
<!--          <v-col cols="12" md="4" v-for="(info, index) in teamInfo" :key="index">-->
<!--            <transition name="fade-up">-->
<!--              <div v-if="showInfo" class="info-card" :style="{ animationDelay: `${index * 0.2}s` }">-->
<!--                <div class="info-icon" :style="{ background: info.gradient }">-->
<!--                  <v-icon color="white" size="large">{{ info.icon }}</v-icon>-->
<!--                </div>-->
<!--                <h4 class="info-title">{{ info.title }}</h4>-->
<!--                <p class="info-text">{{ info.text }}</p>-->
<!--              </div>-->
<!--            </transition>-->
<!--          </v-col>-->
<!--        </v-row>-->
      </v-container>
    </section>
  </div>
</template>

<script>
import baseApiUrl from '@/constants/baseApiUrl.js'
export default {
  name: 'TeamSection',
  props: {
    items: { type: Array, default: () => [] },
  },
  data() {
    return {
      currentIndex: 0,
      autoSlideInterval: null,
      visibleCount: 4,
      showTitle: false,
      showInfo: false,
      members: [
      ],
      // teamInfo: [
      //   {
      //     icon: 'mdi-account-group',
      //     title: 'Expert Team',
      //     text: 'Our diverse team brings years of experience in healthcare and development.',
      //     gradient: 'linear-gradient(135deg, #4d870f, #7cb342)'
      //   },
      //   {
      //     icon: 'mdi-earth',
      //     title: 'Global Impact',
      //     text: 'Working across communities to create lasting positive change.',
      //     gradient: 'linear-gradient(135deg, #2196F3, #03A9F4)'
      //   },
      //   {
      //     icon: 'mdi-heart-pulse',
      //     title: 'Committed Care',
      //     text: 'Dedicated to improving health outcomes for vulnerable populations.',
      //     gradient: 'linear-gradient(135deg, #E91E63, #F06292)'
      //   }
      // ]
    }
  },
  watch: {
    items: {
      immediate: true,
      handler(newItems) {
        this.members = newItems.map(item => ({
          id: item.id,
          name: item.name,
          role: item.designation,
          image: baseApiUrl + item.image,
          hovered: false,
        }))
      },
    }
  },
  mounted() {
    this.startAutoSlide()
    window.addEventListener('resize', this.updateVisibleCount)
    this.updateVisibleCount()

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => { this.showTitle = true }, 100)
          setTimeout(() => { this.showInfo = true }, 800)
          observer.disconnect()
        }
      })
    })
    observer.observe(this.$refs.teamSection)
  },
  beforeUnmount() {
    clearInterval(this.autoSlideInterval)
    window.removeEventListener('resize', this.updateVisibleCount)
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % (this.members.length - this.visibleCount + 1)
      this.resetAutoSlide()
    },
    prevSlide() {
      this.currentIndex =
        (this.currentIndex - 1 + (this.members.length - this.visibleCount + 1)) %
        (this.members.length - this.visibleCount + 1)
      this.resetAutoSlide()
    },
    goToSlide(index) {
      this.currentIndex = index
      this.resetAutoSlide()
    },
    startAutoSlide() {
      this.autoSlideInterval = setInterval(() => {
        this.nextSlide()
      }, 5000)
    },
    resetAutoSlide() {
      clearInterval(this.autoSlideInterval)
      this.autoSlideInterval = setInterval(() => {
        this.nextSlide()
      }, 5000)
    },
    updateVisibleCount() {
      const width = window.innerWidth
      if (width < 768) this.visibleCount = 1
      else if (width < 992) this.visibleCount = 2
      else if (width < 1200) this.visibleCount = 3
      else this.visibleCount = 4
    },
    goToDetails(item) {
      this.$router.push(`/team-member-details/${this.hyphenateString(item.name)}/${item.id}`)
    },
    hyphenateString(inputString) {
      if (!inputString || inputString.trim() === "") {
        return "name";
      }
      const hyphenated = inputString.trim().replace(/\s+/g, "-");
      return hyphenated.toLowerCase();
    }
  },
}
</script>

<style scoped>
.team-body {
  background: linear-gradient(180deg, #f8fdf4 0%, #ffffff 100%);
  position: relative;
  overflow: hidden;
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

.team-section {
  max-width: 1300px;
  margin: 0 auto;
  padding: 60px 20px;
  position: relative;
  z-index: 1;
}

/* Title styling */
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

/* Slider styling */
.slider-container {
  overflow: hidden;
  position: relative;
  width: 100%;
  padding: 0 0 60px;
}

.slider-wrapper {
  display: flex;
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.slider-wrapper.centered-items {
  justify-content: center;
}

.slider-item {
  flex: 0 0 calc(100% / 4);
  padding: 15px;
  animation: slideIn 0.6s ease forwards;
  opacity: 0;
}

@keyframes slideIn {
  to {
    opacity: 1;
  }
}

/* Team card */
.team-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  height: 100%;
  border: 2px solid transparent;
}

.team-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 20px 60px rgba(77, 135, 15, 0.25);
  border-color: #4d870f;
}

/* Image container */
.image-container {
  position: relative;
  overflow: hidden;
  height: 280px;
}

.team-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.team-card:hover .team-image {
  transform: scale(1.15);
}

/* Image overlay */
.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(77, 135, 15, 0.95), rgba(124, 179, 66, 0.95));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.image-overlay.active {
  opacity: 1;
}

.social-links {
  display: flex;
  gap: 15px;
  transform: translateY(20px);
  transition: transform 0.4s ease;
}

.image-overlay.active .social-links {
  transform: translateY(0);
}

.social-btn {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.social-btn:hover {
  background: white;
  transform: translateY(-5px) rotate(360deg);
}

.social-btn:hover .v-icon {
  color: #4d870f !important;
}

/* Member badge */
.member-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.5);
  animation: badge-bounce 2s infinite;
}

@keyframes badge-bounce {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* Card body */
.card-body {
  padding: 24px;
  background: white;
  position: relative;
}

.member-name {
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
  transition: color 0.3s ease;
}

.team-card:hover .member-name {
  color: #4d870f;
}

.member-role {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 12px;
  line-height: 1.5;
  min-height: 42px;
}

.role-divider {
  width: 50px;
  height: 3px;
  background: linear-gradient(90deg, #4d870f, transparent);
  margin: 12px 0;
  border-radius: 2px;
  transition: width 0.3s ease;
}

.team-card:hover .role-divider {
  width: 100%;
}

.member-stats {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: #666;
  background: linear-gradient(135deg, #f8fdf4, #e8f5e0);
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 600;
}

/* Corner decoration */
.corner-decoration {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, transparent 50%, #4d870f15 50%);
  border-top-left-radius: 20px;
}

/* Navigation buttons */
.nav-btn {
  position: absolute;
  top: 40%;
  transform: translateY(-50%);
  background: white;
  border: 2px solid #4d870f;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.nav-btn:hover {
  background: linear-gradient(135deg, #4d870f, #7cb342);
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 6px 20px rgba(77, 135, 15, 0.4);
}

.nav-btn:hover .v-icon {
  color: white !important;
}

.prev-btn {
  left: -10px;
}

.next-btn {
  right: -10px;
}

/* Progress dots */
.progress-dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ddd;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: linear-gradient(135deg, #4d870f, #7cb342);
  width: 30px;
  border-radius: 6px;
}

.dot:hover {
  background: #4d870f;
  transform: scale(1.2);
}

/* Info cards */
.info-card {
  background: white;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  animation: fadeUp 0.6s ease forwards;
  opacity: 0;
  border: 2px solid transparent;
  height: 100%;
}

.info-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.15);
  border-color: #4d870f;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
  from {
    opacity: 0;
    transform: translateY(30px);
  }
}

.info-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  animation: icon-pulse 2s infinite;
}

@keyframes icon-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.info-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 12px;
}

.info-text {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

/* Responsive */
@media (max-width: 1200px) {
  .slider-item {
    flex: 0 0 calc(100% / 3);
  }
}

@media (max-width: 992px) {
  .slider-item {
    flex: 0 0 calc(100% / 2);
  }
  .image-container {
    height: 240px;
  }
  .section-title {
    font-size: 2.2rem;
  }
}

@media (max-width: 768px) {
  .slider-item {
    flex: 0 0 100%;
  }
  .image-container {
    height: 300px;
  }
  .nav-btn {
    width: 40px;
    height: 40px;
  }
  .prev-btn {
    left: 5px;
  }
  .next-btn {
    right: 5px;
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
