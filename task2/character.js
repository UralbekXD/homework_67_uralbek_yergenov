const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

function addField(container, key, data) {
    if (key !== "image") {
        const field = document.createElement("p")
        field.textContent = `${key}: ${data}`
        container.append(field)
    } else {
        const image = document.createElement("img")
        image.src = data
        container.append(image)
    }
}

function addLinks(info, arr) {
    const container = document.createElement("div")
    container.style.display = 'flex'
    container.style.gap = '5px'
    container.style.flexWrap = 'wrap'
    const key = document.createElement("li")
    key.textContent = 'Episodes:'
    container.append(key)
    for (let item of arr) {
        const link = document.createElement("a")
        link.href = item
        link.textContent = item.split("/").at(-1)
        container.append(link)
    }
    info.append(container)
}

function showCharacterInfo(character) {
    const info = document.querySelector(".info")

    for (let key in character) {
        if (key !== 'id') {
            let data = character[key]
            if (typeof data === "object") {
                if (Array.isArray(data)) {
                    addLinks(info, data)
                } else {
                    addField(info, key, data.name)
                }
            } else {
                addField(info, key, data)
            }
        }
    }
}

const characterAPI = new XMLHttpRequest()
characterAPI.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        let parsedResponse = JSON.parse(this.response)
        showCharacterInfo(parsedResponse)
    }
}

characterAPI.open("GET", `https://rickandmortyapi.com/api/character/${id}`, true)
characterAPI.send()
