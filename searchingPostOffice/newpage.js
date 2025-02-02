let data = JSON.parse(localStorage.getItem('data'));
console.log(data);
let searchData = document.querySelector('#search');
console.log(searchData);
let demo = [];
let filter = [];



let firstHtml = `
 <p>IP Address: <span>${data.ip} </span> </p>
           <div>
            <div>
                <p>Lat: ${data.latitude}<span>${data.latitude}</span></p>
                <p>Long: <span>${data.longitude}</span></p>
            </div>
            <div>
                <p>City: <span>${data.city}</span></p>
                <p>Region: <span>${data.region}</span></p>
            </div>
            <div>
                <p>Organisation: <span>${data.org}</span></p>
                <p>Hostname: <span>Abhishek</span></p>
            </div>
           </div>
`
let first = document.querySelector('.first')
first.innerHTML = `${firstHtml}`;

document.querySelector('.location').innerHTML = `
                <iframe src="https://maps.google.com/maps?q=${data.latitude}, ${data.longitude}&z=15&output=embed" width="100%" height="100%" frameborder="0" style="border:0"></iframe>

`
let pincode = parseInt(data.postal);
let curDate = new Date().toLocaleString("en-IN", { timeZone: `${data.timezone}` });

console.log(curDate)
async function postInfo() {
    let postalData = await postoffice();
    document.querySelector('.third').innerHTML = `
                   <h2>More Information About You</h2>
            <div>
                <p>Time Zone: <span>${data.timezone}</span></p>
                <p>Date And Time: <span>${curDate}</span></p>
                <p>Pincode: <span>${pincode}</span></p>
                <p>Message: <span>${postalData[0].Message}</span></p>
            </div>
`
}
postInfo();

async function postoffice() {
    console.log(pincode)
    try {

        let res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        let data = await res.json()
        console.log(data[0].PostOffice);
        console.log(data);
        demo = data[0].PostOffice;
        displayPostOffice(demo);
        return demo;
    } catch (error) {
        console.error('erron fetching postal information', error)
    }
}


let post_offices = document.querySelector('.post_offices');

function displayPostOffice(postData) {
    post_offices.innerHTML = '';
    postData.forEach((elem) => {
        let div = document.createElement('div');
        div.innerHTML = `
                    <p>Name: <span>${elem.Name}</span></p>
                    <p>Branch Type: <span>${elem.BranchType}</span></p>
                    <p>Delivery Status: <span>${elem.DeliveryStatus}</span></p>
                    <p>District: <span>${elem.District}</span></p>
                    <p>Division: <span>${elem.Division}</span></p>
 `;
        post_offices.appendChild(div);
    });

}

searchData.addEventListener('input', searchOffice);

async function searchOffice(e) {
    console.log(e.target.value);
    let data = await postoffice();
    let search_name = e.target.value;
    let names = data.filter((elem) => {
        return elem.Name.toLowerCase().includes(search_name.toLowerCase());
    })
    console.log(names)
    displayPostOffice(names);
}
