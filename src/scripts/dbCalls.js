const baseURL = "http://localhost:8088";

const APIManager = {
    getAllPlaces: function () {
        return fetch(`${baseURL}/places`)
            .then(response => response.json())
    },
    getAllInterests: function () {
        return fetch(`${baseURL}/interests?_expand=place`)
            .then(response => response.json())
    },
    addInterest: function (obj) {
        return fetch(`${baseURL}/interests`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json)
    },
    editInterest: function (obj, id) {
        return fetch(`${baseURL}/interests/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    deleteInterest: function (id) {
        return fetch(`${baseURL}/interests/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
    }
}

export default APIManager;