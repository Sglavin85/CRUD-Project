
import APIManager from "./dbCalls";

//testing import of dbcalls and calling getAllPlaces
APIManager.getAllPlaces()
    .then((places) => {
        console.log("Oh the places you will go:", places);
    });

