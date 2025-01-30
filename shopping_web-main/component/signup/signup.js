let username= document.getElementById('name');
let email=document.getElementById('email');
let password= document.getElementById('password');

let users=JSON.parse(localStorage.getItem('users')) || [];

document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault();
    if(users.length>0){
       if(users.find((user)=> user.email==email.value)){
        alert("user is already exist please Login");
       }else{
        let user={
            name:username.value,
            email:email.value,
            password:password.value
        };
        users.push(user);
        localStorage.setItem('users',JSON.stringify(users));
        document.location.href="/index.html";
       }

    }else{
        let user={
            name:username.value,
            email:email.value,
            password:password.value
        };
        users.push(user);
        localStorage.setItem('users',JSON.stringify(users));
        document.location.href="/index.html";
       
    }
    })