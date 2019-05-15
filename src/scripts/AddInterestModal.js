import API from "./dbCalls"
import postAllInterests from "./interestsToDom"

let $primaryDiv = document.querySelector("#primaryContainer")

function newInterestListener() {
    const newInterestBtn = document.querySelector("#interestLink")

    newInterestBtn.addEventListener("click", (e) => {
        let modal = document.querySelector("#modal")
        modal.style.display = "block"
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
        let submitBtn = document.querySelector("#submitBtn")
        submitBtn.onclick = () => {
            let interestName = document.querySelector("#interestName").value
            let interestCost = document.querySelector("#interestCost").value
            let interestDescription = document.querySelector("#interestDescription").value
            let interestLocation = document.querySelector("#interestLocation").value

            let obj = {
                placeId: interestLocation,
                imgUrl: "",
                name: interestName,
                description: interestDescription,
                cost: interestCost,
                review: ""
            }

            API.addInterest(obj)
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
    })
}

export default newInterestListener