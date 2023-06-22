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
  Notify.success(`Hooray! We found ${totalHits} images.`, {
    position: 'center-center',
    width: '500px',
    fontSize: '30px',
    timeout: '1700',
    backOverlayColor: (0, 0, 0, 0.7),
  });
}

function infoEndGallery() {
  Notify.info(`WE'RE SORRY, BUT YOU'VE REACHED THE END OF SEARCH RESULTS`, {
    position: 'center-center',
    width: '500px',
    fontSize: '30px',
    timeout: '1700',
  });
}

export { errorGet, infoOnRequest, infoCorrectRequest, infoEndGallery };
