import axios from 'axios';

// console.log(axios);
// // Встановлення ключа доступу
axios.defaults.headers.common['x-api-key'] =
  'live_75boB13uQFHVfq8JZu0TnK4QStc1xqOJ5R4qsaTr6UOIjfrvFqlSrXzFHM4VPxnR';

export function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
}

// fetch(`https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=`)
//   .then(response => {
//     return response.json();
//   })
//   .then(img => {
//     console.log(img);
//   })
//   .catch(error => {
//     console.log(error);
//   });

export function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedId}`
  )
    .then(res => {
      return res.json();
    })
    .catch(error => {
      console.log(error);
    });
}

// export default { fetchBreeds, fetchCatByBreed };
