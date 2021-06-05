// Show menu
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show-menu");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

//Remove mobile menu
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

//Scroll section active link
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

// Scroll animation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Scroll top button
function scrollTop() {
  const scrollTop = document.getElementById("scroll-top");

  this.scrollY >= 560
    ? scrollTop.classList.add("show-scroll")
    : scrollTop.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollTop);

// Dark/Light theme
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const selectedTheme = localStorage.getItem("selected-theme");
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
});

// PDF stuff
function scaleCv() {
  document.body.classList.add("scale-cv");
}

function removeCvScale() {
  document.body.classList.remove("scale-cv");
}

let pdfBtn = document.getElementById("pdf-button");
let areaCvContainer = document.getElementById("area-cv");

let pdfOpts = {
  margin: 1,
  filename: "emigdio-resume.pdf",
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: { scale: 4 },
  jsPDF: { format: "a4", orientation: "portrait" },
};

function genereatePdf() {
  html2pdf(areaCvContainer, pdfOpts).then(() => {
    removeCvScale();
  });
}

pdfBtn.addEventListener("click", () => {
  scaleCv();
  genereatePdf();
});
