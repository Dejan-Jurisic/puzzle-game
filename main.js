"use strict";

window.addEventListener('load', shuffleAll);
let allLevelsDiv = document.querySelectorAll('[class*="level"]');
let twoClicksData = [];
//this going to truck how much move is made before level is completed
let movesMade = 0;
//this is default value
let levelSelected = "level-1";

function shuffleAll() {
    //not completed puzzle default value 
    allLevelsDiv[0].style.border = "2px solid red";
    allLevelsDiv[0].style.boxShadow = " 0 0 16px red";
    for (let i = 0; i < allLevelsDiv.length; i++) {
        let allSlices = document.querySelectorAll('[class*="img-container"]');
        let orderArry = [];
        for (let i = 0; i < allSlices.length; i++) {
            orderArry.push(i + 1);
        }

        for (let i = 0; i < allSlices.length; i++) {
            let random = Math.floor(Math.random() * orderArry.length);
            allSlices[i].style.order = orderArry[random];
            orderArry.splice(random, 1);
        }
    }
    startGame();
};

function startGame() {
    //make nav link clickable and to show right level
    setNavLink();
    //add click to all puzzle parts
    addClicksToPuzzleParts();
};

function setNavLink() {
    let gameLevels = document.querySelectorAll('[class*="selectLevel-"]');
    for (let i = 0; i < gameLevels.length; i++) {
        const gameLevel = gameLevels[i];
        gameLevel.addEventListener("click", function () {
            let clickedLevel = this.getAttribute("class");
            let levelDiv = document.querySelector("." + clickedLevel.substring(clickedLevel.indexOf("L"), clickedLevel.length).toLowerCase());
            allLevelsDiv.forEach(element => {
                element.style.display = "none"
            });
            levelDiv.style.display = "flex";
            //if puzzle is completed do not change border anymore
            if (levelDiv.style.border !== "2px solid green") {
                //set not completed puzzle on selected lvl
                levelDiv.style.border = "2px solid red";
                levelDiv.style.boxShadow = " 0 0 16px red";
            };
            levelSelected = levelDiv.className;
        })
    }
};

function addClicksToPuzzleParts() {
    let allPuzzleParts = document.querySelectorAll('[class*="img-container"]');
    allPuzzleParts.forEach(function (element) {
        if (element.parentNode.style.border !== "2px solid green") {
            element.addEventListener("click", selectedPuzzlePart);
        };
    });
};

function selectedPuzzlePart() {
    let puzzlePartData = {
        element: this,
        attribute: this.getAttribute("style")
    };
    //set border on selected puzzle part
    this.style.border = "4px solid green";
    twoClicksData.push(puzzlePartData);
    //move puzzle part from one position to other one 
    if (twoClicksData.length === 2) {
        movePuzzlePart();
    }
};

function movePuzzlePart() {
    twoClicksData[0].element.style.order = parseFloat(twoClicksData[1].attribute.split(" ")[1]);
    twoClicksData[1].element.style.order = parseFloat(twoClicksData[0].attribute.split(" ")[1]);
    twoClicksData[0].element.style.border = "none";
    twoClicksData[1].element.style.border = "none";
    twoClicksData.length = 0;
    //increase counter
    movesMade++;
    //check is puzzle completed
    isCompleted(levelSelected);
};

function isCompleted(lvlSelected) {
    let selectLvlDiv = document.querySelector("." + lvlSelected);
    let puzzleParts = selectLvlDiv.querySelectorAll('[class*="img-container"]');
    let checked = 0;
    let partPosition = 0;
    const puzzleCompleted = "2px solid green"
    if (selectLvlDiv.style.border !== puzzleCompleted) {
        puzzleParts.forEach(function (part) {
            let currentPart = parseFloat(part.style.order)
            if (currentPart > partPosition) {
                checked++
                partPosition = currentPart;
            };
            if (checked === puzzleParts.length) {
                selectLvlDiv.style.border = "2px solid green";
                selectLvlDiv.style.boxShadow = " 0 0 16px green";
            };

        });
    } else {
        selectLvlDiv.style.border = "2px solid red";
        selectLvlDiv.style.boxShadow = " 0 0 16px red";
    }
};