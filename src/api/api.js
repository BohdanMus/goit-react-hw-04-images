const BACE_URL = 'https://pixabay.com/api';
const API_KEY = '34676744-ebd0f6953b8c020e03fe4ca98';

export function getImages(keyword, page) {
  return fetch(
    `${BACE_URL}/?q=${keyword}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
}
