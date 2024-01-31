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

  const result = await imageAPI.fetchImages();
  if (result.totalHits === 0) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!!',
    });
    return;
  }
  const markup = imagesTemplate(result.hits);
  gallery.innerHTML = markup;

  modalWindow.refresh();

  loadBtn.classList.add('is-hidden');
  imageAPI.totalResults = result.totalHits;

  changeBtnStatus();
  e.target.reset();
  loader.classList.add('is-hidden');
}

async function onLoadBtnClick() {
  loader.classList.remove('is-hidden');
  imageAPI.page += 1;
  const result = await imageAPI.fetchImages();
  const markup = imagesTemplate(result.hits);
  gallery.insertAdjacentHTML('beforeend', markup);

  window.scrollBy({
    top: 500,
    behavior: 'smooth',
  });
  const elem = document.querySelector('.gallery-item');
  const rect = elem.getBoundingClientRect();
  rect.height = rect.height * 2;

  modalWindow.refresh();

  changeBtnStatus();
  loader.classList.add('is-hidden');
}

function changeBtnStatus() {
  const maxPage = Math.ceil(imageAPI.totalResults / imageAPI.pageSize);
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
  return `<li class="gallery-item">
      <a href='${largeImageURL}' class="galery-link">
  <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />

  <div class = info-container>

    <div class="info-item">
      <span class="info-name">Likes</span>
      <span class ="info-value">${likes}</span>
    </div>

    <div class="info-item">
      <span class="info-name">Views</span>
      <span class ="info-value">${views}</span>
    </div>

    <div class="info-item">
      <span class="info-name">Comments</span>
      <span class ="info-value">${comments}</span>
    </div>

    <div class="info-item">
      <span class="info-name">Downloads</span>
      <span class ="info-value">${downloads}</span>
    </div>
    </div>

  </a>
</li>
`;
}

function imagesTemplate(images) {
  return images.map(imgTemplate).join('');
}

const modalWindow = new SimpleLightbox('.gallery a', {
  captionDelay: '250',
});
