import { getImagesByQuery, limit } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let queryValue = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onFormSubmit(event) {
  event.preventDefault();

  const newValue = event.target.elements['search-text'].value.trim();

  if (!newValue) {
    iziToast.warning({
      message: 'Please, enter your query',
      position: 'topRight',
    });
    return;
  }

  queryValue = newValue;
  page = 1;
  totalHits = 0;

  clearGallery();
  hideLoadMoreButton();

  await fetchImages({ isNewSearch: true });
  form.reset();
}

async function onLoadMore() {
  await fetchImages({ isNewSearch: false });
}

async function fetchImages({ isNewSearch }) {
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(queryValue, page);
    const { hits, totalHits: apiTotalHits } = data;

    if (isNewSearch) {
      if (!hits.length) {
        clearGallery();
        iziToast.info({
          message: 'Pictures not found. Try another query',
          position: 'topRight',
        });
        return;
      }

      totalHits = apiTotalHits;
    }

    if (!hits.length) {
      hideLoadMoreButton();
      iziToast.info({
        message: 'We are sorry, but you have reached the end of search results',
        position: 'topRight',
      });
      return;
    }

    createGallery(hits);

    smoothScrollGallery();

    const totalPages = Math.ceil(totalHits / limit);

    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: 'We are sorry, but you have reached the end of search results',
        position: 'topRight',
      });
    }

    page += 1;
  } catch (error) {
    iziToast.error({
      message: 'An error occured during loading. Please try again later',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

function smoothScrollGallery() {
  const firstPic = document.querySelector('.gallery-item');
  if (!firstPic) return;
  const { height: picHeight } = firstPic.getBoundingClientRect();

  window.scrollBy({
    top: picHeight * 2,
    left: 0,
    behavior: 'smooth',
  });
}
