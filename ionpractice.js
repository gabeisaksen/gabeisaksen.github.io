//creates objects for pairs of ion names and symbols
let ions1Names = {
    "cadmium ion": "Cd^+2"
};
let ions1Symbols = Object.fromEntries(
    Object.entries(ions1Names).map(([key, value]) => [value, key])
);

let ions2Names = {
    "nitrite": "NO_2^-1"
};
let ions2Symbols = Object.fromEntries(
    Object.entries(ions2Names).map(([key, value]) => [value, key])
);

let fullIonsList = [ions1Names, ions1Symbols, ions2Names, ions2Symbols];

//using the quiz number as a parameter, this function returns an object with all the ions belonging to that quiz
function getIonsList(quizNumber, fullIonsListParameter = fullIonsList) {
    let listNumber = quizNumber * 2;

    let ionsListSeparated = fullIonsListParameter.slice(0, listNumber);

    let finalList = {};
    for (let singleList of ionsListSeparated) {
        Object.assign(finalList, singleList);
    };

    displayHomepage = false;

    return finalList;
};

//determines when to display the homepage
let displayHomepage = true;

const homepageElement = document.getElementById("homepage");
const quizElement = document.getElementById("quiz");
if (displayHomepage) {
    homepageElement.hidden = false;
    quizElement.hidden = true;
} else {
    homepageElement.hidden = true;
    quizElement.hidden = false
};