const apiKey = '04d384c8b92640a686eabe301cb8a900'
let timezone = []
let currId = 'currTimezone'
let newId = 'newTimezone'

let lat, lon

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
  } else {
    alert('Geolocation is not supported by this browser.')
  }
}

async function showPosition(position) {
  lat = position.coords.latitude
  lon = position.coords.longitude

  try {
    let res = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=fab8363b8ad84349bd47fea8b3407e0d`
    )
    let res2 = await res.json()

    if (res2.results.length) {
      timezone = res2.results[0]
      displayTimezone(timezone, currId)
    } else {
      console.log('No location found')
    }
  } catch (error) {
    console.error('Error fetching timezone:', error)
  }
}

getLocation()

function displayTimezone(timezone, id) {
  document.getElementById(id).innerHTML = `
    <p>Name of Time Zone :-  ${timezone.timezone.name}</p>
    <div>
      <p>lat :-  ${timezone.lat}</p>
      <p>Long :-  ${timezone.lon}</p>
    </div>
    <p>Offset STD :-  ${timezone.timezone.offset_STD}</p>
    <p>Offset STD Seconds:-  ${timezone.timezone.offset_STD_seconds}</p>
    <p>Offset DST :-  ${timezone.timezone.offset_DST}</p>
    <p> Offset DST Seconds :-  ${timezone.timezone.offset_DST_seconds}</p>
    <p>Country :-  ${timezone.country}</p>
    <p>Postcode :-  ${timezone.state_code}</p>
    <p>City :-  ${timezone.county}</p>
  `
}

const address = document.getElementById('address')
const resultContainer = document.getElementById('newTimezone')
const errorMessage = document.createElement('p')
const result = document.querySelector('.result')
errorMessage.style.color = '#E84444'
errorMessage.style.marginTop = '10px'
document.querySelector('.container2').appendChild(errorMessage)

document.getElementById('btn').addEventListener('click', async () => {
  const addressValue = address.value.trim()
  errorMessage.textContent = '' // Clear previous errors
  resultContainer.innerHTML = '' // Clear previous results
  resultContainer.style.display = 'none' // Hide result container initially

  if (!addressValue) {
    errorMessage.textContent = 'Please enter an address!'
    return
  }

  try {
    let resp = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        addressValue
      )}&apiKey=${apiKey}`
    )
    let geocodingResult = await resp.json()

    if (geocodingResult.features && geocodingResult.features.length > 0) {
      let timezone2 = geocodingResult.features[0].properties
      resultContainer.style.display = 'flex'
      result.style.display = 'flex'
      displayTimezone(timezone2, newId)
    } else {
      errorMessage.textContent = 'Timezone could not be found!'
      resultContainer.style.display = 'none'
      result.style.display = 'none'
    }
  } catch (error) {
    errorMessage.textContent = 'An error occurred. Please try again!'
    console.error('Error fetching timezone:', error)
  }
})
