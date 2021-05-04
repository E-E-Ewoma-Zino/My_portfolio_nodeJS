

document.getElementById("t-shirt-badge").innerHTML = 10;
document.getElementById("shoes-badge").innerHTML = 12;
document.getElementById("shorts-badge").innerHTML = 9;
document.getElementById("bags-badge").innerHTML = 10;
document.getElementById("hats-badge").innerHTML = 6;

// 
let card_img = document.getElementsByClassName("card-img");
let getIndex = 1234567890;

let star = document.getElementsByClassName("card-star");


// convert html string to html
for (let i = 0; i < star.length; i++) {
    console.log("visit " + i + " star");
    console.log(star[0].innerHTML);
    console.log(star);
    star[i].innerHTML = star[i].innerText;
}



window.submitCard = submitCard;
function submitCard() {
    let forms = document.getElementsByClassName("myform");
    for (let i = 0; i < forms.length; i++) {
        const form = forms[i];
        form.addEventListener("click", ()=>{
            form.submit();
        });
    }
    console.log("Done");
}


$("document").ready(()=>{
    $("#landing").hide();
    $("#fade-opacity").show();
});