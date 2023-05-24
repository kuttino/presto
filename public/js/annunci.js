function createAnnouncementCard(announcement) {

    const date = new Date(announcement.createdAt);


    //const imgId = Math.floor(Math.random() * 1000);
    const imgId = 100;
    const imgSrc = `https://picsum.photos/id/${imgId}/640`;


    const card = document.createElement('div');
    card.classList.add('card', 'h-100', 'position-relative');
    card.innerHTML = `
        <span class="position-absolute top-0 end-0 badge rounded-2 px-4 py-2 text-uppercase ${announcement.type == 'sell' ? 'bg-sell' : 'bg-search'}">${announcement.type}</span>

        <img src="${imgSrc}" class="card-img-top" alt="...">
        <div class="card-body p-4">
            <h6 class="card-subtitle text-primary fw-semibold fs-4">€${announcement.price}</h6>
            <h5 class="card-title display-4">${announcement.name}</h5>
            <p class="card-text text-muted">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        <div class="card-footer text-muted bg-white d-flex justify-content-around">
            <a href="#" class="text-primary text-decoration-none"><i class="bi bi-tag-fill me-2"></i>${announcement.category}</a>
            <a href="#" class="text-primary text-decoration-none"><i class="bi bi-calendar-fill me-2"></i>${date.toLocaleDateString()}</a>
        </div>
    `;

    return card;
}

async function populateAnnouncements(announcements) {

    const cardsRow = document.getElementById('cardsRow');

    // elimino tutti i child precedenti dalla riga (se presenti)
    while(cardsRow.hasChildNodes()) {
        cardsRow.removeChild(cardsRow.firstChild);
    }

    // creo e appendo le nuove card
    announcements.forEach((announcement) => {

        // div class="col-12 col-md-6 col-lg-4 mb-4"
        const col = document.createElement('div');
        col.classList.add('col-12', 'col-md-6', 'col-lg-4', 'mb-4');
        cardsRow.appendChild(col);

        const card = createAnnouncementCard(announcement);
        col.appendChild(card);
    });
}

function populateCategorySelect(announcements, categorySelect) {

    const categorySet = new Set();
    announcements.forEach((announcement) => {
        categorySet.add(announcement.category);
    });

    // <option value="Elettronica">Elettronica</option>
    categorySet.forEach((category) => {
        const categoryOption = document.createElement('option');
        categoryOption.setAttribute('value', category);
        categoryOption.textContent = category;

        categorySelect.appendChild(categoryOption);
    });
}


async function readAllAnnouncements() {
    const response = await fetch("../../server/api/annunci.json");
    const announcements = await response.json();
    return announcements;
}

function filterAnnouncements(announcements, options) {

    let filteredAnnouncements = announcements.filter((announcement) => {

        let isAnnouncementRequired = true;

        if(options.searchInputValue.length > 0) {
            isAnnouncementRequired = announcement.name.toLowerCase().includes(options.searchInputValue.toLowerCase());
        }

        if(isAnnouncementRequired && options.categorySelectValue.length > 0) {
            isAnnouncementRequired = announcement.category.toLowerCase() == options.categorySelectValue.toLowerCase();
        }

        if(isAnnouncementRequired && options.minPriceInputValue.length > 0) {
            isAnnouncementRequired = parseFloat(announcement.price) >= parseFloat(options.minPriceInputValue);
        }

        if(isAnnouncementRequired && options.maxPriceInputValue.length > 0) {
            isAnnouncementRequired = parseFloat(announcement.price) < parseFloat(options.maxPriceInputValue);
        }

        return isAnnouncementRequired;
    });

    return filteredAnnouncements;
}

function sortAnnouncements(announcements, sortSelectValue) {

    // ordino gli annunci
    switch(sortSelectValue) {
        case 'descByDate':
            announcements.sort((left, right) => {
                return parseInt(right.createdAt) - parseInt(left.createdAt);
            });
            break;
        case 'ascByDate':
            announcements.sort((left, right) => {
                return parseInt(left.createdAt) - parseInt(right.createdAt);
            });
            break;
        case 'ascByPrice':
            announcements.sort((left, right) => {
                return parseFloat(left.price) - parseFloat(right.price);
            });
            break;
        case 'descByPrice':
            announcements.sort((left, right) => {
                return parseFloat(right.price) - parseFloat(left.price);
            });
            break;
        case 'ascByAlpha':
            announcements.sort((left, right) => {
                return left.name.toLowerCase().localeCompare(right.name.toLowerCase());
            });
            break;
        case 'descByAlpha':
            announcements.sort((left, right) => {
                return right.name.toLowerCase().localeCompare(left.name.toLowerCase());
            });
            break;
    }
}

document.addEventListener('DOMContentLoaded', async () => {

    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('categorySelect');
    const minPriceInput = document.getElementById('minPriceInput');
    const maxPriceInput = document.getElementById('maxPriceInput');
    const sortSelect = document.getElementById('sortSelect');
    const filteringForm = document.getElementById('filteringForm');



    filteringForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        //const searchInputValue = searchInput.value;
        //const categorySelectValue = categorySelect.value;
        //const minPriceInputValue = minPriceInput.value;
        //const maxPriceInputValue = maxPriceInput.value;

        const announcements = await readAllAnnouncements();


        // filtro l'array di annunci
        const options = {
            searchInputValue: searchInput.value,
            categorySelectValue: categorySelect.value,
            minPriceInputValue: minPriceInput.value,
            maxPriceInputValue: maxPriceInput.value
        };
        let filteredAnnouncements = filterAnnouncements(announcements, options);


        // ordino l'array di annunci filtrato
        const sortSelectValue = sortSelect.value;
        sortAnnouncements(filteredAnnouncements, sortSelectValue);
        


        await populateAnnouncements(filteredAnnouncements);
    });



    const announcements = await readAllAnnouncements();
    populateCategorySelect(announcements, categorySelect);
    await populateAnnouncements(announcements);
});

