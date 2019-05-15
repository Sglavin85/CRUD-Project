import API from "./dbCalls";

function createCard(obj) {
    let frag = document.createDocumentFragment()
    let div = document.querySelector("#primaryContainer")
    let card = document.createElement("div")
    card.setAttribute("id", `card${obj.id}`)

    let header = document.createElement("div")
    header.setAttribute("class", "card-header")


    let infoContainer = document.createElement("div")
    infoContainer.setAttribute("class", "interest-info-container")

    let title = document.createElement("h2")
    title.textContent = obj.name

    let location = document.createElement("h3")
    location.textContent = `Location: ${obj.place.name}`

    let description = document.createElement("h3")
    description.textContent = `Description: ${obj.description}`

    let cost = document.createElement("h3")
    cost.textContent = `Cost: $${obj.cost}`

    let review = document.createElement("h3")
    if (obj.review === "") {
        review.textContent = "This interest has not yet been reviewed"
    } else {
        review.textContent = `Review: ${obj.review}`
    }

    let imgContainer = document.createElement("div")
    imgContainer.setAttribute("class", "interest-img-container")
    let img = document.createElement("img")
    img.setAttribute("class", "image")
    img.setAttribute("src", `${obj.imgUrl}`)

    let btnContainer = document.createElement("div")
    btnContainer.setAttribute("class", "button-container")

    let editBtn = document.createElement("button")
    editBtn.setAttribute("id", `edit--${obj.id}`)
    editBtn.innerHTML = "EDIT"
    editBtn.setAttribute("class", "editBtn")

    let deleteBtn = document.createElement("button")
    deleteBtn.setAttribute("id", `delete--${obj.id}`)
    deleteBtn.setAttribute("class", "deleteBtn")
    deleteBtn.innerHTML = "DELETE"

    btnContainer.appendChild(editBtn)
    btnContainer.appendChild(deleteBtn)
    header.appendChild(btnContainer)
    card.appendChild(header)
    imgContainer.appendChild(img)
    card.appendChild(imgContainer)
    infoContainer.appendChild(title)
    infoContainer.appendChild(location)
    infoContainer.appendChild(cost)
    infoContainer.appendChild(description)
    infoContainer.appendChild(review)
    card.appendChild(infoContainer)
    frag.appendChild(card)
    div.appendChild(frag)
}

function postAllInterests() {
    API.getAllInterests()
        .then(interests => {
            interests.forEach(interest => {
                createCard(interest)
            });
        })
}

export default postAllInterests