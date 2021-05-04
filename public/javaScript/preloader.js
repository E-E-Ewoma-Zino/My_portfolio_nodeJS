// this script function is to preload images until the main image is ready

function preloade(elem, target) {
    try {
        const img = new Image();
        img.onload = (e) => {
            elem.src = e.target.src;
        }
        img.src = target;
        elem.classList.remove("preloader");
        console.log(`TDF \n ${elem}`);
        // window.location.reload();
    } catch (error) {
        console.log("Image: " + error);
    }
}


let imgT = document.querySelectorAll("img");
console.log(imgT.entries)


imgT.forEach(element => {
    preloade(element, element.dataset.src);
    // console.log(element);
});
