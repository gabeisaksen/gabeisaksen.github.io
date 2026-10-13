console.log("js is linked. SWEEEEET")

let ions1Names = {
    "cadmium ion": "Cd^+2"
};
let ions1Symbols = Object.fromEntries(
    ions1Names.entries().map(([key, value]) => [value, key])
);

let ions2Names = {
    "nitrite": "NO_2^-1"
};
let ions2Symbols = Object.fromEntries(
    ions2Names.entries().map(([key, value]) => [value, key])
);

let fullIonsList = [ions1Names, ions1Symbols, ions2Names, ions2Symbols];

function getIonsList(quizNumber, fullIonsListParameter = fullIonsList) {
    let listNumber = quizNumber * 2;

    let ionsListSeparated = fullIonsListParameter.slice(0, listNumber);

    let finalList = {};
    for (let singleList of ionsListSeparated) {
        Object.assign(finalList, singleList);
    };

    return finalList;
};