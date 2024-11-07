document.addEventListener('DOMContentLoaded', () => {
  let count = 0;

  const countElement = document.querySelector('#val');
  const errorElement = document.querySelector('#error');
  const updateCount = () => (countElement.textContent = count);

  document.querySelector('#count-container').addEventListener('click', (e) => {
    const { id } = e.target;

    if (id === 'increment') {
      count++;
      errorElement.style.display = 'none';
    } else if (id === 'decrement') {
      if (count > 0) {
        count--;
        errorElement.style.display = 'none';
      } else {
        errorElement.style.display = 'block';
      }
    } else if (id === 'clear') {
      count = 0;
      errorElement.style.display = 'none';
    }

    updateCount();
  });

  updateCount();
});
