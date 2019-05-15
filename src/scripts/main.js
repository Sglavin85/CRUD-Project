
import API from "./dbCalls";
import postAllInterests from "./interestsToDom"
import newInterestListener from "./AddInterestModal"

// fill the drop down menu
API.getAllPlaces()
    .then(places => {
        let dropdownMenu = document.querySelector("#interestLocation")
        places.forEach(place => {
            let frag = document.createDocumentFragment()
            let option = document.createElement("option")
            option.setAttribute("value", `${place.id}`)
            option.textContent = place.name
            frag.appendChild(option)
            dropdownMenu.appendChild(frag)
        })

    })


postAllInterests();
newInterestListener();

