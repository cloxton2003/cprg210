// this will fix any refresh issues on reload with smooth scroll
history.scrollRestoration = 'manual';

//-- NAVIGATION BAR-----------------------------
window.addEventListener('load', function() {
  if ( document.body.classList.contains('index') && window.innerWidth > 300 ) {
    const sect = document.querySelectorAll('section');
    const cont = document.querySelector('.mainContent');
    let scrollv = 0;
    let can_scroll = true;
    sec_nav = '';
    document.body.insertAdjacentHTML('beforeEnd', '<div class="nav"></div>');
    for ( let i=0; i<sect.length; i++ ) {
      sec_nav += '<div class="navBtn"><span>'+ sect[i].dataset.title +'</span></div>';
    }

    document.querySelector('.nav').innerHTML = sec_nav;
    const buttons = document.querySelectorAll('.navBtn');
    buttons[0].classList.add('active');
    for ( let i=0; i<buttons.length; i++ ) {
      buttons[i].addEventListener('click', function() {
        document.querySelector('.navBtn.active').classList.remove('active');
        this.classList.add('active');
        scrollv = i;
        scroll_content(scrollv);
      });
    }
//-- MOUSESCROLL---------------------------------  
window.addEventListener('wheel', function(e) {
  if ( can_scroll ) {
    can_scroll = false;
    if ( e.deltaY > 0 ) {
      if ( scrollv < sect.length-1 ) scrollv += 1;
    } else {
      if ( scrollv > 0 ) scrollv -= 1;
    }

    scroll_content(scrollv);
  }

  setTimeout(function() {
    can_scroll = true;
  }, 560); 
});

function scroll_content( count ) {
  cont.setAttribute('style', '\
    -webkit-transform: translateY(-'+ count*100 +'vh);\
    -ms-transform: translateY(-'+ count*100 +'vh);\
    -o-transform: translateY(-'+ count*100 +'vh);\
    transform: translateY(-'+ count*100 +'vh);\
    ');
  // cont.style.transform = 'translateY(-'+ count*100 +'vh)';
  document.querySelector('.navBtn.active').classList.remove('active');
  buttons[count].classList.add('active');  
}  
}
});

// -------------GALLERY----------------------------------

const imgAgents = ['anton-darius.jpg' , 'bradley-dunn.jpg' , 'jude-beck.jpg' , 'mohammed-alherz.jpg'];
const agent = document.querySelector('.agentContainer');
const imgDescs = new Array();
const tableRow = document.querySelector(".indexTr");
const divContainer = document.querySelector('.divContainer');
const index = document.querySelector('.index');

const imgArray = [ "columbia.jpg" , "alberta.jpg" , "saskatchewan.jpg" , "ontario.jpg" , "newfoundland.jpg" ];
imgDescs[0] = "British Columbia"; 
imgDescs[1] = "Alberta";
imgDescs[2] = "Saskatchewan";
imgDescs[3] = "Ontario";
imgDescs[4] = "Newfoundland";


if (index) {
  for ( i = 0; i < imgDescs.length; i++ ) {
    const td = document.createElement('td');
    tableRow.appendChild(td);
    td.textContent = imgDescs[i];
    td.id = i;
    td.className = "imgGallery";
  }
}
// mouse over event to change gallery and agent profile pictures
document.addEventListener('mouseover', function(e){
  if(e.target && e.target.className == "imgGallery" ) {
   divContainer.style.background = "url(" + imgArray[e.target.id] + ") no-repeat center center/ cover";
 } else if (e.target && e.target.className == "agentId" ) {
  agent.style.background = "url(" + imgAgents[e.target.id] + ") no-repeat center center/ cover";
 }
});
// same as about but for mobile to change gallery and agent profile pictures
document.addEventListener('touchstart', function(e){
  if(e.target && e.target.className == "imgGallery" ) {
   divContainer.style.background = "url(" + imgArray[e.target.id] + ") no-repeat center center/ cover";
 } else if (e.target && e.target.className == "agentId" ) {
  agent.style.background = "url(" + imgAgents[e.target.id] + ") no-repeat center center/ cover";
}
});

const name = document.getElementById('fname');
const lname = document.getElementById('lname');
const address = document.getElementById('address');
const city = document.getElementById('city');
const province = document.getElementById('province');
const pcode = document.getElementById('postal-code');
const email = document.getElementById('email');
const form = document.getElementById('form');
const password = document.getElementById('password');
const errorElement = document.getElementById('error');

// ------------RegExp------------------------
const regBody = document.querySelector('.regBody')

if (regBody) {
form.addEventListener('submit', (e) => {
  let messages = [];
  let strongRegex = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/);
  let pcodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

// ^  The password string will start this way
// (?=.*[a-z])  The string must contain at least 1 lowercase alphabetical character
// (?=.*[A-Z])  The string must contain at least 1 uppercase alphabetical character
// (?=.*[0-9])  The string must contain at least 1 numeric character
// (?=.*[!@#$%^&*]) The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
// (?=.{8,})  The string must be eight characters or longer

  if (name.value === '' || name.value == null) {
    messages.push('please enter a name')
  }
  if (lname.value === '' || lname.value == null) {
    messages.push('please enter a last name');
  }

// ----------------POSTALCODE------------

  if (!pcode.value.match(pcodeRegex)) {
    messages.push('Please enter a valid postal code');
  }

// -----------------PASSWORD-------------

  if (!password.value.match(strongRegex)) {
    messages.push('Password must contain at least, one lowercase, one uppercase, one number, one special character and a minimum of eight characters long');
  }

// ---------------------BLANK ENTRY-----------  

  if (messages.length > 0) {
    e.preventDefault();
    errorElement.innerText = messages.join('');
  }
})

// --------------------FORM ADVISEMENT----------

const x = document.querySelectorAll('input');

x.forEach(el => {
  el.addEventListener('mouseover', (e) => {
    let y = el.getAttribute("name");
    let z = document.getElementById('error');   
    switch (y) {
      case "fname":         
          z.innerText = 'optional';
      break;
      case "lname":
          z.innerText = 'last name required';
      break;
      case "address":
          z.innerText = 'address required';
      break;
      case "city":
          z.innerText = 'city required';
      break;
      case "province":
          z.innerText = 'province required';
      break;
      case "pcode":
          z.innerText = 'postal code required';
      break;
      case "email":
          z.innerText = 'email required';
      break;
      case "password":
          z.innerText = 'password required';
      break;
    }
  });
});
}
