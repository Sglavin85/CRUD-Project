
import API from "./dbCalls";
import postAllInterests from "./interestsToDom"
import newInterestListener from "./AddInterestModal"

postAllInterests();
newInterestListener();

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

let $primaryDiv = document.querySelector("#primaryContainer")

$primaryDiv.addEventListener("click", (e) => {
    console.log(e)
    if (e.target.className === "deleteBtn") {
        let targetArray = e.target.id.split("--")
        let targetId = targetArray[1]
        API.deleteInterest(targetId)
            .then(_added => {
                $primaryDiv.innerHTML = ""
                postAllInterests()
            })
    }
})




