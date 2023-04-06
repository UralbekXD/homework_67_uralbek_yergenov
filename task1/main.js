const pickRandomQuote = (quotes) => {
    let randomQuote =  Math.floor(Math.random() * quotes.length);
    return quotes[randomQuote]
}

const createModal = () => {
    let modal = document.createElement("div")
    let backdrop = document.createElement("div")
    let window = document.createElement("div")
    let info = document.createElement("div")
    let btn = document.createElement("button")

    modal.className = "modal"
    backdrop.className = "backdrop"
    window.className = "window"
    info.className = "info"
    btn.className = "modal-close"
    btn.textContent = "Закрыть"

    btn.addEventListener("click", () => {
        modal.classList.remove('active')
        document.getElementById("add-item-btn").classList.toggle('inactive')
    })

    modal.append(backdrop)
    backdrop.append(window)
    window.append(info)
    window.append(btn)

    modal.classList.add()
    document.body.append(modal)
}

window.addEventListener('load', createModal)

const container = document.querySelector("#container")
const btn = container.querySelector("#add-item-btn")

const ajax = new XMLHttpRequest()
ajax.open("GET", "https://type.fit/api/quotes")
ajax.send()


btn.addEventListener("click", (event) => {
    let modal = document.querySelector(".modal")
    modal.classList.add('active')

    // Hide plus button
    document.getElementById("add-item-btn").classList.toggle('inactive')

    let info = modal.querySelector(".info")
    let response = JSON.parse(ajax.response)
    let randomQuote = pickRandomQuote(response)
    console.log(randomQuote)

    setTimeout(function () {
        modal.classList.remove('active')
        document.getElementById("add-item-btn").classList.toggle('inactive')
    }, 5000)

    modal.classList.add('active')
    info.textContent = randomQuote.text
})