


/*

    <div class="card h-100 position-relative">

        <span class="position-absolute top-0 end-0 badge rounded-2 px-4 py-2 text-uppercase bg-sell">Sell</span>

        <img src="https://picsum.photos/id/237/640" class="card-img-top" alt="...">
        <div class="card-body p-4">
            <h6 class="card-subtitle text-primary fw-semibold fs-4">€120.12</h6>
            <h5 class="card-title display-4">Huawei X5</h5>
            <p class="card-text text-muted">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        <div class="card-footer text-muted bg-white d-flex justify-content-around">
            <a href="#" class="text-primary text-decoration-none"><i class="bi bi-tag-fill me-2"></i>Elettronica</a>
            <a href="#" class="text-primary text-decoration-none"><i class="bi bi-calendar-fill me-2"></i>27/3/2023</a>
        </div>
    </div>
*/





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
    announcements.forEach((announcement) => {

        // div class="col-12 col-md-6 col-lg-4 mb-4"
        const col = document.createElement('div');
        col.classList.add('col-12', 'col-md-6', 'col-lg-4', 'mb-4');
        cardsRow.appendChild(col);

        const card = createAnnouncementCard(announcement);
        col.appendChild(card);
    });
}

async function readAllAnnouncements() {
    const response = await fetch("../../server/api/annunci.json");
    const announcements = await response.json();
    return announcements;
}



document.addEventListener('DOMContentLoaded', async () => {

    const announcements = await readAllAnnouncements();
    await populateAnnouncements(announcements);
});