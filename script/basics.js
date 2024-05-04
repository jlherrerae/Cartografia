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
	if(thisDiv=="heritageselect"){siteselect.style.display="none";settlementselect.style.display="none";};
	if(thisDiv=="siteselect"){settlementselect.style.display="none";heritageselect.style.display="none";};
	if(thisDiv=="settlementselect"){siteselect.style.display="none";heritageselect.style.display="none";};
  x.style.display = "block";
}


function clearForm(){ 
  document.getElementById('selsite').value=''; 
  document.getElementById('selplace').value=''; 
  document.getElementById('selher').value=''; 
  document.getElementById('startpoint').value='Choose starting point, click on the map'; 
  document.getElementById('endpoint').value='Choose destiny point, click on the map';
  }