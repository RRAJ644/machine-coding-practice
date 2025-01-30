// for Nav Responsive

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

let user= JSON.parse(localStorage.getItem('users'));
let Uname= user[0].name.split(" ");
console.log(Uname)
document.querySelector('.userDetail').innerHTML=`
 <div>
                <div class="flex">
                    <label for="fname">Name</label>
                    <input type="text" disabled placeholder="${Uname[0]}" id="fname">
                </div>
                <div class="flex">
                    <label for="lname">Last Name</label>
                    <input type="text" disabled placeholder="${Uname[1]}" id="lname">
                </div>
            </div>
            <div class="flex">
                <label for="email">Email</label>
                <input type="email" disabled placeholder="${user[0].email}" id="email">
            </div>
`

let oldPass= document.getElementById('oldPass');
let newPass= document.getElementById('newPass');

document.querySelector('form').addEventListener('submit',()=>{
    console.log(oldPass.value,newPass.value);
    if(oldPass.value==user[0].password){
        user[0].password= newPass.value;
        console.log("hii",user);
        localStorage.setItem('users',JSON.stringify(user));
    oldPass.value='';
    newPass.value='';
    }
    else{
        alert("invalid old Password");
    }
})