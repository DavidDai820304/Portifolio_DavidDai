let nav = document.querySelector("nav");
let navLiAnchor = document.querySelectorAll("nav ul li a");
let navLi = document.querySelectorAll("nav ul li");
window.addEventListener("scroll", () => {
    if (window.pageYOffset != 0) {
        nav.style.backgroundColor = "rgba(0, 119, 182, 0.5)";
        navLiAnchor.forEach(a => {
            a.style.color = "white";
        })
    } else {
        nav.style = "";
        navLiAnchor.forEach(li => {
            li.style.color = "";
        })
    }
});




navLiAnchor[0].addEventListener("click", e => {
    let sectionFirstPage = document.querySelector("section.firstPage");
    sectionFirstPage.scrollIntoView({behavior: "smooth"});
})


navLiAnchor[1].addEventListener("click", e => {
    let sectionSecondPage = document.querySelector("section.secondPage");
    sectionSecondPage.scrollIntoView({behavior: "smooth"});
})


var canHover = !(matchMedia('(hover: none)').matches);
if (canHover) {
    navLi.forEach(li => {
        li.classList.add("Hover");
    })
}