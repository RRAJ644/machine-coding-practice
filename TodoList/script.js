document.addEventListener('DOMContentLoaded', () => {
  let ItemName = document.getElementById('name')
  let date = document.getElementById('date')
  let priority = document.getElementById('priority')
  let currDayLists = document.getElementById('todayList')
  let fLists = document.getElementById('futureList')
  let compList = document.getElementById('completedList')

  let list = []
  let todayList = JSON.parse(localStorage.getItem('todayList')) || []
  console.log(todayList)
  let futureList = JSON.parse(localStorage.getItem('futureList')) || []
  let completedList = JSON.parse(localStorage.getItem('completedList')) || []
  let todayId = JSON.parse(localStorage.getItem('todayId')) || 1
  document.querySelector('form').addEventListener('submit', () => {
    let li = {
      name: ItemName.value,
      date: date.value,
      priority: priority.value,
    }
    const currentDate = new Date()
    const desiredDate = new Date(date.value)
    if (date.value == '' || ItemName.value == '' || priority.value == '') {
      alert('Please fill all Detils')
      return
    }

    if (desiredDate.setHours(0, 0, 0, 0) == currentDate.setHours(0, 0, 0, 0)) {
      todayList.push(li)
      localStorage.setItem('todayList', JSON.stringify(todayList))
    } else if (desiredDate >= currentDate) {
      futureList.push(li)
      localStorage.setItem('futureList', JSON.stringify(futureList))
    } else {
      alert('You can not Enter Past Date.')
      return
    }
    localStorage.setItem('todayId', JSON.stringify(todayId))
    console.log(li)
    displayFuture()
    displayCompleted()

    displayToday()
  })
  displayFuture()
  displayToday()

  displayCompleted()

  function displayToday() {
    currDayLists.innerHTML = ''
    todayList.forEach((list, i) => {
      let div = document.createElement('div')
      div.className = 'box'
      div.innerHTML = `
            <div>
              <div id="in">${i + 1}.</div>
              <div id="ItemName">${list.name}</div>
            </div>
            <div id="Deadline">${list.date}</div>
            <div>Priority:
              <div id="priorityData">${list.priority}</div>
            </div>
            <div>
              <i class="fa-regular fa-circle-check" id="complete" data-index="${i}"></i>
              <i class="fa-solid fa-trash" id="delete" data-index="${i}"></i>
            </div>
          `
      currDayLists.appendChild(div)

      div.querySelector('#delete').addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'))
        todayList.splice(index, 1)
        localStorage.setItem('todayList', JSON.stringify(todayList))
        displayToday()
      })

      div.querySelector('#complete').addEventListener('click', (e) => {
        let index = parseInt(e.target.getAttribute('data-index'))
        let data = todayList.splice(index, 1)
        completedList.push(...data)
        localStorage.setItem('todayList', JSON.stringify(todayList))
        localStorage.setItem('completedList', JSON.stringify(completedList))
        console.log('completed', completedList)
        displayToday()
        displayCompleted()
      })
    })
  }

  function displayFuture() {
    fLists.innerHTML = ''
    futureList.forEach((list, i) => {
      let div = document.createElement('div')
      div.className = 'box'
      div.innerHTML = `
            <div>
              <div id="in">${i + 1}.</div>
              <div id="ItemName">${list.name}</div>
            </div>
            <div id="Deadline">${list.date}</div>
            <div>Priority:
              <div id="priorityData">${list.priority}</div>
            </div>
            <div>
              <i class="fa-regular fa-circle-check" id="complete" data-index="${i}"></i>
              <i class="fa-solid fa-trash" id="delete" data-index="${i}"></i>
            </div>
          `
      fLists.appendChild(div)

      div.querySelector('#delete').addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'))
        futureList.splice(index, 1)
        localStorage.setItem('futureList', JSON.stringify(futureList))
        displayFuture()
      })


      div.querySelector('#complete').addEventListener('click', (e) => {
        let index = parseInt(e.target.getAttribute('data-index'))
        let data = futureList.splice(index, 1)
        completedList.push(...data)
        localStorage.setItem('futureList', JSON.stringify(futureList))
        localStorage.setItem('completedList', JSON.stringify(completedList))
        console.log('completed', completedList)
        displayFuture()
        displayCompleted()
      })
    })
  }

  function displayCompleted() {
    compList.innerHTML = ''
    completedList.forEach((list, i) => {
      let div = document.createElement('div')
      div.className = 'box'
      div.innerHTML = `
        <div>
          <div id="in">${i + 1}.</div>
          <div id="ItemName">${list.name}</div>
        </div>
        <div id="Deadline">${list.date}</div>
        <div>Priority:
          <div id="priorityData">${list.priority}</div>
        </div>
        <div>
          <i class="fa-regular fa-circle-check" id="complete" data-index="${i}"></i>
          <i class="fa-solid fa-trash" id="delete" data-index="${i}"></i>
        </div>
      `
      compList.appendChild(div)

      // Add event listener to the delete button
      div.querySelector('#delete').addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'))
        completedList.splice(index, 1)
        localStorage.setItem('completedList', JSON.stringify(completedList))
        displayCompleted() // Update the UI
      })
    })
  }
})
