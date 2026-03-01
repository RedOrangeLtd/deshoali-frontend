let baseApiUrl = import.meta.env.VITE_IMAGE_BASE_URL

if (!baseApiUrl) {
  if (location.hostname.indexOf('localhost') !== -1) {
    baseApiUrl = 'http://127.0.0.1:8000/'
  } else {
    baseApiUrl = 'https://api.redfynix.com/'
  }
}

export default baseApiUrl
