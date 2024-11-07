document.addEventListener('DOMContentLoaded', (e) => {
  const createCounterElement = () => {
    let count = 0

    const counterDiv = document.querySelector('#increment-counter')
    const counterParagraph = document.getElementById('counter')

    counterDiv.addEventListener('click', (e) => {
      e.preventDefault()
      alert(count)
      const target = e.target.classList

      if (target.tagName === 'BUTTON' && target.innerText === 'Increment') {
        alert(count)
        count += 1
        counterParagraph.textContent = count
      }
    })

    document.body.appendChild(counterDiv)
  }

  createCounterElement()
})
