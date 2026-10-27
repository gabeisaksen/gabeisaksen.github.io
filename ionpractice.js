//creates objects for pairs of ion names and symbols
let ions1Names = {
    "cadmium ion": "Cd^+2", "zinc ion": "Zn^+2", "silver ion": "Ag^+1", "ammonium": "NH_4^+1", "acetate": "C_2H_3O_2^-1", "bicarbonate": "HCO_3^-1", "perchlorate": "ClO_4^-1", "chlorate": "ClO_3^-1", "chlorite": "ClO_2^-1", "hypochlorite": "ClO^-1", "hydroxide": "OH^-1", "plumbous ion": "Pb^+2", "plumbic ion": "Pb^+4", "Hydrogen": "H", "Carbon": "C", "Silicon": "Si", "Lithium": "Li", "Sodium": "Na", "Boron": "B", "Aluminum": "Al", "Mercury": "Hg", "Potassium": "K", "Beryllium": "Be", "Copper": "Cu"
};
let ions1Symbols = Object.fromEntries(
    Object.entries(ions1Names).map(([key, value]) => [value, key])
);

let ions2Names = {
    "nitrite": "NO_2^-1", "nitrate": "NO_3^-1", "cyanide": "CN^-1", "cyanate": "OCN^-1", "thiocyanate": "SCN^-1", "stannous ion": "Sn^+2", "stannic ion": "Sn^+4", "Magnesium": "Mg", "Zinc": "Zn", "Cadmium": "Cd", "Gold": "Au", "Calcium": "Ca", "Strontium": "Sr", "Barium": "Ba", "Radium": "Ra", "Chromium": "Cr", "Tungsten": "W", "Silver": "Ag"
};
let ions2Symbols = Object.fromEntries(
    Object.entries(ions2Names).map(([key, value]) => [value, key])
);

let ions3Names = {
    "permanganate": "MnO_4^-1", "carbonate": "CO_3^-2", "chromate": "CrO_4^-2", "dichromate": "Cr_2O_7^-2", "peroxide": "O_2^-2", "sulfite": "SO_3^-2", "sulfate": "SO_4^-2", "mercurous ion": "Hg_2^+2", "mercuric": "Hg^+2", "Manganese": "Mn", "Iron": "Fe", "Tin": "Sn", "Lead": "Pb", "Nitrogen": "N", "Phosphorous": "P", "Bismuth": "Bi", "Oxygen": "O", "Sulfur": "S", "Fluorine": "F", "Cesium": "Cs"
};
let ions3Symbols = Object.fromEntries(
    Object.entries(ions3Names).map(([key, value]) => [value, key])
);

let ions4Names = {
    "phosphate": "PO_4^-3", "phosphite": "PO_3^-3", "bisulfate": "HSO_4^-1", "oxalate": "C_2O_4^-2", "cuprous ion": "Cu^+1", "cupric ion": "Cu^+2", "ferrous ion": "Fe^+2", "ferric ion": "Fe^+3", "Chlorine": "Cl", "Bromine": "Br", "Iodine": "I", "Helium": "He", "Neon": "Ne", "Argon": "Ar", "Krypton": "Kr", "Radon": "Rn", "Cobalt": "Co", "Nickel": "Ni"
};
let ions4Symbols = Object.fromEntries(
    Object.entries(ions4Names).map(([key, value]) => [value, key])
);

let fullIonsList = [
    ions1Names, ions1Symbols,
    ions2Names, ions2Symbols,
    ions3Names, ions3Symbols,
    ions4Names, ions4Symbols
];

//using the quiz number as a parameter, this function returns an object with all the ions belonging to that quiz
function getIonsList(quizNumber, fullIonsListParameter = fullIonsList) {
    let listNumber = quizNumber * 2;

    let ionsListSeparated = fullIonsListParameter.slice(0, listNumber);

    let finalList = {};
    for (let singleList of ionsListSeparated) {
        Object.assign(finalList, singleList);
    };

    return finalList;
}

//determines when to display the homepage
const homepageElement = document.getElementById("homepage");
const quizElement = document.getElementById("quiz");

let ionsList = {};
let quizStarted = false;

function showHomepage() {
    quizStarted = false;
    ionsList = {};
    homepageElement.hidden = false;
    quizElement.hidden = true;
    document.getElementById("userAnswer").hidden = false;
    document.getElementById("nextQuestionButton").hidden = false;
    document.getElementById("modeLabel").hidden = true;
    document.getElementById("scriptModeInstructions").hidden = true;
}

function startQuiz(quizNumber) {
    quizStarted = true;
    ionsList = getIonsList(quizNumber);
    homepageElement.hidden = true;
    quizElement.hidden = false;
    document.getElementById("modeLabel").hidden = false;
    document.getElementById("scriptModeInstructions").hidden = false;
    document.getElementById("response").textContent = "";
    showNextQuestion();
}

showHomepage();

//displays next question when called
let currentAnswer = "";
let currentQuestion = "";

function showNextQuestion() {
    let ionsEntries = Object.entries(ionsList);

    document.getElementById("response").textContent = "";
    if (ionsEntries.length === 0) {
        document.getElementById("question").textContent = "You finished the quiz!";
        document.getElementById("caption").textContent = "";
        document.getElementById("userAnswer").hidden = true;
        document.getElementById("nextQuestionButton").hidden = true;
        document.getElementById("modeLabel").hidden = true;
        document.getElementById("scriptModeInstructions").hidden = true;
        return;
    }

    let randomIndex = Math.floor(Math.random() * ionsEntries.length);
    let [question, answer] = ionsEntries[randomIndex];
    currentAnswer = toScript(answer);
    currentQuestion = question

    document.getElementById("question").textContent = toScript(question);
    document.getElementById("userAnswer").value = "";
    document.getElementById("userAnswer").focus();

    scriptMode = "normal";
}

//checks answer when called
function checkAnswer() {
    let userAnswer = document.getElementById("userAnswer").value.trim();
    
    document.getElementById("userAnswer").blur()

    if (userAnswer === currentAnswer) {
        document.getElementById("response").textContent = currentAnswer + " is correct!";
        // remove the answered question so it isn't asked again
        delete ionsList[currentQuestion];
    } else {
        document.getElementById("response").textContent = "Incorrect. Answer: " + currentAnswer;
    }
}

document.getElementById("userAnswer").addEventListener("keydown", (event) => {
    if (event.key === "Enter") checkAnswer();
});

//creates superscript and subscript values
let SUP = {"0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹","+":"⁺","-":"⁻"};
let SUB = {"0":"₀","1":"₁","2":"₂","3":"₃","4":"₄","5":"₅","6":"₆","7":"₇","8":"₈","9":"₉","+":"₊","-":"₋"};

let answerInput = document.getElementById("userAnswer");
let scriptMode = "normal"; // "normal" | "sub" | "sup"

answerInput.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    if (e.key === "_") {
        e.preventDefault();
        scriptMode = "sub";
    } else if (e.key === "^") {
        e.preventDefault();
        scriptMode = "sup";
    } else if (e.key === "Tab") {
        e.preventDefault();
        scriptMode = "normal";
    } else if (e.key.length === 1 && scriptMode !== "normal") {
        let map = scriptMode === "sub" ? SUB : SUP;
        if (map[e.key]) {
            e.preventDefault();
            // insert at the cursor (replacing any selection)
            answerInput.setRangeText(map[e.key], answerInput.selectionStart, answerInput.selectionEnd, "end");
        } else {
            // a character with no script version (like a letter) drops back to normal
            scriptMode = "normal";
        };
    }

    if (scriptMode === "normal") {
        document.getElementById("modeLabel").textContent = " mode: normal";
    } else if (scriptMode === "sup") {
        document.getElementById("modeLabel").textContent = " mode: superscript";
    } else {
        document.getElementById("modeLabel").textContent = " mode: subscript";
    };
    
});

//turns a string with _ and ^ into a string with scripts
function toScript(str) {
    let out = "";
    let mode = "normal";
    for (const ch of str) {
        if (ch === "_") { mode = "sub"; continue; }
        if (ch === "^") { mode = "sup"; continue; }
        const map = mode === "sub" ? SUB : mode === "sup" ? SUP : null;
        if (map && map[ch]) {
            out += map[ch];
        } else {
            mode = "normal"; // e.g. the O in "H_2O" ends the subscript
            out += ch;
        }
    }
    return out;
}