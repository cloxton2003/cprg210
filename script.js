//-- NAVIGATION BAR CREATION AND FUNCTION FOR INDEX PAGE
// CALCULATE PAGE LENGTH FOR NAV BAR AND MAX SCROLL
window.addEventListener('load', function()
{
    if (document.body.classList.contains('index'))
    {
        const SECTION_BACKGROUND = document.querySelectorAll('section');
        const INDEX_LENGTH = document.querySelector('.mainContent');
        let VERTICAL_SCROLL = 0;
        let CAN_SCROLL = true;
        let NAV_BAR = '';

        document.body.insertAdjacentHTML('beforeEnd',
            '<div class="nav"></div>');
        for (let i = 0; i < SECTION_BACKGROUND.length; i++)
        {
            NAV_BAR += '<div class="navBtn"><span>' +
                SECTION_BACKGROUND[i].dataset.title + '</span></div>';
        }

        // NAV BAR BUTTON MOVE TO CORRESPONDING PAGE AND TOGGLE STYLE       
        document.querySelector('.nav').innerHTML = NAV_BAR;
        const NAV_BAR_BTNS = document.querySelectorAll('.navBtn');
        NAV_BAR_BTNS[0].classList.add('active');
        for (let i = 0; i < NAV_BAR_BTNS.length; i++)
        {
            NAV_BAR_BTNS[i].addEventListener('click', function()
            {
                document.querySelector('.navBtn.active')
                    .classList.remove('active');
                this.classList.add('active');
                VERTICAL_SCROLL = i;
                scroll_content(VERTICAL_SCROLL);
            });
        }

        // -- MOUSE SMOOTH SCROLL FOR INDEX PAGE------------------
        // RESET MOUSE SCROLL FUNTION ON PAGE REFRESH
        history.scrollRestoration = 'manual';

        // SCROLL BY PAGE NOT BY INCREMENTS
        window.addEventListener('wheel', function(e)
        {
            if (CAN_SCROLL)
            {
                CAN_SCROLL = false;
                if (e.deltaY > 0)
                {
                    if (VERTICAL_SCROLL < SECTION_BACKGROUND
                        .length - 1) VERTICAL_SCROLL += 1;
                }
                else
                {
                    if (VERTICAL_SCROLL > 0) VERTICAL_SCROLL -=
                        1;
                }
                scroll_content(VERTICAL_SCROLL);
            }
            setTimeout(function()
            {
                CAN_SCROLL = true;
            }, 560);
        });

        function scroll_content(count)
        {
            INDEX_LENGTH.setAttribute('style', '\
    -webkit-transform: translateY(-' + count * 100 + 'vh);\
    -ms-transform: translateY(-' + count * 100 + 'vh);\
    -o-transform: translateY(-' + count * 100 + 'vh);\
    transform: translateY(-' + count * 100 + 'vh);\
    ');
            document.querySelector('.navBtn.active').classList.remove(
                'active');
            NAV_BAR_BTNS[count].classList.add('active');
        }
    }
});

// -------------GALLERY----------------------------------

const GALLERY_TR = document.querySelector(".indexTr");
const GALLERY_CONTAINER = document.querySelector('.divContainer');
const INDEX_BOOLEAN = document.querySelector('.index');

let GALLERY_ARRAY = [
    "columbia.jpg",
    "alberta.jpg",
    "saskatchewan.jpg",
    "ontario.jpg",
    "newfoundland.jpg"
];

let GALLERY_DESCRIPTIONS = [
    "British Columbia",
    "Alberta",
    "Saskatchewan",
    "Ontario",
    "Newfoundland"
];

// POPULATE GALLERY DESCRIPTIONS INTO TABLE
if (INDEX_BOOLEAN)
{
    for (i = 0; i < GALLERY_DESCRIPTIONS.length; i++)
    {
        const GALLERY_TD = document.createElement('td');
        GALLERY_TR.appendChild(GALLERY_TD);
        GALLERY_TD.textContent = GALLERY_DESCRIPTIONS[i];
        GALLERY_TD.id = i;
        GALLERY_TD.className = "imgGallery";
    }
}
// CONTACTS AND GALLERY ARRAY FUNCTION-----------------------
const AGENT_IMG_CONTAINER = document.querySelector('.agentContainer');
const AGENTS_IMG = [
    'anton-darius.jpg',
    'bradley-dunn.jpg',
    'jude-beck.jpg',
    'mohammed-alherz.jpg'
];

// mouse over event to change gallery and agent profile pictures
document.addEventListener('mouseover', function(e)
{
    if (e.target && e.target.className == "imgGallery")
    {
        GALLERY_CONTAINER.style.background = "url(" + GALLERY_ARRAY[e
            .target.id] + ") no-repeat center center/ cover";
    }
    else if (e.target && e.target.className == "agentId")
    {
        AGENT_IMG_CONTAINER.style.background = "url(" + AGENTS_IMG[e
            .target.id] + ") no-repeat center center/ cover";
    }
});

// same as about but for mobile to change gallery and agent profile pictures
document.addEventListener('touchstart', function(e)
{
    if (e.target && e.target.className == "imgGallery")
    {
        GALLERY_CONTAINER.style.background = "url(" + GALLERY_ARRAY[e
            .target.id] + ") no-repeat center center/ cover";
    }
    else if (e.target && e.target.className == "agentId")
    {
        AGENT_IMG_CONTAINER.style.background = "url(" + AGENTS_IMG[e
            .target.id] + ") no-repeat center center/ cover";
    }
});

// ------------REGULAR EXPRESSIONS FOR REGISTER FORM--------------------
const FIRST_NAME = document.getElementById('fname');
const LAST_NAME = document.getElementById('lname');
const POSTAL_CODE = document.getElementById('postal-code');
const REGISTER_FORM = document.getElementById('form');
const PASSWORD = document.getElementById('password');
const WRONG_INPUT = document.getElementById('error');
const REGISTER_PAGE = document.querySelector('.regBody');

if (REGISTER_PAGE)
{
    REGISTER_FORM.addEventListener('submit', (e) =>
    {
        let messages = [];
        let strongRegex = new RegExp(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/);
        let pcodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

        // ^  The password string will start this way
        // (?=.*[a-z])  The string must contain at least 1 lowercase alphabetical character
        // (?=.*[A-Z])  The string must contain at least 1 uppercase alphabetical character
        // (?=.*[0-9])  The string must contain at least 1 numeric character
        // (?=.*[!@#$%^&*]) The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
        // (?=.{8,})  The string must be eight characters or longer

        if (FIRST_NAME.value === '' || FIRST_NAME.value == null)
        {
            messages.push('please enter a name');
        }
        if (LAST_NAME.value === '' || LAST_NAME.value == null)
        {
            messages.push('please enter a last name');
        }

        // ----------------POSTALCODE------------

        if (!POSTAL_CODE.value.match(pcodeRegex))
        {
            messages.push('Please enter a valid postal code');
        }

        // -----------------PASSWORD-------------

        if (!PASSWORD.value.match(strongRegex))
        {
            messages.push(`Password must contain at least one of each: 
                        lowercase, uppercase, number, special character 
                        and at least eight characters long`);
        }

        // ------------PREVENT BLANK ENTRY------------------ 
        if (messages.length > 0)
        {
            e.preventDefault();
            WRONG_INPUT.innerText = messages.join('');
        }
    });

    // --------------------FORM ADVISEMENT--------------

    const FORM_INPUT = document.querySelectorAll('input');

    FORM_INPUT.forEach(el =>
    {
        el.addEventListener('mouseover', (e) =>
        {
            let FORM_ATTR = el.getAttribute("name");
            let ERR_MESSAGE = document.getElementById('error');
            switch (FORM_ATTR)
            {
                case "fname":
                    ERR_MESSAGE.innerText = 'optional';
                    break;
                case "lname":
                    ERR_MESSAGE.innerText =
                        'last name required';
                    break;
                case "address":
                    ERR_MESSAGE.innerText = 'address required';
                    break;
                case "city":
                    ERR_MESSAGE.innerText = 'city required';
                    break;
                case "province":
                    ERR_MESSAGE.innerText = 'province required';
                    break;
                case "postal-code":
                    ERR_MESSAGE.innerText =
                        'postal code required';
                    break;
                case "email":
                    ERR_MESSAGE.innerText = 'email required';
                    break;
                case "password":
                    ERR_MESSAGE.innerText = 'password required';
                    break;
            }
        });
    });
}