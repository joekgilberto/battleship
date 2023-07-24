/* ####################################### Variables ####################################### */
/* --------------------------------------- Constants --------------------------------------- */
// - timeOut //a variable set to 3000ms
let timeOut = 2000;
let columns = ['.b', '.c', '.d', '.e', '.f', '.g']
let upperRows = ['.two', '.three', '.four', '.five', '.six', '.seven']
let bottomRows = ['.one', '.two', '.three', '.four', '.five', '.six']

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

const blankSlateEl = document.createElement('div')
const popUpEl = document.createElement('div')
const popUpH1El = document.createElement('h1')
const popUpPEl = document.createElement('p')
const retryEl = document.createElement('button')
const exitEl = document.createElement('button')


/* --------------------------------------- Classes --------------------------------------- */
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
        this.squaresTaken = []
        this.inGraveyard = 'hidden';
        this.cheatSheet = 'No cheating!'
    }

    recordSquaresTaken() {
        let squareOne;
        let squareTwo;
        let squareThree;

        if (this.alliance === 'ally') {
            squareOne = document.querySelector(`.bottom-grid > ${bottomRows[this.rowPosition - 1]}${columns[this.columnPosition - 2]}`);
            squareOne.setAttribute('id', 'taken')
            this.squaresTaken.push(squareOne)
            if (this.size === 'two') {
                if (this.orientation === 'a') {
                    squareTwo = document.querySelector(`.bottom-grid > ${bottomRows[this.rowPosition]}${columns[this.columnPosition - 2]}`);
                    squareTwo.setAttribute('id', 'taken')
                    this.squaresTaken.push(squareTwo)
                } else if (this.orientation === 'b') {
                    squareTwo = document.querySelector(`.bottom-grid > ${bottomRows[this.rowPosition - 1]}${columns[this.columnPosition - 1]}`);
                    squareTwo.setAttribute('id', 'taken')
                    this.squaresTaken.push(squareTwo)
                }
            } else if (this.size === 'three') {
                if (this.orientation === 'a') {
                    squareTwo = document.querySelector(`.bottom-grid > ${bottomRows[this.rowPosition]}${columns[this.columnPosition - 2]}`);
                    squareTwo.setAttribute('id', 'taken')
                    this.squaresTaken.push(squareTwo)

                    squareThree = document.querySelector(`.bottom-grid > ${bottomRows[this.rowPosition + 1]}${columns[this.columnPosition - 2]}`);
                    squareThree.setAttribute('id', 'taken')
                    this.squaresTaken.push(squareThree)
                } else if (this.orientation === 'b') {
                    squareTwo = document.querySelector(`.bottom-grid > ${bottomRows[this.rowPosition - 1]}${columns[this.columnPosition - 1]}`);
                    squareTwo.setAttribute('id', 'taken')
                    this.squaresTaken.push(squareTwo)

                    squareThree = document.querySelector(`.bottom-grid > ${bottomRows[this.rowPosition - 1]}${columns[this.columnPosition]}`);
                    squareThree.setAttribute('id', 'taken')
                    this.squaresTaken.push(squareThree)
                }
            }

        } else if (this.alliance === 'enemy') {
            //TODO make this works for the enemy ships
            squareOne = document.querySelector(`.top-grid > ${upperRows[this.rowPosition - 2]}${columns[this.columnPosition - 2]}`);
            squareOne.setAttribute('id', 'taken')
            this.squaresTaken.push(squareOne)
            if (this.size === 'two') {
                if (this.orientation === 'a') {
                    squareTwo = document.querySelector(`.top-grid > ${upperRows[this.rowPosition - 1]}${columns[this.columnPosition - 2]}`);
                    squareTwo.setAttribute('id', 'taken')
                    this.squaresTaken.push(squareTwo)
                } else if (this.orientation === 'b') {
                    squareTwo = document.querySelector(`.top-grid > ${upperRows[this.rowPosition - 2]}${columns[this.columnPosition - 1]}`);
                    squareTwo.setAttribute('id', 'taken')
                    this.squaresTaken.push(squareTwo)
                }
            } else if (this.size === 'three') {
                if (this.orientation === 'a') {
                    squareTwo = document.querySelector(`.top-grid > ${upperRows[this.rowPosition - 1]}${columns[this.columnPosition - 2]}`);
                    squareTwo.setAttribute('id', 'taken')
                    this.squaresTaken.push(squareTwo)

                    squareThree = document.querySelector(`.top-grid > ${upperRows[this.rowPosition]}${columns[this.columnPosition - 2]}`);
                    squareThree.setAttribute('id', 'taken')
                    this.squaresTaken.push(squareThree)
                } else if (this.orientation === 'b') {
                    squareTwo = document.querySelector(`.top-grid > ${upperRows[this.rowPosition - 2]}${columns[this.columnPosition - 1]}`);
                    squareTwo.setAttribute('id', 'taken')
                    this.squaresTaken.push(squareTwo)

                    squareThree = document.querySelector(`.top-grid > ${upperRows[this.rowPosition - 2]}${columns[this.columnPosition]}`);
                    squareThree.setAttribute('id', 'taken')
                    this.squaresTaken.push(squareThree)
                }
            }
        }
    }
}
//a class used to make objects for enemy ships, includes name, column position, row position, and if it should be visible on the graveyard

class AllyShip extends Ship {
    constructor(name, alliance, size, orientation, columnPosition, rowPosition, xCoordinates, yCoordinates, squaresTaken, inGraveyard) {
        super(name, alliance, size, orientation, columnPosition, rowPosition, xCoordinates, yCoordinates, squaresTaken, inGraveyard);
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
        if (this.size === 'three' && this.orientation === 'a') {
            this.divEl.style.gridTemplateColumns = 'repeat(3, 1fr)';
            this.divEl.style.gridTemplateRows = 'repeat(9, 1fr)';
            this.divEl.style.gridColumn = `${this.columnPosition} / span 1`;
            this.divEl.style.gridRow = `${this.rowPosition} / span 3`;
            buildPipe(pipeOneEl, 2, 2, this);
            buildPipe(pipeTwoEl, 2, 5, this);
            buildPipe(pipeThreeEl, 2, 8, this);
        } else if (this.size === 'two' && this.orientation === 'a') {
            this.divEl.style.gridTemplateColumns = 'repeat(3, 1fr)';
            this.divEl.style.gridTemplateRows = 'repeat(6, 1fr)';
            this.divEl.style.gridColumn = `${this.columnPosition} / span 1`;
            this.divEl.style.gridRow = `${this.rowPosition} / span 2`
            buildPipe(pipeOneEl, 2, 2, this);
            buildPipe(pipeTwoEl, 2, 5, this);
        } else if (this.size === 'three' && this.orientation === 'b') {
            this.divEl.style.gridTemplateColumns = 'repeat(9, 1fr)';
            this.divEl.style.gridTemplateRows = 'repeat(3, 1fr)';
            this.divEl.style.gridColumn = `${this.columnPosition} / span 3`;
            this.divEl.style.gridRow = `${this.rowPosition} / span 1`;
            buildPipe(pipeOneEl, 2, 2, this);
            buildPipe(pipeTwoEl, 5, 2, this);
            buildPipe(pipeThreeEl, 8, 2, this);
        } else if (this.size === 'two' && this.orientation === 'b') {
            this.divEl.style.gridTemplateColumns = 'repeat(6, 1fr)';
            this.divEl.style.gridTemplateRows = 'repeat(3, 1fr)';
            this.divEl.style.gridColumn = `${this.columnPosition} / span 2`;
            this.divEl.style.gridRow = `${this.rowPosition} / span 1`;
            buildPipe(pipeOneEl, 2, 2, this);
            buildPipe(pipeTwoEl, 5, 2, this);
        }

        this.divEl.style.width = 'auto';
        this.divEl.style.height = 'auto';

        if (this.alliance === 'ally') {
            bottomGridEl.appendChild(this.divEl);
        }

        this.divEl.style.visibility = this.onBoard
    }
} //a class extending Ship used to make objects for enemy ships - adds a onBoard property to say when a ship should or should not be visible on the board



/* --------------------------------------- Sate delcarations --------------------------------------- */
let testing;
let wait;
let currentEvt;
let game; //a boolean variable that tells if the game is running (true) or stopped (false)
let winner; //a boolean variable that tells if someone has won the game
let champion; //an empty string that will hold the name of who wins
let reset;
let enemyGuessesLog = []
let badGuess; //a boolean variable marked true if the player guessed a square they had already guessed

let allyShipThreeA = new AllyShip('allyShipThreeA', 'ally', 'three', 'a')
let allyShipThreeB = new AllyShip('allyShipThreeB', 'ally', 'three', 'b')
let allyShipTwoA = new AllyShip('allyShipTwoA', 'ally', 'two', 'a')
let allyShipTwoB = new AllyShip('allyShipTwoB', 'ally', 'two', 'b')

let enemyShipThreeA = new Ship('enemyShipThreeA', 'enemy', 'three', 'a');
let enemyShipThreeB = new Ship('enemyShipThreeB', 'enemy', 'three', 'b');
let enemyShipTwoA = new Ship('enemyShipTwoA', 'enemy', 'two', 'a');
let enemyShipTwoB = new Ship('enemyShipTwoB', 'enemy', 'two', 'b');

let allyShipArr = [allyShipThreeA, allyShipThreeB, allyShipTwoA, allyShipTwoB]
let enemyShipArr = [enemyShipThreeA, enemyShipThreeB, enemyShipTwoA, enemyShipTwoB]


/* ####################################### Functions ####################################### */
/* --------------------------------------- Init --------------------------------------- */
// - sets game to true
// - sets winner to be false
// - Runs:
//     - generateShips()
//     - generateEnemyShips()
//     - render()
//     - runGame()
function init() {
    reset = false;
    testing = false;
    badGuess = false;
    wait = false;
    game = true;
    winner = false;
    champion = '';

    generateCoordinates(allyShipArr)

    for (ship of allyShipArr){
        ship.recordSquaresTaken()
    }

    generateCoordinates(enemyShipArr)

    for (ship of enemyShipArr){
        ship.recordSquaresTaken()
    }

    topGridDivEls.forEach((div) => {
        div.addEventListener('click', handleClick)
    });

    retryEl.addEventListener('click', resetter)

    exitEl.addEventListener('click', () => {
        close();
    })

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
    for (ship of allyShipArr){
        ship.buildShip()
    }
}

// - renderBadGuess() //renders a gray top grid if the user clicks on a square they had already guessed, and then using a setTimeout, after 1000ms, it reverts back to green and sets badGuess false.
function renderBadGuess() {
    //TODO
    if (badGuess === true) {
        console.log(currentEvt.target)
        if (currentEvt.target.tagName === 'P') {
            currentEvt.target.parentElement.style.backgroundColor = 'gray'
            currentEvt.target.style.color = 'lightgray'
            setTimeout(() => {
                console.log('now')
                if (currentEvt.target.getAttribute('id') === 'hit') {
                    currentEvt.target.parentElement.style.backgroundColor = 'red'
                } else {
                    currentEvt.target.parentElement.style.backgroundColor = 'forestgreen'
                    currentEvt.target.style.color = 'lightgreen'
                }
                wait = false
            }, timeOut)

        } else {
            currentEvt.target.style.backgroundColor = 'gray'
            let childPEl = currentEvt.target.querySelector('p')
            childPEl.style.color = 'lightgray'
            setTimeout(() => {
                console.log('now')
                if (currentEvt.target.getAttribute('id') === 'hit') {
                    currentEvt.target.style.backgroundColor = 'red'
                } else {
                    currentEvt.target.style.backgroundColor = 'forestgreen'
                    childPEl.style.color = 'lightgreen'
                }
                wait = false
            }, timeOut)
        }
    }
}

// - renderAllyGuesses() //renders where the user hits a ship on the enemy's board based off of information stored in storeAllyHit() and renders where the user misses a ship on the enemy's board based off of information stored in storeAllyMiss()
function renderAllyGuesses() {
    //TODO
    topGridDivEls.forEach((div) => {
        if (div.getAttribute('id') === 'hit') {
            if (badGuess === false) {
                div.style.backgroundColor = 'red';
            }
        } else if (div.getAttribute('id') === 'missed') {
            let divPEl = div.querySelector('p')
            divPEl.textContent = 'O'
        } else if (div.getAttribute('id') === 'dead'){
            div.style.backgroundColor = 'darkslategray';
            let divPEl = div.querySelector('p')
            divPEl.style.color = 'slategray'
            divPEl.textContent = 'X'
        }
    });

}

// - renderEnemyGuesses() //renders where the user hits a ship on the ally's board based off of information stored in storeEnemyHit() and renders where the user misses a ship on the ally's board based off of information stored in storeEnemyMiss()
function renderEnemyGuesses() {
    //TODO
    bottomGridDivEls.forEach((div) => {
        if (div.getAttribute('id') === 'hit') {
            div.style.backgroundColor = 'red';
        } else if (div.getAttribute('id') === 'missed') {
            let divPEl = div.querySelector('p')
            divPEl.textContent = 'O'
        } else if (div.getAttribute('id') === 'dead'){
            div.style.backgroundColor = 'darkslategray';
        }
    })
}

// - renderSunkenShips() //renders ships on the graveyard grid when sunken
function renderSunkenShips() {

    for (let i = 0; i < 4; i++){
        allyGraveShipEls[i].style.visibility = allyShipArr[i].inGraveyard
        enemyGraveShipEls[i].style.visibility = enemyShipArr[i].inGraveyard
    }
}

// - renderGameOver() //renders a popup saying the game is over (customized based on who the winner is) asking the player if they'd like to play again or quit
function renderGameOver() {
    //TODO
    setTimeout(() => {
        if (winner) {
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
            } else if (champion === 'enemies') {
                popUpH1El.textContent = 'You lost';
                popUpPEl.textContent = 'Your enemies have bested you! Play again?';
            }

            popUpEl.appendChild(popUpH1El);
            popUpEl.appendChild(popUpPEl);
            popUpEl.appendChild(retryEl);
            popUpEl.appendChild(exitEl);

            blankSlateEl.appendChild(popUpEl);
        }
    }, timeOut)
}

// - renderResetBoard() //renders a reset board with new ally ship positions and an empty graveyard //TODO: figure out if you need this one
function renderResetBoard() {
    if (reset === true){
        topGridDivEls.forEach((div)=>{
            if (!div.getAttribute('class').includes('one') && !div.getAttribute('class').includes('a')){
                div.style.backgroundColor = 'forestgreen'
                let divPEl = div.querySelector('p')
                divPEl.textContent = ''
            }

        })

        blankSlateEl.remove()

        for (ship of allyShipArr){
            ship.inGraveyard = 'hidden'
            ship.  onBoard = 'visible'
        }

        for (ship of enemyShipArr){
            ship.inGraveyard = 'hidden'
        }
    }
}

/* --------------------------------------- Other Functions --------------------------------------- */

function generateCoordinates(objs) {
    testing = true

    for (obj of objs) {
        generateShipsColumn(obj)
        generateShipsRow(obj)
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

    for (obj of objs) {
        if (obj.alliance === 'enemy') {
            obj.cheatSheet = `Cheat sheet for ship ${obj.name}: Starts at [${obj.xCoordinates[0]-1}, ${obj.yCoordinates[0]-1}] and ends at [${obj.xCoordinates[1]-1}, ${obj.yCoordinates[1]-1}]`
        }
    }

};

// - generateShips() //generates random positions that will be used to render the ally ships and stores them in an object upon initialization
function generateShipsColumn(obj) {
    let returnNum;
    if (obj.size === 'three' && obj.orientation == 'b') {
        returnNum = Math.floor(Math.random() * 6)
    } else if (obj.size === 'two' && obj.orientation == 'b') {
        returnNum = Math.floor(Math.random() * 7)
    } else {
        returnNum = Math.floor(Math.random() * 8)
    }

    if (returnNum <= 1) {
        return generateShipsColumn(obj);
    }
    storeXCoordinates(obj, returnNum)
    obj.columnPosition = returnNum;
};

function generateShipsRow(obj) {
    let returnNum;
    if (obj.alliance === 'ally') {
        if (obj.size === 'three' && obj.orientation == 'a') {
            returnNum = Math.floor(Math.random() * 5)
        } else if (obj.size === 'two' && obj.orientation == 'a') {
            returnNum = Math.floor(Math.random() * 6)
        } else {
            returnNum = Math.floor(Math.random() * 7)
        }

        if (returnNum < 1) {
            return generateShipsRow(obj);
        }
    } else if (obj.alliance === 'enemy') {
        if (obj.size === 'three' && obj.orientation == 'a') {
            returnNum = Math.floor(Math.random() * 6)
        } else if (obj.size === 'two' && obj.orientation == 'a') {
            returnNum = Math.floor(Math.random() * 7)
        } else {
            returnNum = Math.floor(Math.random() * 8)
        }

        if (returnNum < 2) {
            return generateShipsRow(obj);
        }
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
    generateShipsColumn(objs[num1]);
    generateShipsRow(objs[num1]);
    objs[num2].xCoordinates = [];
    objs[num2].yCoordinates = [];
    generateShipsColumn(objs[num2]);
    generateShipsRow(objs[num2]);
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

//generates random positions to stored for the enemy ships upon initialization


// - handleClick() //if badGuess is true it runs checkIfOpen() and if that is true it runs checkIfShip, and then runs render() no matter what

function handleClick(evt) {
    //add evt.target.parentElement.getAttribute('class') === 'grid top-grid' &&  ?
    currentEvt = evt;
    if (wait === false) {
        wait = true
        if ((evt.target.getAttribute('id') !== 'hit' && evt.target.getAttribute('id') !== 'missed') && evt.target.tagName !== 'P' && (!evt.target.getAttribute('class').includes('a') || !evt.target.getAttribute('class').includes('one'))) {

            if (!evt.target.getAttribute('class').includes('one') && !evt.target.getAttribute('class').includes('a')) {
                if (evt.target.getAttribute('id') === 'taken') {
                    evt.target.setAttribute('id', 'hit')
                } else {
                    evt.target.setAttribute('id', 'missed')
                }
            }
            checkShips(enemyShipArr)

            determineWinner();
            render();

            setTimeout(enemyGuesses, timeOut)

        } else {
            badGuess = true;
            render();
            setTimeout(() => {
                badGuess = false;
            }, timeOut)
        }
    }
}

function checkShips(objs) {
    for (obj of objs) {
        let sunken = obj.squaresTaken.every((div) => {
            return div.getAttribute('id') === 'hit';
        })


        if (sunken) {

            obj.squaresTaken.forEach((div)=>{
                div.setAttribute('id', 'dead')
            })

            obj.inGraveyard = 'visible'
            if (obj.alliance === 'ally') {
                obj.onBoard = 'hidden'
            }
        }
    }
}
// - enemyGuess() //the computer randomly picks a square in ally waters that has not been picked yet (by running checkIfOpen), then runs checkIfAllyShip

function enemyGuesses() {
    generateEnemyGuess()
    checkShips(allyShipArr)
    determineWinner()
    render()
    wait = false;
}

function generateEnemyGuess() {
    let xPositionGuess = generateEnemyColumnGuess()
    let yPositionGuess = generateEnemyRowGuess()

    let guessedSqaure = document.querySelector(`.bottom-grid > ${bottomRows[xPositionGuess - 2]}${columns[yPositionGuess - 1]}`);

    let log = [xPositionGuess - 2, yPositionGuess - 1].join('')

    if (!enemyGuessesLog.includes(log)) {
        if (guessedSqaure.getAttribute('id') === 'taken') {
            guessedSqaure.setAttribute('id', 'hit');
        } else {
            guessedSqaure.setAttribute('id', 'missed');
        }

        enemyGuessesLog.push(log)
    } else {
        let allDone;
        let testLog;

        for (let i = 0; i <= 5; i++) {
            for (let j = 0; j <= 5; j++) {
                testLog = [i, j].join('')

                if (!enemyGuessesLog.includes(testLog)) {
                    allDone = false;
                    break
                } else {
                    allDone = true
                }
            }

            if (allDone === false) {
                break
            }
        }

        if (allDone === false) {
            generateEnemyGuess()
        }
    }

}

function generateEnemyColumnGuess() {
    let returnNum = Math.floor(Math.random() * 8)

    if (returnNum < 2) {
        return generateEnemyColumnGuess();
    } else {
        return returnNum
    }
}

function generateEnemyRowGuess() {
    let returnNum = Math.floor(Math.random() * 7)

    if (returnNum < 1) {
        return generateEnemyRowGuess();
    } else {
        return returnNum
    }
}

// - checkIfAllyShip() //checks if a ship is occupying that square and if so it runs storeEnemyHit(), else it runs storeEnemyMiss()
// - storeEnemyHit() //stores if computer's guess was a hit
// - storEnemyMiss() //stores if computer's guess was a miss
// - resetSqauresTaken() //reset all sqaure IDs to ''
// - runGame() //runs a while loop while game is true, with three event listeners - one for the top grid that invokes handleClick, one for the reset button that invokes init(), and one for quitting that invokes close().  It also runs determineWinner().
// - determineWinner() //determiine winner waits for all ships to be in either graveyard and if so, sets the winner to be true and champion to either 'enemies' or 'allies'

function determineWinner() {

    if (allyShipArr.every((obj)=>{
        return obj.inGraveyard === 'visible'
    })){
        winner = true;
        champion = 'enemies'
    } else if (enemyShipArr.every((obj)=>{
        return obj.inGraveyard === 'visible'
    })){
        winner = true;
        champion = 'allies'
    }
}

function resetter() {
    reset = true;
    testing = false;
    wait = false;
    game = true;
    winner = false;
    champion = '';e

    generateCoordinates(allyShipArr)

    for (ship of allyShipArr){
        ship.recordSquaresTaken()
    }

    generateCoordinates(enemyShipArr)

    for (ship of enemyShipArr){
        ship.recordSquaresTaken()
    }

    render()
}

function cheater(){
    for (ship of enemyShipArr){
        console.log(ship.cheatSheet)
    }

}

/* ####################################### Run the Game ####################################### */
init()

//TODO - for enemy guesses, have the a random x and y number generated within the bound of the board, and then have that number coorelate with an array with the corresponding class name  ex: Math.floor(Math.random()) = 0 for the column, it would correspond with '.b' in the array since that is the first column
    //TODO - can the above be reverse engineered to find divs?  .findIndexOf(".b") to find b in [a,b,c,d] etc
        // or can we use evt or evt.target to edit these squares?

//TODO - make occupied enemy divs have an unselectable space in them?
// https://www.w3schools.com/howto/howto_css_disable_text_selection.asp#:~:text=You%20can%20use%20the%20user,be%20used%20to%20prevent%20this.
// or evalue their grid-areas' against the ships?