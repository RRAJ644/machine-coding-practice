const apiKey = '04d384c8b92640a686eabe301cb8a900'
let timezone = []
let currId = 'currTimezone'
let newId = 'newTimezone'

let lat
let lon

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
  console.log(lat, lon)

  try {
    let res = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=fab8363b8ad84349bd47fea8b3407e0d`
    )
    let res2 = await res.json()

    console.log(res2)
    if (res2.results.length) {
      timezone = res2.results[0]
      console.log(timezone)
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
  console.log(timezone, id)
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

document.getElementById('btn').addEventListener('click', () => {
  console.log('add', address.value)
  fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      address.value
    )}&apiKey=${apiKey}`
  )
    .then((resp) => resp.json())
    .then((geocodingResult) => {
      let timezone2 = geocodingResult.features[0].properties
      console.log('newTimezon', timezone2)
      displayTimezone(timezone2, newId)
    })
})
