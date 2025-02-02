let ip;

$(document).ready(()=>{
  $.getJSON("https://api.ipify.org?format=json",
  function (data) {
    ip=data.ip;
    $("#ip").html(data.ip);

  clicked(ip);
  })
});


function clicked(ip){
  document.querySelector('.btn').addEventListener('click', () => {
    fetch(`https://ipapi.co/${ip}/json/`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        localStorage.setItem('data',JSON.stringify(data));
        document.location.href="./newpage.html";

      })
      .catch(error => {
        console.error("Error fetching IP data:", error);
      });
  });

}

