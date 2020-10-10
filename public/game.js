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
const elemsLength = elems.length;

var incompleteInput = "Please fill in  ";

var ruleArray = [];
var completedInput = false;

for(i = 0; i < elemsLength; i++){
	if(elems[i].value === ""){
		completedInput = false;
		incompleteInput += elems[i].placeholder.substr(8,6) + " "
		document.getElementById("warning").innerHTML = incompleteInput;
	} else {
		ruleArray.push(elems[i].value);
		completedInput = true;
	}


}

	if(completedInput === true){
		document.getElementById("warning").innerHTML = "";
		document.getElementById("sendButton").disabled = true;
		socket.emit('new player', ruleArray);
	}

// iterate using for...of loop
// for (const p of elems) {
    
//     if(p.value === ""){
//     	console.log(elems)
//     }
//     ruleArray.push(p.value);
// }
  
  // if (name.length === 0){
  //   name = "no name entered";
  // }
  //A socket.emit is sent to the server with the new players name
  // socket.emit('new player', ruleArray);
  
  //Once the player has put in their name, the input field dissapears so they 
  //Can't add another name and can only play one circle
  // document.getElementById('inputName').style.display = 'none';
})
  
//The unordered list
let list = document.getElementById("playersNames");
let rulesList = document.getElementById("resultList");

socket.on('update player names', function(newPlayerName){

  newPlayerName.forEach(function(name, index){
  	let pNode = document.createElement("P");
  	let textnode = document.createTextNode(name);
  	if(index % 3 !== 2){
		pNode.className = "blankedout";
	}
  	// pNode.className = "blankedout"
  	pNode.appendChild(textnode);
  	rulesList.appendChild(pNode)
  })
  

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