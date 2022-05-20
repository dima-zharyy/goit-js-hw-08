// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Change code below this line

// ----------------------- Render gallery items -----------------------

const galleryBox = document.querySelector('.gallery');

function createGalleryMarkup(data) {
  return data
    .map(({ preview, original, description }) => {
      return `
          <a class="gallery__link" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>
    `;
    })
    .join('');
}

function renderGalleryElements(data) {
  const galleryMarkup = createGalleryMarkup(data);
  galleryBox.innerHTML = galleryMarkup;
}

renderGalleryElements(galleryItems);

// ----------------------- SimpleLightbox initialization -----------------------

const lightbox = new SimpleLightbox('.gallery a', {
  /* options */
  captionsData: 'alt',
  captionDelay: 250,
});
