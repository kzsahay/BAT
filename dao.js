
var daoConst = require('./constants.js');
var async = require('async');
var request = require('request');

//function to choose company
function getCompanyForBrand(brandName) {
    var company;
    switch(brandName.toUpperCase()) {
        case "CHESTERFIELD":
        case "L&M":
        case "MARLBORO":
            company = "PH. MORRIS";
            break;
        case "PALL MALL":
        case "PARISIENNE":
            company = "BAT";
            break
        default:
            company = "JTI";
    }
    return company;    
}


//loading db tables slide 6
exports.getTableDetails = function(conn, viewData, req) {
	try {

		var tabledata = {"accountName": "", "marketshareForecasts": []};
		var t = 0;
		tabledata.accountName = "VALORA";
		var data22 = [];
		async.series([
		        //Scenario: Base
				function(callback) {
					var arraynew = [];
					var marketshareForecasts = {"scenario":"", "priceScenario": [], "mshareTrend": []};
					var k = 0; m =0; n = 0; j=1;
					marketshareForecasts.scenario = "B";

					var fore = 1; typ = "1";
					var acc = "VALORA";
					var stmt1 = 'SELECT "BrandSegment", "Price_Mean", "WeekEndingDate", "TS_Share_Sum" FROM PRICINGA WHERE "Forecast" = 1 and "Account" = p2 and "TYPE" = p3';
					stmt1 = stmt1.replace("p1", fore); 
					stmt1 = stmt1.replace("p2", "'" + acc + "'"); 
					stmt1 = stmt1.replace("p3", "'" + typ + "'"); 
					console.log("Select query: "+stmt1);
					data22 = conn.querySync(stmt1);
					console.log("query result: "+JSON.stringify(data22));

					for (var i in data22){
						var pricescenario = {"brandName": "", "brandPrice": ""};

						pricescenario.brandName = data22[i].BrandSegment;
						pricescenario.brandPrice = data22[i].Price_Mean;
						arraynew[k++] = pricescenario;
						if(i>0){
									if(data22[i].BrandSegment == data22[i-1].BrandSegment)
										arraynew.splice(k-1, 1);	
								}
					}
					for(var i in arraynew){
						if(arraynew[i]!= undefined)
							marketshareForecasts.priceScenario[n++] = arraynew[i];
					}

					var weekdata= []; s=0;

					for (var i in data22){
						if(data22[i].BrandSegment == "CHESTERFIELD"){
							weekdata[s++]= data22[i].WeekEndingDate;
						}		
					}

					for(var p in weekdata){
						var marketshare = 0.0;
						for (var i in data22){
							if(data22[i].WeekEndingDate == weekdata[p] && getCompanyForBrand(data22[i].BrandSegment) == "BAT"){
								console.log("Share ::"+data22[i].TS_Share_Sum);
								marketshare = marketshare + data22[i].TS_Share_Sum;
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
					marketshareForecasts.scenario = "C";

					var fore = 1; typ = "2";
					var acc = "VALORA";
					var stmt1 = 'SELECT "BrandSegment", "Price_Mean", "WeekEndingDate", "TS_Share_Sum" FROM PRICINGA WHERE "Forecast" = 1 and "Account" = p2 and "TYPE" = p3';
					stmt1 = stmt1.replace("p1", fore); 
					stmt1 = stmt1.replace("p2", "'" + acc + "'"); 
					stmt1 = stmt1.replace("p3", "'" + typ + "'"); 
					console.log("Select query: "+stmt1);
					data22 = conn.querySync(stmt1);
					console.log("query result: "+JSON.stringify(data22));

					for (var i in data22){
						var pricescenario = {"brandName": "", "brandPrice": ""};

						pricescenario.brandName = data22[i].BrandSegment;
						pricescenario.brandPrice = data22[i].Price_Mean;
						arraynew[k++] = pricescenario;
						if(i>0){
									if(data22[i].BrandSegment == data22[i-1].BrandSegment)
										arraynew.splice(k-1, 1);	
								}
					}
					for(var i in arraynew){
						if(arraynew[i]!= undefined)
							marketshareForecasts.priceScenario[n++] = arraynew[i];
					}

					var weekdata= []; s=0;

					for (var i in data22){
						if(data22[i].BrandSegment == "CHESTERFIELD"){
							weekdata[s++]= data22[i].WeekEndingDate;
						}		
					}

					for(var p in weekdata){
						var marketshare = 0.0;
						for (var i in data22){
							if(data22[i].WeekEndingDate == weekdata[p] && getCompanyForBrand(data22[i].BrandSegment) == "BAT"){
								console.log("Share ::"+data22[i].TS_Share_Sum);
								marketshare = marketshare + data22[i].TS_Share_Sum;
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
				//Scenario: S1
				function(callback) {
					var arraynew = [];
					var marketshareForecasts = {"scenario":"", "priceScenario": [], "mshareTrend": []};
					var k = 0; m =0; n = 0; j=1;
					marketshareForecasts.scenario = "S1";

					var fore = 1; typ = "3";
					var acc = "VALORA";
					var stmt1 = 'SELECT "BrandSegment", "Price_Mean", "WeekEndingDate", "TS_Share_Sum" FROM PRICINGA WHERE "Forecast" = 1 and "Account" = p2 and "TYPE" = p3';
					stmt1 = stmt1.replace("p1", fore); 
					stmt1 = stmt1.replace("p2", "'" + acc + "'"); 
					stmt1 = stmt1.replace("p3", "'" + typ + "'"); 
					console.log("Select query: "+stmt1);
					data22 = conn.querySync(stmt1);
					console.log("query result: "+JSON.stringify(data22));

					for (var i in data22){
						var pricescenario = {"brandName": "", "brandPrice": ""};

						pricescenario.brandName = data22[i].BrandSegment;
						pricescenario.brandPrice = data22[i].Price_Mean;
						arraynew[k++] = pricescenario;
						if(i>0){
									if(data22[i].BrandSegment == data22[i-1].BrandSegment)
										arraynew.splice(k-1, 1);	
								}
					}
					for(var i in arraynew){
						if(arraynew[i]!= undefined)
							marketshareForecasts.priceScenario[n++] = arraynew[i];
					}

					var weekdata= []; s=0;

					for (var i in data22){
						if(data22[i].BrandSegment == "CHESTERFIELD"){
							weekdata[s++]= data22[i].WeekEndingDate;
						}		
					}

					for(var p in weekdata){
						var marketshare = 0.0;
						for (var i in data22){
							if(data22[i].WeekEndingDate == weekdata[p] && getCompanyForBrand(data22[i].BrandSegment) == "BAT"){
								console.log("Share ::"+data22[i].TS_Share_Sum);
								marketshare = marketshare + data22[i].TS_Share_Sum;
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
				//Scenario: S2
				function(callback) {
					var arraynew = [];
					var marketshareForecasts = {"scenario":"", "priceScenario": [], "mshareTrend": []};
					var k = 0; m =0; n = 0; j=1;
					marketshareForecasts.scenario = "S2";

					var fore = 1; typ = "4";
					var acc = "VALORA";
					var stmt1 = 'SELECT "BrandSegment", "Price_Mean", "WeekEndingDate", "TS_Share_Sum" FROM PRICINGA WHERE "Forecast" = 1 and "Account" = p2 and "TYPE" = p3';
					stmt1 = stmt1.replace("p1", fore); 
					stmt1 = stmt1.replace("p2", "'" + acc + "'"); 
					stmt1 = stmt1.replace("p3", "'" + typ + "'"); 
					console.log("Select query: "+stmt1);
					data22 = conn.querySync(stmt1);
					console.log("query result: "+JSON.stringify(data22));

					for (var i in data22){
						var pricescenario = {"brandName": "", "brandPrice": ""};

						pricescenario.brandName = data22[i].BrandSegment;
						pricescenario.brandPrice = data22[i].Price_Mean;
						arraynew[k++] = pricescenario;
						if(i>0){
									if(data22[i].BrandSegment == data22[i-1].BrandSegment)
										arraynew.splice(k-1, 1);	
								}
					}
					for(var i in arraynew){
						if(arraynew[i]!= undefined)
							marketshareForecasts.priceScenario[n++] = arraynew[i];
					}

					var weekdata= []; s=0;

					for (var i in data22){
						if(data22[i].BrandSegment == "CHESTERFIELD"){
							weekdata[s++]= data22[i].WeekEndingDate;
						}		
					}

					for(var p in weekdata){
						var marketshare = 0.0;
						for (var i in data22){
							if(data22[i].WeekEndingDate == weekdata[p] && getCompanyForBrand(data22[i].BrandSegment) == "BAT"){
								console.log("Share ::"+data22[i].TS_Share_Sum);
								marketshare = marketshare + data22[i].TS_Share_Sum;
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
					marketshareForecasts.scenario = "S3";

					var fore = 1; typ = "5";
					var acc = "VALORA";
					var stmt1 = 'SELECT "BrandSegment", "Price_Mean", "WeekEndingDate", "TS_Share_Sum" FROM PRICINGA WHERE "Forecast" = 1 and "Account" = p2 and "TYPE" = p3';
					stmt1 = stmt1.replace("p1", fore); 
					stmt1 = stmt1.replace("p2", "'" + acc + "'"); 
					stmt1 = stmt1.replace("p3", "'" + typ + "'"); 
					console.log("Select query: "+stmt1);
					data22 = conn.querySync(stmt1);
					console.log("query result: "+JSON.stringify(data22));

					for (var i in data22){
						var pricescenario = {"brandName": "", "brandPrice": ""};

						pricescenario.brandName = data22[i].BrandSegment;
						pricescenario.brandPrice = data22[i].Price_Mean;
						arraynew[k++] = pricescenario;
						if(i>0){
									if(data22[i].BrandSegment == data22[i-1].BrandSegment)
										arraynew.splice(k-1, 1);	
								}
					}
					for(var i in arraynew){
						if(arraynew[i]!= undefined)
							marketshareForecasts.priceScenario[n++] = arraynew[i];
					}

					var weekdata= []; s=0;

					for (var i in data22){
						if(data22[i].BrandSegment == "CHESTERFIELD"){
							weekdata[s++]= data22[i].WeekEndingDate;
						}		
					}

					for(var p in weekdata){
						var marketshare = 0.0;
						for (var i in data22){
							if(data22[i].WeekEndingDate == weekdata[p] && getCompanyForBrand(data22[i].BrandSegment) == "BAT"){
								console.log("Share ::"+data22[i].TS_Share_Sum);
								marketshare = marketshare + data22[i].TS_Share_Sum;
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
		
		if(scenario == "B")
			type = 1; 
		else if(scenario == "C")
			type = 2;
		else if(scenario == "S1")
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
								forecasts.sum_share = priceS_data[i].TS_Share_Sum;
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
								forecasts.sum_share = priceS_data[i].TS_Share_Sum;
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
			
				var accountMsScenarios = {"scenario": "", "fpsi": []};
				accountMsScenarios.scenario = bodydata.accountMsScenarios.marketPrices[k].scenario;
				
				for(var i in bodydata.accountMsScenarios.marketPrices[k].priceScenario){
					
					var SDate = new Date("2015-12-28");
					// var SDate = new Date("December, 28, 2015");
					
					for(var j=0; j<13; j++){
						var fpsi = {"brandSegment":"", "PriceMean": "","WeekendingDate": "", "Account": "", "Company": "", "LastWeekShare": "", "scenarioType": ""}
						
						fpsi.brandSegment = bodydata.accountMsScenarios.marketPrices[k].priceScenario[i].brandName;
						fpsi.PriceMean = bodydata.accountMsScenarios.marketPrices[k].priceScenario[i].brandPrice;
						fpsi.Account = "VALORA";
						fpsi.scenarioType = bodydata.accountMsScenarios.marketPrices[k].scenario;
						fpsi.WeekendingDate = SDate.toISOString().split("Z")[0].split("T").join(" ");
						
						switch(bodydata.accountMsScenarios.marketPrices[k].priceScenario[i].brandName){

							case "CHESTERFIELD": 
								 fpsi.Company = "PH. MORRIS";
								 fpsi.LastWeekShare = 8.483;
								 break;
							case "L & M":
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

						accountMsScenarios.fpsi.push(fpsi);
						// var SDate = new Date(new Date(SDate).setDate(SDate.getDate()+7));
						var SDate = new Date(new Date(SDate).setDate(SDate.getDate()+7));
						// console.log(SDate)
					}
				}

				tabledata.accountMsScenarios.push(accountMsScenarios);
		}
		
		async.series([
						function(callback) {
							for(var i in tabledata.accountMsScenarios){
								if(tabledata.accountMsScenarios[i].scenario == 'S1'){

									var stmt1 = "DELETE from FPSI2 where 'TYPE' = '3'";
									console.log("Delete query: "+stmt1);
									conn.querySync(stmt1);
									var stmt2 = "DELETE from PRICINGA where 'TYPE' = '3'";
									console.log("Delete query: "+stmt2);
									conn.querySync(stmt2);

									for(var j in tabledata.accountMsScenarios[i].fpsi){
										if(typeof(tabledata.accountMsScenarios[i].fpsi[j].PriceMean) != undefined){
											var stmt3 = 'INSERT into FPSI2 ("BrandSegment","Price_Mean","WeekEndingDate","Account","Company","LastWeeksShare","TYPE") values (p1,p2,p3,p4,p5,p6,p7)';
												stmt3 = stmt3.replace("p1", "'" + tabledata.accountMsScenarios[i].fpsi[j].brandSegment + "'");
												stmt3 = stmt3.replace("p2", tabledata.accountMsScenarios[i].fpsi[j].PriceMean);
												stmt3 = stmt3.replace("p3", "'" + tabledata.accountMsScenarios[i].fpsi[j].WeekendingDate + "'");
												stmt3 = stmt3.replace("p4", "'" + tabledata.accountMsScenarios[i].fpsi[j].Account + "'");
												stmt3 = stmt3.replace("p5", "'" + tabledata.accountMsScenarios[i].fpsi[j].Company + "'");
												stmt3 = stmt3.replace("p6", tabledata.accountMsScenarios[i].fpsi[j].LastWeekShare);
												stmt3 = stmt3.replace("p7", 3);   

												console.log("Insert query: "+stmt3);
												conn.querySync(stmt3);
										}
									}
								}
							}
						callback(null, 1);
						},
						//Calling webservice model
						function(callback) {
							setTimeout(function() {
							var data = { 
									     "action": "RUN_STREAM", 
									     "model": { 
									          "id": "Test500",
										   "name": "Forecast500.str" 
									     },
									     "dbDefinitions":{
									          "db":{        
									                    "type":"DashDB",
									                    "host":"awh-yp-small02.services.dal.bluemix.net",        
									                    "port":50000,        
									                    "db":"BLUDB", 
									                    "username":"dash111694",  
									                    "password":"rCQLbpEUsJ2y", 
									                    "options":""      
									               	}
									     		},

											"setting": {          
									          "inputs": [
									                    {
									                        "node":"DASH111694.FDI2",
									                        "odbc": {
									                                   "dbRef":"db",
									                                   "table":"FDI2"
									                        }         
									                    },
									                     {
									                        "node":"DASH111694.FPSI2",
									                        "odbc": {
									                                   "dbRef":"db",
									                                   "table":"FPSI2"
									                        }         
									                    }
									         	     ],	

											"exports": [

											{
									          		"node":"PRICINGA",
									          		"odbc": {
									               			"dbRef": "db",
									               			"table": "PRICINGA",
									               			"insertMode":"Append"
									          			}
											}
											]
									    	}
									}
							var accesskeyparam = "ZMhopLpoYOvYCCsYmJe9TBvQ2/rJ7aHQfAhuY+1TE61JoCHtLPTmpb44A4GbQXtuHxGxQ3pIogjgEOjN0TGDTcL0h32gVzPkwMbmHXNpi+GX9hfcutByXhZFQ1WwLmIYoKH4gpzPQFCvssG01JM6ebZljd7ba0U2jjCzctnklGw=";
							request({
								    url: 'https://palbyp.pmservice.ibmcloud.com/pm/v1/jobs/Test500',
								    qs: {accesskey: accesskeyparam},
								    headers: {
						                    'Content-Type': 'application/json'
						            },
								    // timeout: 100000,
					  				body: data,
					  				method: 'PUT',
					  				json: true
								    
								}, function (error, response, body) {
									if(!error)
										console.log(JSON.stringify(body));
									else
										console.log(error);
							});
						callback(null, 2);	
						},5000);
						},
						//Check status of webservice
						function(callback) {
							setTimeout(function(){
								var status;
								var refreshId = setInterval(function(){	
									var accesskeyparam = "ZMhopLpoYOvYCCsYmJe9TBvQ2/rJ7aHQfAhuY+1TE61JoCHtLPTmpb44A4GbQXtuHxGxQ3pIogjgEOjN0TGDTcL0h32gVzPkwMbmHXNpi+GX9hfcutByXhZFQ1WwLmIYoKH4gpzPQFCvssG01JM6ebZljd7ba0U2jjCzctnklGw=";
									request({
										    url: 'https://palbyp.pmservice.ibmcloud.com/pm/v1/jobs/Test500',
										    qs: {accesskey: accesskeyparam},
										    // timeout: 1000,
							  				method: 'GET',
							  				json: true
										    
										}, function (error, response, body) {
											if(!error){
												console.log(JSON.stringify(body));
												// if(typeof(body)!= undefined){
												if(body.hasOwnProperty('result')){
													status = body.result.jobStatus;
													console.log("jobStatus:: "+status);
													if(status == "SUCCESS"){
														clearInterval(refreshId);
														var stmt1 = 'UPDATE PRICINGA SET "TYPE" = 3 WHERE "TYPE" IS NULL';		
														console.log("Update query: "+stmt1);
														conn.querySync(stmt1);
													}
												}
											}
											else
												console.log(error);
									});
									
									
								}, 5000);
		
								callback(null, 3);	
							},5000);
						},
						function(callback) {
							setTimeout(function() {
							for(var i in tabledata.accountMsScenarios){
								if(tabledata.accountMsScenarios[i].scenario == 'S2'){

									var stmt1 = "DELETE from FPSI2 where 'TYPE' = '4'";
									console.log("Delete query: "+stmt1);
									conn.querySync(stmt1);
									var stmt2 = "DELETE from PRICINGA where 'TYPE' = '4'";
									console.log("Delete query: "+stmt2);
									conn.querySync(stmt2);

									for(var j in tabledata.accountMsScenarios[i].fpsi){
										if(typeof(tabledata.accountMsScenarios[i].fpsi[j].PriceMean) != undefined){
											var stmt3 = 'INSERT into FPSI2 ("BrandSegment","Price_Mean","WeekEndingDate","Account","Company","LastWeeksShare","TYPE") values (p1,p2,p3,p4,p5,p6,p7)';
												stmt3 = stmt3.replace("p1", "'" + tabledata.accountMsScenarios[i].fpsi[j].brandSegment + "'");
												stmt3 = stmt3.replace("p2", tabledata.accountMsScenarios[i].fpsi[j].PriceMean);
												stmt3 = stmt3.replace("p3", "'" + tabledata.accountMsScenarios[i].fpsi[j].WeekendingDate + "'");
												stmt3 = stmt3.replace("p4", "'" + tabledata.accountMsScenarios[i].fpsi[j].Account + "'");
												stmt3 = stmt3.replace("p5", "'" + tabledata.accountMsScenarios[i].fpsi[j].Company + "'");
												stmt3 = stmt3.replace("p6", tabledata.accountMsScenarios[i].fpsi[j].LastWeekShare);
												stmt3 = stmt3.replace("p7", 4);   

												console.log("Insert query: "+stmt3);
												conn.querySync(stmt3);
										}
									}
								}
							}
						callback(null, 4);
						}, 10000); 
						},
						//Calling webservice model
						function(callback) {
							setTimeout(function() {
							var data = { 
									     "action": "RUN_STREAM", 
									     "model": { 
									          "id": "Test500",
										   "name": "Forecast500.str" 
									     },
									     "dbDefinitions":{
									          "db":{        
									                    "type":"DashDB",
									                    "host":"awh-yp-small02.services.dal.bluemix.net",        
									                    "port":50000,        
									                    "db":"BLUDB", 
									                    "username":"dash111694",  
									                    "password":"rCQLbpEUsJ2y", 
									                    "options":""      
									               	}
									     		},

											"setting": {          
									          "inputs": [
									                    {
									                        "node":"DASH111694.FDI2",
									                        "odbc": {
									                                   "dbRef":"db",
									                                   "table":"FDI2"
									                        }         
									                    },
									                     {
									                        "node":"DASH111694.FPSI2",
									                        "odbc": {
									                                   "dbRef":"db",
									                                   "table":"FPSI2"
									                        }         
									                    }
									         	     ],	

											"exports": [

											{
									          		"node":"PRICINGA",
									          		"odbc": {
									               			"dbRef": "db",
									               			"table": "PRICINGA",
									               			"insertMode":"Append"
									          			}
											}
											]
									    	}
									}
							var accesskeyparam = "ZMhopLpoYOvYCCsYmJe9TBvQ2/rJ7aHQfAhuY+1TE61JoCHtLPTmpb44A4GbQXtuHxGxQ3pIogjgEOjN0TGDTcL0h32gVzPkwMbmHXNpi+GX9hfcutByXhZFQ1WwLmIYoKH4gpzPQFCvssG01JM6ebZljd7ba0U2jjCzctnklGw=";
							request({
								    url: 'https://palbyp.pmservice.ibmcloud.com/pm/v1/jobs/Test500',
								    qs: {accesskey: accesskeyparam},
								    headers: {
						                    'Content-Type': 'application/json'
						            },
								    // timeout: 100000,
					  				body: data,
					  				method: 'PUT',
					  				json: true
								    
								}, function (error, response, body) {
									if(!error)
										console.log(JSON.stringify(body));
									else
										console.log(error);
							});
						callback(null, 5);	
						},5000);
						},
						//Check status of webservice
						function(callback) {
							setTimeout(function(){
								var status;
								var refreshId = setInterval(function(){	
									var accesskeyparam = "ZMhopLpoYOvYCCsYmJe9TBvQ2/rJ7aHQfAhuY+1TE61JoCHtLPTmpb44A4GbQXtuHxGxQ3pIogjgEOjN0TGDTcL0h32gVzPkwMbmHXNpi+GX9hfcutByXhZFQ1WwLmIYoKH4gpzPQFCvssG01JM6ebZljd7ba0U2jjCzctnklGw=";
									request({
										    url: 'https://palbyp.pmservice.ibmcloud.com/pm/v1/jobs/Test500',
										    qs: {accesskey: accesskeyparam},
										    // timeout: 1000,
							  				method: 'GET',
							  				json: true
										    
										}, function (error, response, body) {
											if(!error){
												console.log(JSON.stringify(body));
												if(body.hasOwnProperty('result')){
													status = body.result.jobStatus;
													console.log("jobStatus:: "+status);
													if(status == "SUCCESS"){
														clearInterval(refreshId);
														var stmt1 = 'UPDATE PRICINGA SET "TYPE" = 4 WHERE "TYPE" IS NULL';		
														console.log("Update query: "+stmt1);
														conn.querySync(stmt1);
													}
												}
											}
											else
												console.log(error);
									});
									
									
								}, 5000);
		
								callback(null, 6);	
							},5000);
						},
						function(callback) {
							setTimeout(function() {
								for(var i in tabledata.accountMsScenarios){
									if(tabledata.accountMsScenarios[i].scenario == 'S3'){

										var stmt1 = "DELETE from FPSI2 where 'TYPE' = '5'";
										console.log("Delete query: "+stmt1);
										conn.querySync(stmt1);
										var stmt2 = "DELETE from PRICINGA where 'TYPE' = '5'";
										console.log("Delete query: "+stmt2);
										conn.querySync(stmt2);

										for(var j in tabledata.accountMsScenarios[i].fpsi){
											if(typeof(tabledata.accountMsScenarios[i].fpsi[j].PriceMean) != undefined){
												var stmt3 = 'INSERT into FPSI2 ("BrandSegment","Price_Mean","WeekEndingDate","Account","Company","LastWeeksShare","TYPE") values (p1,p2,p3,p4,p5,p6,p7)';
													stmt3 = stmt3.replace("p1", "'" + tabledata.accountMsScenarios[i].fpsi[j].brandSegment + "'");
													stmt3 = stmt3.replace("p2", tabledata.accountMsScenarios[i].fpsi[j].PriceMean);
													stmt3 = stmt3.replace("p3", "'" + tabledata.accountMsScenarios[i].fpsi[j].WeekendingDate + "'");
													stmt3 = stmt3.replace("p4", "'" + tabledata.accountMsScenarios[i].fpsi[j].Account + "'");
													stmt3 = stmt3.replace("p5", "'" + tabledata.accountMsScenarios[i].fpsi[j].Company + "'");
													stmt3 = stmt3.replace("p6", tabledata.accountMsScenarios[i].fpsi[j].LastWeekShare);
													stmt3 = stmt3.replace("p7", 5);

													console.log("Insert query: "+stmt3);
													conn.querySync(stmt3);
											}
										}
									}
								}
							callback(null, 7);
							}, 10000);
						},
						//Calling webservice model
						function(callback) {
							setTimeout(function() {
							var data = { 
									     "action": "RUN_STREAM", 
									     "model": { 
									          "id": "Test500",
										   "name": "Forecast500.str" 
									     },
									     "dbDefinitions":{
									          "db":{        
									                    "type":"DashDB",
									                    "host":"awh-yp-small02.services.dal.bluemix.net",        
									                    "port":50000,        
									                    "db":"BLUDB", 
									                    "username":"dash111694",  
									                    "password":"rCQLbpEUsJ2y", 
									                    "options":""      
									               	}
									     		},

											"setting": {          
									          "inputs": [
									                    {
									                        "node":"DASH111694.FDI2",
									                        "odbc": {
									                                   "dbRef":"db",
									                                   "table":"FDI2"
									                        }         
									                    },
									                     {
									                        "node":"DASH111694.FPSI2",
									                        "odbc": {
									                                   "dbRef":"db",
									                                   "table":"FPSI2"
									                        }         
									                    }
									         	     ],	

											"exports": [

											{
									          		"node":"PRICINGA",
									          		"odbc": {
									               			"dbRef": "db",
									               			"table": "PRICINGA",
									               			"insertMode":"Append"
									          			}
											}
											]
									    	}
									}
							var accesskeyparam = "ZMhopLpoYOvYCCsYmJe9TBvQ2/rJ7aHQfAhuY+1TE61JoCHtLPTmpb44A4GbQXtuHxGxQ3pIogjgEOjN0TGDTcL0h32gVzPkwMbmHXNpi+GX9hfcutByXhZFQ1WwLmIYoKH4gpzPQFCvssG01JM6ebZljd7ba0U2jjCzctnklGw=";
							request({
								    url: 'https://palbyp.pmservice.ibmcloud.com/pm/v1/jobs/Test500',
								    qs: {accesskey: accesskeyparam},
								    headers: {
						                    'Content-Type': 'application/json'
						            },
								    // timeout: 100000,
					  				body: data,
					  				method: 'PUT',
					  				json: true
								    
								}, function (error, response, body) {
									if(!error)
										console.log(JSON.stringify(body));
									else
										console.log(error);
							});
						callback(null, 8);	
						},5000);
						},
						//Check status of webservice
						function(callback) {
							setTimeout(function(){
								var status;
								var refreshId = setInterval(function(){	
									var accesskeyparam = "ZMhopLpoYOvYCCsYmJe9TBvQ2/rJ7aHQfAhuY+1TE61JoCHtLPTmpb44A4GbQXtuHxGxQ3pIogjgEOjN0TGDTcL0h32gVzPkwMbmHXNpi+GX9hfcutByXhZFQ1WwLmIYoKH4gpzPQFCvssG01JM6ebZljd7ba0U2jjCzctnklGw=";
									request({
										    url: 'https://palbyp.pmservice.ibmcloud.com/pm/v1/jobs/Test500',
										    qs: {accesskey: accesskeyparam},
										    // timeout: 1000,
							  				method: 'GET',
							  				json: true
										    
										}, function (error, response, body) {
											if(!error){
												console.log(JSON.stringify(body));
												if(body.hasOwnProperty('result')){
													status = body.result.jobStatus;
													console.log("jobStatus:: "+status);
													if(status == "SUCCESS"){
														clearInterval(refreshId);
														var stmt1 = 'UPDATE PRICINGA SET "TYPE" = 5 WHERE "TYPE" IS NULL';		
														console.log("Update query: "+stmt1);
														conn.querySync(stmt1);
													}
												}
											}
											else
												console.log(error);
									});
									
									
								}, 5000);
								
								callback(null, 9);	
							},5000);
						}
						], function(err) {
							if (!err) {
								console.log(tabledata);
							} else {
								console.log(JSON.stringify(err));
							}

						});

		console.log(tabledata);
		var success = {
			"Alert": "Run Scenario Succesfull"
		}
		viewData.Data = success;

	} catch (err) {
			console.log("Error in getRunscenarioDetails :: "
					+ JSON.stringify(err));
			throw err;
		}
		return viewData;
};

/*****************************************************************************************************************************************/
/*****************************************************************************************************************************************/



