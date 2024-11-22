document.addEventListener('DOMContentLoaded', () => {
  const tableData = document.querySelector('.table-data')
  const inputSearch = document.querySelector('input')
  const sortMarketCap = document.querySelector('.mkt')
  const sortPercentage = document.querySelector('.percent')

  const tbody = document.createElement('tbody')
  const url =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'

  let tableRowsData = []
  let originalData = []

  const fetchData = async () => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      tableRowsData = data
      originalData = [...data] // Save the original data
      populateTable(tableRowsData)
    } catch (error) {
      console.log(error)
    }
  }

  const sortByMarketCap = () => {
    tableRowsData = tableRowsData.sort((a, b) => a.market_cap - b.market_cap)
    refreshTable()
  }

  let timer
  const debounce = (callback, delay) => {
    return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        callback(...args)
      }, delay)
    }
  }

  const sortByPercentage = () => {
    tableRowsData = tableRowsData.sort(
      (a, b) => a.price_change_24h - b.price_change_24h
    )
    refreshTable()
  }

  const handleSearch = (query) => {
    if (query.trim().length > 0) {
      tableRowsData = originalData.filter(
        (row) =>
          row.name.toLowerCase().includes(query.trim().toLowerCase()) ||
          row.symbol.toLowerCase().includes(query.trim().toLowerCase())
      )
    } else {
      tableRowsData = [...originalData]
    }
    refreshTable()
  }

  const populateTable = (tableRowsData) => {
    tbody.innerHTML = ''

    for (const row of tableRowsData) {
      const {
        image,
        name,
        symbol,
        current_price,
        total_volume,
        market_cap,
        price_change_24h,
      } = row

      const tableRow = document.createElement('tr')
      tableRow.innerHTML = `
        <td>
          <div class="name-img">
              <img src=${image} alt="${name} logo">
              <span>${name}</span>
          </div>
        </td>
        <td>
          <span>${symbol.toUpperCase()}</span>
        </td>
        <td>
          <span>${current_price}</span>
        </td>
        <td>
          <span>${total_volume}</span>
        </td>
        <td class="percentage_change">
          <span>${price_change_24h.toFixed(2)}%</span>
        </td>
        <td>
          <span>Mkr Cap: ${market_cap}</span>
        </td>
      `

      let tdDataCel = tableRow.querySelector('.percentage_change')

      if (price_change_24h < 0) {
        tdDataCel.style.color = 'red'
      } else {
        tdDataCel.style.color = 'green'
      }
      tableRow.style.color = 'white'

      tbody.appendChild(tableRow)
    }
  }

  const refreshTable = () => {
    populateTable(tableRowsData)
  }

  fetchData()
  tableData.appendChild(tbody)
  sortMarketCap.addEventListener('click', sortByMarketCap)
  sortPercentage.addEventListener('click', sortByPercentage)

  inputSearch.addEventListener(
    'input',
    debounce((e) => handleSearch(e.target.value), 300)
  )
})
