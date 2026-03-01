<template>
  <div>
    <section ref="detailSection" class="member-detail-section py-5">
      <!-- Animated background elements -->
      <div class="bg-pattern">
        <div class="pattern-circle pattern-1"></div>
        <div class="pattern-circle pattern-2"></div>
        <div class="pattern-circle pattern-3"></div>
      </div>

      <v-container>
        <!-- Title Section -->
        <v-row>
          <v-col cols="12" class="text-center">
            <transition name="title-fade">
              <div v-if="showTitle">
                <div class="title-wrapper">
                  <div class="title-icon">
                    <v-icon color="white" size="large">mdi-account-circle</v-icon>
                  </div>
                  <h2 class="section-title mb-2">{{ memberData.name }}</h2>
                </div>
              </div>
            </transition>
          </v-col>
        </v-row>

        <!-- Detail Card -->
        <v-row class="justify-center mt-5">
          <v-col cols="12" lg="12">
            <transition name="fade-up">
              <div v-if="showCard" class="detail-card">
                <!-- Top gradient border -->
                <div class="card-top-border"></div>

                <v-row class="align-start">
                  <!-- Left Side - Image -->
                  <v-col cols="12" md="4" class="image-col">
                    <div class="image-wrapper">
                      <!-- Decorative elements -->
                      <div class="image-glow"></div>

                      <div class="image-container">
                        <!-- Corner decorations -->
                        <div class="corner-frame corner-tl"></div>
                        <div class="corner-frame corner-tr"></div>
                        <div class="corner-frame corner-bl"></div>
                        <div class="corner-frame corner-br"></div>

                        <!-- Image or placeholder -->
                        <div v-if="memberData.image" class="member-image-wrapper">
                          <img :src="memberData.image" alt="Member" class="member-image" />
                        </div>
                        <div v-else class="image-placeholder">
                          <v-icon color="#4d870f" size="80">mdi-account-circle</v-icon>
                          <p class="placeholder-text">No Image Available</p>
                        </div>

                        <!-- Badge -->
<!--                        <div class="member-badge">-->
<!--                          <v-icon size="small" color="white">mdi-account-star</v-icon>-->
<!--                        </div>-->
                      </div>
                    </div>
                  </v-col>

                  <!-- Right Side - Details -->
                  <v-col cols="12" md="8" class="details-col">
                    <div class="details-content">
                      <!-- Designation and Email -->
                      <div class="detail-item info-item">
                        <div class="info-row">
                          <span class="info-label">Designation:</span>
                          <span class="info-value">{{ memberData.designation || 'Not specified' }}</span>
                        </div>
                        <div class="info-row">
                          <span class="info-label">Email:</span>
                          <a
                            v-if="memberData.email"
                            :href="`mailto:${memberData.email}`"
                            class="info-value email-link"
                          >
                            {{ memberData.email }}
                          </a>
                          <span v-else class="info-value">Not specified</span>
                        </div>
                      </div>

                      <!-- Description -->
                      <div class="detail-item description-item">
                        <div class="detail-header">
                          <div class="detail-icon description-icon">
                            <v-icon color="white">mdi-text-box</v-icon>
                          </div>
                          <h3 class="detail-label">About</h3>
                        </div>
                        <p class="detail-value description-text">
                          {{ memberData.description || 'No description available for this team member.' }}
                        </p>
                      </div>
                    </div>
                  </v-col>
                  <v-col>
                    <!-- Action Buttons -->
                    <div class="action-buttons mt-4">
                      <!--                        <v-btn-->
                      <!--                          v-if="memberData.email"-->
                      <!--                          class="contact-btn"-->
                      <!--                          size="large"-->
                      <!--                          elevation="0"-->
                      <!--                          rounded="lg"-->
                      <!--                          :href="`mailto:${memberData.email}`"-->
                      <!--                        >-->
                      <!--                          <v-icon class="mr-2">mdi-email</v-icon>-->
                      <!--                          Contact-->
                      <!--                        </v-btn>-->
                      <v-btn
                        class="back-btn"
                        size="large"
                        elevation="0"
                        rounded="lg"
                        variant="outlined"
                        @click="goBack"
                      >
                        <v-icon class="mr-2">mdi-arrow-left</v-icon>
                        Back to Team
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </transition>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
import apiUrl from '@/constants/apiUrl.js'
import baseApiUrl from '@/constants/baseApiUrl.js'

export default {
  name: 'TeamMemberDetail',
  props: {
  },
  data() {
    return {
      showTitle: false,
      showCard: false,
      memberData: {},
    }
  },
  mounted() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => { this.showTitle = true }, 100)
          setTimeout(() => { this.showCard = true }, 400)
          observer.disconnect()
        }
      })
    })
    observer.observe(this.$refs.detailSection)

    this.loadData()
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    loadData() {
      const id = this.$route.params.id
      if (id) {
        const url = `${apiUrl}/team/${id}`
        this.$axios.get(url).then((response) => {
          console.log(response.data)
          if (response.data.success) {
            const member = response.data.data
            this.memberData = {
              name: member.name,
              designation: member.designation,
              email: member.email,
              description: member.description,
              image: member.image ? `${baseApiUrl}${member.image}` : ''
            }
          }

        })
          .catch(error => console.log(error))
      }
    }
  }
}
</script>

<style lang="css" scoped>
.member-detail-section {
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

/* Detail Card */
.detail-card {
  background: white;
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 12px 50px rgba(0, 0, 0, 0.1);
  position: relative;
  border: 2px solid rgba(77, 135, 15, 0.1);
  overflow: hidden;
}

.card-top-border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, #4d870f, #2196F3, #E91E63);
}

/* Image Section */
.image-col {
  position: relative;
  z-index: 1;
}

.image-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-glow {
  position: absolute;
  width: 80%;
  height: 80%;
  background: radial-gradient(circle, rgba(77, 135, 15, 0.15) 0%, transparent 70%);
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

.image-container {
  position: relative;
  width: 100%;
  max-width: 350px;
  aspect-ratio: 1;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #f8fdf4, #e8f5e0);
}

.member-image-wrapper {
  width: 100%;
  height: 100%;
}

.member-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s ease;
}

.detail-card:hover .member-image {
  transform: scale(1.08);
}

/* Image Placeholder */
.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.placeholder-text {
  font-size: 0.9rem;
  color: #666;
  font-weight: 600;
  margin: 0;
}

/* Corner frames */
.corner-frame {
  position: absolute;
  width: 30px;
  height: 30px;
  border: 3px solid #4d870f;
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

/* Member badge */
.member-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.5);
  z-index: 4;
  animation: badge-float 3s infinite ease-in-out;
}

@keyframes badge-float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

/* Details Section */
.details-col {
  display: flex;
  align-items: stretch;
}

.details-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.detail-item {
  background: linear-gradient(135deg, #f8fdf4, #ffffff);
  border-radius: 16px;
  padding: 24px;
  border-left: 4px solid transparent;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.detail-item:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* Info Item (Designation and Email) */
.info-item {
  border-left-color: #4d870f;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-item:hover {
  background: linear-gradient(135deg, #f8fdf4, #e8f5e0);
}

.info-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.info-label {
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
  min-width: 120px;
}

.info-value {
  font-size: 1rem;
  color: #555;
  font-weight: 500;
}

.email-link {
  color: #2196F3;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
}

.email-link:hover {
  color: #1976D2;
  transform: translateX(5px);
}

/* Description Item */
.description-item {
  border-left-color: #E91E63;
}

.description-item:hover {
  background: linear-gradient(135deg, #fef5f8, #fce4ec);
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.detail-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.designation-icon {
  background: linear-gradient(135deg, #4d870f, #7cb342);
}

.email-icon {
  background: linear-gradient(135deg, #2196F3, #03A9F4);
}

.description-icon {
  background: linear-gradient(135deg, #E91E63, #F06292);
}

.detail-label {
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.detail-value {
  font-size: 1rem;
  color: #555;
  line-height: 1.7;
  margin: 0;
}

.description-text {
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.contact-btn {
  background: linear-gradient(135deg, #4d870f, #7cb342) !important;
  color: white !important;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 8px 20px rgba(77, 135, 15, 0.3);
  transition: all 0.4s ease;
}

.contact-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(77, 135, 15, 0.4);
}

.back-btn {
  border: 2px solid #4d870f !important;
  color: #4d870f !important;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.4s ease;
}

.back-btn:hover {
  background: #4d870f !important;
  color: white !important;
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(77, 135, 15, 0.3);
}

/* Fade up animation */
.fade-up-enter-active {
  animation: fadeUp 0.8s ease forwards;
}

@keyframes fadeUp {
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
  .section-title {
    font-size: 2rem;
  }

  .title-wrapper {
    flex-direction: row; /* standardize with AboutUsSection */
    gap: 6px; /* standardize spacing */
  }

  .detail-card {
    padding: 24px;
  }

  .image-container {
    max-width: 280px;
    margin: 0 auto 30px;
  }

  .details-content {
    gap: 16px;
  }

  .detail-item {
    padding: 20px;
  }

  .info-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .info-label {
    min-width: auto;
    font-size: 1rem;
  }

  .action-buttons {
    flex-direction: column;
  }

  .contact-btn,
  .back-btn {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .member-detail-section {
    padding: 60px 16px;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .detail-label {
    font-size: 1.1rem;
  }

  .detail-value {
    font-size: 0.95rem;
  }
}
</style>
