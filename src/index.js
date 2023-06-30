import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

// const paragraph = document.createElement('p');
// catInfo.appendChild(paragraph);

// const image = document.createElement('img');
// catInfo.appendChild(image);

// catInfo.style.display = 'flex';
// let breed;

// fetchBreeds()
//   .then(data => {
//     console.log(data);
//     let breed;

//     breed = data.map(breeds => ({
//       value: breeds.id,
//       label: breeds.name,
//       description: breeds.description,
//       temperament: breeds.temperament,
//     }));

//     breed.forEach(breed => {
//       const option = document.createElement('option');
//       option.value = breed.value;
//       option.text = breed.label;
//       breedSelect.appendChild(option);
//     });

//     breedSelect.addEventListener('change', handleChoice);

//     function handleChoice(evt) {
//       let breedId = evt.target.value;
//       //
//       console.log(breed);

//       fetchCatByBreed(breedId).then(el => {
//         breed = breed.map(breeds => ({
//           description: breeds.description,
//           temperament: breeds.temperament,
//         }));

//         console.log(breed.description);

//         catInfo.innerHTML = '';
//         console.log(el);
//         el.forEach(img => {
//           const image = document.createElement('img');
//           image.src = img.url;
//           catInfo.appendChild(image);
//           console.dir(image);
//         });

//         const paragraph = document.createElement('p');
//         catInfo.appendChild(paragraph);
//         console.log(breed.description);
//         if (breedId === breed.value) {
//           paragraph.textContent = breed.description;
//         }
//         console.dir(paragraph);
//       });
//     }
//   })
//   .catch(err => console.log(err));

// new SlimSelect({
//   select: '#breed-select',
//   settings: {
//     contentPosition: 'absolute',
//   },
// });
new SlimSelect('#breed-select', {
  contentPosition: 'relative',
  // placeholderText: 'Custom Placeholder Text',
});

fetchBreeds()
  .then(data => {
    // console.log(data);
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
      // const option = document.createElement('option');
      // option.value = breed.value;
      // option.text = breed.label;
      // breedSelect.appendChild(option);
    });

    breedSelect.addEventListener('change', handleChoice);

    function handleChoice(evt) {
      let breedId = evt.target.value;
      const selectedBreed = breed.find(breed => breed.value === breedId);

      // console.log(selectedBreed.description);
      // console.log(selectedBreed.temperament);
      // console.log(selectedBreed.label);

      fetchCatByBreed(breedId)
        .then(el => {
          catInfo.innerHTML = '';
          console.log(el);
          el.forEach(img => {
            catInfo.innerHTML += `<img class="cat-picture" src=${img.url}></img>`;
            // const image = document.createElement('img');
            // image.src = img.url;
            // catInfo.appendChild(image);
            // console.dir(image);
          });
          const newHtml = `<div class='cat-descr'>
          <p class='name'>${selectedBreed.label}</p>
          <p class='description'>${selectedBreed.description}</p>
          <p class='features'>${selectedBreed.temperament}</p>
          </div >`;

          // const paragraph1 = document.createElement('p');
          // const paragraph2 = document.createElement('p');
          // const paragraph3 = document.createElement('p');
          // catInfo.appendChild(paragraph1);
          // catInfo.appendChild(paragraph2);
          // catInfo.appendChild(paragraph3);

          if (selectedBreed) {
            catInfo.innerHTML += newHtml;
            // paragraph1.textContent = selectedBreed.label;
            // paragraph2.textContent = selectedBreed.description;
            // paragraph3.textContent = selectedBreed.temperament;
          }
          console.dir(paragraph2);
        })
        .catch(err => console.log(err));
    }
  })
  .catch(err => console.log(err));

// breedSelect.addEventListener('change', evt => {
//   let breedId = evt.target.value;

//   fetchCatByBreed(breedId)
//     .then(el => {
//       catInfo.innerHTML = '';
//       console.log(el);
//       el.forEach(img => {
//         const image = document.createElement('img');
//         image.src = img.url;
//         catInfo.appendChild(image);
//         console.dir(image);
//       });
//       fetchBreeds() {

// }
//       const paragraph = document.createElement('p');
//       catInfo.appendChild(paragraph);
//       console.log(breed.description);
//       if (breedId === breed.value) {
//         paragraph.textContent = breed.description;
//       }
//       console.dir(paragraph);
//     })
//     .catch(err => console.log(err));
// });

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

// // Hide error message
// function hideError() {
//   error.style.display = 'none';
// }

// // Initialize the app
// function initApp() {
//   breedSelect.disabled = true;
//   populateBreeds();
// }

// initApp();
