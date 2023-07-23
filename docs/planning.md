# Battleship - Project 1 Planning
Name: Joe Gilberto (he/him)
## Game Choice - Battleship
## Screenshot for Wireframes
![images for demonstration purposes](../assets/BattleshipWireFrame.png)
## MVP Pseudocode

### Variables
Sate delcarations: 
- let game; //a boolean variable that tells if the game is running (true) or stopped (false)
- let winner; //a boolean variable that tells if someone has won the game
- let champion; //an empty string that will hold the name of who wins
- let allyPositions = {}; //an object holding the ally ship positions
- let enemyPositions = {}; //an object holding the enemy ship positions
- let allyWatersHitsMisses = {}; //an object holding the where in ally waters there have been hits or misses
- let enemyWatersHitsMisses = {}; //an object holding the where in enemy waters there have been hits or misses
- let badGuess; //a boolean variable marked true if the player guessed a square they had already guessed
- class Ship //a class used to make objects for enemy ships, includes name, position, and if it should be visible on the graveyard
- class AllyShip extends Ship //a class extending Ship used to make objects for enemy ships - adds a boardVisibility property to say when a ship should or should not be visible on the board

Constants:
- timeOut //a variable set to 3000ms

DOM Elements:
- .top-grid > divs
- .bottom-grid > divs
- .ally-grave
- .ally-grave > .ship
- .enemy-grave
- .enemy-grave > .ship

### Init
- sets game to true
- sets winner to be false
- Runs:
    - generateAllyShips()
    - generateEnemyShips()
    - render()
    - runGame()

### Render
- render() //renders all
- renderAllyShips() //renders ally ships starting position on the board
- renderAllyAlreadyGuessed() //renders a red and orange top grid if the user clicks on a square they had already guessed, and then using a setTimeout, after 1000ms, it reverts back to green and sets badGuess false.
- renderAllyHit() //renders where the user hits a ship on the enemy's board based off of information stored in storeAllyHit()
- renderAllyMiss() //renders where the user misses a ship on the enemy's board based off of information stored in storeAllyMiss()
- renderEnemyHit() //renders where the user hits a ship on the ally's board based off of information stored in storeEnemyHit()
- renderEnemyMiss() //renders where the user misses a ship on the ally's board based off of information stored in storeEnemyMiss()
- renderSunkenShips() //renders ships on the graveyard grid when sunken
- renderGameOver() //renders a popup saying the game is over (customized based on who the winner is) asking the player if they'd like to play again or quit
- renderResetBoard() //renders a reset board with new ally ship positions and an empty graveyard

### Other Functions
- generateAllyShips() //generates random positions that will be used to render the ally ships and stores them in an object upon initialization
- generateEnemyShips() //generates random positions to stored for the enemy ships upon initialization
- handleClick() //if badGuess is true it runs checkIfOpen() and if that is true it runs checkIfShip, and then runs render() no matter what
- checkIfOpen() //checks if a square has already been guessed.  returns true if not, returns false if so and assigns badGuess true.
- checkIfEnemyShip() //checks if a ship is occupying that square and if so it runs storeAllyHit(), else it runs storeAllyMiss()
- storeAllyHit() //stores if a user's guess was a hit
- storAllyMiss() //stores if a user's guess was a miss
- enemyThinking() //run setTimeout (length based on timeOut variable) invoking enemyGuess()
- enemyGuess() //the computer randomly picks a square in ally waters that has not been picked yet (by running checkIfOpen), then runs checkIfAllyShip
- checkIfAllyShip() //checks if a ship is occupying that square and if so it runs storeEnemyHit(), else it runs storeEnemyMiss()
- storeEnemyHit() //stores if computer's guess was a hit
- storEnemyMiss() //stores if computer's guess was a miss
- runGame() //runs a while loop while game is true, with three event listeners - one for the top grid that invokes handleClick, one for the reset button that invokes init(), and one for quitting that invokes close().  It also runs determineWinner().
- determineWinner() //determiine winner waits for all ships to be in either graveyard and if so, sets the winner to be true and champion to either 'enemy' or 'ally'

### Run the game
- init()