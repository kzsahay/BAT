
var daoConst = require('./constants.js');
var async = require('async');



exports.getTableDetails = function(conn, viewData, req) {
	try {

		var tabledata = {"accountName": "", "marketshareForecasts": []};
		var marketshareForecasts = {"scenario":"", "priceScenario": [], "mshareTrend": []};
		
		var k = 0; m =0; n = 0;

		var stmt1 = "select * from PRICINGA";
		// var stmt1 = "select * from FPSI2";
		var priceS = conn.querySync(stmt1);
		var priceS_data = JSON.parse(JSON.stringify(priceS));
		// console.log("pricescenario -->" + JSON.stringify(priceS_data));
		

		
		async.series([
		        //Scenario: Base
				function(callback) {
					var arraynew = [];
					for (var i in priceS_data) {
						if(priceS_data[i].Account == "VALORA    "){
							tabledata.accountName = "VALORA";

							if(priceS_data[i].TYPE == "B "){

								marketshareForecasts.scenario = "Base"
								var pricescenario = {"brandName": "", "brandPrice": ""};

								pricescenario.brandName = priceS_data[i].BrandSegment;
								pricescenario.brandPrice = priceS_data[i].Price_Mean;

								arraynew[k++] = pricescenario;
								if(i>0){
									if(priceS_data[i].BrandSegment == priceS_data[i-1].BrandSegment){
										arraynew.splice(k-1, 1);
										console.log("Inside")
										
									}
								}

								var mshareTrend = {"weekNum": "", "mshare": ""};
								mshareTrend.weekNum = i+1;//priceS_data[i].$TI_TimeLabel;
								mshareTrend.mshare = priceS_data[i].Share_Sum;
								// console.log(mshareTrend)
								marketshareForecasts.mshareTrend[m++] = mshareTrend;

							}
						}
					}

					for(var i in arraynew){
						if(arraynew[i]!= undefined){
							marketshareForecasts.priceScenario[n++] = arraynew[i];
						}
					}
						
					tabledata.marketshareForecasts.push(marketshareForecasts);
					callback(null, 1);
				}, 
				
				//Scenario: Corporate Price
				function(callback) {
					var arraynew = [];
					for (var i in priceS_data) {
						if(priceS_data[i].Account == "VALORA    "){
							tabledata.accountName = "VALORA";

							if(priceS_data[i].TYPE == "C "){

								marketshareForecasts.scenario = "Corporate Price"
								var pricescenario = {"brandName": "", "brandPrice": ""};

								pricescenario.brandName = priceS_data[i].BrandSegment;
								pricescenario.brandPrice = priceS_data[i].Price_Mean;

								arraynew[k++] = pricescenario;
								if(i>0){
									if(priceS_data[i].BrandSegment == priceS_data[i-1].BrandSegment){
										arraynew.splice(k-1, 1);
										console.log("Inside")
										
									}
								}

								var mshareTrend = {"weekNum": "", "mshare": ""};
								mshareTrend.weekNum = i+1;//priceS_data[i].$TI_TimeLabel;
								mshareTrend.mshare = priceS_data[i].Share_Sum;
								// console.log(mshareTrend)
								marketshareForecasts.mshareTrend[m++] = mshareTrend;

							}
						}
					}

					for(var i in arraynew){
						if(arraynew[i]!= undefined){
							marketshareForecasts.priceScenario[n++] = arraynew[i];
						}
					}
						
					tabledata.marketshareForecasts.push(marketshareForecasts);
					callback(null, 2);
					
				},
				
				//Scenario: S1
				function(callback) {
					var arraynew = [];
					for (var i in priceS_data) {
						if(priceS_data[i].Account == "VALORA    "){
							tabledata.accountName = "VALORA";

							if(priceS_data[i].TYPE == "S1 "){

								marketshareForecasts.scenario = "Corporate Price"
								var pricescenario = {"brandName": "", "brandPrice": ""};

								pricescenario.brandName = priceS_data[i].BrandSegment;
								pricescenario.brandPrice = priceS_data[i].Price_Mean;

								arraynew[k++] = pricescenario;
								if(i>0){
									if(priceS_data[i].BrandSegment == priceS_data[i-1].BrandSegment){
										arraynew.splice(k-1, 1);
										console.log("Inside")
										
									}
								}

								var mshareTrend = {"weekNum": "", "mshare": ""};
								mshareTrend.weekNum = i+1;//priceS_data[i].$TI_TimeLabel;
								mshareTrend.mshare = priceS_data[i].Share_Sum;
								// console.log(mshareTrend)
								marketshareForecasts.mshareTrend[m++] = mshareTrend;

							}
						}
					}

					for(var i in arraynew){
						if(arraynew[i]!= undefined){
							marketshareForecasts.priceScenario[n++] = arraynew[i];
						}
					}
						
					tabledata.marketshareForecasts.push(marketshareForecasts);
					callback(null, 3);
					
				},
				
				//Scenario: S2
				function(callback) {
					var arraynew = [];
					for (var i in priceS_data) {
						if(priceS_data[i].Account == "VALORA    "){
							tabledata.accountName = "VALORA";

							if(priceS_data[i].TYPE == "S2 "){

								marketshareForecasts.scenario = "S2"
								var pricescenario = {"brandName": "", "brandPrice": ""};

								pricescenario.brandName = priceS_data[i].BrandSegment;
								pricescenario.brandPrice = priceS_data[i].Price_Mean;

								arraynew[k++] = pricescenario;
								if(i>0){
									if(priceS_data[i].BrandSegment == priceS_data[i-1].BrandSegment){
										arraynew.splice(k-1, 1);
										console.log("Inside")
										
									}
								}

								var mshareTrend = {"weekNum": "", "mshare": ""};
								mshareTrend.weekNum = i+1;//priceS_data[i].$TI_TimeLabel;
								mshareTrend.mshare = priceS_data[i].Share_Sum;
								// console.log(mshareTrend)
								marketshareForecasts.mshareTrend[m++] = mshareTrend;

							}
						}
					}

					for(var i in arraynew){
						if(arraynew[i]!= undefined){
							marketshareForecasts.priceScenario[n++] = arraynew[i];
						}
					}
						
					tabledata.marketshareForecasts.push(marketshareForecasts);
					callback(null, 4);
					
				},
				
				//Scenario: S3
				function(callback) {
					var arraynew = [];
					for (var i in priceS_data) {
						if(priceS_data[i].Account == "VALORA    "){
							tabledata.accountName = "VALORA";

							if(priceS_data[i].TYPE == "S3 "){

								marketshareForecasts.scenario = "S3"
								var pricescenario = {"brandName": "", "brandPrice": ""};

								pricescenario.brandName = priceS_data[i].BrandSegment;
								pricescenario.brandPrice = priceS_data[i].Price_Mean;

								arraynew[k++] = pricescenario;
								if(i>0){
									if(priceS_data[i].BrandSegment == priceS_data[i-1].BrandSegment){
										arraynew.splice(k-1, 1);
										console.log("Inside")
										
									}
								}

								var mshareTrend = {"weekNum": "", "mshare": ""};
								mshareTrend.weekNum = i+1;//priceS_data[i].$TI_TimeLabel;
								mshareTrend.mshare = priceS_data[i].Share_Sum;
								// console.log(mshareTrend)
								marketshareForecasts.mshareTrend[m++] = mshareTrend;

							}
						}
					}

					for(var i in arraynew){
						if(arraynew[i]!= undefined){
							marketshareForecasts.priceScenario[n++] = arraynew[i];
						}
					}
						
					tabledata.marketshareForecasts.push(marketshareForecasts);
					callback(null, 5);
					
				}], function(err) {
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


