const tabs = [
  {
    id: 'tab1',
    title: 'Introduction',
    content:
      'This section provides an introduction to the topic, covering the basics and setting the stage for the details to follow.',
  },
  {
    id: 'tab2',
    title: 'Features',
    content:
      'Here, we discuss the key features of our product, outlining the benefits and unique aspects that set it apart.',
  },
  {
    id: 'tab3',
    title: 'Pricing',
    content:
      'This tab covers the pricing structure, offering detailed information on different plans and options available.',
  },
]

document.addEventListener('DOMContentLoaded', () => {
  let activeTab = tabs[0].id
  const tabContainer = document.querySelector('#tab-container')
  const tabContentContainer = document.querySelector('#tab-content-container')

  const initializeTabs = () => {
    tabs.forEach((tab, index) => {
      const tabButton = document.createElement('button')
      tabButton.classList.add('tab-links')
      tabButton.textContent = tab.title
      tabButton.setAttribute('data-tab', tab.id)
      tabContainer.appendChild(tabButton)

      const tabContent = document.createElement('div')
      tabContent.id = tab.id
      tabContent.classList.add('tab-content')
      tabContent.innerHTML = `<h3>${tab.title}</h3><p>${tab.content}</p>`

      tabContentContainer.appendChild(tabContent)
    })

    tabContainer.addEventListener('click', (e) => {
      e.preventDefault()
      if (e.target.matches('.tab-links')) {
        const tabId = e.target.getAttribute('data-tab')
        if (tabId !== activeTab) {
          openTab(tabId)
          activeTab = tabId
        }
      }
    })

    const openTab = (tabId) => {
      const tabContents = document.querySelectorAll('.tab-content')
      const tabLinks = document.querySelectorAll('.tab-links')

      tabContents.forEach((tab) => tab.classList.remove('active'))
      tabLinks.forEach((tab) => tab.classList.remove('active'))

      document.querySelector(`#${tabId}`).classList.add('active')
      document
        .querySelector(`button[data-tab="${tabId}"]`)
        .classList.add('active')
    }

    openTab(activeTab)
  }

  initializeTabs()
})
