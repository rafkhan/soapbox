import 'whatwg-fetch';

const BASE_URL = 'https://api.tenor.com/v1/search'
const TENOR_API_KEY = 'XQHHNC2RUPOC';

function createSearchUrl(searchQuery) {
  const searchParams = new URLSearchParams({
    q: searchQuery,
    key: TENOR_API_KEY
  });

  return `${BASE_URL}?${searchParams.toString()}`;
}

export function search(searchQuery) {
  return dispatch => {
    const url = createSearchUrl(searchQuery);
    fetch(url)
      .then(r => r.json())
      .then(data => {

      })
      .catch(e => { console.error(e); });
  };
}