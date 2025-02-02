const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const currentImageContainer = document.getElementById('current-image-container')
const searchHistory = document.getElementById('search-history')

const apiKey = 'pZuoa3KGvXpVVq5iV8dOMI3nYb7Q0WpVvBsTuUbF'
let searches = JSON.parse(localStorage.getItem('searches')) || []

document.addEventListener('DOMContentLoaded', () => {
  fetchImageOfTheDay(new Date().toISOString().split('T')[0])
  updateSearchHistory()
})

searchForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const date = searchInput.value
  if (date && !searches.includes(date)) {
    searches.unshift(date) // Add to the beginning
    searches = searches.slice(0, 10) // Keep last 10 searches
    localStorage.setItem('searches', JSON.stringify(searches))
  }
  fetchImageOfTheDay(date)
  updateSearchHistory()
  searchInput.value = ''
})

function fetchImageOfTheDay(date) {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`

  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error('Failed to fetch image')
      return response.json()
    })
    .then(displayImage)
    .catch((error) => {
      currentImageContainer.innerHTML = `<p class="error">Error: ${error.message}</p>`
    })
}

function displayImage(data) {
  currentImageContainer.innerHTML = `
    <h2>${data.title} (${data.date})</h2>
    ${
      data.media_type === 'image'
        ? `<img src="${data.url}" alt="${data.title}">`
        : `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`
    }
    <p class="explain">${data.explanation}</p>
  `
}

function updateSearchHistory() {
  searchHistory.innerHTML = ''
  searches.forEach((date) => {
    const listItem = document.createElement('li')
    listItem.textContent = date
    listItem.addEventListener('click', () => fetchImageOfTheDay(date))
    searchHistory.appendChild(listItem)
  })
}
