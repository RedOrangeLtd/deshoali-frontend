<template>
  <div class="sticky-header">
    <!-- Android Download Banner -->
    <div class="android-banner">
      <div class="banner-content">
        <div class="banner-text-wrapper">
          <v-icon class="banner-icon">mdi-android</v-icon>
          <p class="banner-text">দেশোয়ালি এপ ডাউনলোড করতে ডাউনলোড বাটনে ক্লিক করুন।</p>
        </div>
        <v-btn
          prepend-icon="mdi-download"
          class="download-btn"
          rounded="pill"
          size="small"
          elevation="4"
          @click="downloadData"
        >
          ডাউনলোড
        </v-btn>
      </div>
    </div>

    <!-- Main Navbar -->
    <header class="navbar">
      <div class="navbar-glow"></div>
      <div class="container nav-inner">
        <!-- Logo with animation -->
        <router-link to="/" class="brand" aria-label="Go to home">
          <div class="logo-wrapper">
            <img src="/Logo2.png" alt="Logo" class="logo" />
            <div class="logo-ring"></div>
          </div>
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="links" aria-label="Primary">
          <router-link
            v-for="item in navItems"
            :key="item.label"
            :to="item.to"
            :exact-active-class="item.exactActiveClass"
            class="link"
          >
            <span class="link-text">{{ item.label }}</span>
            <span class="link-bg"></span>
          </router-link>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          class="menu-btn"
          @click="toggleMenu"
          :class="{ 'is-active': isOpen }"
          :aria-expanded="isOpen.toString()"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation"
        >
          <span class="bar bar1"></span>
          <span class="bar bar2"></span>
          <span class="bar bar3"></span>
        </button>
      </div>

      <!-- Mobile Menu -->
      <transition name="slide-fade">
        <nav v-if="isOpen" id="mobile-menu" class="mobile-menu" aria-label="Mobile Primary">
          <router-link
            v-for="(item, index) in navItems"
            :key="item.label"
            :to="item.to"
            :exact-active-class="item.exactActiveClass"
            class="m-link"
            :style="{ animationDelay: `${index * 50}ms` }"
            @click="closeMenu"
          >
            <v-icon class="m-link-icon">{{ item.icon }}</v-icon>
            <span>{{ item.label }}</span>
            <v-icon class="m-link-arrow">mdi-chevron-right</v-icon>
          </router-link>
        </nav>
      </transition>
    </header>
  </div>
</template>

<script>
import apiUrl from '@/constants/apiUrl.js'

export default {
  name: 'AppNavbar',
  data() {
    return {
      isOpen: false,
      navItems: [
        // Keep active state for real routes like Home and Resources, disable for in-page anchors
        { to: { path: '/' }, label: 'Home', icon: 'mdi-home', exactActiveClass: 'active' },
        { to: { path: '/', hash: '#about-us' }, label: 'About Us', icon: 'mdi-information-outline', exactActiveClass: '' },
        { to: { path: '/', hash: '#project-team' }, label: 'Project Team', icon: 'mdi-account-group', exactActiveClass: '' },
        { to: { path: '/', hash: '#activities' }, label: 'Activities', icon: 'mdi-clipboard-list', exactActiveClass: '' },
        { to: { path: '/', hash: '#srhr-contents' }, label: 'SRHR Contents', icon: 'mdi-video', exactActiveClass: '' },
        { to: { path: '/documents' }, label: 'Resources', icon: 'mdi-file-document', exactActiveClass: 'active' },
        { to: { path: '/contact' }, label: 'Contact', icon: 'mdi-phone-in-talk', exactActiveClass: 'active' },
      ],
      mobileAppData: ''
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    },
    closeMenu() {
      this.isOpen = false
    },
    loadData() {
      const url = apiUrl + '/mobile-app-data'
      this.$axios.get(url)
        .then(response => {
          if (response.status === 200) {
            if (response.data.data && response.data.data) {
              this.mobileAppData = response.data.data
            }
          }
      })
    },
    downloadData() {
      if (!this.mobileAppData) {
        alert('No data available to download.');
        return;
      }
      const timestamps = new Date().getTime();
      const fileUrl = `${apiUrl}/mobile-app/download/${this.mobileAppData.id}?t=${timestamps}`;
      const filename = this.getFilenameFromPath(this.mobileAppData.app_url) || 'download';

      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = filename;
      link.target = '_self';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    getFilenameFromPath(fullPath) {
      if (!fullPath || typeof fullPath !== 'string') {
        return '';
      }
      const lastSlashIndex = fullPath.lastIndexOf('/');
      if (lastSlashIndex === -1) {
        return fullPath;
      }
      return fullPath.substring(lastSlashIndex + 1);
    }
  }
}
</script>

<style scoped>
/* Keep banner + navbar always visible at the top */
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 1100;
}

/* Android Banner */
.android-banner {
  background: #016838;
  padding: 12px 0;
  box-shadow: 0 4px 12px rgba(86, 171, 47, 0.3);
  position: relative;
  overflow: hidden;
}

.android-banner::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  animation: shine 3s infinite;
}

@keyframes shine {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
}

.banner-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 140px;
  gap: 20px;
}

.banner-text-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.banner-icon {
  color: white;
  font-size: 28px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.banner-text {
  margin: 0;
  color: white;
  font-weight: 600;
  font-size: 18px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.download-btn {
  background: white !important;
  color: #016838 !important;
  font-weight: 700 !important;
  font-size: 15px !important;
  text-transform: none !important;
  letter-spacing: 0.5px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.download-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 20px rgba(86, 171, 47, 0.4) !important;
}

/* Main Navbar */
.navbar {
  /* Sticky behavior is handled by parent .sticky-header */
  position: relative; /* needed for .navbar-glow absolute positioning */
  background: linear-gradient(135deg, #f5faf0 0%, #f4faed 50%, #edf8e0 100%);
  box-shadow:
    0 10px 30px rgba(77, 135, 15, 0.15),
    0 1px 3px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(20px);
  border-bottom: 2px solid rgba(77, 135, 15, 0.1);
}

.navbar-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(77, 135, 15, 0.05), transparent);
  animation: glow 3s infinite;
  pointer-events: none;
}

@keyframes glow {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 85px;
  position: relative;
  z-index: 1;
}

/* Logo */
.brand {
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  position: relative;
}

.logo-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.brand:hover .logo-wrapper {
  transform: scale(1.1) rotate(5deg);
}

.logo {
  width: 80px;
  height: 80px;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(77, 135, 15, 0.3));
  position: relative;
  z-index: 2;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.logo-ring {
  position: absolute;
  width: 90px;
  height: 90px;
  border: 3px solid rgba(77, 135, 15, 0.25);
  border-radius: 50%;
  animation: pulse-ring 2s infinite;
}

@keyframes pulse-ring {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.5;
  }
}

/* Desktop Links */
.links {
  display: none;
  gap: 2px;
  align-items: center;
}

.link {
  position: relative;
  color: #016838;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 19px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  letter-spacing: 0.5px;
}

.link-text {
  position: relative;
  z-index: 2;
}

.link-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(77, 135, 15, 0.15), rgba(107, 194, 20, 0.1));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
  z-index: 1;
}

.link:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.link:hover .link-bg {
  transform: scaleX(1);
}

.link.active {
  background: rgba(77, 135, 15, 0.12);
  box-shadow:
    0 4px 15px rgba(77, 135, 15, 0.2),
    inset 0 2px 4px rgba(77, 135, 15, 0.1);
  color: #016838;
}

.link.active::before {
  content: '';
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 3px;
  background: #016838;
  border-radius: 3px;
  box-shadow: 0 2px 8px rgba(77, 135, 15, 0.4);
}

/* Mobile Menu Button */
.menu-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 50px;
  height: 50px;
  border: 2px solid rgba(77, 135, 15, 0.25);
  border-radius: 14px;
  background: rgba(77, 135, 15, 0.08);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(77, 135, 15, 0.15);
}

.menu-btn:hover {
  background: rgba(77, 135, 15, 0.15);
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(77, 135, 15, 0.25);
}

.bar {
  display: block;
  height: 3px;
  width: 24px;
  background: #016838;
  border-radius: 3px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(77, 135, 15, 0.2);
}

.menu-btn.is-active .bar1 {
  transform: translateY(8px) rotate(45deg);
}

.menu-btn.is-active .bar2 {
  opacity: 0;
  transform: scaleX(0);
}

.menu-btn.is-active .bar3 {
  transform: translateY(-8px) rotate(-45deg);
}

/* Mobile Menu */
.mobile-menu {
  display: grid;
  gap: 8px;
  padding: 16px;
  margin: 12px 16px 16px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
  border-radius: 20px;
  box-shadow:
    0 20px 40px rgba(102, 126, 234, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(20px);
}

.m-link {
  color: #016838;
  text-decoration: none;
  padding: 16px 20px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) backwards;
  position: relative;
  overflow: hidden;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.m-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(135deg, #4d870f, #016838);
  transform: scaleY(0);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.m-link:hover::before,
.m-link.active::before {
  transform: scaleY(1);
}

.m-link-icon {
  font-size: 24px;
  color: #016838;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.m-link-arrow {
  margin-left: auto;
  font-size: 20px;
  color: #016838;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.m-link:hover {
  background: linear-gradient(135deg, #4d870f, #6bc214);
  color: white;
  transform: translateX(8px);
  box-shadow: 0 8px 20px rgba(77, 135, 15, 0.4);
}

.m-link:hover .m-link-icon,
.m-link:hover .m-link-arrow {
  color: white;
}

.m-link:hover .m-link-arrow {
  transform: translateX(4px);
}

.m-link.active {
  background: linear-gradient(135deg, #4d870f, #6bc214);
  color: white;
  box-shadow: 0 8px 20px rgba(77, 135, 15, 0.4);
}

.m-link.active .m-link-icon,
.m-link.active .m-link-arrow {
  color: white;
}

/* Animations */
.slide-fade-enter-active {
  animation: slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-leave-active {
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes slideUp {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
}

/* Responsive */
@media (min-width: 961px) {
  .links {
    display: flex;
  }
  .menu-btn {
    display: none;
  }
}

@media (max-width: 960px) and (min-width: 601px) {
  .container {
    margin-left: 100px;
    margin-right: 100px;
  }
  .banner-content {
    margin: 0 100px;
  }
  .banner-text {
    font-size: 12px;
  }
}

@media (max-width: 600px) {
  .container {
    margin-left: 10px;
    margin-right: 10px;
  }
  .banner-content {
    margin: 0 10px;
  }
  .banner-text {
    font-size: 10px;
  }
  .banner-icon {
    font-size: 20px;
  }
  .android-banner {
    padding: 8px 0;
  }
  .nav-inner {
    height: 64px;
  }
  .logo {
    width: 56px;
    height: 56px;
  }
  .logo-ring {
    width: 64px;
    height: 64px;
  }

  /* Mobile specific reductions (excluding android-banner) */
  .menu-btn {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    gap: 4px;
  }

  .bar {
    height: 2px;
    width: 20px;
  }

  .menu-btn.is-active .bar1 {
    transform: translateY(6px) rotate(45deg);
  }
  .menu-btn.is-active .bar3 {
    transform: translateY(-6px) rotate(-45deg);
  }

  .mobile-menu {
    gap: 6px;
    padding: 12px;
    margin: 8px 10px 12px;
    border-radius: 16px;
  }

  .m-link {
    padding: 12px 14px;
    gap: 10px;
    font-size: 14px;
    border-radius: 12px;
  }

  .m-link-icon {
    font-size: 20px;
  }

  .m-link-arrow {
    font-size: 18px;
  }
}
</style>
