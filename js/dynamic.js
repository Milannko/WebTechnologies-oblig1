const imageContainer = document.getElementById("image-container");

let start = 6;
const limit = 3;
let url = `https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`;

let photosArray = [];

function displayPhotos() {
  photosArray.forEach((photo) => {
    const img = document.createElement("img");
    img.src = photo.url;
    img.alt = photo.title;
    img.classList.add("image");
    imageContainer.appendChild(img);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(url);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.error(error);
  }
}

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    getPhotos();
    start += limit;
    url = `https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`;
  }
});

function firstLoad() {
  getPhotos();
  start += limit;
  url = `https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`;
}

firstLoad();
