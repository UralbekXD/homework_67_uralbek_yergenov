function createCharacterCard (container, character) {
    const card = document.createElement("fieldset")
    card.classList.add('card')

    const legend = document.createElement("legend")
    legend.classList.add('legend')

    const name = document.createElement("a")
    name.href = `character.html?id=${character.id}`
    name.textContent = character.name

    const image = document.createElement("img")
    image.classList.add('avatar')
    image.src = character.image

    legend.append(name)
    card.append(legend)
    card.append(image)
    container.append(card)
}

function showCharacters (characters) {
    const container = document.querySelector(".container")
    for (let character of characters['results']) {
        createCharacterCard(container, character)
    }
}

const rickMortyAPI = new XMLHttpRequest()
rickMortyAPI.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        let parsedResponse = JSON.parse(this.response)
        showCharacters(parsedResponse)
    }
}

rickMortyAPI.open("GET", "https://rickandmortyapi.com/api/character", true)
rickMortyAPI.send()

