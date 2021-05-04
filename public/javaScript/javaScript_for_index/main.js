// import { popUpTitle, } from "./index.js";
//



/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
const titleName = document.getElementById("title");
const formTopic = document.getElementById("formTopic");
const header = document.getElementById("header-nav");
const game = document.getElementById("gameIntro");
const web = document.getElementById("web");
const flutter = document.getElementById("flutter");
const others = document.getElementById("others");
const divider = document.getElementById("divider");
const svg = document.getElementsByClassName("cls-e-1");
const svg_vg = document.getElementsByClassName("cls-1");

function showHeader() {
    header.style.top = "0%";
    header.style.right = "0%";
    header.style.left = "0%";
    header.style.zIndex = "99999999";
    header.style.opacity = "1";
    header.style.width = "100%";
    header.style.boxShadow = "0px 0.4px 6px 0 rgb(216, 216, 216)";
    for (let x = 0; x < 6; x++) {
        document.querySelectorAll(".my-text-white")[x].style = "color: black"
    }
    for (let i = 0; i < svg.length; i++) {
        svg[i].style.fill = "black";
    }
    for (let i = 0; i < svg_vg.length; i++) {
        svg_vg[i].style.fill = "white";
    }
    // document.getElementsByClassName("cls-1");
    header.style.backgroundColor = "white";
}

function hideHeader1() {
    header.style.top = "-100px";
    // header.style.right = "50%";
    // header.style.top = "50%";
    // header.style.zIndex = "-1";
    // header.style.width = "0%";
    header.style.opacity = "0";
    // header.style.transform = "none";
}

function hideHeader2() {
    header.style.backgroundColor = "transparent";
    header.style.boxShadow = "none";
    for (let x = 0; x < 6; x++) {
        document.querySelectorAll(".my-text-white")[x].style = "color: white"
    }
    for (let i = 0; i < svg.length; i++) {
        svg[i].style.fill = "white";
    }
    for (let i = 0; i < svg_vg.length; i++) {
        svg_vg[i].style.fill = "black";
    }
}

// set the previous scrole location
export let currentScrollPos = 0;
let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    // 
    // set the current scrole location 
    currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        // show header
        if (window.location.pathname != "/projects") showHeader();
    } else {
        // hide header
        if (window.location.pathname != "/projects") hideHeader1();
    }
    prevScrollpos = currentScrollPos;

    if (currentScrollPos < 50) {
        // makes the header become transparent when you scroll to the very top
        if (window.location.pathname != "/projects") hideHeader2();
    }

    // check if wondows is close to the bottom
    if (currentScrollPos >= 650) {
        document.getElementById("topBtn").style.bottom = "10%";
        // i just call this function here because i need it to run but
        //  i have nothing to call it and if i put it in the code like
        //  that Project will crash
        // skill();
    }
    else {
        document.getElementById("topBtn").style.bottom = "-200px";
    }

    // activeSection();
    // popUpTitle();
}


// 
// This side is for the contact me page

// get html id
const v = document.getElementById("contactMe");
const w = document.getElementById("fade-opacity");

window.contactMe = contactMe;

function contactMe(num) {
    // set background opacity low
    w.style.opacity = "0.34567";

    // display contact page on top everything
    v.style.display = "flex";
    v.style.zIndex = "2000";
    v.style.transform = "translateY(-50%)";

    if (num == 1) {
        v.firstChild.nextSibling.childNodes[3].childNodes[1].innerHTML = "Contact Me";
        formTopic.value = "Contact Me";
    }
    else {
        v.firstChild.nextSibling.childNodes[3].childNodes[1].innerHTML = "Team Up";
        formTopic.value = "Team Up";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == v) {
            closebtn();
        }
    }
}

window.closebtn = closebtn;

function closebtn() {
    // this will wait 3sec before execution
    setTimeout(() => {
        v.style.display = "none";
        v.style.transform = "translateY(-50%)";
    }, 1000);

    // this will execute before the previous code, lol
    v.style.transform = "translateY(-180%)";
    w.style.opacity = "1";
}

// autocomplete
function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        const x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        const x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

/*An array containing all the country names in the world:*/
var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), countries);
// end the autocomplete 

window.star = star;

function star(num) {
    const h = document.getElementById("star");

    for (let i = 0; i < 5; i++) {
        h.children.item(i).firstElementChild.classList.remove("star-checked");
    }
    for (let i = 0; i < num; i++) {
        h.children.item(i).firstElementChild.classList.add("star-checked");
    }

    console.log("You have " + num + " star");
    // to send the ratings to the DOM
    document.getElementById("rating").setAttribute("value", (num + " star"));
}

function project_tabs(game_tab, web_tab, flutter_tab, other_tab, space) {
    console.log("tabs set");
    game.style.display = game_tab;
    web.style.display = web_tab;
    flutter.style.display = flutter_tab;
    others.style.display = other_tab;
    divider.style.display = space;
}

window.tabBtn = tabBtn;

function tabBtn(tab) {
    localStorage.setItem("tab", tab);
}

function showTab(tab) {
    console.log(tab);
    const none = "none";
    const show = "flex";

    switch (tab) {
        case 'web':
            project_tabs(none, show, none, none, show);
            titleName.innerHTML = `My Projects - ${tab}`;
            break;
        case 'flutter':
            project_tabs(none, none, show, none, show);
            titleName.innerHTML = `My Projects - ${tab}`;
            break;
        case 'others':
            project_tabs(none, none, none, show, show);
            titleName.innerHTML = `My Projects - ${tab}`;
            break;
        case 'game':
            project_tabs(show, none, none, none, none);
            titleName.innerHTML = `My Projects - ${tab}`;
            break;
        case 'only projects':
            project_tabs(none, show, show, show, show);
            titleName.innerHTML = `My Projects - ${tab}`;
            break;
        case 'all':
            project_tabs(show, show, show, show, none);
            titleName.innerHTML = `My Projects - ${tab}`;
            break;
        default:
            throw "error: could not find tab";
    }
}

// showTab('flutter');

if (window.location.pathname == "/projects") {
    showTab(localStorage.getItem("tab"));
    header.style.background = "var(--primary-color)";
}


// waits until document is ready

$("document").ready(()=>{
    $("#fade-opacity").show();
    $("#landing").hide();
});