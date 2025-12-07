import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = event.target.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({
      message: `Sorry, there are no images matching your search query. Please try again!`,
      position: 'topRight',
    });
    return;
  }
  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(query);
    if (data.hits.length === 0) {
      clearGallery();
      iziToast.info({
        title: `Pictures not found`,
        message: `Try another query`,
        position: 'topRight',
      });
      return;
    }
    createGallery(data.hits);
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: `Error`,
      message: `An error occurred while loading. Please try again later.`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
    form.reset();
  }
});
