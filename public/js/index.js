
function generateCardCategory(category) {
    const card = document.createElement('div');
    card.classList.add('category-card');


    const cardBody = document.createElement('div');
    cardBody.classList.add('category-body');
    card.appendChild(cardBody);


    const iconContainer = document.createElement('div');
    iconContainer.classList.add('rounded-icon-container');
    cardBody.appendChild(iconContainer);


    const icon = document.createElement('i');
    const categoryIconArray = category.icon.split(" ");
    categoryIconArray.forEach((clazz) => {
        icon.classList.add(clazz);
    });
    iconContainer.appendChild(icon);

    const title = document.createElement('h3');
    title.textContent = category.name;
    cardBody.appendChild(title);

    const announcementCounter = document.createElement('p');
    let announcementCounterText = `${category.announcementsCount} Annunci`;
    if(category.announcementsCount == 1) {
        announcementCounterText = `${category.announcementsCount} Annuncio`;
    }
    announcementCounter.textContent = announcementCounterText;
    cardBody.appendChild(announcementCounter);

    return card;
}



/*
 <div class="col-12 col-md-6 col-lg-4 col-xl-3">
    <div class="category-card">
        <div class="category-body">
            <div class="rounded-icon-container">
                <i class="bi bi-airplane"></i>
            </div>
            <h3>Auto</h3>
            <p>123 Annunci</p>
        </div>
    </div>
</div>
*/

fetch("../../server/api/categorie.json")
    .then((response) => {
        return response.json();
    })
    .then((categories) => {

        const categoryContainer = document.getElementById('categoryContainer');

        categories.forEach((category) => {
            const card = generateCardCategory(category);

            const col = document.createElement('div');
            col.classList.add('col-12', 'col-md-6', 'col-lg-4', 'col-xl-3');
            col.appendChild(card);

            categoryContainer.appendChild(col);
        });
    })
    .catch((error) => {
        console.error(error);
    })