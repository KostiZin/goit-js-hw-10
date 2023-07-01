import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

new SlimSelect('#breed-select', {
  contentPosition: 'relative',
});

hideLoader();

// new SimpleLightbox('.cat-list a', {});
// console.log(catList);
fetchBreeds()
  .then(data => {
    hideError();
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
      // hideCatInfo();
      showLoader();
      evt.preventDefault();
      let breedId = evt.target.value;
      const selectedBreed = breed.find(breed => breed.value === breedId);

      fetchCatByBreed(breedId)
        .then(el => {
          // catInfo.innerHTML = '';

          // catInfo.innerHTML = '';
          // const catList = document.querySelector('.cat-list');

          el.forEach(img => {
            // catInfo.innerHTML += `<img class="cat-picture" src=${img.url}></img>`;

            catInfo.innerHTML += `<div class="cat-list"><img class="cat-picture" src=${img.url}></img></div>`;

            // catList.innerHTML += `<a href="${img.url}"><img class="cat-picture" src="${img.url}" alt="" title="Cat"/></a>`;

            // new SimpleLightbox('cat-info .cat-list a', {});
          });

          // console.log(catList);

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
    showError();
  });

function hideCatInfo() {
  // catImage.src = '';
  // breedName.textContent = '';
  // description.textContent = '';
  // temperament.textContent = '';
  catInfo.style.display = 'none';
}

// // Show loader
function showLoader() {
  loader.style.display = 'block';
}

// // Hide loader
function hideLoader() {
  loader.style.display = 'none';
}

// Show error message
function showError() {
  Notiflix.Notify.failure('Something is wrong');
}

// // Hide error message
// function hideError() {
//   error.style.display = 'none';
// }

/// // Fetch and populate the breed select options
// function populateBreeds() {
//   fetchBreeds()
//     .then(breeds => {
//       breeds.forEach(breed => {
//         const option = document.createElement('option');
//         option.value = breed.id;
//         option.textContent = breed.name;
//         breedSelect.appendChild(option);
//       });
//       breedSelect.addEventListener('change', handleBreedSelect);
//       breedSelect.disabled = false;
//       loader.style.display = 'none';
//     })
//     .catch(err => {
//       console.error('Error fetching breeds:', err);
//       showError('Failed to fetch breeds. Please try again later.');
//     });
// }

// // Handle breed select change event
// function handleBreedSelect() {
//   const selectedBreedId = breedSelect.value;
//   if (selectedBreedId) {
//     showLoader();
//     hideCatInfo();
//     fetchCatByBreed(selectedBreedId)
//       .then(catData => {
//         if (catData.length > 0) {
//           const cat = catData[0];
//           showCatInfo(cat);
//         } else {
//           showError('No information available for this breed.');
//         }
//         hideLoader();
//       })
//       .catch(err => {
//         console.error('Error fetching cat information:', err);
//         showError('Failed to fetch cat information. Please try again later.');
//         hideLoader();
//       });
//   } else {
//     hideCatInfo();
//   }
// }

// // Show cat information
// function showCatInfo(cat) {
//   catImage.src = cat.url;
//   breedName.textContent = cat.breeds[0].name;
//   description.textContent = cat.breeds[0].description;
//   temperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;
//   catInfo.style.display = 'block';
// }

// // Hide cat information
// function hideCatInfo() {
//   catImage.src = '';
//   breedName.textContent = '';
//   description.textContent = '';
//   temperament.textContent = '';
//   catInfo.style.display = 'none';
// }

// // Show loader
// function showLoader() {
//   loader.style.display = 'block';
// }

// // Hide loader
// function hideLoader() {
//   loader.style.display = 'none';
// }

// // Show error message
// function showError(message) {
//   error.textContent = message;
//   error.style.display = 'block';
// }

// Hide error message
function hideError() {
  error.style.display = 'none';
}

// // Initialize the app
// function initApp() {
//   breedSelect.disabled = true;
//   populateBreeds();
// }

// initApp();
