function showHide(theDiv) {
  var x = document.getElementById(theDiv);
	  if(theDiv=="about"){contact.style.display="none";};
	  if(theDiv=="contact"){about.style.display="none";};
    if (x.style.display === "none") {
    x.style.display = "block";
    } else {
    x.style.display = "none";
  }
}

function Hide(thisDiv) {
  var x = document.getElementById(thisDiv);
  x.style.display = "none";
}

function radioShowHide(thisDiv) {
  var x = document.getElementById(thisDiv);
	if(thisDiv=="marketselect"){settlementselect.style.display="none";};
	if(thisDiv=="settlementselect"){marketselect.style.display="none";};
  x.style.display = "block";
}


function clearForm(){ 
  document.getElementById('selmarket').value=''; 
  document.getElementById('selsettlement').value=''; 
  }