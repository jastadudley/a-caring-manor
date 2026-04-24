document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

let visitCount = localStorage.getItem("visitCount");

if (visitCount) {
  visitCount = Number(visitCount) + 1;
} else {
  visitCount = 1;
}

localStorage.setItem("visitCount", visitCount);


const welcomeMessages = [
  "Thanks for visiting us again! 🏡",
  "Welcome back! We're so glad to have you.",
  "Welcome in!"
];

let messageIndex = (visitCount - 1) % welcomeMessages.length;
console.log(`${welcomeMessages[messageIndex]} This is visit #${visitCount}.`);

document.getElementById("visitMessage").textContent =
  `${welcomeMessages[messageIndex]} This is visit #${visitCount}.`;

// ───────────────────────────────────────────────────────── Photo Carousel ───────────────────────────────────────────────────────────
const carouselImages = [
  { src: "images/residents-collage.jpg", alt: "Residents enjoying activities at A Caring Manor" },
  { src: "images/baby-goat-june.jpg", alt: "June with baby goat at A Caring Manor II" },
  { src: "images/bingo-night.jpg", alt: "Bingo night at A Caring Manor I" },
  { src: "images/fourth-of-july-dining-table.jpg", alt: "Fourth of July celebration at A Caring Manor" },
  { src: "images/pt-with-marcus.jpg", alt: "Physical therapy with Marcus at A Caring Manor" },
];

const track = document.getElementById("carouselTrack");
const dotsContainer = document.getElementById("carouselDots");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

if (track) {
  let currentIndex = 0;
  let autoplayTimer;

  carouselImages.forEach((img, i) => {
    const slide = document.createElement("div");
    slide.classList.add("carousel-slide");
    if (i === 0) slide.classList.add("active");
    const image = document.createElement("img");
    image.src = img.src;
    image.alt = img.alt;
    slide.appendChild(image);
    track.appendChild(slide);
  });

  carouselImages.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.classList.add("carousel-dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    const slides = track.querySelectorAll(".carousel-slide");
    const dots = dotsContainer.querySelectorAll(".carousel-dot");
    slides[currentIndex].classList.remove("active");
    dots[currentIndex].classList.remove("active");
    currentIndex = (index + carouselImages.length) % carouselImages.length;
    slides[currentIndex].classList.add("active");
    dots[currentIndex].classList.add("active");
  }

  function startAutoplay() {
    autoplayTimer = setInterval(() => goTo(currentIndex + 1), 7000);
  }

  prevBtn.addEventListener("click", () => { goTo(currentIndex - 1); clearInterval(autoplayTimer); startAutoplay(); });
  nextBtn.addEventListener("click", () => { goTo(currentIndex + 1); clearInterval(autoplayTimer); startAutoplay(); });

  startAutoplay();
}