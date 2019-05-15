
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
        let modal = document.querySelector("#modal2")
        modal.style.display = "flex"
        let deleteBtn = document.querySelector("#deleteBtn")
        let targetArray = e.target.id.split("--")
        let targetId = targetArray[1]
        deleteBtn.addEventListener("click", (e) => {
            API.deleteInterest(targetId)
                .then(_added => {
                    $primaryDiv.innerHTML = ""
                    postAllInterests()
                    modal.style.display = "none"
                })
        })
        let cancelBtn = document.querySelector("#cancelDeleteBtn")
        cancelBtn.addEventListener("click", (e) => {
            modal.style.display = "none"
        })
    }
})




