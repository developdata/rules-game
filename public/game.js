var socket = io();

document.getElementById("sendButton").addEventListener('click', function(){

const elems = document.getElementsByClassName('rule');
const elemsLength = elems.length;

var incompleteInput = "Please fill in  ";
var completedInput = false;

var ruleArray = [];


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
		socket.emit('new rules', ruleArray);
	}
})
  


let rulesList = document.getElementById("resultList");

socket.on('update rules', function(newRule){

  newRule.forEach(function(name, index){
  	let pNode = document.createElement("P");
  	let textnode = document.createTextNode(name);
  	if(index % 3 !== 2){
		pNode.className = "blankedout";
	}
  	pNode.appendChild(textnode);
  	rulesList.appendChild(pNode)
  })

});

