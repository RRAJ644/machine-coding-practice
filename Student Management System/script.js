let data = []

// Fetch data from JSON and render table
document.addEventListener('DOMContentLoaded', () => {
  fetch(
    'https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json'
  )
    .then((res) => res.json())
    .then((fetchedData) => {
      data = fetchedData
      renderTable(data)
    })
})

// Render table dynamically
function renderTable(data) {
  let table = document.querySelector('table')
  table.innerHTML = `
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Gender</th>
      <th>Class</th>
      <th>Marks</th>
      <th>Passing</th>
      <th>Email</th>
    </tr>
  `
  data.forEach((student) => {
    let passingStatus = student.passing ? 'Passing' : 'Failed'
    let tr = document.createElement('tr')
    tr.innerHTML = `
      <td>${student.id}</td>
      <td><img src="${student.img_src}" alt="avatar" width="30" />
          ${student.first_name} ${student.last_name}</td>
      <td>${student.gender}</td>
      <td>${student.class}</td>
      <td>${student.marks}</td>
      <td>${passingStatus}</td>
      <td>${student.email}</td>
    `
    table.appendChild(tr)
  })
}

// Search functionality
function search() {
  let searchValue = document.getElementById('search').value.toLowerCase()
  let filteredData = data.filter(
    (student) =>
      `${student.first_name} ${student.last_name}`
        .toLowerCase()
        .includes(searchValue) ||
      student.email.toLowerCase().includes(searchValue)
  )
  renderTable(filteredData)
}

// Sorting functions
function shortAZ() {
  let sortedData = [...data].sort((a, b) =>
    `${a.first_name} ${a.last_name}`.localeCompare(
      `${b.first_name} ${b.last_name}`
    )
  )
  renderTable(sortedData)
}

function shortZA() {
  let sortedData = [...data].sort((a, b) =>
    `${b.first_name} ${b.last_name}`.localeCompare(
      `${a.first_name} ${a.last_name}`
    )
  )
  renderTable(sortedData)
}

function marks() {
  let sortedData = [...data].sort((a, b) => a.marks - b.marks)
  renderTable(sortedData)
}

function passing() {
  let filteredData = data.filter((student) => student.passing)
  renderTable(filteredData)
}

function clas() {
  let sortedData = [...data].sort((a, b) => a.class - b.class)
  renderTable(sortedData)
}

function gender() {
  let maleData = data.filter((student) => student.gender === 'Male')
  let femaleData = data.filter((student) => student.gender === 'Female')

  renderTable(maleData) // Render male students
  let table = document.querySelector('table')
  table.innerHTML += `<tr><th colspan="7">Female Students</th></tr>` // Add separator
  femaleData.forEach((student) => {
    let passingStatus = student.passing ? 'Passing' : 'Failed'
    let tr = document.createElement('tr')
    tr.innerHTML = `
      <td>${student.id}</td>
      <td><img src="${student.img_src}" alt="avatar" width="30" />
          ${student.first_name} ${student.last_name}</td>
      <td>${student.gender}</td>
      <td>${student.class}</td>
      <td>${student.marks}</td>
      <td>${passingStatus}</td>
      <td>${student.email}</td>
    `
    table.appendChild(tr)
  })
}
