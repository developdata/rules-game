var socket = io();
var allRuleArray = [];

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
}) //END OF CLICK TO POST RULES
  


let rulesList = document.getElementById("resultList");

socket.on('update rules', function(newRule){

  newRule.forEach(function(name, index){
  	allRuleArray.push(name);
  	// console.log(allRuleArray);
  	let pNode = document.createElement("P");
  	let textnode = document.createTextNode(name);
  	if(index % 2 !== 1){
		pNode.className = "blankedout";
	}
  	pNode.appendChild(textnode);
  	rulesList.appendChild(pNode);
  });

});

document.getElementById("seeRules").addEventListener('click', function(){
	socket.emit('reveal', allRuleArray);
});

socket.on('show rules', function(showRulesArray){
	console.log(showRulesArray);
	rulesList.innerHTML = "";

	showRulesArray.forEach(function(name, index){
	  	
	  	let pNode = document.createElement("P");
	  	let textnode = document.createTextNode(name);
	  	pNode.appendChild(textnode);
	  	rulesList.appendChild(pNode);	
  	});
  	document.getElementById("seeRules").disabled = true;
	document.getElementById("next").style.visibility = 'visible';
	document.getElementsByClassName("instructions")[0].style.visibility = 'hidden';
});