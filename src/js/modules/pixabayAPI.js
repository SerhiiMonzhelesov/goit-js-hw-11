import axios, { Axios } from 'axios';

const configUrl = {
  params: {
    key: '37645850-cbffd1b84ba77554534d72cec',
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: 1,
    per_page: 40,
  },
};

async function fetchGallery() {
  const data = await axios('https://pixabay.com/api/', configUrl);
  configUrl.params.q = '';
  return data;
}

export { fetchGallery, configUrl };