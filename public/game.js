console.log("in js")
var socket = io();

// var rule1 = document.getElementById("rule1");
// var rule2 = document.getElementById("rule2");
// var rule3 = document.getElementById("rule3");

// var ruleList = document.getElementById("resultList");

// document.getElementById("sendButton").addEventListener('click', function(){

// 	var checkCompleted = checkRuleValue([rule1, rule2, rule3]);

// 	if(checkCompleted !== ""){
// 		document.getElementById("warning").innerHTML = checkCompleted;
// 	} else {
// 		document.getElementById("warning").innerHTML = "";
// 		socket.emit('new rules', [rule1.value, rule2.value, rule3.value]);
// 	}
// });

// socket.on('all rules', function(rules){
// 	var ruleList = document.getElementById("resultList");
	
		

// ruleList.innerHTML = "";
// 		rules.forEach(function(rule, i){
// 			var pTag = document.createElement('p');
// 			if(i % 3 !== 2){
// 				console.log(rule);
// 				pTag.setAttribute('class',"blankedout");
// 			}
// 			pTag.innerText = rule;
// 			ruleList.appendChild(pTag);
// 		});

// });

document.getElementById("sendButton").addEventListener('click', function(){

const elems = document.getElementsByClassName('name');

var ruleArray = [];

// iterate using for...of loop
for (const p of elems) {
    // console.log(p.value);
    ruleArray.push(p.value);
}
  
  if (name.length === 0){
    name = "no name entered";
  }
  //A socket.emit is sent to the server with the new players name
  socket.emit('new player', ruleArray);
  
  //Once the player has put in their name, the input field dissapears so they 
  //Can't add another name and can only play one circle
  // document.getElementById('inputName').style.display = 'none';
})
  
//The unordered list
let list = document.getElementById("playersNames");

socket.on('update player names', function(newPlayerName){

  console.log(newPlayerName);
  //When a new player starts, all the names are deleted from
  //The player list, then new list items are created with
  //each of the players names
  // var first = list.firstElementChild; 
  // while (first) { 
  //     first.remove(); 
  //     first = list.firstElementChild; 
  // } 

  
  newPlayerName.forEach(function (name, index) {
    let liNode = document.createElement("LI");
    let textnode = document.createTextNode(name);
    liNode.appendChild(textnode);
    list.appendChild(liNode);
  });
  

});


function checkRuleValue(ruleArray){
	var completedInput = "";
	var incompleteInput = "Please fill in  ";
	var rulesIncomplete = false;

	ruleArray.forEach(function(rule, i){
		if(rule.value === ""){
			incompleteInput += "rule " + (i + 1) + " ";
			rulesIncomplete = true;
		}
	})

	if(rulesIncomplete){
		return incompleteInput;
	} else {
		return completedInput;
	}
}