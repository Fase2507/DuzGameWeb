function filterGames(category) {
    const gameCards = document.querySelectorAll('.card');
        if (category === 'all') {
        gameCards.forEach(card => {
            card.closest('.col-12, .col-sm-6, .col-md-4, .col-md-8, .col-lg-3, .col-lg-6').style.display = 'block';
        });
        return;
    }

    // Filter cards based on category
    gameCards.forEach(card => {
        const cardCategories = card.dataset.category;
        const cardContainer = card.closest('.col-12, .col-sm-6, .col-md-4, .col-md-8, .col-lg-3, .col-lg-6');
        
        if (cardCategories && cardCategories.includes(category)) {
            cardContainer.style.display = 'block';
        } else {
            cardContainer.style.display = 'none';
        }
    });
}

