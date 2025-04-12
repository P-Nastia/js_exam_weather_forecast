
const dropdownCitiesButton = document.getElementById('dropdownCitiesButton');

const dropdownCities = document.getElementById('dropdownCities');
const listCities = document.getElementById('listCities');
const searchInputCity = document.getElementById('searchInputCity');

dropdownCitiesButton.addEventListener('click', function (e) {
        e.preventDefault();
    dropdownCountries.classList.toggle('hidden');
    getCities();
    searchInputCity.addEventListener('input', filterCities);
    searchInputCity.value = null;
    });

document.addEventListener('click', function (e) {
    if (!e.target.closest('#dropdownCitiesButton') && !e.target.closest('#dropdownCities')) {
        dropdownCities.classList.add('hidden');
    }
});

async function getCities() {
    if (dropdownCountriesButton.getAttribute('data-iso') != "random") {
        
        try {

            listCities.innerHTML = '';

            const response = await axios.post('https://countriesnow.space/api/v0.1/countries/cities', {
                country: dropdownCountriesButton.innerText
            });
            const { data } = response.data;

            data.forEach(item => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" data-value="${item}">
              ${item}
            </a>
          `;
                listCities.appendChild(listItem);
            });

            const listLinks = document.querySelectorAll('#listCities a');
            listLinks.forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    const selectedItem = link.getAttribute('data-value');
                    dropdownCitiesButton.textContent = selectedItem;
                    dropdownCities.classList.add('hidden');
                });
            });

        } catch (error) {
            console.error('Сталася помилка:', error);
        }
    }
}

function filterCities() {
    
    const searchTerm = searchInputCity.value.toLowerCase();
    const listCities = document.querySelectorAll('#listCities li');
    listCities.forEach(item => {
        const countryName = item.textContent.toLowerCase();
        if (countryName.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}








