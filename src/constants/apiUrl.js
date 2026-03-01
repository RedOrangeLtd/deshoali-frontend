let apiUrl = import.meta.env.VITE_API_BASE_URL

if (!apiUrl) {
  if (location.hostname.indexOf('localhost') !== -1) {
    apiUrl = 'http://127.0.0.1:8000/api/v1'
  } else {
    apiUrl = 'https://api.redfynix.com/api/v1'
  }
}

export default apiUrl
