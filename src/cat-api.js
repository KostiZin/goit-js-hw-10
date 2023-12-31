import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_75boB13uQFHVfq8JZu0TnK4QStc1xqOJ5R4qsaTr6UOIjfrvFqlSrXzFHM4VPxnR';

const API_KEY =
  'live_75boB13uQFHVfq8JZu0TnK4QStc1xqOJ5R4qsaTr6UOIjfrvFqlSrXzFHM4VPxnR';

export function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=${breedId}&api_key=${API_KEY}`
  )
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .catch(error => {
      console.log(error);
    });
}
