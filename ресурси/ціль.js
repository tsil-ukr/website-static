document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.getElementById("UiCodeBlock").style.animation =
            "spin 2s cubic-bezier(0.4, 0.2, 0.2, 1)";
    }, 250);
});

function showMenu() {
    const menuButton = document.querySelector("[data-navigation-menu-toggle=true]");
    menuButton.classList.add("active");
    const buttonLeft = menuButton.getBoundingClientRect().left;
    const buttonTop = menuButton.getBoundingClientRect().top;
    document.documentElement.style.setProperty("--menu-left", `${buttonLeft}px`);
    document.documentElement.style.setProperty("--menu-top", `${buttonTop}px`);
    const menu = document.querySelector(".TsilNavigationMenu");
    menu.dataset.hidden = "false";
}

function hideMenu() {
    const menuButton = document.querySelector("[data-navigation-menu-toggle=true]");
    menuButton.classList.remove("active");
    const menu = document.querySelector(".TsilNavigationMenu");
    menu.dataset.hidden = "true";
}

document.querySelector("[data-navigation-menu-toggle=true]").addEventListener("click", () => {
    const menu = document.querySelector(".TsilNavigationMenu");
    const isHidden = menu.dataset.hidden === "true";
    if (isHidden) {
        showMenu();
    } else {
        hideMenu();
    }
});

window.addEventListener("resize", () => {
    hideMenu();
});

window.addEventListener("scroll", () => {
    hideMenu();
});

window.addEventListener("click", (event) => {
    if (!event.target.closest(".TsilNavigationMenu") && !event.target.closest("[data-navigation-menu-toggle=true]")) {
        hideMenu();
    }
});

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        hideMenu();
    }
});
