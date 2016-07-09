
var daoConst = require('./constants.js');
var async = require('async');


//loading db tables slide 6
exports.getTableDetails = function(conn, viewData, req) {
	try {

		var tabledata = {"accountName": "", "marketshareForecasts": []};
		var priceS_data = []; var t = 0;
		
		var stmt1 = daoConst.PRICEFETCH;
		var priceS = conn.querySync(stmt1);
		var priceS_data_raw = JSON.parse(JSON.stringify(priceS));
		
		for(var i in priceS_data_raw){
			if(priceS_data_raw[i].Forecast == 1)
				priceS_data[t++] = priceS_data_raw[i];
		}
		// console.log("pricescenario -->" + JSON.stringify(priceS_data));
		

		async.series([
		        //Scenario: Base
				function(callback) {
					var arraynew = [];
					var marketshareForecasts = {"scenario":"", "priceScenario": [], "mshareTrend": []};
					var k = 0; m =0; n = 0; j=1;
					marketshareForecasts.scenario = "Base"

					for (var i in priceS_data){
						if(priceS_data[i].Account == "VALORA    "){
							tabledata.accountName = "VALORA";

							if(priceS_data[i].TYPE == 1){
								
								var pricescenario = {"brandName": "", "brandPrice": ""};

								pricescenario.brandName = priceS_data[i].BrandSegment;
								pricescenario.brandPrice = priceS_data[i].Price_Mean;
								arraynew[k++] = pricescenario;
								if(i>0){
									if(priceS_data[i].BrandSegment == priceS_data[i-1].BrandSegment)
										arraynew.splice(k-1, 1);	
								}
							}
						}
					}

					for(var i in arraynew){
						if(arraynew[i]!= undefined)
							marketshareForecasts.priceScenario[n++] = arraynew[i];
					}
						
					var weekdata= []; s=0;
					for (var i in priceS_data){
						if(priceS_data[i].Account == "VALORA    "){
							if(priceS_data[i].TYPE == 1){
								if(priceS_data[i].BrandSegment == "CHESTERFIELD"){
									// console.log("Inside week:: "+priceS_data[i].WeekEndingDate)
									weekdata[s++]= priceS_data[i].WeekEndingDate;
								}
							}
						}
					}

					for(var p in weekdata){
						var marketshare = 0.0;
						for (var i in priceS_data){
							if(priceS_data[i].Account == "VALORA    "){
								if(priceS_data[i].TYPE == 1){
									if(priceS_data[i].WeekEndingDate == weekdata[p]){
										console.log("Share ::"+priceS_data[i].TS_Share_Sum);
										marketshare = marketshare + priceS_data[i].TS_Share_Sum;
									}
							
								}
							}
						}
						var mshareTrend = {"weekNum": "", "mshare": ""};
						mshareTrend.weekNum = parseInt(p)+1;
						mshareTrend.mshare = marketshare;
						console.log("Sum market share:: "+JSON.stringify(mshareTrend));
						marketshareForecasts.mshareTrend[m++] = mshareTrend;
					}		


					tabledata.marketshareForecasts.push(marketshareForecasts);
					callback(null, 1);
				}, 
				
				//Scenario: Corporate Price
				function(callback) {
					var arraynew = [];
					var marketshareForecasts = {"scenario":"", "priceScenario": [], "mshareTrend": []};
					var k = 0; m =0; n = 0; j=1;
					marketshareForecasts.scenario = "Corporate Price"
					
					for (var i in priceS_data){
						if(priceS_data[i].Account == "VALORA    "){
							tabledata.accountName = "VALORA";

							if(priceS_data[i].TYPE == 2){
								
								var pricescenario = {"brandName": "", "brandPrice": ""};

								pricescenario.brandName = priceS_data[i].BrandSegment;
								pricescenario.brandPrice = priceS_data[i].Price_Mean;
								arraynew[k++] = pricescenario;
								if(i>0){
									if(priceS_data[i].BrandSegment == priceS_data[i-1].BrandSegment)
										arraynew.splice(k-1, 1);	
								}
							}
						}
					}

					for(var i in arraynew){
						if(arraynew[i]!= undefined)
							marketshareForecasts.priceScenario[n++] = arraynew[i];
					}
						
					var weekdata= []; s=0;
					for (var i in priceS_data){
						if(priceS_data[i].Account == "VALORA    "){
							if(priceS_data[i].TYPE == 2){
								if(priceS_data[i].BrandSegment == "CHESTERFIELD"){
									// console.log("Inside week:: "+priceS_data[i].WeekEndingDate)
									weekdata[s++]= priceS_data[i].WeekEndingDate;
								}
							}
						}
					}

					for(var p in weekdata){
						var marketshare = 0.0;
						for (var i in priceS_data){
							if(priceS_data[i].Account == "VALORA    "){
								if(priceS_data[i].TYPE == 2){
									if(priceS_data[i].WeekEndingDate == weekdata[p]){
										console.log("Share ::"+priceS_data[i].TS_Share_Sum);
										marketshare = marketshare + priceS_data[i].TS_Share_Sum;
									}
							
								}
							}
						}
						var mshareTrend = {"weekNum": "", "mshare": ""};
						mshareTrend.weekNum = parseInt(p)+1;
						mshareTrend.mshare = marketshare;
						console.log("Sum market share:: "+JSON.stringify(mshareTrend));
						marketshareForecasts.mshareTrend[m++] = mshareTrend;
					}	
						
					tabledata.marketshareForecasts.push(marketshareForecasts);
					callback(null, 2);	
				},
				
				//Scenario: S1
				function(callback) {
					var arraynew = [];
					var marketshareForecasts = {"scenario":"", "priceScenario": [], "mshareTrend": []};
					var k = 0; m =0; n = 0; j=1;
					marketshareForecasts.scenario = "S1"
					
					for (var i in priceS_data){
						if(priceS_data[i].Account == "VALORA    "){
							tabledata.accountName = "VALORA";

							if(priceS_data[i].TYPE == 3){
								
								var pricescenario = {"brandName": "", "brandPrice": ""};

								pricescenario.brandName = priceS_data[i].BrandSegment;
								pricescenario.brandPrice = priceS_data[i].Price_Mean;
								arraynew[k++] = pricescenario;
								if(i>0){
									if(priceS_data[i].BrandSegment == priceS_data[i-1].BrandSegment)
										arraynew.splice(k-1, 1);	
								}
							}
						}
					}

					for(var i in arraynew){
						if(arraynew[i]!= undefined)
							marketshareForecasts.priceScenario[n++] = arraynew[i];
					}
						
					var weekdata= []; s=0;
					for (var i in priceS_data){
						if(priceS_data[i].Account == "VALORA    "){
							if(priceS_data[i].TYPE == 3){
								if(priceS_data[i].BrandSegment == "CHESTERFIELD"){
									// console.log("Inside week:: "+priceS_data[i].WeekEndingDate)
									weekdata[s++]= priceS_data[i].WeekEndingDate;
								}
							}
						}
					}

					for(var p in weekdata){
						var marketshare = 0.0;
						for (var i in priceS_data){
							if(priceS_data[i].Account == "VALORA    "){
								if(priceS_data[i].TYPE == 3){
									if(priceS_data[i].WeekEndingDate == weekdata[p]){
										console.log("Share ::"+priceS_data[i].TS_Share_Sum);
										marketshare = marketshare + priceS_data[i].TS_Share_Sum;
									}
							
								}
							}
						}
						var mshareTrend = {"weekNum": "", "mshare": ""};
						mshareTrend.weekNum = parseInt(p)+1;
						mshareTrend.mshare = marketshare;
						console.log("Sum market share:: "+JSON.stringify(mshareTrend));
						marketshareForecasts.mshareTrend[m++] = mshareTrend;
					}
						
					tabledata.marketshareForecasts.push(marketshareForecasts);
					callback(null, 3);	
				},
				
				//Scenario: S2
				function(callback) {
					var arraynew = [];
					var marketshareForecasts = {"scenario":"", "priceScenario": [], "mshareTrend": []};
					var k = 0; m =0; n = 0; j=1;
					marketshareForecasts.scenario = "S2"
					
					for (var i in priceS_data){
						if(priceS_data[i].Account == "VALORA    "){
							tabledata.accountName = "VALORA";

							if(priceS_data[i].TYPE == 4){
								
								var pricescenario = {"brandName": "", "brandPrice": ""};

								pricescenario.brandName = priceS_data[i].BrandSegment;
								pricescenario.brandPrice = priceS_data[i].Price_Mean;
								arraynew[k++] = pricescenario;
								if(i>0){
									if(priceS_data[i].BrandSegment == priceS_data[i-1].BrandSegment)
										arraynew.splice(k-1, 1);	
								}
							}
						}
					}

					for(var i in arraynew){
						if(arraynew[i]!= undefined)
							marketshareForecasts.priceScenario[n++] = arraynew[i];
					}
						
					var weekdata= []; s=0;
					for (var i in priceS_data){
						if(priceS_data[i].Account == "VALORA    "){
							if(priceS_data[i].TYPE == 4){
								if(priceS_data[i].BrandSegment == "CHESTERFIELD"){
									// console.log("Inside week:: "+priceS_data[i].WeekEndingDate)
									weekdata[s++]= priceS_data[i].WeekEndingDate;
								}
							}
						}
					}

					for(var p in weekdata){
						var marketshare = 0.0;
						for (var i in priceS_data){
							if(priceS_data[i].Account == "VALORA    "){
								if(priceS_data[i].TYPE == 4){
									if(priceS_data[i].WeekEndingDate == weekdata[p]){
										console.log("Share ::"+priceS_data[i].TS_Share_Sum);
										marketshare = marketshare + priceS_data[i].TS_Share_Sum;
									}
							
								}
							}
						}
						var mshareTrend = {"weekNum": "", "mshare": ""};
						mshareTrend.weekNum = parseInt(p)+1;
						mshareTrend.mshare = marketshare;
						console.log("Sum market share:: "+JSON.stringify(mshareTrend));
						marketshareForecasts.mshareTrend[m++] = mshareTrend;
					}
						
					tabledata.marketshareForecasts.push(marketshareForecasts);
					callback(null, 4);			
				},
				
				//Scenario: S3
				function(callback) {
					var arraynew = [];
					var marketshareForecasts = {"scenario":"", "priceScenario": [], "mshareTrend": []};
					var k = 0; m =0; n = 0; j=1;
					marketshareForecasts.scenario = "S3"
					
					for (var i in priceS_data){
						if(priceS_data[i].Account == "VALORA    "){
							tabledata.accountName = "VALORA";

							if(priceS_data[i].TYPE == 5){
								
								var pricescenario = {"brandName": "", "brandPrice": ""};

								pricescenario.brandName = priceS_data[i].BrandSegment;
								pricescenario.brandPrice = priceS_data[i].Price_Mean;
								arraynew[k++] = pricescenario;
								if(i>0){
									if(priceS_data[i].BrandSegment == priceS_data[i-1].BrandSegment)
										arraynew.splice(k-1, 1);	
								}
							}
						}
					}

					for(var i in arraynew){
						if(arraynew[i]!= undefined)
							marketshareForecasts.priceScenario[n++] = arraynew[i];
					}
						
					var weekdata= []; s=0;
					for (var i in priceS_data){
						if(priceS_data[i].Account == "VALORA    "){
							if(priceS_data[i].TYPE == 5){
								if(priceS_data[i].BrandSegment == "CHESTERFIELD"){
									// console.log("Inside week:: "+priceS_data[i].WeekEndingDate)
									weekdata[s++]= priceS_data[i].WeekEndingDate;
								}
							}
						}
					}

					for(var p in weekdata){
						var marketshare = 0.0;
						for (var i in priceS_data){
							if(priceS_data[i].Account == "VALORA    "){
								if(priceS_data[i].TYPE == 5){
									if(priceS_data[i].WeekEndingDate == weekdata[p]){
										console.log("Share ::"+priceS_data[i].TS_Share_Sum);
										marketshare = marketshare + priceS_data[i].TS_Share_Sum;
									}
							
								}
							}
						}
						var mshareTrend = {"weekNum": "", "mshare": ""};
						mshareTrend.weekNum = parseInt(p)+1;
						mshareTrend.mshare = marketshare;
						console.log("Sum market share:: "+JSON.stringify(mshareTrend));
						marketshareForecasts.mshareTrend[m++] = mshareTrend;
					}
						
					tabledata.marketshareForecasts.push(marketshareForecasts);
					callback(null, 5);	
				}

				], function(err) {
			if (!err) {
				console.log(tabledata);
			} else {
				console.log(JSON.stringify(err));
			}
		});

		viewData.Data = tabledata;

	} catch (err) {
		console.log("Error in getTableDetails :: "
				+ JSON.stringify(err));
		throw err;
	}
	return viewData;
};

/*****************************************************************************************************************************************/
/*****************************************************************************************************************************************/

//finalize button slide 6
exports.getfinalizeDetails = function(conn, viewData, req) {
	var scenario = req.body.finalizeInput.selectedScenario;
	console.log(scenario)
	var type = 0;
	try {
		
		if(scenario == "S1")
			type = 3;
		else if(scenario == "S2")
			type = 4;
		else if(scenario == "S3")
			type = 5;

		var tabledata = {"accountName": "", "marketshareForecasts": []};
		var priceS_data = []; var t = 0;
		
		var stmt1 = daoConst.PRICEFETCH;
		var priceS = conn.querySync(stmt1);
		var priceS_data_raw = JSON.parse(JSON.stringify(priceS));
		
		for(var i in priceS_data_raw){
			if(priceS_data_raw[i].Forecast == 1)
				priceS_data[t++] = priceS_data_raw[i];
		}
		// console.log("pricescenario -->" + JSON.stringify(priceS_data));
		

		async.series([
		        //Scenario: Base
				function(callback) {
					var arraynew = [];
					var marketshareForecasts = {"scenario":"", "forecasts": []};
					var k = 0; m =0; n = 0; j=1;
					marketshareForecasts.scenario = "Base"

					for (var i in priceS_data){
						if(priceS_data[i].Account == "VALORA    "){
							tabledata.accountName = "VALORA";

							if(priceS_data[i].TYPE == 1){
								
								var forecasts = {"brandName": "", "sum_share": ""};

								forecasts.brandName = priceS_data[i].BrandSegment;
								forecasts.sum_share = priceS_data[i].Share_Sum;
								arraynew[k++] = forecasts;
								if(i>0){
									if(priceS_data[i].BrandSegment == priceS_data[i-1].BrandSegment)
										arraynew.splice(k-1, 1);	
								}
							}
						}
					}

					for(var i in arraynew){
						if(arraynew[i]!= undefined)
							marketshareForecasts.forecasts[n++] = arraynew[i];
					}

					tabledata.marketshareForecasts.push(marketshareForecasts);
					callback(null, 1);
				}, 
				
				//Scenario: Selected Scenario
				function(callback) {
					var arraynew = [];
					var marketshareForecasts = {"scenario":"", "forecasts": []};
					var k = 0; m =0; n = 0; j=1;
					marketshareForecasts.scenario = scenario;

					for (var i in priceS_data){
						if(priceS_data[i].Account == "VALORA    "){
							tabledata.accountName = "VALORA";

							if(priceS_data[i].TYPE == type){

								var forecasts = {"brandName": "", "sum_share": ""};

								forecasts.brandName = priceS_data[i].BrandSegment;
								forecasts.sum_share = priceS_data[i].Share_Sum;
								arraynew[k++] = forecasts;
								if(i>0){
									if(priceS_data[i].BrandSegment == priceS_data[i-1].BrandSegment)
										arraynew.splice(k-1, 1);	
								}
							}
						}
					}

					for(var i in arraynew){
						if(arraynew[i]!= undefined)
							marketshareForecasts.forecasts[n++] = arraynew[i];
					}	
						
					tabledata.marketshareForecasts.push(marketshareForecasts);
					callback(null, 2);	
				}
				], function(err) {
			if (!err) {
				console.log(tabledata);
			} else {
				console.log(JSON.stringify(err));
			}
		});

		viewData.Data = tabledata;

	} catch (err) {
		console.log("Error in getTableDetails :: "
				+ JSON.stringify(err));
		throw err;
	}
	return viewData;
};

/*****************************************************************************************************************************************/
/*****************************************************************************************************************************************/