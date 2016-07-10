
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

//run scenario button slide 6
exports.getRunscenarioDetails = function(conn, viewData, req) {
	var bodydata = req.body;
	// console.log(JSON.stringify(bodydata.accountMsScenarios.marketPrices));
	var type = 0;
	try {
		
		var tabledata = {"accountMsScenarios": []};	
		for(var k in bodydata.accountMsScenarios.marketPrices){
			
				var accountMsScenarios1 = {"scenario": "", "fpsi": []};
				accountMsScenarios1.scenario = bodydata.accountMsScenarios.marketPrices[k].scenario;
				
				for(var i in bodydata.accountMsScenarios.marketPrices[k].priceScenario){
					
					var SDate = new Date("2015-12-28");
					
					for(var j=0; j<13; j++){
						var fpsi = {"brandSegment":"", "PriceMean": "","WeekendingDate": "", "Account": "", "Company": "", "LastWeekShare": "", "scenarioType": ""}
						
						fpsi.brandSegment = bodydata.accountMsScenarios.marketPrices[k].priceScenario[i].brandName;
						fpsi.PriceMean = bodydata.accountMsScenarios.marketPrices[k].priceScenario[i].brandPrice;
						fpsi.Account = "VALORA";
						fpsi.scenarioType = bodydata.accountMsScenarios.marketPrices[k].scenario;
						fpsi.WeekendingDate = SDate;
						
						switch(bodydata.accountMsScenarios.marketPrices[k].priceScenario[i].brandName){

							case "CHESTERFIELD": 
								 fpsi.Company = "PH. MORRIS";
								 fpsi.LastWeekShare = 8.483;
								 break;
							case "L&M":
								fpsi.Company = "PH. MORRIS";
								 fpsi.LastWeekShare = 3.168;
								 break;
							case "MARLBORO":
								fpsi.Company = "PH. MORRIS";
								 fpsi.LastWeekShare = 21.813;
								 break;
							case "PALL MALL":
								fpsi.Company = "BAT";
								 fpsi.LastWeekShare = 2.747;
								 break;
							case "PARISIENNE":
								fpsi.Company = "BAT";
								 fpsi.LastWeekShare = 18.868;
								 break;
							case "WINSTON":
								fpsi.Company = "JTI";
								 fpsi.LastWeekShare = 8.193;
								 break;
							case "OTHER":
								fpsi.Company = "JTI";
								 fpsi.LastWeekShare = 36.729;
								 break;
						}

						accountMsScenarios1.fpsi.push(fpsi);
						var SDate = new Date(new Date(SDate).setDate(SDate.getDate()+7));
					}
				}

				tabledata.accountMsScenarios.push(accountMsScenarios1);
		}

//		for(var i in tabledata.accountMsScenarios){
//			if(tabledata.accountMsScenarios[i].scenario == 'S1'){
//
//				var stmt1 = 'DELETE FROM FPSI2 WHERE "TYPE" = 3';
//				conn.querySync(stmt1);
//				var stmt2 = 'DELETE FROM PRICINGA WHERE "TYPE" = 3';
//				conn.querySync(stmt2);
//
//				for(var j in tabledata.accountMsScenarios[i].fpsi){
//					var stmt3 = 'INSERT into "FPSI2" ("BrandSegment","Price_Mean","WeekEndingDate","Account","Company","LastWeeksShare","TYPE") values ("p1","p2","p3","p4","p5","p6","p7")';
//						stmt3 = stmt3.replace("p1", tabledata.accountMsScenarios[i].fpsi[j].brandSegment);
//						stmt3 = stmt3.replace("p2", tabledata.accountMsScenarios[i].fpsi[j].PriceMean);
//						stmt3 = stmt3.replace("p3", tabledata.accountMsScenarios[i].fpsi[j].WeekendingDate);
//						stmt3 = stmt3.replace("p4", tabledata.accountMsScenarios[i].fpsi[j].Account);
//						stmt3 = stmt3.replace("p5", tabledata.accountMsScenarios[i].fpsi[j].Company);
//						stmt3 = stmt3.replace("p6", tabledata.accountMsScenarios[i].fpsi[j].LastWeekShare);
//						scenarioType
//						stmt3 = stmt3.replace("p7", 3);
//
//						console.log("Insert query: "+stmt3);
//						conn.querySync(stmt3);
//				}
//			}
//
//			else if(tabledata.accountMsScenarios[i].scenario == 'S2'){
//
//				var stmt1 = 'DELETE FROM FPSI2 WHERE "TYPE" = 4';
//				conn.querySync(stmt1);
//				var stmt2 = 'DELETE FROM PRICINGA WHERE "TYPE" = 4';
//				conn.querySync(stmt2);
//
//				for(var j in tabledata.accountMsScenarios[i].fpsi){
//					var stmt3 = 'INSERT into "FPSI2" (BrandSegment,Price_Mean,WeekEndingDate,Account,Company,LastWeeksShare,TYPE) values ("p1","p2","p3","p4","p5","p6","p7")';
//						stmt3 = stmt3.replace("p1", tabledata.accountMsScenarios[i].fpsi[j].brandSegment);
//						stmt3 = stmt3.replace("p2", tabledata.accountMsScenarios[i].fpsi[j].PriceMean);
//						stmt3 = stmt3.replace("p3", tabledata.accountMsScenarios[i].fpsi[j].WeekendingDate);
//						stmt3 = stmt3.replace("p4", tabledata.accountMsScenarios[i].fpsi[j].Account);
//						stmt3 = stmt3.replace("p5", tabledata.accountMsScenarios[i].fpsi[j].Company);
//						stmt3 = stmt3.replace("p6", tabledata.accountMsScenarios[i].fpsi[j].LastWeekShare);
//						scenarioType
//						stmt3 = stmt3.replace("p7", 4);
//
//						console.log("Insert query: "+stmt3);
//						conn.querySync(stmt3);
//				}
//			}
//
//			else if(tabledata.accountMsScenarios[i].scenario == 'S3'){
//
//				var stmt1 = 'DELETE FROM FPSI2 WHERE "TYPE" = 5';
//				conn.querySync(stmt1);
//				var stmt2 = 'DELETE FROM PRICINGA WHERE "TYPE" = 5';
//				conn.querySync(stmt2);
//
//				for(var j in tabledata.accountMsScenarios[i].fpsi){
//					var stmt3 = 'INSERT into "FPSI2" (BrandSegment,Price_Mean,WeekEndingDate,Account,Company,LastWeeksShare,TYPE) values ("p1","p2","p3","p4","p5","p6","p7")';
//						stmt3 = stmt3.replace("p1", tabledata.accountMsScenarios[i].fpsi[j].brandSegment);
//						stmt3 = stmt3.replace("p2", tabledata.accountMsScenarios[i].fpsi[j].PriceMean);
//						stmt3 = stmt3.replace("p3", tabledata.accountMsScenarios[i].fpsi[j].WeekendingDate);
//						stmt3 = stmt3.replace("p4", tabledata.accountMsScenarios[i].fpsi[j].Account);
//						stmt3 = stmt3.replace("p5", tabledata.accountMsScenarios[i].fpsi[j].Company);
//						stmt3 = stmt3.replace("p6", tabledata.accountMsScenarios[i].fpsi[j].LastWeekShare);
//						scenarioType
//						stmt3 = stmt3.replace("p7", 5);
//
//						console.log("Insert query: "+stmt3);
//						conn.querySync(stmt3);
//				}
//			}
//		}
		console.log(tabledata);
		viewData.Data = tabledata;

	} catch (err) {
			console.log("Error in getRunscenarioDetails :: "
					+ JSON.stringify(err));
			throw err;
		}
		return viewData;
};

/*****************************************************************************************************************************************/
/*****************************************************************************************************************************************/



