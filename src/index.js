import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { ImageAPI } from './imageAPI';
const imageAPI = new ImageAPI();

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.form');
const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.load');

form.addEventListener('submit', onFormSubmit);
loadBtn.addEventListener('click', onLoadBtnClick);

async function onFormSubmit(e) {
  e.preventDefault();
  loader.classList.remove('is-hidden');
  const word = e.target.elements.imageDesc.value;
  imageAPI.query = word;
  imageAPI.page = 1;

  const result = await newsAPI.fetchImg();
  const markup = imagesTemplate(result.images.hits); // Attention!!!!!
  gallery.innerHTML = markup;
  modalWindow.refresh();

  imageAPI.totalResults = result.totalHits;
  loadBtn.classList.remove('is-hidden');

  changeBtnStatus();
  e.target.reset();
}

async function onLoadBtnClick() {
  imageAPI.page += 1;
  const result = await newsAPI.fetchImg();
  const markup = imagesTemplate(result.images.hits); // Attention!!!!!
  gallery.insertAdjacentHTML('beforeend', markup);
  modalWindow.refresh();

  changeBtnStatus();
}

function changeBtnStatus() {
  const maxPage = Math.ceil(imageAPI.totalResults / newsAPI.pageSize);
  if (imageAPI.page >= maxPage) {
    loadBtn.classList.add('is-hidden');
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
    });
  } else {
    loadBtn.classList.remove('is-hidden');
  }
}

function imgTemplate({
  largeImageURL,
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<li class="gallery__item">
   <a class="gallery__link" href="${largeImageURL}">
    <img class="gallery__image" src=${webformatURL} alt=${tags}/>
    <ul class="description-list">
            <li class="description-item">Lickes: ${likes}</li>
            <li class="description-item">Views: ${views}</li>
            <li class="description-item">Comments: ${comments}</li>
            <li class="description-item">Downloads: ${downloads}</li>
    </ul>
    </a>
  </li>`;
}

function imagesTemplate(images) {
  return images.map(imgTemplate).join('');
}

const modalWindow = new SimpleLightbox('.gallery a', {
  captionDelay: '250',
});
