import axios from 'axios';

async function fetchImages(query, currentPage, resultPerPage) {
  const configUrl = {
    params: {
      key: '37645850-cbffd1b84ba77554534d72cec',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: currentPage,
      per_page: resultPerPage,
    },
  };
  const data = await axios('https://pixabay.com/api/', configUrl);
  return data;
}

export { fetchImages };
