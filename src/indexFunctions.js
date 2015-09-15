

var getGeoLocation = function (elementOneToUpdate, elementTwoToUpdate, geoButtonElement, latLable, longLable) {

	geoButtonElement.textContent = "Fetching";
	var success = function (position) {
		elementOneToUpdate.value = position.coords.latitude;
		latLable.textContent = "Lat: " + position.coords.latitude;
		elementTwoToUpdate.value = position.coords.longitude;
		longLable.textContent = "Long: " + position.coords.longitude;
		geoButtonElement.textContent = "Get My Current Location";
	}
	
	var error = function (error) {
		
		var errorMessage = ['', 'Permission denied', 'Position unavailable', 'timeout'];
		geoButtonElement.textContent = "Err: " + errorMessage[error.code];
	}
	
	navigator.geolocation.getCurrentPosition(success, error);
}

var dragStart = function(event, dataToCopy){
	event.dataTransfer.setData('CarType', dataToCopy);
}

var checkIfAlreadyInTable = function(event, tableToAddChild, errorMsg){
	event.preventDefault();
	var data = event.dataTransfer.getData('CarType');
	for(var i = 1; i < tableToAddChild.rows.length; i++){
		var innerHTMLdata = tableToAddChild.rows[i].innerHTML;
		if(innerHTMLdata.indexOf(data) > -1){
			errorMsg.innerHTML = 'That car is already in your list';
			return false;
		}
	}
	errorMsg.innerHTML = '';
	dropToTarget(data, tableToAddChild);
}

var dropToTarget = function(data, tableToAddChild) {
	
	var row = tableToAddChild.insertRow(-1);
	var cell = row.insertCell(-1);
	var carNumber = tableToAddChild.rows.length - 1;
	var cardatastring = carNumber + ' - <input type= "hidden" name="car priority-' + carNumber + '"value= "' + data + '">' + data + '</input>';
	cell.innerHTML = cardatastring;
}

var allowDrop = function(event) {
	event.preventDefault();
}

var dragEnd = function(event){
	event.preventDefault();
}

var carReset = function(carTable){
	while(carTable.rows.length > 1) {
  		carTable.deleteRow( 1 );
	}

}

var submitCheck = function(carTable, longitude, latitude, errorMessage){
	if(carTable.rows.length < 2 || longitude.value.length < 1 || latitude.value.length < 1)	{
		errorMessage.innerHTML = "Please get your current location and select at least one car";
		return false;
	}
		
	else
		return true;
}
