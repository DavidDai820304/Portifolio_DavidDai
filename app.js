let nav = document.querySelector("nav");
let navLi = document.querySelectorAll("header nav ul li");
window.addEventListener("scroll", () => {
    if (window.pageYOffset != 0) {
        nav.style.backgroundColor = "rgba(0, 0, 0, 0.5";
        nav.style.color = "white";
        nav.forEach(li => {
            li.style.color = "white";
        })
    } else {
        nav.style = "";
        headerAnchor.forEach(li => {
            li.style.color = "";
        })
    }
});