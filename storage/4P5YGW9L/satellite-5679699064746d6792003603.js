_satellite.pushAsyncScript(function(event, target, $variables){
  var refNode1 = document.querySelector('#footer-wrapper #subfooter div.text ul');
var refNode2 = document.querySelector('#footer-wrapper #subfooter div.text p'); 
var refNode3 = document.querySelector('#footer-wrapper div.text ul'); 
var refNode4 = document.querySelector('div#footer div.text ul'); 

var teconsent = document.createElement("span"); // Create a node
teconsent.id = "teconsent"; // Give new node an id

var consentScript = document.createElement("script"); // Create script element
consentScript.type = "text/javascript"; // assign type attribute
consentScript.setAttribute('async', 'async'); // assign async attribute
consentScript.setAttribute('crossorigin', ''); // assign crossorigin attribute
consentScript.src = '//consent.truste.com/notice?domain=sas.com&c=teconsent&text=true'; // assign src attribute

teconsent.appendChild(consentScript); // put contentScript within teconsent

 if (refNode1) {
	//new webnair & events
	var nodeWrap = document.createElement("li");
  nodeWrap.classList.add('te-item');
	nodeWrap.appendChild(teconsent);
	refNode1.insertBefore(nodeWrap, refNode1.childNodes[0]);
} else if (refNode2) {
	//main
	refNode2.insertBefore(teconsent, refNode2.childNodes[0]);
} else if (refNode3) {
	var nodeWrap = document.createElement("li");
  nodeWrap.classList.add('te-item');
	nodeWrap.appendChild(teconsent);
	refNode3.insertBefore(nodeWrap, refNode3.childNodes[0]);
} else if (refNode4) {
	//old webnair
	var nodeWrap = document.createElement("li");
	nodeWrap.appendChild(teconsent);
	refNode4.insertBefore(nodeWrap, refNode4.childNodes[0]);
} else {
	//add link to very bottom of page
	document.body.appendChild(teconsent);
	teconsent.style.padding = "10px";
	teconsent.style.fontSize = "small";
	teconsent.style.textAlign = "center";
	teconsent.style.display = "block";
}
});
