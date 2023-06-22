import axios from 'axios';
import { fetchGallery, configUrl } from './modules/pixabayAPI';
import { errorGet } from './report/report';
import { infoOnRequest } from './report/report';
import { infoCorrectRequest } from './report/report';
import { createMarkup } from './helpers/markup';

const elements = {
  form: document.querySelector('.search-form'),
  btnSearch: document.querySelector('button[type=submit]'),
  galleryBox: document.querySelector('.gallery'),
};

elements.form.addEventListener('submit', handlerForm);

async function handlerForm(event) {
  event.preventDefault();
  configUrl.params.q = event.target.searchQuery.value;
  try {
    const data = await fetchGallery();
    if (data.data.hits.length === 0) {
      return infoOnRequest();
    }
    infoCorrectRequest(data.data.totalHits);
    const markupGalerry = createMarkup(data);
    elements.galleryBox.innerHTML = markupGalerry;
  } catch (error) {
    console.log(error);
    errorGet(error);
  }
}
