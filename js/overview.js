import commanifier from "./commanifier.js"
window.onload = () => {
    fetch(`https://covid19.mathdro.id/api/countries/ID`)
    .then(async response => {
        const { confirmed, deaths, recovered } = await response.json()
        const total = confirmed.value + deaths.value + recovered.value
        document.getElementById(`total-cases`).innerHTML = commanifier(total)
        document.getElementById(`positive`).innerHTML = commanifier(confirmed.value)
        document.getElementById(`death`).innerHTML = commanifier(deaths.value)
        document.getElementById(`recovered`).innerHTML = commanifier(recovered.value)
        document.getElementById(`loading`).classList.add(`loaded`)
    })
    .catch(err => {
        console.log(err)
    })
}