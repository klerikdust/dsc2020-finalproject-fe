document.getElementById(`burger-menu`).addEventListener(`click`, () => {
    const card = document.getElementById(`burger-card`)
    if (card.classList.contains(`show`)) return card.classList.toggle(`show`)
    return card.classList.add(`show`)
})