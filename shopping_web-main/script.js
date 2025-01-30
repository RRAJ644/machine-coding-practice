let allItemsData;
let manData;
let womanData;
let jeweleryData;
let electronicsData;

let mansCloth = document.getElementById('mansItem');
let womanCLoth = document.getElementById('womanCloth');
let jewelery = document.getElementById('jewelery');
let electronics = document.getElementById('electronics');

let all = document.getElementById('all');
let mans= document.getElementById('mans');
let womans = document.getElementById('womans');
let jewel= document.getElementById('jewel');
let elect= document.getElementById('elect')


mansCloth.innerHTML="";
womanCLoth.innerHTML="";
jewelery.innerHTML="";
electronics.innerHTML="";
let indexs=0;

// Fetch data from API
const fetchData = fetch('https://fakestoreapi.com/products/')
  .then((res) => res.json())
  .then((data) => {
    // Store the data in a variable
    allItemsData = data;

    // Log the data
    console.log('All items:', allItemsData);

    // Filter and display items by category
    displayItemsByCategory(allItemsData, "men's clothing", mansCloth);
    displayItemsByCategory(allItemsData, "women's clothing", womanCLoth);
    displayItemsByCategory(allItemsData, "jewelery", jewelery);
    displayItemsByCategory(allItemsData, "electronics", electronics);
  });

// Function to filter items by category
function filterByCategory(items, category) {
  return items.filter((item) => item.category === category);
}

// Function to display items
function displayItemsByCategory(items, category, container) {
  container.innerHTML='';
  const filteredItems = filterByCategory(items, category);
  console.log(`Filtered ${category} items:`, filteredItems);

  filteredItems.forEach((item) => {
    container.appendChild(displayItem(item));
  });
}

// Function to display a single item
function displayItem(item) {
  const product = document.createElement('div');
  product.className = "item";

  product.innerHTML = `
    <img src="${item.image}" alt="Item" />
    <div class="info">
      <h2 id="title">${item.title}</h2>
      <div class="row">
        <div class="price">$${item.price}</div>
        <div class="sized">S,M,L</div>
      </div>
      <div class="colors">
        Colors:
        <div class="row">
          <div class="circle" style="background-color: #000"></div>
          <div class="circle" style="background-color: #4938af"></div>
          <div class="circle" style="background-color: #203d3e"></div>
        </div>
      </div>
      <div class="row">Rating:${item.rating.rate}&#11088;</div>
    </div>
    <button id="addBtn" data-id="${item.id}">Add to Cart</button>
  `;
  return product;
}

// to store the cart info

let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart ||!Array.isArray(cart)) {
  cart = [];
}

document.body.addEventListener('click', (e) => {
  if (e.target.id === 'addBtn') {
    let index = e.target.getAttribute('data-id');
    let item= allItemsData.find((elem)=>elem.id == index);
    console.log(item);
    item.index=index;

    cart.push(item);
    localStorage.setItem("cart",JSON.stringify(cart));

  }
});

// product categories

let h2=document.querySelectorAll(".heading");
function headings(str){
  h2.forEach((elem)=>{
    elem.style.display=`${str}`;
  })
}
// h2.style.display="block";
// let items= document.querySelector('item')
all.addEventListener('click',()=>{
headings("block");
all.style.backgroundColor="green";
mans.style.backgroundColor="#3F2305";
womans.style.backgroundColor="#3F2305";
jewel.style.backgroundColor="#3F2305";
elect.style.backgroundColor="#3F2305";

  mansCloth.style.display="block";
  mansCloth.style.display="flex";
  womanCLoth.style.display="block";
  womanCLoth.style.display="flex";

  jewelery.style.display="block";
  jewelery.style.display="flex";

  electronics.style.display="block";
  electronics.style.display="flex";

  // h2.style.display="block"
});
mans.addEventListener('click',()=>{
  headings("none");
all.style.backgroundColor="#3F2305";
  mans.style.backgroundColor="green";
 womans.style.backgroundColor="#3F2305";
 jewel.style.backgroundColor="#3F2305";
 elect.style.backgroundColor="#3F2305";


  mansCloth.style.display="block";
  mansCloth.style.display="flex";

  womanCLoth.style.display="none";
  jewelery.style.display="none";
  electronics.style.display="none";
});

womans.addEventListener('click',()=>{
  headings("none");
all.style.backgroundColor="#3F2305";
  mans.style.backgroundColor="#3F2305";
  womans.style.backgroundColor="green";
  jewel.style.backgroundColor="#3F2305";
  elect.style.backgroundColor="#3F2305";

  mansCloth.style.display="none";
  womanCLoth.style.display="block";
 womanCLoth.style.display="flex";

  jewelery.style.display="none";
  electronics.style.display="none";
})
jewel.addEventListener('click',()=>{
  headings("none");
all.style.backgroundColor="#3F2305";
  mans.style.backgroundColor="#3F2305";
  womans.style.backgroundColor="#3F2305";
  jewel.style.backgroundColor="green";
  elect.style.backgroundColor="#3F2305";

  mansCloth.style.display="none";
  womanCLoth.style.display="none";
  jewelery.style.display="block";
 jewelery.style.display="flex";

  electronics.style.display="none";

})
elect.addEventListener('click',()=>{
  headings("none");
all.style.backgroundColor="#3F2305";
  mans.style.backgroundColor="#3F2305";
  womans.style.backgroundColor="#3F2305";
  jewel.style.backgroundColor="#3F2305";
  elect.style.backgroundColor="green";

  mansCloth.style.display="none";
  womanCLoth.style.display="none";
  jewelery.style.display="none";
  electronics.style.display="block";
 electronics.style.display="flex";


})


// Navbar responcive

let nav = document.querySelector('nav ul');
// nav.style.display="none";
let openBar = document.querySelector('#open');
let closeBar = document.querySelector('#close');

openBar.addEventListener('click', () => {
  nav.style.display = "block";
  nav.style.transition = ".5s ease";
  openBar.style.display = "none";
  closeBar.style.display = "block";
});

closeBar.addEventListener('click', () => {
  nav.style.transition = ".5s ease";
    nav.style.display = "none";
  openBar.style.display = "block";
  closeBar.style.display = "none";
})

if (openBar.style.display == "none" && closeBar.style.display == "none") {
  nav.style.display = "block";
}


// search Item

let searchItem=document.getElementById('searchItem');

searchItem.addEventListener('input',()=>{
  let items= allItemsData.filter((elem)=>{
            return elem.title.toLowerCase().includes(searchItem.value.toLowerCase());
  })
  console.log(items)
  callAll(items)
})

// range

let range = document.getElementById('range');

range.addEventListener('input', () => {
  const value = parseInt(range.value); // convert value to an integer
  console.log(value);
  let items = allItemsData.filter((elem) => {
    return elem.rating.rate >= value; // now you can compare numbers
  });
  console.log(items);
 callAll(items);
});

function callAll(items){
  displayItemsByCategory(items, "men's clothing", mansCloth);
  displayItemsByCategory(items, "women's clothing", womanCLoth);
  displayItemsByCategory(items, "jewelery", jewelery);
  displayItemsByCategory(items, "electronics", electronics);
}

// Get all price range elements
const priceRanges = {
  '0-25': document.getElementById('0-25'),
  '25-50': document.getElementById('25-50'),
  '50-100': document.getElementById('50-100'),
  '100on': document.getElementById('100on')
};

// Add event listeners to each price range element
Object.keys(priceRanges).forEach((range) => {
  priceRanges[range].addEventListener('click', () => {
    // Filter items based on the selected price range
    const items = allItemsData.filter((elem) => {
      switch (range) {
        case '0-25':
          return elem.price < 25;
        case '25-50':
          return elem.price >= 25 && elem.price < 50;
        case '50-100':
          return elem.price >= 50 && elem.price < 100;
        case '100on':
          return elem.price >= 100;
        default:
          return false;
      }
    });

    console.log(`Filtered items for range ${range}:`, items);
    callAll(items);
  });
});
