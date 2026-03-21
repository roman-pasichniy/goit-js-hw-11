import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { createGallery } from './js/render-functions';
import { getImagesByQuery } from './js/pixabay-api';

const form = document.querySelector('.form');
const input = document.querySelector('input');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  loader.style.display = 'inline-block';

  const inputValue = input.value;

  getImagesByQuery(inputValue)
    .then(data => createGallery(data.hits, gallery))
    .catch(() => {
      gallery.innerHTML = '';
      iziToast.error({
        message: `Sorry, there are no images matching your search query. Please try again!`,
        theme: 'dark',
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '1.5',
        backgroundColor: '#EF4040',
        position: 'topRight',
        progressBarColor: '#B51B1B',
      });
    })
    .finally(() => {
      loader.style.display = 'none';
      form.reset();
    });
}
