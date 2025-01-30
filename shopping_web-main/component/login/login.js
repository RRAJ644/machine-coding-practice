let email= document.getElementById('email');
let password = document.getElementById('password');

let users=JSON.parse(localStorage.getItem('users'))|| [];
let currUser=JSON.parse(localStorage.getItem('currUser'))|| [];
document.querySelector('form').addEventListener('submit',(e)=>{
e.preventDefault();
let luser={
  email:email.value,
  password:password.value
};
if(users.length>0){
    if(users.find((user)=>user.email== email.value && user.password== password.value)){
        window.location.href="/index.html";
      currUser.push(luser);
      console.log(currUser);
      localStorage.setItem('currUser',JSON.stringify(currUser));
      }else{
          alert("user is not exist please signUp");
      }
}else{
    alert("user is not exist please signUp");
    
}


})
