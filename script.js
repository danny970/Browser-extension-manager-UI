const all = document.getElementById("link-all");
const active = document.getElementById("link-active");
const inactive = document.getElementById("link-inactive");
const gridBoxes = document.querySelectorAll(".grid-box");
let currentFilter = "A";

// Restore toggle states from localStorage
function initializeToggles() {
  gridBoxes.forEach(box => {
    const toggle = box.querySelector(".toggle-slider");
    const id = box.dataset.id;
    const savedState = localStorage.getItem(id);

    if (savedState === "active") {
      toggle.classList.add("toggle-red");
    } else {
      toggle.classList.remove("toggle-red");
    }
  });
}

// Filter cards based on currentFilter
function filterCards(type) {
  currentFilter = type;

  gridBoxes.forEach(box => {
    const slider = box.querySelector(".toggle-slider");
    const isActive = slider.classList.contains("toggle-red");

    if (type === "A") {
      box.style.display = "block";
    } else if (type === "B" && isActive) {
      box.style.display = "block";
    } else if (type === "C" && !isActive) {
      box.style.display = "block";
    } else {
      box.style.display = "none";
    }
  });
}

// Set active style on filter buttons
function setColor(color) {
  all.classList.remove("active");
  active.classList.remove("active");
  inactive.classList.remove("active");
  color.classList.add("active");
}

// Handle toggle click
const toggles = document.querySelectorAll(".toggle-slider");
toggles.forEach(toggle => {
  toggle.addEventListener("click", function () {
    toggle.classList.toggle("toggle-red");

    const card = toggle.closest(".grid-box");
    const id = card.dataset.id;
    const isActive = toggle.classList.contains("toggle-red");

    localStorage.setItem(id, isActive ? "active" : "inactive");

    filterCards(currentFilter); // Update display after toggle
  });
});

// Theme logic
const icon = document.getElementById("theme-icon");
const body = document.body;
const logo = document.getElementById("logo");

const isDark = localStorage.getItem("theme") === "dark";
body.classList.toggle("dark-theme", isDark);
icon.src = isDark ? "assets/images/icon-sun.svg" : "assets/images/icon-moon.svg";
logo.src = isDark ? "assets/images/logo-light.svg" : "assets/images/logo-dark.svg";

function changeTheme() {
  const isDark = body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  icon.src = isDark ? "assets/images/icon-sun.svg" : "assets/images/icon-moon.svg";
  logo.src = isDark ? "assets/images/logo-light.svg" : "assets/images/logo-dark.svg";
}

icon.addEventListener("click", changeTheme);

// Filter button listeners
all.addEventListener("click", function (e) {
  e.preventDefault();
  setColor(all);
  filterCards("A");
});

active.addEventListener("click", function (e) {
  e.preventDefault();
  setColor(active);
  filterCards("B");
});

inactive.addEventListener("click", function (e) {
  e.preventDefault();
  setColor(inactive);
  filterCards("C");
});

// Initialize on page load
initializeToggles(); // restore saved toggle state
filterCards(currentFilter); // apply filter
setColor(all); // highlight "All"