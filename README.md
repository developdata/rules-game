# Game design exercise 
This is a game design exercise called One from the book Rules of play - game design fundamentals by Katie Salen Tekinbaş and Eric Zimmerman. The goal of the game is to see how rules interact with each other and explore how those rules can be interpreted when creating a game from them. The description of one from the book has been used to create an online version that can be played across browsers. 

## Playing one online 
To play this game each person must open it on their browser, ideally it should be three people in the game. 

When everyone playing has it open on the browser each person one turn writing two rules and submitting them. Once they have submitted their rules, they will not be able to submit again in the round. 

The other players only see one rule as the first rule is blanked out. When all players have written and submitted their two rules, a player needs to press the "reveal all rules" button so that all the rules are revealed. The players can then discuss what this game would look like, and how the rules would be interpreted to make a good game. 

## Input fields 
There are two input fields, that each player takes turns in filling in. Once the two fields are filled in by the player they should click on the "submit your rules" button in order for the game to continue.  

## Code 
The game uses a Node.js server with Express and Socket.io installed. There are a number of socket.emit and socket.on commands both in the front and backend to send the data between the players. 