document.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.querySelector('.todo-form')
  const todoInput = document.querySelector('.todo-input')
  const todoList = document.querySelector('.todo-list')
  const todoSubmit = document.querySelector('.todo-submit')
  let editMode = false
  let editItem = null

  const addTodoItem = (todoText) => {
    const todoItem = document.createElement('li')
    const editButton = document.createElement('button')
    const removeButton = document.createElement('button')

    todoItem.innerHTML = `<span>${todoText}</span>`
    editButton.innerText = 'Edit'
    removeButton.innerText = 'Remove'

    todoItem.appendChild(editButton)
    todoItem.appendChild(removeButton)
    todoList.appendChild(todoItem)
  }

  todoForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const todoText = todoInput.value.trim()
    if (todoText !== '') {
      if (editMode) {
        editItem.querySelector('span').textContent = todoText
        todoSubmit.innerText = 'Add todo'
        editMode = false
        editItem = null
      } else {
        addTodoItem(todoText)
      }
      todoInput.value = ''
    } else {
      alert('Enter a valid todo')
    }
  })

  todoList.addEventListener('click', (e) => {
    const target = e.target
    console.log(target.tagName, '===target')
    if (target.tagName === 'BUTTON') {
      const todoItem = target.parentNode
      if (target.innerText === 'Remove') {
        todoItem.remove() // delete todo
      } else if (target.innerText === 'Edit') {
        editMode = true
        editItem = todoItem
        todoSubmit.innerText = 'Edit todo'
        todoInput.value = todoItem.querySelector('span').textContent
        todoInput.focus()
      }
    }
  })
})
