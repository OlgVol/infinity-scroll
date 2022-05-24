const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

const count = 10;
const apiKey = 'NDg_stxkJLyP7Z8j7h5lZnXorAgF9pCwg_SiKNC4VfY';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
    imageLoaded++;
    if (imageLoaded === totalImages) {
        ready = true;
    }
}

function setAttributes(element, atributes) {
    for (const key in atributes) {
        element.setAttribute(key, atributes[key]);
    }
}

function displayPhotos() {
    imageLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        const img = document.createElement('img');

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {

    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight -
        1000 && ready) {
        ready = false;
        getPhotos();
    }
});

getPhotos();