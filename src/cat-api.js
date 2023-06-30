const BASE_URL = 'https://api.thecatapi.com/v1/';

function fetchBreeds() {
  return fetch(`${BASE_URL}breeds`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

// function fetchCatByBreed(breedId) {
//   return fetch(`${BASE_URL}images/search?breed_ids=${breedId}`).then(res => {
//     if (!res.ok) {
//       throw new Error(res.statusText);
//     }
//     return res.json();
//   });
// }

export default fetchBreeds;
// export default fetchCatByBreed;
