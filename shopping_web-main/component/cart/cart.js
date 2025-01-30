let cartLi = document.getElementById('cart');

let lists= document.querySelector('.lists');
lists.innerHTML='';
let cartList = JSON.parse(localStorage.getItem('cart'));
let demoCart=[];
demoCart=cartList;
let total=document.querySelector('.tprice');
total.innerHTML='';
let sum=0;


function displayCart(){
  cartLi.innerHTML='';
  // cart.innerHTML='';
  lists.innerHTML='';
  total.innerHTML='';
  sum=0;
  cartList.forEach((item, i) => {
    let div = document.createElement('div');
    div.className = "item";
  
    div.innerHTML = `
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
      <button id="removeBtn" onclick="removeItem(${item.id},)">Remove from Cart</button>
    `;
    cartLi.appendChild(div);
  let list= document.createElement('div');
  list.className='list';
  list.innerHTML=`
                <div class="name">${i+1}.${item.title.slice(0,20)}...</div>
                  <div class="price">$${item.price}</div>
  `
  lists.appendChild(list);
    sum=sum+item.price;
  });
  
  total.textContent=`$${sum.toFixed(2)}`;
  localStorage.setItem("totalPay",JSON.stringify(sum));
}
displayCart();

// document.querySelectorAll('removeBtn').addEventListener('click',()=>{
//   removeItem();
//   displayCart();
// });

function removeItem(id){
  console.log(id);
  console.log(cartList);
 let demo=[];
 for(let i=0;i<cartList.length;i++){
  if(Number(cartList[i].id) != Number(id)){
    demo.push(cartList[i]);
  }
 }
  console.log(demo);
  localStorage.setItem('cart',JSON.stringify(demo));
  cartList=demo;
  displayCart();

}



// for Nav ResponciveNess


let nav= document.querySelector('nav ul');
// nav.style.display="none";
let openBar= document.querySelector('#open');
let closeBar= document.querySelector('#close');

openBar.addEventListener('click',()=>{
  nav.style.display="block";
  openBar.style.display="none";
  closeBar.style.display="block";
});

closeBar.addEventListener('click',()=>{
  nav.style.display="none";
  openBar.style.display="block";
  closeBar.style.display="none";
})

if(openBar.style.display == "none" && closeBar.style.display== "none"){
  nav.style.display="block";
}