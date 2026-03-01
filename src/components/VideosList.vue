<template>
  <div class="videos-list-section">
    <div class="video-section">
      <!-- Animated background elements -->
      <div class="bg-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
      </div>

      <div class="container">
        <v-row>
          <v-col cols="12" class="text-center">
            <transition name="title-fade">
              <div>
                <div class="title-wrapper">
                  <div class="title-icon">
                    <v-icon color="white" size="large">mdi-video-box</v-icon>
                  </div>
                  <h2 class="section-title mb-2">SRHR Contents</h2>
                </div>
                <!--              <p class="section-subtitle">Explore Our Video Collection</p>-->
              </div>
            </transition>
          </v-col>
        </v-row>

        <v-row class="search-row">
          <v-col md="4" sm="12" class="pl-0 pr-0 pt-0 pb-0">
            <div class="search-wrapper">
              <v-text-field
                v-model="searchQuery"
                placeholder="Search videos..."
                variant="outlined"
                clearable
                density="comfortable"
                hide-details
                prepend-inner-icon="mdi-magnify"
                class="search-field"
              />
            </div>
          </v-col>
        </v-row>

        <v-row>
          <template v-for="item in filteredItems" :key="item.id">
            <v-col cols="12" class="pl-0 pr-0 pt-1 pb-3">
              <div class="video-card mx-auto" @click="openVideo(item)">
                <div class="card-content">
                  <div class="video-icon-container">
                    <v-icon class="video-icon" icon="mdi-video"></v-icon>
                    <div class="icon-glow"></div>
                  </div>

                  <div class="video-info">
                    <div class="video-title-text">
                      {{item.name}}
                    </div>

                    <div class="video-meta">
                      <div class="duration-badge">
                        <v-icon size="14" class="mr-1">mdi-clock-outline</v-icon>
                        <span>{{formatDuration(item.file_duration)}}</span>
                      </div>

                      <div class="action-buttons">
                        <v-btn
                          class="action-btn download-btn"
                          density="compact"
                          icon="mdi-download"
                          @click.stop="downloadData(item)"
                          size="small"
                        ></v-btn>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
          </template>
        </v-row>

        <video-player-dialog v-model="showPlayer" :item="selectedItem" />
      </div>
    </div>
  </div>

</template>

<script>
import apiUrl from '@/constants/apiUrl.js'
import commonLib from '@/mixins/commonLib.js'
import VideoPlayerDialog from '@/components/VideoPlayerDialog.vue'
export default {
  name: 'VideosList',
  components: { VideoPlayerDialog },
  mixins: [commonLib],
  data() {
    return {
      searchQuery: '',
      items: [],
      showPlayer: false,
      selectedItem: null,
    }
  },
  computed: {
    filteredItems() {
      const q = (this.searchQuery || '').toString().toLowerCase().trim()
      if (!q) return this.items
      return this.items.filter(it => {
        const name = (it.name || '').toString().toLowerCase()
        return name.includes(q)
      })
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      const url = apiUrl + '/media-files/list'
      this.$axios.get(url)
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            this.items = response.data.data
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    downloadData(data) {
      const timestamps = new Date().getTime();
      const fileUrl = `${apiUrl}/media-files/download/${data.id}?t=${timestamps}`;
      const filename = data.name || 'download';

      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = filename;
      link.target = '_self';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    openVideo(item) {
      this.selectedItem = item
      this.showPlayer = true
    }
  }
}
</script>

<style lang="css" scoped>
/* Main section with background */
.video-section {
  background: #ffffff;
  overflow: hidden;
  position: relative;
  min-height: 100vh;
  width: 100%;
  padding: 60px 20px;
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
  background: linear-gradient(135deg, #7cb342, #9ccc65);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  top: 10%;
  left: 5%;
}

.shape-2 {
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, #4d870f, #689f38);
  border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
  top: 60%;
  right: 10%;
  animation-delay: 5s;
}

.shape-3 {
  width: 180px;
  height: 180px;
  background: linear-gradient(135deg, #558b2f, #7cb342);
  border-radius: 50%;
  bottom: 15%;
  left: 15%;
  animation-delay: 10s;
}

.shape-4 {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #33691e, #4d870f);
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

.container {
  margin-top: 20px;
  max-width: 1320px;
  position: relative;
  z-index: 1;
}

/* Search Section */
.search-row {
  margin-top: 24px;
  margin-bottom: 16px;
}

.search-wrapper {
  position: relative;
}

.search-field {
  transition: all 0.3s ease;
}

.search-field :deep(.v-field) {
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  transition: all 0.3s ease;
}

.search-field :deep(.v-field:hover) {
  box-shadow: 0 4px 20px rgba(77, 135, 15, 0.15);
  transform: translateY(-2px);
}

.search-field :deep(.v-field--focused) {
  box-shadow: 0 4px 24px rgba(77, 135, 15, 0.25);
}

.search-field :deep(.v-field__prepend-inner) {
  color: #4d870f;
}

/* Video Cards */
.video-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fdf5 100%);
  border-radius: 16px;
  border: 1px solid rgba(77, 135, 15, 0.1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

.video-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #5a9c1a, #4d870f, #3d6b0c);
  transform: scaleY(0);
  transition: transform 0.4s ease;
  transform-origin: bottom;
}

.video-card:hover::before {
  transform: scaleY(1);
  transform-origin: top;
}

.video-card:hover {
  transform: translateY(-4px) translateX(4px);
  box-shadow: 0 12px 32px rgba(77, 135, 15, 0.2);
  border-color: rgba(77, 135, 15, 0.3);
}

.card-content {
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

/* Video Icon */
.video-icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  min-width: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #deffbe 0%, #c8f1a0 100%);
  box-shadow: 0 4px 12px rgba(77, 135, 15, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.8);
  position: relative;
  transition: all 0.3s ease;
}

.video-card:hover .video-icon-container {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 6px 20px rgba(77, 135, 15, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.8);
}

.icon-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(77, 135, 15, 0.3), transparent);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.3);
    opacity: 0;
  }
}

.video-icon {
  color: #4d870f;
  font-size: 28px !important;
  z-index: 1;
  transition: transform 0.3s ease;
}

.video-card:hover .video-icon {
  transform: scale(1.1);
}

/* Video Info */
.video-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.video-title-text {
  font-size: 17px;
  font-weight: 600;
  color: #2c3e50;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
  line-height: 1.5;
  transition: color 0.3s ease;
}

.video-card:hover .video-title-text {
  color: #4d870f;
}

/* Video Meta */
.video-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.duration-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  background: linear-gradient(135deg, #4d870f, #5a9c1a);
  color: white;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(77, 135, 15, 0.25);
  transition: all 0.3s ease;
}

.video-card:hover .duration-badge {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(77, 135, 15, 0.35);
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 8px;
}

.action-btn {
  border-radius: 12px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.play-btn {
  background: linear-gradient(135deg, #4d870f, #5a9c1a) !important;
  color: white !important;
}

.play-btn:hover {
  transform: scale(1.15) rotate(5deg);
  box-shadow: 0 6px 20px rgba(77, 135, 15, 0.4) !important;
}

.download-btn {
  background: linear-gradient(135deg, #2c3e50, #34495e) !important;
  color: white !important;
}

.download-btn:hover {
  transform: scale(1.15) rotate(-5deg);
  box-shadow: 0 6px 20px rgba(44, 62, 80, 0.4) !important;
}

.action-btn:active {
  transform: scale(0.95);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  /* Section spacing */
  .video-section {
    padding: 40px 16px;
    min-height: auto;
  }

  .container {
    margin-top: 12px;
  }

  /* Title area */
  .title-wrapper {
    flex-direction: row; /* keep icon and title side-by-side on mobile */
    gap: 6px; /* standardize with AboutUsSection */
    text-align: center;
  }

  .title-icon {
    width: 48px !important;
    height: 48px !important;
    box-shadow: 0 4px 14px rgba(77, 135, 15, 0.22);
  }

  .title-icon :deep(.v-icon) {
    font-size: 24px !important; /* slightly smaller icon on mobile */
  }

  .section-title {
    font-size: 1.6rem; /* reduced title size on mobile */
    letter-spacing: -0.5px;
  }

  .heading-text {
    font-size: 20px;
  }

  /* Search spacing */
  .search-row {
    margin-top: 16px;
    margin-bottom: 8px;
  }

  .card-content {
    padding: 16px;
    gap: 12px;
  }

  .video-icon-container {
    width: 48px;
    height: 48px;
    min-width: 48px;
  }

  .video-icon {
    font-size: 24px !important;
  }

  .video-title-text {
    font-size: 15px;
  }

  .video-meta {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
