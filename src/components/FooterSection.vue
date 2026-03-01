<template>
  <div class="footer-section" style="background: #E9F4DB">
    <v-container style="max-width: 1320px;">
      <v-row class="align-start">
        <!-- Logo and Developer Info -->
        <v-col cols="12" md="5" class="footer-col">
          <div class="logo-section">
            <div class="logo-container">
              <img src="/Logo2.png" alt="Logo" class="footer-logo">
            </div>
            <p class="developer-text mb-0 pb-0">
              Developed By<br>
              <a href="https://redorangecom.com/" target="_blank">
                <img src="/redorange.jpg" alt="" height="25" width="120" style="margin-top: 2px">
              </a>
<!--              <span class="developer-name">RedOrange ICT Solutions</span>-->
            </p>
          </div>
        </v-col>

        <!-- Quick Links -->
        <v-col cols="12" md="4" class="footer-col">
          <h3 class="footer-heading">Quick Links</h3>
          <div class="footer-links">
            <a href="#about-us" class="footer-link">
              <v-icon size="small" class="link-icon">mdi-chevron-right</v-icon>
              <span>About Us</span>
            </a>
            <a href="#project-team" class="footer-link">
              <v-icon size="small" class="link-icon">mdi-chevron-right</v-icon>
              <span>Project Team</span>
            </a>
            <a href="#activities" class="footer-link">
              <v-icon size="small" class="link-icon">mdi-chevron-right</v-icon>
              <span>Activities</span>
            </a>
            <a href="#srhr-contents" class="footer-link">
              <v-icon size="small" class="link-icon">mdi-chevron-right</v-icon>
              <span>SRHR Contents</span>
            </a>
          </div>
        </v-col>

        <!-- Social Media -->
        <v-col cols="12" md="3" class="footer-col">
          <h3 class="footer-heading">Follow Us</h3>
          <div class="social-icons">
            <a v-if="socialMedias.facebook" :href="socialMedias.facebook" class="social-icon facebook" aria-label="Facebook" target="_blank">
              <v-icon color="white">mdi-facebook</v-icon>
            </a>
            <a v-if="socialMedias.instagram" :href="socialMedias.instagram" class="social-icon instagram" aria-label="Instagram" target="_blank">
              <v-icon color="white">mdi-instagram</v-icon>
            </a>
            <a v-if="socialMedias.twitter" :href="socialMedias.twitter" class="social-icon twitter" aria-label="Twitter/X" target="_blank">
              <v-icon color="white">mdi-twitter</v-icon>
            </a>
            <a v-if="socialMedias.linkedin" :href="socialMedias.linkedin" class="social-icon linkedin" aria-label="LinkedIn" target="_blank">
              <v-icon color="white">mdi-linkedin</v-icon>
            </a>
            <a v-if="socialMedias.youtube" :href="socialMedias.youtube" class="social-icon youtube" aria-label="YouTube" target="_blank">
              <v-icon color="white">mdi-youtube</v-icon>
            </a>
          </div>
        </v-col>
      </v-row>

      <!-- Bottom Bar -->
      <v-row class="mt-4">
        <v-col cols="12">
          <div class="footer-bottom">
            <div class="divider"></div>
            <p class="copyright-text">
              © {{ currentYear }} Deshoali. All rights reserved.
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import apiUrl from '@/constants/apiUrl.js'

export default {
  name: 'FooterSection',
  props: {
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      socialMedias: {
        facebook: '',
        instagram: '',
        twitter: '',
        linkedin: '',
        youtube: ''
      }
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

<style lang="css" scoped>
.footer-section {
  background: white;
  padding: 60px 20px 30px;
  position: relative;
  border-top: 3px solid transparent;
  border-image: linear-gradient(90deg, #4d870f, #2196F3, #E91E63) 1;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  width: 100vw;
}

.footer-col {
  margin-bottom: 30px;
}

/* Logo Section */
.logo-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.logo-container {
  display: inline-block;
  padding: 12px;
  background: linear-gradient(135deg, #f8fdf4, #e8f5e0);
  border-radius: 16px;
  width: fit-content;
  box-shadow: 0 4px 15px rgba(77, 135, 15, 0.1);
  transition: all 0.3s ease;
}

.logo-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(77, 135, 15, 0.2);
}

.footer-logo {
  height: 100px;
  width: 100px;
  display: block;
}

.developer-text {
  font-size: 0.95rem;
  color: #666;
  margin: 0;
  font-weight: 500;
}

.developer-name {
  display: block;
  font-weight: 700;
  font-size: 1.05rem;
  background: linear-gradient(135deg, #4d870f, #7cb342);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-top: 4px;
}

/* Footer Heading */
.footer-heading {
  font-size: 1.3rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 12px;
}

.footer-heading::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(90deg, #4d870f, #7cb342);
  border-radius: 2px;
}

/* Footer Links */
.footer-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.footer-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 3px;
  background: linear-gradient(180deg, #016838, #05cc6f);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.footer-link:hover {
  color: #016838;
  background: linear-gradient(135deg, #f8fdf4, #e8f5e0);
  transform: translateX(8px);
}

.footer-link:hover::before {
  transform: scaleY(1);
}

.link-icon {
  transition: transform 0.3s ease;
}

.footer-link:hover .link-icon {
  transform: translateX(4px);
  color: #016838;
}

/* Social Icons */
.social-icons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.social-icon {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.social-icon::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.social-icon:hover {
  transform: translateY(-5px) scale(1.1);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.social-icon:hover::before {
  opacity: 1;
}

/* Social media brand colors */
.facebook {
  background: linear-gradient(135deg, #1877F2, #0C63D4);
}

.instagram {
  background: linear-gradient(135deg, #E1306C, #C13584, #833AB4, #5851DB);
}

.twitter {
  background: linear-gradient(135deg, #000000, #333333);
}

.linkedin {
  background: linear-gradient(135deg, #0077B5, #005885);
}

.youtube {
  background: linear-gradient(135deg, #FF0000, #CC0000);
}

/* Footer Bottom */
.footer-bottom {
  text-align: center;
  padding-top: 20px;
}

.divider {
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #4d870f, #2196F3, #E91E63, transparent);
  margin-bottom: 20px;
  opacity: 0.3;
}

.copyright-text {
  font-size: 0.9rem;
  color: #999;
  margin: 0;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .footer-section {
    padding: 40px 20px 20px;
  }

  .footer-col {
    text-align: center;
    margin-bottom: 40px;
  }

  .logo-container {
    margin: 0 auto;
  }

  .footer-heading::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .footer-links {
    align-items: center;
  }

  .footer-link {
    width: 100%;
    max-width: 250px;
    justify-content: center;
  }

  .social-icons {
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .footer-logo {
    height: 80px;
    width: 80px;
  }

  .footer-heading {
    font-size: 1.1rem;
  }

  .social-icon {
    width: 40px;
    height: 40px;
  }
}
</style>
