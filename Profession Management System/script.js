document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#employeeForm')
  const errorMessage = document.querySelector('.error')
  const successMessage = document.querySelector('.success')
  const employeesList = document.querySelector('#employees')
  const statement = document.querySelector('#statement')
  const added = document.querySelector('#added')
  let count = 0

  const addUser = (name, profession, age) => {
    const employeeContainer = document.createElement('div')
    employeeContainer.classList.add('employee-container')

    const employeeData = document.createElement('div')

    employeeData.classList.add('employee-data')

    employeeData.innerHTML = `
    <span>${++count}. </span>
    <span>Name: ${name}</span>
    <span>Profession: ${profession}</span>
    <span>Age: ${age}</span>
  `

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete-btn')

    deleteBtn.textContent = 'Delete User'

    employeeContainer.appendChild(employeeData)
    employeeContainer.appendChild(deleteBtn)
    employeesList.appendChild(employeeContainer)

    statement.style.display = 'none'
  }

  form.addEventListener('click', (e) => {
    e.preventDefault()

    if (e.target.id === 'add-btn') {
      const name = form.elements['name'].value
      const profession = form.elements['profession'].value
      const age = form.elements['age'].value

      if (name && profession && age) {
        errorMessage.style.display = 'none'
        addUser(name, profession, age)
        successMessage.style.display = 'block'
        form.reset()
      } else {
        errorMessage.style.display = 'block'
      }
    }
  })

  employeesList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const employeeContainer = e.target.closest('.employee-container')
      employeeContainer.remove()
      count--
    }

    if (count === 0) {
      statement.style.display = 'block'
      added.style.display = 'none'
    }
  })
})
