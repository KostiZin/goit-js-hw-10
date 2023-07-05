import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

new SlimSelect('#breed-select', {
  contentPosition: 'relative',
});

// hideLoader();

fetchBreeds()
  .then(data => {
    let breed;

    breed = data.map(breeds => ({
      value: breeds.id,
      label: breeds.name,
      description: breeds.description,
      temperament: breeds.temperament,
    }));

    breedSelect.innerHTML = `<option value=''>Choose your cat</option>`;

    breed.forEach(breed => {
      breedSelect.innerHTML += `<option value='${breed.value}'>${breed.label}</option>`;
    });

    breedSelect.addEventListener('change', handleChoice);

    function handleChoice(evt) {
      catInfo.innerHTML = '';
      showLoader();
      evt.preventDefault();

      let breedId = evt.target.value;
      const selectedBreed = breed.find(breed => breed.value === breedId);

      fetchCatByBreed(breedId)
        .then(el => {
          el.forEach(img => {
            catInfo.innerHTML += `<div class="cat-list"><img class="cat-picture" src=${img.url}></img></div>`;
          });

          const newHtml = `<div class='cat-descr'>
          <p class='name'>${selectedBreed.label}</p>
          <p class='description'>${selectedBreed.description}</p>
          <p class='features'>${selectedBreed.temperament}</p>
          </div >`;

          if (selectedBreed) {
            catInfo.innerHTML += newHtml;
          }

          hideLoader();
        })
        .catch(err => {
          showError();
        });
    }
  })
  .catch(err => {
    Notiflix.Notify.failure('Something is wrong');
  });

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showError() {
  if (breedSelect.value === '') {
    hideLoader();
    return Notiflix.Notify.warning('Choose a cat breed from the list');
  }
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}
