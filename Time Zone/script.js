// Define API keys and URLs
const GEOAPIFY_API_KEY = '04d384c8b92640a686eabe301cb8a900'
const GEOAPIFY_TIMEZONE_URL = 'https://api.geoapify.com/v1/timezone'

// DOM Elements
const latitudeElem = document.getElementById('latitude')
const longitudeElem = document.getElementById('longitude')
const errorElem = document.querySelector('.error')
const form = document.querySelector('form')
const addressInput = document.getElementById('address')
const resultContainer = document.querySelector('.result')
const resultTimezoneElem = document.querySelector('.result-container')

// Populate timezone details
const populateTimezoneDetails = (data, target) => {
  target.querySelectorAll('p').forEach((p, index) => {
    const keys = [
      'timezone.name',
      'location.lat',
      'location.lon',
      'timezone.offset_STD',
      'timezone.offset_STD_seconds',
      'timezone.offset_DST',
      'timezone.offset_DST_seconds',
      'country',
      'postcode',
      'city',
    ]
    const key = keys[index]
    const value = key.split('.').reduce((o, k) => (o || {})[k], data)
    p.textContent = `${p.textContent.split(':')[0]}: ${value || 'N/A'}`
  })
}

// Fetch and display timezone based on coordinates
const fetchTimezone = async (lat, lon, target) => {
  try {
    const response = await fetch(
      `${GEOAPIFY_TIMEZONE_URL}?lat=${lat}&lon=${lon}&apiKey=${GEOAPIFY_API_KEY}`
    )
    if (!response.ok) throw new Error('Failed to fetch timezone data')
    const data = await response.json()
    populateTimezoneDetails(data, target)
  } catch (error) {
    console.error('Error fetching timezone:', error)
  }
}

// Fetch user location and timezone
const fetchUserLocation = () => {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser')
    return
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords
      latitudeElem.textContent = latitude.toFixed(4)
      longitudeElem.textContent = longitude.toFixed(4)
      fetchTimezone(
        latitude,
        longitude,
        document.querySelector('.timezone-details')
      )
    },
    (error) => {
      console.error('Error getting location:', error)
      alert('Unable to retrieve your location')
    }
  )
}

// Handle address form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const address = addressInput.value.trim()
  if (!address) {
    errorElem.style.display = 'block'
    return
  }
  errorElem.style.display = 'none'

  try {
    const geocodeResponse = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        address
      )}&apiKey=${GEOAPIFY_API_KEY}`
    )
    if (!geocodeResponse.ok) throw new Error('Failed to geocode address')
    const geocodeData = await geocodeResponse.json()

    if (geocodeData.features.length === 0) {
      alert('No results found for the entered address')
      return
    }

    const { lat, lon } = geocodeData.features[0].geometry.coordinates
    fetchTimezone(lat, lon, resultContainer)
    resultTimezoneElem.style.display = 'block'
  } catch (error) {
    console.error('Error fetching timezone by address:', error)
  }
})

// Fetch the user's current timezone on page load
window.addEventListener('DOMContentLoaded', fetchUserLocation)
