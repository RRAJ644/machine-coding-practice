document.addEventListener('DOMContentLoaded', () => {
  let open = document.querySelector('.open')
  let close = document.querySelector('.close')
  let side_bar = document.querySelector('.side-bar')

  const cardSection = document.querySelector('.card-section')
  const mainHeroImg = document.querySelector('.main_hero_img')

  const FETCH_URL =
    'https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json'

  open.addEventListener('click', function () {
    close.style.display = 'block'
    side_bar.style.display = 'flex'
  })

  close.addEventListener('click', function () {
    close.style.display = 'none'
    side_bar.style.display = 'none'
  })

  // Fetch Menu Data
  async function getMenu() {
    try {
      const response = await fetch(FETCH_URL)
      const data = await response.json()
      renderMenu(data)
    } catch (error) {
      console.error('Error fetching menu:', error)
      cardSection.innerHTML = `<p class="error">Unable to load menu. Please try again later.</p>`
    }
  }

  function renderMenu(data) {
    cardSection.innerHTML = data.map((item) => {
      return ` <div class="card">
        <img src="${item.imgSrc}" alt="${item.name}" class="card-main-img" />
          <div class="card-content">
            <div class="card-start-content">
              <p class="food-name">${item.name}</p>
              <p class="cost">$${item.price}/-</p>
            </div>
            <div class="card-end-content">
              <img src="./assets/add.jpg" alt="Add ${item.name} to cart">
            </div>
          </div>
        </div>
      `
    })
  }

  function takeOrder() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const burgers = [
          'Cheese Burger',
          'Veggie Burger',
          'Bacon Burger',
          'Chicken Burger',
          'Mushroom Burger',
          'Double Cheese Burger',
          'BBQ Burger',
          'Fish Burger',
          'Turkey Burger',
          'Spicy Burger',
        ]
        const selectedBurgers = Array.from(
          { length: 3 },
          () => burgers[Math.floor(Math.random() * burgers.length)]
        )
        resolve(selectedBurgers)
      }, 2500)
    })
  }

  function orderPrep() {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ order_status: true, paid: false }), 1500)
    })
  }

  function payOrder() {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ order_status: true, paid: true }), 1000)
    })
  }

  function thankYou() {
    alert('Thank you for eating with us today!')
  }

  // Main Flow
  async function main() {
    try {
      const order = await takeOrder()
      console.log('Your Order:', order)

      const orderStatus = await orderPrep()
      console.log('Order Preparation Status:', orderStatus)

      const paymentStatus = await payOrder()
      console.log('Payment Status:', paymentStatus)

      if (paymentStatus.paid) {
        thankYou()
      }
    } catch (error) {
      console.error('Error during order process:', error)
    }
  }

  // Hide Main Hero Image
  function secondScreen() {
    mainHeroImg.style.display = 'none'
  }

  // Initialize
  getMenu()
  main()

  document
    .querySelector('li[onclick="secondScreen()"]')
    .addEventListener('click', secondScreen)
})
