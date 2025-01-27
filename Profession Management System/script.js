document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn')
  const employeeList = document.getElementById('employeeList')
  const err = document.querySelector('#err')
  const countn = document.querySelector('.count')

  let employeeCount = 0
  const employees = []

  function updateEmployeeCount() {
    countn.innerText = employeeCount
  }

  function addEmployee(id, name, profession, age) {
    const employee = { id, name, profession, age }
    employees.push(employee)

    const listItem = document.createElement('li')
    listItem.innerHTML = `${employee.id} Name: ${employee.name} Profession: ${employee.profession} Age: ${employee.age}`

    const deleteBtn = document.createElement('button')
    deleteBtn.className = 'btn'
    deleteBtn.textContent = 'Delete'
    deleteBtn.addEventListener('click', () =>
      deleteEmployee(employee.id, listItem)
    )

    listItem.appendChild(deleteBtn)
    employeeList.appendChild(listItem)
  }

  function deleteEmployee(id, listItem) {
    const index = employees.findIndex((employee) => employee.id === id)
    if (index !== -1) {
      employees.splice(index, 1)
      listItem.remove()
      employeeCount--
      updateEmployeeCount()
    }
  }

  btn.addEventListener('click', (e) => {
    e.preventDefault()

    const name = document.getElementById('name').value
    const profession = document.getElementById('profession').value
    const age = document.getElementById('age').value

    if (!name || !profession || !age) {
      err.innerText =
        'Error: Please make sure all fields are filled before adding an employee!'
      err.style.visibility = 'visible'
      err.style.color = 'red'
    } else {
      err.innerText = 'Success: Employee Added!'
      err.style.visibility = 'visible'
      err.style.color = 'green'

      addEmployee(employeeCount, name, profession, age)
      employeeCount++
      updateEmployeeCount()
    }
  })
})
