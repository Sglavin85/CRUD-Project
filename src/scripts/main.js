
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
    } else if (e.target.className === "editBtn") {
        let targetArray = e.target.id.split("--")
        let targetId = targetArray[1]
        let submitBtn = document.querySelector("#submitBtn")
        submitBtn.innerHTML = "SUBMIT EDIT"
        let modal = document.querySelector("#modal")
        modal.style.display = "block"
        API.getSingleInterest(targetId)
            .then(interest => {
                document.querySelector("#interestName").value = interest.name
                document.querySelector("#interestCost").value = interest.cost
                document.querySelector("#interestDescription").value = interest.description
                document.querySelector("#interestLocation").value = interest.place.id
                document.querySelector("#interestReview").value = interest.review
            })
        submitBtn.onclick = () => {
            let interestName = document.querySelector("#interestName").value
            let interestCost = document.querySelector("#interestCost").value
            let interestDescription = document.querySelector("#interestDescription").value
            let interestLocation = document.querySelector("#interestLocation").value
            let interestReview = document.querySelector("#interestReview").value

            let obj = {
                placeId: interestLocation,
                imgUrl: "",
                name: interestName,
                description: interestDescription,
                cost: interestCost,
                review: interestReview
            }

            API.editInterest(obj, targetId)
                .then(_added => {
                    postAllInterests()
                })
            let inputs = document.querySelectorAll("input")
            let textBox = document.querySelector("textarea")
            inputs.forEach(input => {
                input.value = ""
            })
            textBox.value = ""
            modal.style.display = "none"
            $primaryDiv.innerHTML = ""
        }
        let inputs = document.querySelectorAll("input")
        let textBox = document.querySelector("textarea")
        let cancelBtn = document.querySelector("#cancelBtn")
        cancelBtn.onclick = () => {
            inputs.forEach(input => {
                input.value = ""
            })
            textBox.value = ""
            modal.style.display = "none"
        }
    }
})





