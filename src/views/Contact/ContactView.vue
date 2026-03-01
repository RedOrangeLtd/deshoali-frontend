<template>
  <div>
    <section ref="contactSection" class="contact-section py-5">
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
                    <v-icon color="white" size="large">mdi-phone-in-talk</v-icon>
                  </div>
                  <h2 class="section-title mb-2">Contact</h2>
                </div>
              </div>
            </transition>
          </v-col>
        </v-row>

        <!-- Contact Details -->
        <v-row class="justify-center mt-5">
          <v-col cols="12" lg="10">
            <transition name="fade-up">
              <div v-if="showContent">
                <!-- Single Contact Card -->
                <v-row class="justify-center">
                  <v-col cols="12" md="10" lg="8">
                    <div class="contact-card-single">
                      <div class="contact-body">
                        <div class="contact-item">
                          <div class="item-icon">
                            <v-icon color="#4d870f" size="large">mdi-map-marker</v-icon>
                          </div>
                          <div class="item-content">
                            <h4 class="item-label">Address</h4>
                            <p class="item-text">
                              House 18 (1st & 2nd Floor)<br>
                              Road 24, Block K<br>
                              Banani<br>
                              Dhaka 1213, Bangladesh
                            </p>
                          </div>
                        </div>

                        <div class="contact-divider"></div>

                        <div class="contact-item">
                          <div class="item-icon">
                            <v-icon color="#2196F3" size="large">mdi-email</v-icon>
                          </div>
                          <div class="item-content">
                            <h4 class="item-label">Email</h4>
                            <a href="mailto:info@redorangecom.com" class="item-link">
                              info@redorangecom.com
                            </a>
                          </div>
                        </div>

                        <div class="contact-divider"></div>

                        <div class="contact-item">
                          <div class="item-icon">
                            <v-icon color="#E91E63" size="large">mdi-phone</v-icon>
                          </div>
                          <div class="item-content">
                            <h4 class="item-label">Phone</h4>
                            <a href="tel:+8801714080469" class="item-link">
                              T +880 1714-080469
                            </a>
                          </div>
                        </div>
                      </div>
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
export default {
  name: 'ContactPage',
  props: {
    contacts: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      showTitle: false,
      showContent: false
    }
  },
  mounted() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => { this.showTitle = true }, 100)
          setTimeout(() => { this.showContent = true }, 400)
          observer.disconnect()
        }
      })
    })
    observer.observe(this.$refs.contactSection)
  }
}
</script>

<style lang="css" scoped>
.contact-section {
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

/* Single Contact Card */
.contact-card-single {
  background: white;
  border-radius: 24px;
  padding: 0;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  animation: fadeUp 0.8s ease forwards;
  opacity: 0;
  border: 2px solid transparent;
  overflow: hidden;
}

.contact-card-single:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border-color: #4d870f;
}

.contact-body {
  padding: 48px 40px;
}

.contact-item {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  transition: all 0.3s ease;
  padding: 8px;
  border-radius: 12px;
}

.contact-item:hover {
  background: #f8fdf4;
  transform: translateX(8px);
}

.item-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(135deg, #f8fdf4, #e8f5e9);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(77, 135, 15, 0.15);
  transition: all 0.3s ease;
}

.contact-item:hover .item-icon {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 6px 20px rgba(77, 135, 15, 0.25);
}

.item-content {
  flex: 1;
  padding-top: 4px;
}

.item-label {
  font-size: 0.9rem;
  font-weight: 700;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 8px 0;
}

.item-text {
  font-size: 1.05rem;
  color: #444;
  line-height: 1.8;
  margin: 0;
  font-weight: 500;
}

.item-link {
  font-size: 1.05rem;
  color: #4d870f;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
  position: relative;
}

.item-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #4d870f, #7cb342);
  transition: width 0.3s ease;
}

.item-link:hover {
  color: #7cb342;
}

.item-link:hover::after {
  width: 100%;
}

.contact-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, #e0e0e0, transparent);
  margin: 32px 0;
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

/* Info Banner */
.info-banner {
  background: white;
  border-radius: 20px;
  padding: 32px 40px;
  display: flex;
  align-items: center;
  gap: 24px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  border: 2px solid transparent;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.info-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #4d870f, #2196F3, #E91E63);
}

.info-banner:hover {
  border-color: #4d870f;
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

.banner-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FF9800, #FFC107);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 6px 20px rgba(255, 152, 0, 0.3);
}

.banner-content {
  flex: 1;
}

.banner-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin: 0 0 12px 0;
}

.banner-text {
  font-size: 1rem;
  color: #666;
  line-height: 1.8;
  margin: 0;
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
  .section-title {
    font-size: 2rem;
  }

  .title-wrapper {
    flex-direction: row; /* standardize with AboutUsSection */
    gap: 6px; /* standardize spacing */
  }

  .title-icon {
    width: 48px !important;
    height: 48px !important;
    box-shadow: 0 4px 14px rgba(77, 135, 15, 0.22);
  }

  .contact-body {
    padding: 32px 24px;
  }

  .contact-item {
    gap: 16px;
  }

  .item-icon {
    width: 48px;
    height: 48px;
  }
}

@media (max-width: 576px) {
  .contact-section {
    padding: 60px 16px;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .contact-body {
    padding: 28px 20px;
  }

  .contact-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .item-content {
    padding-top: 0;
  }

  .item-text, .item-link {
    font-size: 1rem;
  }
}
</style>
