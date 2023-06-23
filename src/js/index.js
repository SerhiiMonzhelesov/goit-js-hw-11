import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchGallery, fetchMoreImg, configUrl } from './modules/pixabayAPI';
import {
  errorGet,
  infoOnRequest,
  infoCorrectRequest,
  infoEndGallery,
} from './report/report';
import { createMarkup } from './helpers/markup';

const elements = {
  form: document.querySelector('.search-form'),
  btnSearch: document.querySelector('button[type=submit]'),
  galleryBox: document.querySelector('.gallery'),
  guard: document.querySelector('.js-guard'),
};

let totalHits;
elements.form.addEventListener('submit', handlerForm);

async function handlerForm(event) {
  event.preventDefault();
  try {
    observer.unobserve(elements.guard);
    elements.galleryBox.innerHTML = '';
    configUrl.params.q = event.target.searchQuery.value;
    configUrl.params.page = 1;
    const data = await fetchGallery();
    totalHits = data.data.totalHits;
    if (data.data.hits.length === 0) {
      return infoOnRequest();
    }
    infoCorrectRequest(totalHits);
    const markupGalerry = createMarkup(data);
    elements.galleryBox.innerHTML = markupGalerry;
    simple.refresh();
    observer.observe(elements.guard);
  } catch (error) {
    errorGet(error);
  }
}

const simple = new SimpleLightbox('.gallery a', {
  navText: ['&#8656', '&#8658'],
  captionsData: 'alt',
  captionDelay: 250,
});

function loadMore(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadImage();
    }
  });
}

async function loadImage() {
  try {
    if (
      configUrl.params.page >= Math.ceil(totalHits / configUrl.params.per_page)
    ) {
      observer.unobserve(elements.guard);
      infoEndGallery();
    } else {
      configUrl.params.page += 1;
      const data = await fetchMoreImg();
      elements.galleryBox.insertAdjacentHTML('beforeend', createMarkup(data));
      scroll();
      simple.refresh();
    }
  } catch (error) {
    errorGet(error);
  }
}

const options = {
  root: null,
  rootMargin: '300px',
  threshold: 0,
};
const observer = new IntersectionObserver(loadMore, options);

function scroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
