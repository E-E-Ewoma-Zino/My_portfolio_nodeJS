import { currentScrollPos } from "./main.js";

// let aboutTitle = document.getElementById("aboutTitle");
// let teamTitle = document.getElementById("teamTitle");


// let about_me_topPos = about_me.getBoundingClientRect().top + offsetNum;
// let about_me_bottomPos = about_me.getBoundingClientRect().bottom + offsetNum;
// let teamUP_topPos = teamUP.getBoundingClientRect().top + offsetNum;
// export let teamUP_bottomPos = teamUP.getBoundingClientRect().bottom + offsetNum;

// let start1 = false;
let start2 = false;

// export function popUpTitle() {
//     if (currentScrollPos >= about_me_topPos) {
//         aboutTitle.classList.add("popUpTitle");
//         aboutTitle.classList.remove("popOutTitle");
//         start1 = true;
//     }
//     if (currentScrollPos <= about_me_topPos || currentScrollPos >= about_me_bottomPos) {
//         if (start1 == true) {
//             aboutTitle.classList.remove("popUpTitle");
//             aboutTitle.classList.add("popOutTitle");
//             start1 = false;
//         }
//     }
//     // 
//     if (currentScrollPos >= teamUP_topPos) {
//         teamTitle.classList.add("popUpTitle");
//         teamTitle.classList.remove("popOutTitle");
//         start2 = true;
//     }

//     if (currentScrollPos <= teamUP_topPos || currentScrollPos >= teamUP_bottomPos) {
//         if (start2 == true) {
//             teamTitle.classList.remove("popUpTitle");
//             teamTitle.classList.add("popOutTitle");
//             start2 = false;
//         }
//     }
// }

function forOnlyHomePage() {

    // underlines the active section of the page
    function activeSection() {
        // set active link 
        let offsetNum = -50;
        console.log(currentScrollPos);
        if (currentScrollPos >= (about_me_topPos + offsetNum)) {
            nav_link[0].classList.add("active-section")
        }
        if (currentScrollPos <= (about_me_topPos + offsetNum) || currentScrollPos >= (about_me_bottomPos + offsetNum)) {
            nav_link[0].classList.remove("active-section")
        }
        if (currentScrollPos >= (teamUP_topPos + offsetNum)) {
            nav_link[1].classList.add("active-section")
        }
        if (currentScrollPos <= (teamUP_topPos + offsetNum) || currentScrollPos >= (teamUP_bottomPos + offsetNum)) {
            nav_link[1].classList.remove("active-section")
        }
    }

}


if (window.location.pathname == "/") {
    forOnlyHomePage();
}