<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :fullscreen="true"
    scrollable
    transition="dialog-bottom-transition"
  >
    <v-card class="video-dialog-card">
      <v-toolbar density="comfortable" color="#4D870E" dark>
        <v-toolbar-title>{{ item?.name || 'Video' }}</v-toolbar-title>
        <v-btn icon="mdi-close" @click="closeDialog" variant="text" color="white" aria-label="Close"></v-btn>
      </v-toolbar>

      <v-card-text class="pa-0">
        <div class="player-wrapper">
          <video
            ref="videoEl"
            class="video"
            :src="videoUrl"
            controls
            playsinline
            :autoplay="modelValue"
          ></video>
        </div>
        <div class="video-meta px-4 py-3">
          <div class="video-name">{{ item?.name }}</div>
          <div class="video-description">{{ item?.description }}</div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import baseApiUrl from '@/constants/baseApiUrl.js'

export default {
  name: 'VideoPlayerDialog',
  props: {
    modelValue: { type: Boolean, default: false },
    item: { type: Object, default: null },
  },
  emits: ['update:modelValue'],
  computed: {
    videoUrl() {
      if (!this.item || !this.item.filepath) return ''
      console.log('video url', `${baseApiUrl}${this.item.filepath}`)
      return `${baseApiUrl}${this.item.filepath}`
    }
  },
  watch: {
    modelValue(val) {
      this.$nextTick(() => {
        const el = this.$refs.videoEl
        if (!el) return
        try {
          if (val) {
            // restart and play when opening
            el.currentTime = 0
            const playPromise = el.play?.()
            if (playPromise && typeof playPromise.then === 'function') {
              playPromise.catch(() => {/* ignore autoplay errors */})
            }
          } else {
            // pause and reset when closing
            el.pause?.()
            el.currentTime = 0
          }
        } catch {
          // no-op
        }
      })
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:modelValue', false)
    }
  }
}
</script>

<style lang="css" scoped>
.video-dialog-card {
  border-radius: 12px 12px 0 0;
}

.player-wrapper {
  position: relative;
  width: 100%;
  height: 80%;
  /* 16:9 responsive box */
  aspect-ratio: 16 / 9;
  background: #000;
}

.video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #000;
}

.video-meta {
  background: #f8f8f8;
}

.video-name {
  font-weight: 600;
  font-size: 18px;
}

.video-description {
  margin-top: 6px;
  color: #555;
  white-space: pre-wrap;
}

/* Make corners fully square when fullscreen on very small devices */
@media (max-width: 600px) {
  .video-dialog-card {
    border-radius: 0 !important;
  }
}
</style>
