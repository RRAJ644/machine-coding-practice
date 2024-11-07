const sections = [
  {
    title: 'What is JavaScript?',
    content:
      'JavaScript is a versatile programming language primarily used for adding interactive and dynamic behaviors to web pages. It enables client-side and server-side programming, making it a powerful tool for web development.',
  },
  {
    title: 'What is React?',
    content:
      "React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently manage the user interface's state, making it popular for single-page applications and complex UIs.",
  },
  {
    title: 'What is the DOM?',
    content:
      'The DOM (Document Object Model) is a programming interface for HTML and XML documents. It represents the structure of a document as a tree of nodes, allowing JavaScript to dynamically modify the content, structure, and style of a webpage.',
  },
]

document.addEventListener('DOMContentLoaded', () => {
  const accordionContainer = document.querySelector('#accordion')

  // Initialize the accordion
  const initializeAccordion = () => {
    sections.forEach((section, index) => {
      const sectionItem = document.createElement('div')
      sectionItem.classList.add('accordion-item')

      const sectionHeader = document.createElement('div')
      sectionHeader.classList.add('accordion-header')
      sectionHeader.textContent = section.title

      const sectionContent = document.createElement('div')
      sectionContent.classList.add('accordion-content')
      sectionContent.innerHTML = `<p>${section.content}</p>`
      sectionContent.style.display = index === 0 ? 'block' : 'none'

      if (index === 0) {
        sectionItem.classList.add('active')
      }

      sectionItem.appendChild(sectionHeader)
      sectionItem.appendChild(sectionContent)
      accordionContainer.appendChild(sectionItem)
    })
  }

  // Handle the accordion toggle
  const toggleAccordion = (event) => {
    const header = event.target.closest('.accordion-header')
    if (!header) return

    const sectionItem = header.parentNode
    const content = sectionItem.querySelector('.accordion-content')
    const isActive = sectionItem.classList.contains('active')

    // Close all sections
    document.querySelectorAll('.accordion-item').forEach((item) => {
      item.classList.remove('active')
      item.querySelector('.accordion-content').style.display = 'none'
    })

    // Toggle the clicked section
    if (!isActive) {
      sectionItem.classList.add('active')
      content.style.display = 'block'
    }
  }

  // Initialize and bind events
  initializeAccordion()
  accordionContainer.addEventListener('click', toggleAccordion)
})
