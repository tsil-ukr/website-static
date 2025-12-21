document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.documentElement.classList.add("readyToAnimate");

    setTimeout(() => {
      document.documentElement.classList.add("animationsDone");
    }, 500);
  }, 250);
});

// Detect if device is mobile
function isMobileDevice() {
  return (
    window.matchMedia("(max-width: 768px)").matches ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );
}

function showMenu() {
  const menuButton = document.querySelector(
    "[data-navigation-menu-toggle=true]"
  );
  menuButton.classList.add("active");
  const buttonLeft = menuButton.getBoundingClientRect().left;
  const buttonTop = menuButton.getBoundingClientRect().top;
  document.documentElement.style.setProperty("--menu-left", `${buttonLeft}px`);
  document.documentElement.style.setProperty("--menu-top", `${buttonTop}px`);
  const menu = document.querySelector(".TsilNavigationMenu");
  menu.dataset.hidden = "false";
}

function hideMenu() {
  const menuButton = document.querySelector(
    "[data-navigation-menu-toggle=true]"
  );
  menuButton.classList.remove("active");
  const menu = document.querySelector(".TsilNavigationMenu");
  menu.dataset.hidden = "true";
}

const menuButton = document.querySelector("[data-navigation-menu-toggle=true]");
const menu = document.querySelector(".TsilNavigationMenu");

let isHoveringButton = false;
let isHoveringMenu = false;
let hideTimeout = null;

function scheduleHide() {
  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(() => {
    if (!isHoveringButton && !isHoveringMenu) {
      hideMenu();
    }
  }, 100);
}

// Mobile: click to toggle
menuButton.addEventListener("click", () => {
  if (isMobileDevice()) {
    const isHidden = menu.dataset.hidden === "true";
    if (isHidden) {
      showMenu();
    } else {
      hideMenu();
    }
  }
});

// Desktop: hover to show/hide
menuButton.addEventListener("mouseenter", () => {
  if (!isMobileDevice()) {
    isHoveringButton = true;
    clearTimeout(hideTimeout);
    showMenu();
  }
});

menuButton.addEventListener("mouseleave", () => {
  if (!isMobileDevice()) {
    isHoveringButton = false;
    scheduleHide();
  }
});

menu.addEventListener("mouseenter", () => {
  if (!isMobileDevice()) {
    isHoveringMenu = true;
    clearTimeout(hideTimeout);
    showMenu();
  }
});

menu.addEventListener("mouseleave", () => {
  if (!isMobileDevice()) {
    isHoveringMenu = false;
    scheduleHide();
  }
});

window.addEventListener("resize", () => {
  hideMenu();
});

window.addEventListener("scroll", () => {
  hideMenu();
});

// Mobile: close menu when clicking outside
window.addEventListener("click", (event) => {
  if (
    isMobileDevice() &&
    !event.target.closest(".TsilNavigationMenu") &&
    !event.target.closest("[data-navigation-menu-toggle=true]")
  ) {
    hideMenu();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideMenu();
  }
});
