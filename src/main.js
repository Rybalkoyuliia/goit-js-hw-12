// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// const gallery = document.querySelector('.gallery');
// const form = document.querySelector('.form');
// const loader = document.querySelector('.loader');
// const loadBtn = document.querySelector('.load');

// const BASE_URL = 'https://pixabay.com';
// const END_POINT = '/api/';
// const PARAMS = new URLSearchParams({
//   key: '42078504-06c0bc861c70afe486d8727f6',
//   image_type: 'photo',
//   orientation: 'horizontal',
//   safesearch: 'true',
//   page: 1,
//   per_page: 20,
// });

// function fetchImg(searchWord) {
//   PARAMS.set('key', 'q');
//   PARAMS.set('q', searchWord);
//   const url = `${BASE_URL}${END_POINT}?${PARAMS}`;

//   return fetch(url)
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error('ERROR');
//       }
//     })
//     .then(data => {
//       const images = data.hits;
//       if (images.length > 0) {
//         return images;
//       } else {
//         iziToast.error({
//           message:
//             'Sorry, there are no images matching your search query. Please try again!',
//         });
//       }
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }

// form.addEventListener('submit', onFormSubmit);
// loadBtn.addEventListener('click', onLoadBtnClick);

// function onFormSubmit(e) {
//   e.preventDefault();
//   loader.classList.remove('is-hidden');
//   const word = e.target.elements.imageDesc.value;
//   gallery.innerHTML = '';
//   fetchImg(word)
//     .then(images => renderImages(images))
//     .catch(error => {
//       console.log(error);
//     })
//     .finally(() => {
//       loader.classList.add('is-hidden');
//       loadBtn.classList.remove('is-hidden');
//       e.target.reset();
//     });
// }

// function onLoadBtnClick() {
//   let newValue = Number(PARAMS.get('page')) + 1;
//   PARAMS.set('page', newValue.toString());

//   fetchImg()
//     .then(images => renderImages(images))
//     .catch(error => {
//       console.log(error);
//     });
// }

// function imgTemplate(image) {
//   return `<li class="gallery__item">
//    <a class="gallery__link" href="${image.largeImageURL}">
//     <img class="gallery__image" src=${image.webformatURL} alt=${image.tags}/>
//     <ul class="description-list">
//             <li class="description-item">Lickes: ${image.likes}</li>
//             <li class="description-item">Views: ${image.views}</li>
//             <li class="description-item">Comments: ${image.comments}</li>
//             <li class="description-item">Downloads: ${image.downloads}</li>
//     </ul>
//     </a>
//   </li>`;
// }

// function imagesTemplate(images) {
//   return images.map(imgTemplate).join('');
// }

// function renderImages(images) {
//   const markup = imagesTemplate(images);
//   gallery.insertAdjacentHTML('beforeend', markup);
//   modalWindow.refresh();
// }

// const modalWindow = new SimpleLightbox('.gallery a', {
//   captionDelay: '250',
// });
