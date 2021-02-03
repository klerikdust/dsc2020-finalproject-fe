import commanifier from "./commanifier.js"
window.onload = () => {
    const displayProvince = (dataSource={}) => {
        const ul = document.getElementById(`province-node`)
        let li = document.createElement(`li`)
        //  Card Header
        let title = document.createElement(`h1`)
        title.innerHTML = dataSource.provinsi
        //  Card Positive Section
        let positive = document.createElement(`p`)
        positive.innerHTML = `<span>${commanifier(dataSource.kasusPosi)}</span> positive`
        //  Card Death Section
        let death = document.createElement(`p`)
        death.innerHTML = `<span>${commanifier(dataSource.kasusMeni)}</span> deaths`
        //  Card Recovered Section
        let recovered = document.createElement(`p`)
        recovered.innerHTML = `<span>${commanifier(dataSource.kasusSemb)}</span> recovered`
        li.classList.add(`card`)
        li.appendChild(title)
        li.appendChild(positive)
        li.appendChild(death)
        li.appendChild(recovered)
        ul.appendChild(li)
    }

    fetch(`https://indonesia-covid-19.mathdro.id/api/provinsi`)
    .then(async res => {
        const src = await res.json()
        src.data.map(node => displayProvince(node))
        document.getElementById(`loading`).classList.add(`loaded`)
        const searchbar = document.querySelector(`#searchbar`)
        const header = document.getElementById(`province-search-header`)
        const provinces = document.getElementById(`province-node`)
        
        /**
         * Refreshing the state of data provinsi
         * @return {void}
         */
        const refreshProvincesListState = () => {
            header.innerHTML = `Find your province.`
            provinces.innerHTML = ``
            src.data.map(node => displayProvince(node))
        }
    
        //  Trigger on input clear
        searchbar.addEventListener(`search`, refreshProvincesListState())
        //  Trigger on searchbar query change
        searchbar.addEventListener(`keyup`, () => {
            //  Handle if user hasn't inputted any keyword
            const keyword = document.getElementById(`searchbar`).value
            provinces.innerHTML = ``
            const result = src.data.filter(n => n.provinsi.includes(keyword))
            if (result.length <= 0) return header.innerHTML = `Oops, no result...`
            //  Handle if user hasn't filtered anything
            if (result.length === src.data.length) return refreshProvincesListState()
            result.map(n => displayProvince(n))
            return header.innerHTML = `Found ${result.length} ${result.length > 1 ? `provinces!` : `province!`}`
        })
    })
    .catch(err => {
        console.log(err)
    })
}