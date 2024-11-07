//your JS code here. If required.
document.addEventListener('DOMContentLoaded', (e) => {
  const status = document.querySelector('#status')
  const enterBtn = document.querySelector('#enterBtn')

  enterBtn.addEventListener('click', () => {
    status.innerHTML = `<h1>Entered Metaverse</h1>`
  })
})
