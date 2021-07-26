let nav = document.querySelector("nav");
let navLiAnchor = document.querySelectorAll("nav ul li a");
window.addEventListener("scroll", () => {
    if (window.pageYOffset != 0) {
        nav.style.backgroundColor = "rgba(0, 119, 182, 0.5)";
        navLiAnchor.forEach(a => {
            a.style.color = "white";
            a.style.transition = "0.2s ease";
        })
    } else {
        nav.style = "";
        navLiAnchor.forEach(li => {
            li.style.color = "";
        })
    }
});

function onAboutMeClick() {
    window.location.hash = "#AboutMe";
}

function onAbilityClick() {
    window.location.hash = "#Ability";
}


