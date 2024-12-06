// API promise functions
const PromiseAPI1 = () => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const response = await fetch('https://dummyjson.com/posts')
      const data = await response.json()
      resolve({ data: data.posts, title: 'Posts' })
    }, 1000)
  })
}

const PromiseAPI2 = () => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const response = await fetch('https://dummyjson.com/products')
      const data = await response.json()
      resolve({ data: data.products, title: 'Products' })
    }, 2000)
  })
}

const PromiseAPI3 = () => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const response = await fetch('https://dummyjson.com/todos')
      const data = await response.json()
      resolve({ data: data.todos, title: 'Todos' })
    }, 3000)
  })
}

// Function to create and append a table to the DOM
const displayDataInTable = (data, title) => {
  const dataDisplay = document.getElementById('dataDisplay')

  const tableContainer = document.createElement('div')
  const heading = document.createElement('h2')
  heading.textContent = title
  tableContainer.appendChild(heading)

  const table = document.createElement('table')
  const tableHead = document.createElement('thead')
  const tableBody = document.createElement('tbody')

  // Dynamically create table headers from the keys of the first object
  const headers = Object.keys(data[0] || {})
  const headerRow = document.createElement('tr')
  headers.forEach((header) => {
    const th = document.createElement('th')
    th.textContent = header
    headerRow.appendChild(th)
  })
  tableHead.appendChild(headerRow)

  // Populate table rows
  data.forEach((item) => {
    const row = document.createElement('tr')
    headers.forEach((header) => {
      const td = document.createElement('td')
      td.textContent = item[header]
      row.appendChild(td)
    })
    tableBody.appendChild(row)
  })

  table.appendChild(tableHead)
  table.appendChild(tableBody)
  tableContainer.appendChild(table)
  dataDisplay.appendChild(tableContainer)
}

// Event listener for button click
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('fetchDataBtn')

  button.addEventListener('click', () => {
    button.disabled = true // Disable the button during the process

    PromiseAPI1()
      .then(({ data, title }) => {
        displayDataInTable(data, title)
        return PromiseAPI2()
      })
      .then(({ data, title }) => {
        displayDataInTable(data, title)
        return PromiseAPI3()
      })
      .then(({ data, title }) => {
        displayDataInTable(data, title)
      })
      .finally(() => {
        button.disabled = false
      })
  })
})
