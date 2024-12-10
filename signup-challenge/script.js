document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form') // Parent form
  const emailInput = document.querySelector('#email')
  const passwordInput = document.querySelector('#password')
  const p1 = document.querySelector('#para1')
  const p2 = document.querySelector('#para2')
  const success = document.querySelector('.success')
  const submitBtn = document.querySelector('.submit')

  // Validation function
  const validateInputs = () => {
    const email = emailInput.value
    const password = passwordInput.value

    let isValid = true

    if (email.length < 3 || !email.includes('@') || !email.includes('.')) {
      p1.style.display = 'block'
      isValid = false
    } else {
      p1.style.display = 'none'
    }

    if (password.length < 8) {
      p2.style.display = 'block'
      isValid = false
    } else {
      p2.style.display = 'none'
    }

    if (isValid) {
      success.style.display = 'block'
    } else {
      success.style.display = 'none'
    }

    return isValid
  }

  form.addEventListener('input', (e) => {
    const target = e.target
    if (target === emailInput || target === passwordInput) {
      validateInputs()
    }
  })

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const isValid = validateInputs()

    if (isValid) {
      confirm('Are you sure you want to submit?')
      confirm('Successful signup!')
    }
  })
})
