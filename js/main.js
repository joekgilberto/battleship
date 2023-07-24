/* ####################################### Variables ####################################### */
/* --------------------------------------- DOM Elements --------------------------------------- */
//body
bodyEl = document.querySelector('body')
// - .top-grid
topGridEl = document.querySelector('.top-grid')
// - .bottom-grid
bottomGridEl = document.querySelector('.bottom-grid')
// - .top-grid > divs
topGridDivEls = document.querySelectorAll('.top-grid > div')
// - .bottom-grid > divs
bottomGridDivEls = document.querySelectorAll('.bottom-grid > div')
// - .ally-grave > .ship
allyGraveShipEls = document.querySelectorAll('.ally-grave > .ship')
// - .enemy-grave > .ship
enemyGraveShipEls = document.querySelectorAll('.enemy-grave > .ship')


/* --------------------------------------- Classes --------------------------------------- */
class Ship {
    constructor(name, size, orientation) {
        this.name = name;
        this.divEl = document.createElement('div');
        this.size = size;
        this.orientation = orientation;
        this.columnPosition = 0;
        this.rowPosition = 0;
        this.xCoordinates = [];
        this.yCoordinates = [];
        this.inGraveyard = 'hidden';
    }
}
//a class used to make objects for enemy ships, includes name, column position, row position, and if it should be visible on the graveyard

class AllyShip extends Ship {
    constructor(name, size, orientation, columnPosition, rowPosition, xCoordinates, yCoordinates, inGraveyard) {
        super(name, size, orientation, columnPosition, rowPosition, xCoordinates, yCoordinates, inGraveyard);
        this.onBoard = 'visible';
    }

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

        //TODO customize column and row template sizes based on this.name which indicates vertical or horizontal ships
        if (this.name === 'allyShipThreeA') {
            this.divEl.style.gridTemplateColumns = 'repeat(3, 1fr)';
            this.divEl.style.gridTemplateRows = 'repeat(9, 1fr)';
            this.divEl.style.gridColumn = `${this.columnPosition} / span 1`;
            this.divEl.style.gridRow = `${this.rowPosition} / span 3`;
            buildPipe(pipeOneEl, 2, 2, this);
            buildPipe(pipeTwoEl, 2, 5, this);
            buildPipe(pipeThreeEl, 2, 8, this);
        } else if (this.name === 'allyShipTwoA') {
            this.divEl.style.gridTemplateColumns = 'repeat(3, 1fr)';
            this.divEl.style.gridTemplateRows = 'repeat(6, 1fr)';
            this.divEl.style.gridColumn = `${this.columnPosition} / span 1`;
            this.divEl.style.gridRow = `${this.rowPosition} / span 2`
            buildPipe(pipeOneEl, 2, 2, this);
            buildPipe(pipeTwoEl, 2, 5, this);
        } else if (this.name === 'allyShipThreeB') {
            this.divEl.style.gridTemplateColumns = 'repeat(9, 1fr)';
            this.divEl.style.gridTemplateRows = 'repeat(3, 1fr)';
            this.divEl.style.gridColumn = `${this.columnPosition} / span 3`;
            this.divEl.style.gridRow = `${this.rowPosition} / span 1`;
            buildPipe(pipeOneEl, 2, 2, this);
            buildPipe(pipeTwoEl, 5, 2, this);
            buildPipe(pipeThreeEl, 8, 2, this);
        } else if (this.name === 'allyShipTwoB') {
            this.divEl.style.gridTemplateColumns = 'repeat(6, 1fr)';
            this.divEl.style.gridTemplateRows = 'repeat(3, 1fr)';
            this.divEl.style.gridColumn = `${this.columnPosition} / span 2`;
            this.divEl.style.gridRow = `${this.rowPosition} / span 1`;
            buildPipe(pipeOneEl, 2, 2, this);
            buildPipe(pipeTwoEl, 5, 2, this);
        }

        this.divEl.style.width = 'auto';
        this.divEl.style.height = 'auto';
        bottomGridEl.appendChild(this.divEl);

    }
} //a class extending Ship used to make objects for enemy ships - adds a onBoard property to say when a ship should or should not be visible on the board



/* --------------------------------------- Sate delcarations --------------------------------------- */
let testing;
let game; //a boolean variable that tells if the game is running (true) or stopped (false)
let winner; //a boolean variable that tells if someone has won the game
let champion; //an empty string that will hold the name of who wins
let allyPositions = {}; //an object holding the ally ship positions
let enemyPositions = {}; //an object holding the enemy ship positions
let allyWatersHitsMisses = {}; //an object holding the where in ally waters there have been hits or misses
let enemyWatersHitsMisses = {}; //an object holding the where in enemy waters there have been hits or misses
let badGuess; //a boolean variable marked true if the player guessed a square they had already guessed

let allyShipThreeA;
let allyShipThreeB;
let allyShipTwoA;
let allyShipTwoB;

let enemyShipThreeA;
let enemyShipThreeB;
let enemyShipTwoA;
let enemyShipTwoB;

/* --------------------------------------- Constants --------------------------------------- */
// - timeOut //a variable set to 3000ms
let timeOut = 3000;

const blankSlateEl = document.createElement('div')
const popUpEl = document.createElement('div')
const popUpH1El = document.createElement('h1')
const popUpPEl = document.createElement('p')
const retryEl = document.createElement('button')
const exitEl = document.createElement('button')

/* ####################################### Functions ####################################### */
/* --------------------------------------- Init --------------------------------------- */
// - sets game to true
// - sets winner to be false
// - Runs:
//     - generateAllyShips()
//     - generateEnemyShips()
//     - render()
//     - runGame()
function init() {
    testing = false;
    game = true;
    winner = false;

    // generateAllyShips();
    // generateEnemtShips();

    allyShipThreeA = new AllyShip('allyShipThreeA', 'three', 'a')
    allyShipThreeB = new AllyShip('allyShipThreeB', 'three', 'b')
    allyShipTwoA = new AllyShip('allyShipTwoA', 'two', 'a')
    allyShipTwoB = new AllyShip('allyShipTwoB', 'two', 'b')

    generateAllyCoordinates(allyShipThreeA, allyShipThreeB, allyShipTwoA, allyShipTwoB)

    enemyShipThreeA = new Ship('enemyShipThreeA', 'three', 'a');
    enemyShipThreeB = new Ship('enemyShipThreeB', 'three', 'b');
    enemyShipTwoA = new Ship('enemyShipTwoA', 'two', 'a');
    enemyShipTwoB = new Ship('enemyShipTwoB', 'two');

    render();

    //runGame();
}

/* --------------------------------------- Render --------------------------------------- */
// - render() //renders all

function render() {
    renderAllyShips();
    renderBadGuess();
    renderAllyGuesses();
    renderEnemyGuesses();
    renderSunkenShips();
    renderGameOver();
    renderResetBoard(); //TODO: figure out if you need this one or if init can be used
}

// - renderAllyShips() //renders ally ships starting position on the board
function renderAllyShips() {
    allyShipThreeA.buildShip()
    allyShipThreeB.buildShip()
    allyShipTwoA.buildShip()
    allyShipTwoB.buildShip()
}

// - renderBadGuess() //renders a gray top grid if the user clicks on a square they had already guessed, and then using a setTimeout, after 1000ms, it reverts back to green and sets badGuess false.
function renderBadGuess() {
    //TODO
}

// - renderAllyGuesses() //renders where the user hits a ship on the enemy's board based off of information stored in storeAllyHit() and renders where the user misses a ship on the enemy's board based off of information stored in storeAllyMiss()
function renderAllyGuesses() {
    //TODO
}

// - renderEnemyGuesses() //renders where the user hits a ship on the ally's board based off of information stored in storeEnemyHit() and renders where the user misses a ship on the ally's board based off of information stored in storeEnemyMiss()
function renderEnemyGuesses() {
    //TODO
}

// - renderSunkenShips() //renders ships on the graveyard grid when sunken
function renderSunkenShips() {
    allyGraveShipEls[0].style.visibility = allyShipThreeA.inGraveyard;
    allyGraveShipEls[1].style.visibility = allyShipTwoA.inGraveyard;
    allyGraveShipEls[2].style.visibility = allyShipTwoB.inGraveyard;
    allyGraveShipEls[3].style.visibility = allyShipThreeB.inGraveyard;

    enemyGraveShipEls[0].style.visibility = enemyShipThreeA.inGraveyard;
    enemyGraveShipEls[1].style.visibility = enemyShipTwoA.inGraveyard;
    enemyGraveShipEls[2].style.visibility = enemyShipTwoB.inGraveyard;
    enemyGraveShipEls[3].style.visibility = enemyShipThreeB.inGraveyard;
}

// - renderGameOver() //renders a popup saying the game is over (customized based on who the winner is) asking the player if they'd like to play again or quit
function renderGameOver() {
    //TODO
    setTimeout(() => {
        if (winner === true) {
            blankSlateEl.classList.add('blankSlate')
            bodyEl.appendChild(blankSlateEl);

            popUpEl.classList.add('popUp')

            popUpH1El.classList.add('popUpH1')
            popUpPEl.classList.add('popUpP')

            retryEl.classList.add('endBttn')
            exitEl.classList.add('endBttn')

            retryEl.textContent = 'FIGHT AGAIN';
            exitEl.textContent = 'SURRENDER';

            if (champion === 'allies') {
                popUpH1El.textContent = 'Your allies won!';
                popUpPEl.textContent = 'This day will go down in history! Play again?';
            } else if (winner === 'enemies') {
                popUpH1El.textContent = 'You lost';
                popUpPEl.textContent = 'Your enemies have bested you! Play again?';
            }

            popUpEl.appendChild(popUpH1El);
            popUpEl.appendChild(popUpPEl);
            popUpEl.appendChild(retryEl);
            popUpEl.appendChild(exitEl);

            blankSlateEl.appendChild(popUpEl);
        }
    }, 1000)
}

// - renderResetBoard() //renders a reset board with new ally ship positions and an empty graveyard //TODO: figure out if you need this one
function renderResetBoard() {
    //TODO
}

/* --------------------------------------- Other Functions --------------------------------------- */

function generateAllyCoordinates(...objs) {
    testing = true

    for (obj of objs) {
        generateAllyShipsColumn(obj)
        generateAllyShipsRow(obj)
    }

    while (testing) {
        if (testCoordinates(objs, 0, 1)) {
            reassignCoordinates(objs, 0, 1)
            testing = true;
        }

        if (testCoordinates(objs, 0, 2)) {
            reassignCoordinates(objs, 0, 2)
            testing = true;
        }

        if (testCoordinates(objs, 0, 3)) {
            reassignCoordinates(objs, 0, 3)
            testing = true;
        }

        if (testCoordinates(objs, 1, 2)) {
            reassignCoordinates(objs, 1, 2)
            testing = true;
        }

        if (testCoordinates(objs, 1, 3)) {
            reassignCoordinates(objs, 1, 3)
            testing = true;
        }

        if (testCoordinates(objs, 2, 3)) {
            reassignCoordinates(objs, 2, 3)
            testing = true;
        }

        if (!finalTestCoordinates(objs)) {
            testing = false;
        }
    };
};

// - generateAllyShips() //generates random positions that will be used to render the ally ships and stores them in an object upon initialization
function generateAllyShipsColumn(obj) {
    let returnNum;
    if (obj.size === 'three' && obj.orientation == 'b') {
        returnNum = Math.floor(Math.random() * 6)
    } else if (obj.size === 'two' && obj.orientation == 'b') {
        returnNum = Math.floor(Math.random() * 7)
    } else {
        returnNum = Math.floor(Math.random() * 8)
    }

    if (returnNum <= 1) {
        return generateAllyShipsColumn(obj);
    }
    storeXCoordinates(obj, returnNum)
    obj.columnPosition = returnNum;
};

function generateAllyShipsRow(obj) {
    let returnNum;
    if (obj.size === 'three' && obj.orientation == 'a') {
        returnNum = Math.floor(Math.random() * 5)
    } else if (obj.size === 'two' && obj.orientation == 'a') {
        returnNum = Math.floor(Math.random() * 6)
    } else {
        returnNum = Math.floor(Math.random() * 7)
    }

    if (returnNum < 1) {
        return generateAllyShipsRow(obj);
    }
    storeYCoordinates(obj, returnNum)
    obj.rowPosition = returnNum;
};

//- storeCoordinates() //stores coordinates a ship is at
function storeXCoordinates(obj, xStart) {
    if (obj.orientation == 'a') {
        obj.xCoordinates.push(xStart)
        obj.xCoordinates.push(xStart)
    } else if (obj.size === 'three' && obj.orientation == 'b') {
        obj.xCoordinates.push(xStart)
        obj.xCoordinates.push(xStart + 2)
    } else if (obj.size === 'two' && obj.orientation == 'b') {
        obj.xCoordinates.push(xStart)
        obj.xCoordinates.push(xStart + 1)
    }
}

//TODO Add enemy ships to storeY and storeXCoordinates
function storeYCoordinates(obj, yStart) {
    if (obj.orientation === 'b') {
        obj.yCoordinates.push(yStart);
        obj.yCoordinates.push(yStart);
    } else if (obj.size === 'three' && obj.orientation == 'a') {
        obj.yCoordinates.push(yStart);
        obj.yCoordinates.push(yStart + 2);
    } else if (obj.size === 'two' && obj.orientation == 'a') {
        obj.yCoordinates.push(yStart);
        obj.yCoordinates.push(yStart + 1);
    }
}

function reassignCoordinates(objs, num1, num2) {
    objs[num1].xCoordinates = [];
    objs[num1].yCoordinates = [];
    generateAllyShipsColumn(objs[num1]);
    generateAllyShipsRow(objs[num1]);
    objs[num2].xCoordinates = [];
    objs[num2].yCoordinates = [];
    generateAllyShipsColumn(objs[num2]);
    generateAllyShipsRow(objs[num2]);
}

function testCoordinates(objs, one, two) {
    let middleY;
    let middleX;

    if ((objs[two].yCoordinates[0] === objs[two].yCoordinates[0] || objs[one].yCoordinates[1] === objs[one].yCoordinates[1]) || (objs[two].xCoordinates[0] === objs[one].xCoordinates[0] || objs[two].xCoordinates[1] === objs[one].xCoordinates[1])) {
        return true
    }

    if ((objs[one].size === "three" && objs[one].orientation === "a") && (objs[two].size === "three" && objs[two].orientation === "b")) {
        middleY = objs[one].yCoordinates[0] + 1;
        middleX = objs[two].xCoordinates[0] + 1;

        if ((middleY === objs[two].yCoordinates[0] || middleY === objs[two].yCoordinates[1]) || (middleX === objs[one].xCoordinates[0] || middleX === objs[two].xCoordinates[1])) {
            return true
        }
    }

    if (objs[one].size === "three" && objs[one].orientation === "a") {
        middleY = objs[one].yCoordinates[0] + 1;
        if ((middleY === objs[two].yCoordinates[0] || middleY === objs[two].yCoordinates[1]) || (objs[two].xCoordinates[0] === objs[one].xCoordinates[0] || objs[two].xCoordinates[1] === objs[one].xCoordinates[1])) {
            return true
        }
    }

    if (objs[two].size === "three" && objs[two].orientation === "a") {
        middleY = objs[two].yCoordinates[0] + 1;
        if ((middleY === objs[one].yCoordinates[0] || middleY === objs[one].yCoordinates[1]) || (objs[two].xCoordinates[0] === objs[one].xCoordinates[0] || objs[two].xCoordinates[1] === objs[one].xCoordinates[1])) {
            return true
        }
    }

    if (objs[one].size === "three" && objs[one].orientation === "b") {
        middleX = objs[one].xCoordinates[0] + 1;
        if ((objs[two].yCoordinates[0] === objs[one].yCoordinates[0] || objs[two].yCoordinates[1] === objs[one].yCoordinates[1]) || (middleX === objs[two].xCoordinates[0] || middleX === objs[two].xCoordinates[1])) {
            return true
        }
    }

    if (objs[two].size === "three" && objs[two].orientation === "b") {
        middleX = objs[two].xCoordinates[0] + 1;
        if ((objs[two].yCoordinates[0] === objs[one].yCoordinates[0] || objs[two].yCoordinates[1] === objs[one].yCoordinates[1]) || (middleX === objs[one].xCoordinates[0] || middleX === objs[one].xCoordinates[1])) {
            return true
        }
    }

    testing = false
    return false
}

function finalTestCoordinates(objs) {
    let middleY;
    let middleX;

    middleY = objs[0].yCoordinates[0] + 1;
    middleX = objs[1].xCoordinates[0] + 1;

    for (let i = 0; i < objs.length; i++) {
        for (let j = i + 1; j < objs.length; j++) {
            if ((objs[i].yCoordinates[0] === objs[j].yCoordinates[0] || objs[i].yCoordinates[1] === objs[j].yCoordinates[1]) || (objs[i].xCoordinates[0] === objs[j].xCoordinates[0] || objs[i].xCoordinates[1] === objs[j].xCoordinates[1])) {
                return true
            }
        }
    }

    if ((middleY === objs[1].yCoordinates[0] || middleY === objs[1].yCoordinates[1]) || (middleX === objs[0].xCoordinates[0] || middleX === objs[0].xCoordinates[1])) {
        return true
    }

    for (let i = 1; i < objs.length; i++) {
        if ((middleY === objs[i].yCoordinates[0] || middleY === objs[i].yCoordinates[1]) || (objs[0].xCoordinates[0] === objs[i].xCoordinates[0] || objs[0].xCoordinates[1] === objs[i].xCoordinates[1])) {
            return true
        }
    }

    for (let i = 0; i < objs.length; i++) {
        if (i === 1) {
            continue
        } else {
            if ((objs[1].yCoordinates[0] === objs[0].yCoordinates[0] || objs[1].yCoordinates[1] === objs[0].yCoordinates[1]) || (middleX === objs[i].xCoordinates[0] || middleX === objs[i].xCoordinates[1])) {
                return true
            }
        }
    }

    return false
}

// - generateEnemyShips() //generates random positions to stored for the enemy ships upon initialization
// - handleClick() //if badGuess is true it runs checkIfOpen() and if that is true it runs checkIfShip, and then runs render() no matter what
// - checkIfOpen() //checks if a square has already been guessed.  returns true if not, returns false if so and assigns badGuess true.
// - checkIfEnemyShip() //checks if a ship is occupying that square and if so it runs storeAllyHit(), else it runs storeAllyMiss()
// - storeAllyHit() //stores if a user's guess was a hit
// - storAllyMiss() //stores if a user's guess was a miss
// - enemyThinking() //run setTimeout (length based on timeOut variable) invoking enemyGuess()
// - enemyGuess() //the computer randomly picks a square in ally waters that has not been picked yet (by running checkIfOpen), then runs checkIfAllyShip
// - checkIfAllyShip() //checks if a ship is occupying that square and if so it runs storeEnemyHit(), else it runs storeEnemyMiss()
// - storeEnemyHit() //stores if computer's guess was a hit
// - storEnemyMiss() //stores if computer's guess was a miss
// - runGame() //runs a while loop while game is true, with three event listeners - one for the top grid that invokes handleClick, one for the reset button that invokes init(), and one for quitting that invokes close().  It also runs determineWinner().
// - determineWinner() //determiine winner waits for all ships to be in either graveyard and if so, sets the winner to be true and champion to either 'enemies' or 'allies'

/* ####################################### Run the Game ####################################### */
// - init()
init()

//TODO - for enemy guesses, have the a random x and y number generated within the bound of the board, and then have that number coorelate with an array with the corresponding class name  ex: Math.floor(Math.random()) = 0 for the column, it would correspond with '.b' in the array since that is the first column
    //TODO - can the above be reverse engineered to find divs?  .findIndexOf(".b") to find b in [a,b,c,d] etc
        // or can we use evt or evt.target to edit these squares?

//TODO - make occupied enemy divs have an unselectable space in them?
// https://www.w3schools.com/howto/howto_css_disable_text_selection.asp#:~:text=You%20can%20use%20the%20user,be%20used%20to%20prevent%20this.
// or evalue their grid-areas' against the ships?