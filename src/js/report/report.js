import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

function errorGet({ code, response }) {
  console.log(response);
  Report.failure(`${code}`, `${response.data}`, 'OK');
}

function infoOnRequest() {
  Report.info(
    'INFO',
    'Sorry, there are no images matching your search query. Please try again.',
    'OK'
  );
}

function infoCorrectRequest(totalHits) {
  Notify.info(`Hooray! We found ${totalHits} images.`, {
    position: 'center-center',
    width: '500px',
    fontSize: '30px',
  });
}

export { errorGet, infoOnRequest, infoCorrectRequest };
