import axios from 'axios';
import fetchBreeds from './cat-api';
import fetchCatByBreed from './cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_75boB13uQFHVfq8JZu0TnK4QStc1xqOJ5R4qsaTr6UOIjfrvFqlSrXzFHM4VPxnR';

const API_KEY =
  'live_75boB13uQFHVfq8JZu0TnK4QStc1xqOJ5R4qsaTr6UOIjfrvFqlSrXzFHM4VPxnR';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

let breed = [];

fetchBreeds()
  .then(data => {
    breed = data.map(breeds => ({
      value: breeds.id,
      label: breeds.name,
    }));

    breed.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.value;
      option.text = breed.label;
      breedSelect.appendChild(option);
    });
  })
  .catch(err => console.log(err));

// function fetchCatByBreed(breedId) {
//   return fetch(`${BASE_URL}images/search?breed_ids=${breedId}`).then(res => {
//     if (!res.ok) {
//       throw new Error(res.statusText);
//     }
//     return res.json();
//   });
// }

// fetchCatByBreed(2);
