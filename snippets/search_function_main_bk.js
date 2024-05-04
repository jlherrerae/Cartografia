/**DOM Events**/

$("input").focus(function() {
	currentElement = $(this).attr("id");
});

$('#btnsearch').click(function(){
	var where = $('input[type=radio][name=type-select]:checked').val();
	var searchname = $("#sel" + where).val();
	console.log(where);
	console.log(searchname);
	switch ($(this).val()) {
		case 'market':
		  where = "market"
		  break;
		case 'settlement':
		  break;
	}
	//localhost/burundi/step1/services/search.py?market=Gitega&format=geojson
	//$.get("services/search.py?" + where + "=" + searchname + "&format=geojson/3857",
    //$.get("services/search.py?format=geojson&name=" + searchname + "&where=" + where + "&srid=3857",
	$.get("services/search.py?format=geojson&name=" + searchname + "&where=" + where  + "&srid=3857",
	  function(response, status){
		if(response.result){// !== null){
			var geom = new ol.geom.Point(response.coordinates);
			mainMap.getView().setCenter(response.coordinates);//response.result.coordinates);
			mainMap.getView().setZoom(9);
			//mainMap.getView().fit(geom.getExtent(), mainMap.getSize());
			$("#search" ).hide();
		} else{console.log(`I can´t do it ${response}, ${status}`)}
	});
});