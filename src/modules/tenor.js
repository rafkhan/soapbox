import 'whatwg-fetch';
import { map } from 'lodash';

const BASE_URL = 'https://api.tenor.com/v1/search'
const TENOR_API_KEY = 'XQHHNC2RUPOC';

function createSearchUrl(searchQuery) {
  const searchParams = new URLSearchParams({
    q: searchQuery,
    key: TENOR_API_KEY
  });

  return `${BASE_URL}?${searchParams.toString()}`;
}

export function formatResultsTenor(data) {
  const images = map(data.results, img => ({
    srcId: img.id,
    src: img.media[0].gif.url
  }));

  return images;
}

export function searchTenor(searchQuery) {
  const url = createSearchUrl(searchQuery);
  return fetch(url)
    .then(r => r.json())
}