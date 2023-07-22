# Battleship - Project 1 Planning
Name: Joe Gilberto (he/him)
## Game Choice - Battleship
## Screenshot for Wireframes
![images for demonstration purposes](../assets/BattleshipWireFrame.png)
## MVP Pseudocode

### Variables
Sate delcarations: 
- An object holding the ally ship positions
- An object holding the enemy ship positions

Constants:
- timeOut variable set to 3000ms
- Objects holding DOM Element properties

DOM Elements:
- .top-grid > divs
- .bottom-grid > divs
- .ally-grave
- .ally-grave > .ship
- .enemy-grave
- .enemy-grave > .ship

### Init
- Initialize state values
- 

### Event Listners
- addEventListener for .top-grid

### Render
- render() //renders all
- renderAllyShips() //renders ally ships starting position on the board
- renderAllyHit() //renders when the user hits a ship on the enemy's board
- renderAllyMiss() //renders when the user misses a ship on the enemy's board
- renderEnemyHit() //renders when the computer hits a ship on the enemy's board
- renderEnemyMiss() //renders when the computer misses a ship on the enemy's board
- renderSunkenAllyShips() //renders an ally ship on the graveyard grid when sunken
- renderSunkenEnemyShips() //renders an enemy ship on the graveyard grid when sunken
- renderPlayOrQuit() //renders a popup asking the player if they'd like to play again or quit
- renderResetBoard() //renders a reset board with new ally ship positions and an empty graveyard

### Other Functions
- generateAllyShips() //generates random positions to place the ally ships upon initialization and stores them in an object
- generateEnemyShips() //generates random positions to store
- handleClick()
- checkIfSqaureIsOpen()
- storeAllyHit()
- storAllyMiss()
- enemyGuess()
- storeEnemyHit()
- storEnemyMiss()
- enemyStrategy() //if the computer hits, it will guess around that area
- gameOver()
- determineWinner()
- playOrQuit()
- resetBoard()

### Run the game
- runGame()