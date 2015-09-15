describe('taxiServiceIndexTest', function () {
	it('canary is passing', function () {
		expect(true).to.be.eql(true);
	});
	
	beforeEach(function(){
		this.event = {
			preventDefault: function(){
				this.tester = true;
			},
			dataTransfer:{
				getData: function (prop){
					return prop === 'CarType' ? 'fastCar' : ''
				},
				setData: function(key, value){
					this.data = value;
					this.key = key;
				}
			},
			
		};
		this.table = {
			rows: [
				{innerHTML: "not me"}, 
				{innerHTML: "fastCar"}
			],
			deleteRow: function(i) {
				this.rows.pop();
			}
		};
		navigator = {
			geolocation: {
				getCurrentPosition: function (func1, func2){
					var position = {
						coords: {
							latitude: 10,
							longitude: 1
						}
					};
					func1(position);
				}
				
			}
		};
	})
	
	it('dropToTarget function adds row to table', function(){
		var data = 'stuff';
		table = {
			rows: [
				"one",
			],
			insertRow: function(i) {
				this.rows.push('two');
				return {
					insertCell: function(i){
						return "im a cell"
					}
				};
			}
			
		};
		dropToTarget(data, table);
		expect(table.rows.length).to.be.eql(2);
	});
	
	it('allowDrop calls event.perventDefault Function', function(){
		allowDrop(this.event);
		expect(this.event.tester).to.be.eql(true);
	});
	
	it('dragEnd calls event.preventDefault funciton', function(){
		dragEnd (this.event)
		expect(this.event.tester).to.be.eql(true);
	});
	
	it('checkIfAlreadyInTable catches Elements', function(){
		var errorMsg = {innerHTML: ''};
		var catchFalse = checkIfAlreadyInTable(this.event, this.table, errorMsg);
		expect(catchFalse).to.be.eql(false);
	});
	
	it('checkIfAlreadyInTable calls event.preventDefault function', function() {
		var errorMsg = {innerHTML: ''};
		checkIfAlreadyInTable(this.event, this.table, errorMsg);
		expect(this.event.tester).to.be.eql(true);
	});
	
	it('checkIfAlreadyInTable calls dropToTarget Fuction', function(){
		var errorMsg = {innerHTML: ''};
		var tester = false;
		dropToTarget = function(){
			tester = true;
		}
		this.table.rows[1].innerHTML = '';
		checkIfAlreadyInTable(this.event, this.table, errorMsg);
		expect(tester).to.be.eql(true);
	});
	
	it('dragStart saves data to event', function(){
		dragStart(this.event, 'foo');
		expect(this.event.dataTransfer.data).to.be.eql('foo');
	});
	
	it('dragStart saves key to event', function(){
		dragStart(this.event, 'bar');
		expect(this.event.dataTransfer.key).to.be.eql('CarType');
	});
	
	it('carReset deletes all but one row', function(){
		carReset(this.table);
		expect(this.table.rows.length).to.be.eql(1);
	});
	
	it('getGeoLocation stores Latitute into elementOne', function(){
		var elementOne = {value: ''};
		var elementTwo = {value: ''};
		var latLable = {textContent: ''};
		var longLable = {textContent: ''};
		var geoButton = {textContent: ''};
		
		getGeoLocation(elementOne, elementTwo, geoButton, latLable, longLable);
		expect(elementOne.value).to.be.eql(10);
	});
	
	it('getGeoLocation stores longitude into elementTwo', function(){
		var elementOne = {value: ''};
		var elementTwo = {value: ''};
		var latLable = {textContent: ''};
		var longLable = {textContent: ''};
		var geoButton = {textContent: ''};
		
		getGeoLocation(elementOne, elementTwo, geoButton, latLable, longLable);
		expect(elementTwo.value).to.be.eql(1);
	});
	
	it('getGeoLocation sends out error message with correct error code', function(){
		
		var elementOne = {value: ''};
		var elementTwo = {value: ''};
		var latLable = {textContent: ''};
		var longLable = {textContent: ''};
		var geoButton = {textContent: ''};
		
		var alertOutput = '';
		
		navigator = {
			geolocation: {
				getCurrentPosition: function(func1, func2){
					var error = {
						code: 2
					};
					func2(error);
				}
			}
		};
		
		getGeoLocation(elementOne, elementTwo, geoButton, latLable, longLable);
		
		expect(geoButton.textContent).to.be.eql('Err: Position unavailable');
	});
	
	it('submit check returns false when table has only one row', function(){
		var errorMsg = {innerHTML: ''};
		var elementOne = {value: 'stuff'};
		var elementTwo = {value: 'stuff'};
		table = {
			rows: [
				{one: 1}
			],
		};
		catchReturn = submitCheck(table, elementOne, elementTwo, errorMsg);
		expect(catchReturn).to.be.eql(false);
	});
	
	it('submit check returns false when first element is empty', function(){
		var errorMsg = {innerHTML: ''};
		var elementOne = {value: ''};
		var elementTwo = {value: 'stuff'};
		table = {
			rows: [
				{one: 1},
				{two: 2}
			],
		};
		catchReturn = submitCheck(table, elementOne, elementTwo, errorMsg);
		expect(catchReturn).to.be.eql(false);
	});
	
	it('submit check returns false when first element is empty', function(){
		var errorMsg = {innerHTML: ''};
		var elementOne = {value: 'stuff'};
		var elementTwo = {value: ''};
		table = {
			rows: [
				{one: 1},
				{two: 2}
			],
		};
		catchReturn = submitCheck(table, elementOne, elementTwo, errorMsg);
		expect(catchReturn).to.be.eql(false);
	});
	
	it('submit check returns true when everything is correct', function(){
		var errorMsg = {innerHTML: ''};
		var elementOne = {value: 'stuff'};
		var elementTwo = {value: 'stuff'};
		table = {
			rows: [
				{one: 1},
				{two: 2}
			],
		};
		catchReturn = submitCheck(table, elementOne, elementTwo, errorMsg);
		expect(catchReturn).to.be.eql(true);
	});
});
