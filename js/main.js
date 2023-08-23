/* ####################################### Variables ####################################### */
/* --------------------------------------- Constants --------------------------------------- */
const timeOut = 2000;
const columns = ['.b', '.c', '.d', '.e', '.f', '.g'];
const upperRows = ['.two', '.three', '.four', '.five', '.six', '.seven'];
const bottomRows = ['.one', '.two', '.three', '.four', '.five', '.six'];
const hitAudio = new Audio('assets/hit.wav');
const missAudio = new Audio('assets/miss.wav');

/* --------------------------------------- DOM Elements --------------------------------------- */
const bodyEl = document.querySelector('body');
const topGridEl = document.querySelector('.top-grid');
const bottomGridEl = document.querySelector('.bottom-grid');
const topGridDivEls = document.querySelectorAll('.top-grid > div');
const bottomGridDivEls = document.querySelectorAll('.bottom-grid > div');
const allyGraveShipEls = document.querySelectorAll('.ally-grave > .ship');
const enemyGraveShipEls = document.querySelectorAll('.enemy-grave > .ship');
const redoBttnEl = document.querySelector('.redo');

const blankSlateEl = document.createElement('div');
const popUpEl = document.createElement('div');
const popUpH1El = document.createElement('h1');
const popUpPEl = document.createElement('p');
const okEl = document.createElement('button');
const fightAgainEl = document.createElement('button');
const surrenderEl = document.createElement('button');


/* --------------------------------------- Classes --------------------------------------- */
//a class used to make ship objects with custom name, alliance, size, and orientation properties
class Ship {
    constructor(name, alliance, size, orientation) {
        this.name = name;
        this.divEl = document.createElement('div');
        this.alliance = alliance;
        this.size = size;
        this.orientation = orientation;
        this.columnPosition = 0;
        this.rowPosition = 0;
        this.xCoordinates = [];
        this.yCoordinates = [];
        this.squaresTaken = [];
        this.inGraveyard = 'hidden';
        this.cheatSheet = 'No cheating!';
    };

    //records in the ship's squaresTaken array where the x and yCoordinates are taking up
    recordSquaresTaken() {
        let squareOne;
        let squareTwo;
        let squareThree;

        if (this.alliance === 'ally') {
            squareOne = document.querySelector(`.bottom-grid > ${bottomRows[this.rowPosition - 1]}${columns[this.columnPosition - 2]}`);
            squareOne.setAttribute('id', 'taken');
            this.squaresTaken.push(squareOne);
            if (this.size === 2) {
                if (this.orientation === 'a') {
                    squareTwo = document.querySelector(`.bottom-grid > ${bottomRows[this.rowPosition]}${columns[this.columnPosition - 2]}`);
                    squareTwo.setAttribute('id', 'taken');
                    this.squaresTaken.push(squareTwo);
                } else if (this.orientation === 'b') {
                    squareTwo = document.querySelector(`.bottom-grid > ${bottomRows[this.rowPosition - 1]}${columns[this.columnPosition - 1]}`);
                    squareTwo.setAttribute('id', 'taken');
                    this.squaresTaken.push(squareTwo);
                };
            } else if (this.size === 3) {
                if (this.orientation === 'a') {
                    squareTwo = document.querySelector(`.bottom-grid > ${bottomRows[this.rowPosition]}${columns[this.columnPosition - 2]}`);
                    squareTwo.setAttribute('id', 'taken');
                    this.squaresTaken.push(squareTwo);

                    squareThree = document.querySelector(`.bottom-grid > ${bottomRows[this.rowPosition + 1]}${columns[this.columnPosition - 2]}`);
                    squareThree.setAttribute('id', 'taken');
                    this.squaresTaken.push(squareThree);
                } else if (this.orientation === 'b') {
                    squareTwo = document.querySelector(`.bottom-grid > ${bottomRows[this.rowPosition - 1]}${columns[this.columnPosition - 1]}`);
                    squareTwo.setAttribute('id', 'taken');
                    this.squaresTaken.push(squareTwo);

                    squareThree = document.querySelector(`.bottom-grid > ${bottomRows[this.rowPosition - 1]}${columns[this.columnPosition]}`);
                    squareThree.setAttribute('id', 'taken');
                    this.squaresTaken.push(squareThree);
                };
            };

        } else if (this.alliance === 'enemy') {
            squareOne = document.querySelector(`.top-grid > ${upperRows[this.rowPosition - 2]}${columns[this.columnPosition - 2]}`);
            squareOne.setAttribute('id', 'taken');
            this.squaresTaken.push(squareOne);
            if (this.size === 2) {
                if (this.orientation === 'a') {
                    squareTwo = document.querySelector(`.top-grid > ${upperRows[this.rowPosition - 1]}${columns[this.columnPosition - 2]}`);
                    squareTwo.setAttribute('id', 'taken');
                    this.squaresTaken.push(squareTwo);
                } else if (this.orientation === 'b') {
                    squareTwo = document.querySelector(`.top-grid > ${upperRows[this.rowPosition - 2]}${columns[this.columnPosition - 1]}`);
                    squareTwo.setAttribute('id', 'taken');
                    this.squaresTaken.push(squareTwo);
                };
            } else if (this.size === 3) {
                if (this.orientation === 'a') {
                    squareTwo = document.querySelector(`.top-grid > ${upperRows[this.rowPosition - 1]}${columns[this.columnPosition - 2]}`);
                    squareTwo.setAttribute('id', 'taken');
                    this.squaresTaken.push(squareTwo);

                    squareThree = document.querySelector(`.top-grid > ${upperRows[this.rowPosition]}${columns[this.columnPosition - 2]}`);
                    squareThree.setAttribute('id', 'taken');
                    this.squaresTaken.push(squareThree);
                } else if (this.orientation === 'b') {
                    squareTwo = document.querySelector(`.top-grid > ${upperRows[this.rowPosition - 2]}${columns[this.columnPosition - 1]}`);
                    squareTwo.setAttribute('id', 'taken');
                    this.squaresTaken.push(squareTwo);

                    squareThree = document.querySelector(`.top-grid > ${upperRows[this.rowPosition - 2]}${columns[this.columnPosition]}`);
                    squareThree.setAttribute('id', 'taken');
                    this.squaresTaken.push(squareThree);
                };
            };
        };
    };

    //resets all of a ship's properties to default
    resetMe() {
        this.columnPosition = 0;
        this.rowPosition = 0;
        this.xCoordinates = [];
        this.yCoordinates = [];
        this.squaresTaken = [];
        this.inGraveyard = 'hidden';
        this.cheatSheet = 'No cheating!';
        if (this.onBoard) {
            this.onBoard = 'visible';
            this.beenHit = false;;
        };
    };
};

//a class extending Ship that makes ally ship objects with the addition of the properties onBoard and beenHit, along with the function buildShip()
class AllyShip extends Ship {
    constructor(name, alliance, size, orientation, columnPosition, rowPosition, xCoordinates, yCoordinates, squaresTaken, inGraveyard) {
        super(name, alliance, size, orientation, columnPosition, rowPosition, xCoordinates, yCoordinates, squaresTaken, inGraveyard);
        this.onBoard = 'visible';
        this.beenHit = false;
    };

    //builds the ship and pipe divs and adds them to the board when called upon
    buildShip() {

        let pipeOneEl = document.createElement('div');
        let pipeTwoEl = document.createElement('div');
        let pipeThreeEl = document.createElement('div');

        function buildPipe(pipeEl, pipeColumnPosition, pipeRowPosition, ship) {
            pipeEl.classList.add('pipe');
            pipeEl.style.gridColumn = `${pipeColumnPosition} / span 1`;
            pipeEl.style.gridRow = `${pipeRowPosition} / span 1`;
            ship.divEl.appendChild(pipeEl);

        }

        this.divEl.classList.add('ship');
        this.divEl.setAttribute('id', this.name);
        this.divEl.style.display = 'grid';

        if (this.size === 3 && this.orientation === 'a') {
            this.divEl.style.gridTemplateColumns = 'repeat(3, 1fr)';
            this.divEl.style.gridTemplateRows = 'repeat(9, 1fr)';
            this.divEl.style.gridColumn = `${this.columnPosition} / span 1`;
            this.divEl.style.gridRow = `${this.rowPosition} / span 3`;
            buildPipe(pipeOneEl, 2, 2, this);
            buildPipe(pipeTwoEl, 2, 5, this);
            buildPipe(pipeThreeEl, 2, 8, this);
        } else if (this.size === 2 && this.orientation === 'a') {
            this.divEl.style.gridTemplateColumns = 'repeat(3, 1fr)';
            this.divEl.style.gridTemplateRows = 'repeat(6, 1fr)';
            this.divEl.style.gridColumn = `${this.columnPosition} / span 1`;
            this.divEl.style.gridRow = `${this.rowPosition} / span 2`;
            buildPipe(pipeOneEl, 2, 2, this);
            buildPipe(pipeTwoEl, 2, 5, this);
        } else if (this.size === 3 && this.orientation === 'b') {
            this.divEl.style.gridTemplateColumns = 'repeat(9, 1fr)';
            this.divEl.style.gridTemplateRows = 'repeat(3, 1fr)';
            this.divEl.style.gridColumn = `${this.columnPosition} / span 3`;
            this.divEl.style.gridRow = `${this.rowPosition} / span 1`;
            buildPipe(pipeOneEl, 2, 2, this);
            buildPipe(pipeTwoEl, 5, 2, this);
            buildPipe(pipeThreeEl, 8, 2, this);
        } else if (this.size === 2 && this.orientation === 'b') {
            this.divEl.style.gridTemplateColumns = 'repeat(6, 1fr)';
            this.divEl.style.gridTemplateRows = 'repeat(3, 1fr)';
            this.divEl.style.gridColumn = `${this.columnPosition} / span 2`;
            this.divEl.style.gridRow = `${this.rowPosition} / span 1`;
            buildPipe(pipeOneEl, 2, 2, this);
            buildPipe(pipeTwoEl, 5, 2, this);
        };

        this.divEl.style.width = 'auto';
        this.divEl.style.height = 'auto';

        bottomGridEl.appendChild(this.divEl);

        this.divEl.style.visibility = this.onBoard;
    };
};



/* --------------------------------------- Sate delcarations --------------------------------------- */
let instructional; //a boolean variable used in renderInstructions() to tell if instructions should be shown
let testing; //a boolean variable used in generateCoordinates() to tell if the while loop is still testing for nonoverlapping coordinates
let wait; //a boolean variable used in handleClick() to tell if the function should wait until the computer has gone or until a badGuess square returns to its normal colors
let currentEvt; //set in handleClick to pass on the current evt of a click event to other functions not directly called in the handleClick
let winner; //a boolean variable that tells if someone has won the game
let champion; //an empty string that will hold the name of who wins, 'allies' or 'enemies'
let reset; //a boolean variable used in renderReset() and render() to tell if it should render a reset board
let badGuess; //a boolean variable marked true if the player guessed a square they had already guessed

let allyShipThreeA = new AllyShip('allyShipThreeA', 'ally', 3, 'a'); //creates an ally ship, three spaces big vertically
let allyShipThreeB = new AllyShip('allyShipThreeB', 'ally', 3, 'b'); //creates an ally ship, three spaces big horizontally
let allyShipTwoA = new AllyShip('allyShipTwoA', 'ally', 2, 'a'); //creates an ally ship, two spaces big vertically
let allyShipTwoB = new AllyShip('allyShipTwoB', 'ally', 2, 'b'); //creates an ally ship, two spaces big horizontally

let enemyShipThreeA = new Ship('enemyShipThreeA', 'enemy', 3, 'a'); //creates an enemy ship, three spaces big vertically
let enemyShipThreeB = new Ship('enemyShipThreeB', 'enemy', 3, 'b'); //creates an enemy ship, three spaces big horizontally
let enemyShipTwoA = new Ship('enemyShipTwoA', 'enemy', 2, 'a'); //creates an enemy ship, two spaces big vertically
let enemyShipTwoB = new Ship('enemyShipTwoB', 'enemy', 2, 'b'); //creates an alenemyly ship, two spaces big horizontally

let allyShipArr = [allyShipThreeA, allyShipThreeB, allyShipTwoA, allyShipTwoB]; //puts all of the ally ships in an array for easy, iteratable access
let enemyShipArr = [enemyShipThreeA, enemyShipThreeB, enemyShipTwoA, enemyShipTwoB]; //puts all of the enemy ships in an array for easy, iteratable access


/* ####################################### Functions ####################################### */
/* --------------------------------------- Init --------------------------------------- */
//init runs the game and resets variables at the top of each game
function init() {
    instructional = true;
    testing = false;
    wait = false;
    winner = false;
    champion = '';
    reset = false;
    badGuess = false;

    //generates ally ship coordinates
    generateCoordinates(allyShipArr);

    //stores the values of the ally ship coordinates
    for (ship of allyShipArr) {
        ship.recordSquaresTaken();
    };

    //generates enemy ship coordinates
    generateCoordinates(enemyShipArr);

    //stores the values of the enemy ship coordinates
    for (ship of enemyShipArr) {
        ship.recordSquaresTaken();
    };

    //adds an event listner to the confirmation button in the instructional popup that stops renderInstructions, removes the popup and its confirmation buutton and then renders it all
    okEl.addEventListener('click', () => {
        instructional = false;
        blankSlateEl.remove();
        okEl.remove();
        render();
    });

    //adds an event listener to each div in the top grid that runs handleClick
    topGridDivEls.forEach((div) => {
        div.addEventListener('click', handleClick);
    });

    //adds an event listener to the redo button runs resetter
    redoBttnEl.addEventListener('click', resetter);

    //adds an event listener to the fight again button, when it exists, runs resetter
    fightAgainEl.addEventListener('click', resetter);

    //adds an event listener to the surrender button, when it exists, runs resetter
    surrenderEl.addEventListener('click', () => {
        close();
    });

    //renders the game
    render();
}

/* --------------------------------------- Render --------------------------------------- */
//runs all render functions
function render() {
    renderInstructions();
    if (reset) {
        renderReset();
    } else if (!reset) {
        renderAllyShips();
        renderBadGuess();
        renderAllyGuesses();
        renderEnemyGuesses();
        renderSunkenShips();
        renderGameOver();
    };
};

//renders the instructions popup
function renderInstructions() {
    if (instructional) {
        blankSlateEl.classList.add('blankSlate');
        bodyEl.appendChild(blankSlateEl);

        popUpEl.classList.add('popUp');

        popUpH1El.classList.add('popUpH1');
        popUpPEl.classList.add('popUpP');

        popUpH1El.textContent = 'Attention!';
        popUpPEl.textContent = 'Click the upper, green board to try and strike down our enemies\' battleships. But beware, they\'ll try and strike down our allies\' ships on the bottom, blue board too!  Now batten down the hatches and get to work!';

        okEl.classList.add('popBttn');

        okEl.textContent = 'Roger, ma\'am!';

        popUpEl.appendChild(popUpH1El);
        popUpEl.appendChild(popUpPEl);
        popUpEl.appendChild(okEl);

        blankSlateEl.appendChild(popUpEl);
    };
};

//renders ally ships starting position on the board
function renderAllyShips() {
    for (ship of allyShipArr) {
        ship.buildShip();
    };
};

//renders a gray square in the top grid if the user clicks on a square they had already guessed, and then using a setTimeout, after timeOut amount of ms, it reverts back to its original colors.
function renderBadGuess() {
    if (badGuess) {
        let storedID;
        let protectiveCurrentEvt = currentEvt;
        if (protectiveCurrentEvt.target.tagName === 'P') {
            storedID = protectiveCurrentEvt.target.parentElement.getAttribute('id');
            protectiveCurrentEvt.target.parentElement.setAttribute('id', 'badGuess');

            setTimeout(() => {
                protectiveCurrentEvt.target.parentElement.setAttribute('id', storedID);
            }, timeOut);

        } else {
            storedID = protectiveCurrentEvt.target.getAttribute('id');
            protectiveCurrentEvt.target.setAttribute('id', 'badGuess');

            setTimeout(() => {
                protectiveCurrentEvt.target.setAttribute('id', storedID);

            }, timeOut);
        };
    };
};

//renders X's and O's based on if the ally sinks a ship or misses
function renderAllyGuesses() {
    topGridDivEls.forEach((div) => {
        if (div.getAttribute('id') === 'missed') {
            let divPEl = div.querySelector('p');
            divPEl.textContent = 'O';
        } else if (div.getAttribute('id') === 'dead') {
            let divPEl = div.querySelector('p');
            divPEl.textContent = 'X';
        };
    });
};

//renders X's and O's based on if the enemy sinks a ship or misses
function renderEnemyGuesses() {
    bottomGridDivEls.forEach((div) => {
        if (div.getAttribute('id') === 'missed') {
            let divPEl = div.querySelector('p');
            divPEl.textContent = 'O';
        } else if (div.getAttribute('id') === 'dead') {
            let divPEl = div.querySelector('p');
            divPEl.textContent = 'X';
        };
    });
};

//renders ships on the graveyard grid when sunken by checking the ships' inGraveyard property
function renderSunkenShips() {
    for (let i = 0; i < 4; i++) {
        allyGraveShipEls[i].style.visibility = allyShipArr[i].inGraveyard;
        enemyGraveShipEls[i].style.visibility = enemyShipArr[i].inGraveyard;
    };
};

//renders a popup saying the game is over (customized based on who the winner is) asking the player if they'd like to play again or quit
function renderGameOver() {
    setTimeout(() => {
        if (winner) {
            blankSlateEl.classList.add('blankSlate');
            bodyEl.appendChild(blankSlateEl);

            popUpEl.classList.add('popUp');

            popUpH1El.classList.add('popUpH1');
            popUpPEl.classList.add('popUpP');

            fightAgainEl.classList.add('popBttn');
            surrenderEl.classList.add('popBttn');

            fightAgainEl.textContent = 'Fight again';
            surrenderEl.textContent = 'Surrender';

            if (champion === 'allies') {
                popUpH1El.textContent = 'Your allies won!';
                popUpPEl.textContent = 'This day will go down in history! Play again?';
            } else if (champion === 'enemies') {
                popUpH1El.textContent = 'You lost';
                popUpPEl.textContent = 'Your enemies have bested you! Play again?';
            };

            popUpEl.appendChild(popUpH1El);
            popUpEl.appendChild(popUpPEl);
            popUpEl.appendChild(fightAgainEl);
            popUpEl.appendChild(surrenderEl);

            blankSlateEl.appendChild(popUpEl);
        };
    }, timeOut);
};

//renders a reset board with all divs reset to their original greens and blues, all ships visible on the board, and all sunken ships hidden
function renderReset() {
    if (reset === true) {
        topGridDivEls.forEach((div) => {
            if (div.getAttribute('id') !== 'dont') {
                let divPEl = div.querySelector('p');
                if (divPEl) {
                    divPEl.textContent = ''
                };
            };
        });

        bottomGridDivEls.forEach((div) => {
            if (div.getAttribute('id') !== 'dont') {
                let divPEl = div.querySelector('p');
                if (divPEl) {
                    divPEl.textContent = '';
                };
            };
        });

        blankSlateEl.remove();
        fightAgainEl.remove();
        surrenderEl.remove();

        for (ship of allyShipArr) {
            ship.inGraveyard = 'hidden';
            ship.onBoard = 'visible';
        };

        for (ship of enemyShipArr) {
            ship.inGraveyard = 'hidden';
        };
    };
};

/* --------------------------------------- Other Functions --------------------------------------- */
//takes in an array of ships, iterates through each one, and assigns them coordinates.  It then tests them in a while loop, running them through testCoordinates() comparing one at a time, if it returns true, it runs reassignCoordinates.  Then it runs a final test and if all ships in the array pass it sets testing to false, ending the while loop
function generateCoordinates(objs) {
    testing = true;
    for (obj of objs) {
        generateShipsColumn(obj);
        generateShipsRow(obj);
    };

    while (testing) {
        for (let i = 0; i < objs.length; i++) {
            for (let j = i + 1; j < objs.length; j++) {
                if (testCoordinates(objs, i, j)) {
                    reassignCoordinates(objs, i, j);
                };
            };
        };

        if (finalTestCoordinates(objs)) {
            testing = false;
        };
    };

    for (obj of objs) {
        if (obj.alliance === 'enemy') {
            obj.cheatSheet = `Cheat sheet for ship ${obj.name}: Starts at [${obj.xCoordinates[0] - 1}, ${obj.yCoordinates[0] - 1}] and ends at [${obj.xCoordinates[1] - 1}, ${obj.yCoordinates[1] - 1}]`;
        };
    };
};

//generates random column positions within the boundries of the grids and runs storeXCoordinates to store them
function generateShipsColumn(obj) {
    let returnNum;
    if (obj.size === 3 && obj.orientation == 'b') {
        returnNum = Math.floor(Math.random() * 6);
    } else if (obj.size === 2 && obj.orientation == 'b') {
        returnNum = Math.floor(Math.random() * 7);
    } else {
        returnNum = Math.floor(Math.random() * 8);
    };

    if (returnNum <= 1) {
        return generateShipsColumn(obj);
    }
    storeXCoordinates(obj, returnNum);
    obj.columnPosition = returnNum;
};

//generates random row positions within the boundries of the grids and runs storeYCoordinates to store them
function generateShipsRow(obj) {
    let returnNum;
    if (obj.alliance === 'ally') {
        if (obj.size === 3 && obj.orientation == 'a') {
            returnNum = Math.floor(Math.random() * 5);
        } else if (obj.size === 2 && obj.orientation == 'a') {
            returnNum = Math.floor(Math.random() * 6);
        } else {
            returnNum = Math.floor(Math.random() * 7);
        };

        if (returnNum < 1) {
            return generateShipsRow(obj);
        }
    } else if (obj.alliance === 'enemy') {
        if (obj.size === 3 && obj.orientation == 'a') {
            returnNum = Math.floor(Math.random() * 6);
        } else if (obj.size === 2 && obj.orientation == 'a') {
            returnNum = Math.floor(Math.random() * 7);
        } else {
            returnNum = Math.floor(Math.random() * 8);
        };

        if (returnNum < 2) {
            return generateShipsRow(obj);
        };
    };
    storeYCoordinates(obj, returnNum);
    obj.rowPosition = returnNum;
};

//stores the x (aka column) coordinates a ship is at in the ship's xCoordinate property
function storeXCoordinates(obj, xStart) {
    if (obj.orientation == 'a') {
        obj.xCoordinates.push(xStart);
        obj.xCoordinates.push(xStart);
    } else if (obj.size === 3 && obj.orientation == 'b') {
        obj.xCoordinates.push(xStart);
        obj.xCoordinates.push(xStart + 2);
    } else if (obj.size === 2 && obj.orientation == 'b') {
        obj.xCoordinates.push(xStart);
        obj.xCoordinates.push(xStart + 1);
    };
};

//stores the y (aka row_) coordinates a ship is at in the ship's yCoordinate property
function storeYCoordinates(obj, yStart) {
    if (obj.orientation === 'b') {
        obj.yCoordinates.push(yStart);
        obj.yCoordinates.push(yStart);
    } else if (obj.size === 3 && obj.orientation == 'a') {
        obj.yCoordinates.push(yStart);
        obj.yCoordinates.push(yStart + 2);
    } else if (obj.size === 2 && obj.orientation == 'a') {
        obj.yCoordinates.push(yStart);
        obj.yCoordinates.push(yStart + 1);
    };
};

//clears a ship's x and y coordinates and randomly generates new ones
function reassignCoordinates(objs, num1, num2) {
    objs[num1].xCoordinates = [];
    objs[num1].yCoordinates = [];
    generateShipsColumn(objs[num1]);
    generateShipsRow(objs[num1]);
    objs[num2].xCoordinates = [];
    objs[num2].yCoordinates = [];
    generateShipsColumn(objs[num2]);
    generateShipsRow(objs[num2]);
}

//takes in an array, and compares the held ship's x and y coordinates to those of other ships to ensure none equal the other.  Returns true if there is overlap and false if not.  If the ship is three spaces long, it also checks the middle coordinates of those ships as well
function testCoordinates(objs, one, two) {
    let middleY;
    let middleX;

    if ((objs[two].yCoordinates[0] === objs[two].yCoordinates[0] || objs[one].yCoordinates[1] === objs[one].yCoordinates[1]) || (objs[two].xCoordinates[0] === objs[one].xCoordinates[0] || objs[two].xCoordinates[1] === objs[one].xCoordinates[1])) {
        return true;
    };

    if ((objs[one].size === 3 && objs[one].orientation === 'a') && (objs[two].size === 3 && objs[two].orientation === 'b')) {
        middleY = objs[one].yCoordinates[0] + 1;
        middleX = objs[two].xCoordinates[0] + 1;

        if ((middleY === objs[two].yCoordinates[0] || middleY === objs[two].yCoordinates[1]) || (middleX === objs[one].xCoordinates[0] || middleX === objs[two].xCoordinates[1])) {
            return true;
        };
    };

    if (objs[one].size === 3 && objs[one].orientation === 'a') {
        middleY = objs[one].yCoordinates[0] + 1;
        if ((middleY === objs[two].yCoordinates[0] || middleY === objs[two].yCoordinates[1]) || (objs[two].xCoordinates[0] === objs[one].xCoordinates[0] || objs[two].xCoordinates[1] === objs[one].xCoordinates[1])) {
            return true;
        };
    };

    if (objs[two].size === 3 && objs[two].orientation === 'a') {
        middleY = objs[two].yCoordinates[0] + 1;
        if ((middleY === objs[one].yCoordinates[0] || middleY === objs[one].yCoordinates[1]) || (objs[two].xCoordinates[0] === objs[one].xCoordinates[0] || objs[two].xCoordinates[1] === objs[one].xCoordinates[1])) {
            return true;
        };
    };

    if (objs[one].size === 3 && objs[one].orientation === 'b') {
        middleX = objs[one].xCoordinates[0] + 1;
        if ((objs[two].yCoordinates[0] === objs[one].yCoordinates[0] || objs[two].yCoordinates[1] === objs[one].yCoordinates[1]) || (middleX === objs[two].xCoordinates[0] || middleX === objs[two].xCoordinates[1])) {
            return true;
        };
    };

    if (objs[two].size === 3 && objs[two].orientation === 'b') {
        middleX = objs[two].xCoordinates[0] + 1;
        if ((objs[two].yCoordinates[0] === objs[one].yCoordinates[0] || objs[two].yCoordinates[1] === objs[one].yCoordinates[1]) || (middleX === objs[one].xCoordinates[0] || middleX === objs[one].xCoordinates[1])) {
            return true;
        };
    };

    testing = false;
    return false;
};

//takes in an array of ships and does one final check that there is no overlap, returning flase if so and true if not
function finalTestCoordinates(objs) {
    let middleY;
    let middleX;

    middleY = objs[0].yCoordinates[0] + 1;
    middleX = objs[1].xCoordinates[0] + 1;

    for (let i = 0; i < objs.length; i++) {
        for (let j = i + 1; j < objs.length; j++) {
            if ((objs[i].yCoordinates[0] === objs[j].yCoordinates[0] || objs[i].yCoordinates[1] === objs[j].yCoordinates[1]) || (objs[i].xCoordinates[0] === objs[j].xCoordinates[0] || objs[i].xCoordinates[1] === objs[j].xCoordinates[1])) {
                return false;
            };
        };
    };

    if ((middleY === objs[1].yCoordinates[0] || middleY === objs[1].yCoordinates[1]) || (middleX === objs[0].xCoordinates[0] || middleX === objs[0].xCoordinates[1])) {
        return false;
    };

    for (let i = 1; i < objs.length; i++) {
        if ((middleY === objs[i].yCoordinates[0] || middleY === objs[i].yCoordinates[1]) || (objs[0].xCoordinates[0] === objs[i].xCoordinates[0] || objs[0].xCoordinates[1] === objs[i].xCoordinates[1])) {
            return false;
        };
    };

    for (let i = 0; i < objs.length; i++) {
        if (i === 1) {
            continue;
        } else {
            if ((objs[1].yCoordinates[0] === objs[0].yCoordinates[0] || objs[1].yCoordinates[1] === objs[0].yCoordinates[1]) || (middleX === objs[i].xCoordinates[0] || middleX === objs[i].xCoordinates[1])) {
                return false;
            };
        };
    };

    return true;
};


//if wait is false, it runs a conditional that sets wait to be true (which keeps the user from guessing again until the computer guesses), checks to make sure a valid square was clicked on the grid, and if so, checks the div's ID to see if it was a hit or miss.  It then runs checkShips() on the enemy ships, runs determineWinner(), and runs enemyGuesses in a setTimeout after timeOut amount of miliseconds have passed.  If the user did not click on a valid sqaure in the top grid, it makes badGuess true, renders, then, after timeOut amount of miliseconds, it resets badBuess to false and wait to false
function handleClick(evt) {
    currentEvt = evt;
    if (!wait) {
        wait = true;
        if (evt.target.getAttribute('id') !== 'hit' && evt.target.getAttribute('id') !== 'missed' && evt.target.getAttribute('id') !== 'dead' && (evt.target.getAttribute('class') !== 'dont' && evt.target.parentElement.getAttribute('id') !== 'dont') && evt.target.tagName !== 'P') {

            if (!evt.target.getAttribute('class').includes('one') && !evt.target.getAttribute('class').includes('a')) {
                if (evt.target.getAttribute('id') === 'taken') {
                    evt.target.setAttribute('id', 'hit');
                    hitAudio.play()
                } else if (evt.target.getAttribute('id') === null) {
                    evt.target.setAttribute('id', 'missed');
                    missAudio.play();
                };
            };
            checkShips(enemyShipArr);

            determineWinner();
            render();

            if (!winner) {
                setTimeout(enemyGuesses, timeOut);
            };

        } else {
            if (evt.target.getAttribute('id') !== 'dont' && evt.target.parentElement.getAttribute('id') !== 'dont') {
                badGuess = true;
                render();
                setTimeout(() => {
                    badGuess = false;
                    wait = false;
                }, timeOut);
            };
        };
    };
};

//it takes in an array of ships, and checks to see if all the divs in a ship have been hit.  if so, it is reassigned to dead, set to visible on the graveyard, and, if an ally ship, set to hidden on the board
function checkShips(objs) {
    for (obj of objs) {
        let sunken = obj.squaresTaken.every((div) => {
            return div.getAttribute('id') === 'hit';
        });

        if (sunken) {
            obj.squaresTaken.forEach((div) => {
                div.setAttribute('id', 'dead');
            });

            obj.inGraveyard = 'visible';
            if (obj.alliance === 'ally') {
                obj.onBoard = 'hidden';
                obj.beenHit = false;;
            };
        };
    };
};

//runs generateEnemyGuess(), checks ally ships with checkShips(), determines if there is a winner with determineWinner(), renders(), and sets wait to false if a winner has not been declared
function enemyGuesses() {
    generateEnemyGuess();
    checkShips(allyShipArr);
    determineWinner();
    render();
    if (winner) {
        wait = true;
    } else if (!winner) {
        wait = false;
    };
};

//sets xPositionGuess and yPositionGuess to generateEnemyColumnGuess()'s return value and generateEnemyRowGuess()'s respectively.  Then it checks if any ships had been hit.  If so, it sets guessedSquare to one of the hit ships' divs.  Otherwise it then captures the guessedSquarew with querySelector and log's its position in a string.  Regardless, it then checks if the div is null or 'taken', and if it matches those criterea it sets the div to hit or missed (depending if it was taken or not).  It runs it through the entire board, making sure the board isnt filled by looking for empty (null) spaces or not sunk ships (taken spaces).  If it isnt filled, allDone is set to false.  If allDone is false, meaning the board isnt filled but the guess was hit or missed, the function runs itself, generateEnemyGuess, to try again.
function generateEnemyGuess() {

    let xPositionGuess = generateEnemyColumnGuess();
    let yPositionGuess = generateEnemyRowGuess();
    let gottem = false;
    let guessedSquare;
    let allDone;

    for (ship of allyShipArr) {
        if (ship.beenHit === true) {
            gottem = true;
            let randomDiv = Math.floor(Math.random() * ship.size);
            guessedSquare = ship.squaresTaken[randomDiv];
        };
    };

    if (!gottem) {
        guessedSquare = document.querySelector(`.bottom-grid > ${bottomRows[xPositionGuess - 2]}${columns[yPositionGuess - 1]}`);
    };

    if ((guessedSquare.getAttribute('id') === null || guessedSquare.getAttribute('id') === 'taken')) {
        if (guessedSquare.getAttribute('id') === 'taken') {
            guessedSquare.setAttribute('id', 'hit');
            hitAudio.play();
            for (ship of allyShipArr) {
                if (ship.squaresTaken.includes(guessedSquare)) {
                    ship.beenHit = true;
                };
            };

        } else {
            guessedSquare.setAttribute('id', 'missed');
            missAudio.play();
        }
    } else {

        for (div of bottomGridDivEls) {
            if (div.getAttribute('id') !== null || div.getAttribute('id') !== 'taken') {
                allDone = false;
            };
        };
    };

    if (allDone === false) {
        generateEnemyGuess();
    };
};


//returns a random column number within board bounds
function generateEnemyColumnGuess() {
    let returnNum = Math.floor(Math.random() * 8);

    if (returnNum < 2) {
        return generateEnemyColumnGuess();
    } else {
        return returnNum;
    };
};

//returns a random row number within board bounds
function generateEnemyRowGuess() {
    let returnNum = Math.floor(Math.random() * 7);

    if (returnNum < 1) {
        return generateEnemyRowGuess();
    } else {
        return returnNum;
    };
};

//determiine winner waits for all ships to be visible in either graveyard and if so, sets the winner to be true and champion to either 'enemies' or 'allies'
function determineWinner() {

    if (allyShipArr.every((obj) => {
        return obj.inGraveyard === 'visible';
    })) {
        winner = true;;
        champion = 'enemies';
    } else if (enemyShipArr.every((obj) => {
        return obj.inGraveyard === 'visible';
    })) {
        winner = true;
        champion = 'allies';
    };
};

//resetter sents the variable reset to be true, resets testing, wait, winner, champion, and badGuess to their init states.  It then removes all IDs from the grid divs and runs resetMe on the ally and enemy ships.  Then it renders, sets reset variable to false, and initializes.
function resetter() {
    reset = true;

    testing = false;
    wait = false;
    winner = false;
    champion = '';
    badGuess = false;

    topGridDivEls.forEach((div) => {
        if (div.getAttribute('id') !== 'dont') {
            div.removeAttribute('id');
        };
    });

    bottomGridDivEls.forEach((div) => {
        if (div.getAttribute('id') !== 'dont') {
            div.removeAttribute('id');
        };
    });

    for (ship of allyShipArr) {
        ship.resetMe();
    };

    for (ship of enemyShipArr) {
        ship.resetMe();
    };

    render();

    reset = false;

    init();
};

//lists the position of all of the enemy ships in the console
function cheater() {
    for (ship of enemyShipArr) {
        console.log(ship.cheatSheet);
    };
};

//turns all enemy ships to hit, checks all ships, determining a winner, rendering, and effectively ending the game
function tidalWave() {
    for (ship of enemyShipArr) {
        for (square of ship.squaresTaken) {
            square.setAttribute('id', 'hit');
        };
    };

    checkShips(allyShipArr);
    checkShips(enemyShipArr);
    determineWinner();
    render();
};

//turns all ally ships to hit, checks all ships, determining a winner, rendering, and effectively ending the game
function sabotage() {
    for (ship of allyShipArr) {
        for (square of ship.squaresTaken) {
            square.setAttribute('id', 'hit');
        };
    };

    checkShips(allyShipArr);
    checkShips(enemyShipArr);
    determineWinner();
    render();
};

/* ####################################### Run the Game ####################################### */
init();