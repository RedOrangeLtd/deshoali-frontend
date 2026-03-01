export default {
  methods: {
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    },
    formatDuration(seconds) {
      const totalSeconds = Math.max(0, Number(seconds) || 0);

      const hrs = Math.floor(totalSeconds / 3600);
      const mins = Math.floor((totalSeconds % 3600) / 60);
      const secs = Math.floor(totalSeconds % 60);

      const formattedHrs = String(hrs).padStart(2, '0');
      const formattedMins = String(mins).padStart(2, '0');
      const formattedSecs = String(secs).padStart(2, '0');

      return `${formattedHrs}:${formattedMins}:${formattedSecs}`;
    },
  }
}
