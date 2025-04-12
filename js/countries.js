
    const dropdownCountriesButton = document.getElementById('dropdownCountriesButton');
    const dropdownCountries = document.getElementById('dropdownCountries');
    const listCountries = document.getElementById('listCountries');
    const searchInputCountry = document.getElementById('searchInputCountry');


    dropdownCountriesButton.addEventListener('click', function (e) {
        e.preventDefault();
        dropdownCountries.classList.toggle('hidden');
        searchInputCountry.value = null;
        const listCountriesItems = document.querySelectorAll('#listCountries li');
        listCountriesItems.forEach(item => {
             item.style.display = 'block';
        });
    });

    document.addEventListener('click', function (e) {
        if (!e.target.closest('#dropdownCountriesButton') && !e.target.closest('#dropdownCountries')) {
            dropdownCountries.classList.add('hidden');
        }
    });

    async function getCountries() {
        try {

            listCountries.innerHTML = '';

            const response = await axios.get('https://countriesnow.space/api/v0.1/countries/iso');
            const { data } = response.data; 

            data.forEach(item => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" data-iso="${item.Iso2}" data-value="${item.name}">
              ${item.name}
            </a>
          `;
                listCountries.appendChild(listItem);
            });

            const listLinks = document.querySelectorAll('#listCountries a');
            listLinks.forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    const selectedItem = link.getAttribute('data-value');
                    dropdownCountriesButton.textContent = selectedItem;
                    dropdownCountriesButton.setAttribute('data-iso', link.getAttribute('data-iso'));
                    dropdownCountries.classList.add('hidden'); 
                });
            });

        } catch (error) {
            console.error('Сталася помилка:', error);
        }
    }

    function filterCountries() {
        
        const searchTerm = searchInputCountry.value.toLowerCase();
        const listCountries = document.querySelectorAll('#listCountries li');
        listCountries.forEach(item => {
            const countryName = item.textContent.toLowerCase();
            if (countryName.includes(searchTerm)) {
                item.style.display = 'block'; 
            } else {
                item.style.display = 'none'; 
            }
        });
    }
    searchInputCountry.addEventListener('input', filterCountries);

    getCountries();
