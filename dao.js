
var daoConst = require('./constants.js');




exports.getTableDetails = function(conn, viewData, req) {
	try {

		var tabledata = {"accountName": "", "marketshareForecasts": []};
		var marketshareForecasts = {"scenario":"", "priceScenario": [], "mshareTrend": []};
		
		var mshareTrend = {"weekNum": "", "mshare": ""};
		
		var k = 0; m =0;

		var stmt1 = "select * from PRICINGA";
		var priceS = conn.querySync(stmt1);
		var priceS_data = JSON.parse(JSON.stringify(priceS));
		// console.log("pricescenario -->" + JSON.stringify(priceS_data));
		
		for (var i in priceS_data) {
			if(priceS_data[i].Account == "VALORA    "){
				tabledata.accountName = "VALORA";

				if(priceS_data[i].TYPE == "B "){

					marketshareForecasts.scenario = "Base"
					var pricescenario = {"brandName": "", "brandPrice": ""};
					var arraynew = [];

					pricescenario.brandName = priceS_data[i].BrandSegment;
					pricescenario.brandPrice = priceS_data[i].Price_Mean;

					marketshareForecasts.priceScenario[k++] = pricescenario;
					// if(i>0){
					// 	if(priceS_data[i].BrandSegment == priceS_data[i-1].BrandSegment){
					// 		marketshareForecasts.priceScenario.splice(k-1, 1);
					// 	}
					// }

					var mshareTrend = {"weekNum": "", "mshare": ""};
					
						mshareTrend.weekNum = i;//priceS_data[i].$TI_TimeLabel;
						mshareTrend.mshare = priceS_data[i].Share_Sum;
						console.log(mshareTrend)
						marketshareForecasts.mshareTrend[k++] = mshareTrend;
					
				}

				

				// if(priceS_data[i].TYPE == "C "){

				// 	marketshareForecasts.scenario = "Corporate Price"
				// 	var pricescenario = {"brandName": "", "brandPrice": ""};
				// 	var arraynew = [];

				// 	pricescenario.brandName = priceS_data[i].BrandSegment;
				// 	pricescenario.brandPrice = priceS_data[i].Price_Mean;

				// 	marketshareForecasts.priceScenario[k++] = pricescenario;
				// 	// if(i>0){
				// 	// 	if(priceS_data[i].BrandSegment == priceS_data[i-1].BrandSegment){
				// 	// 		marketshareForecasts.priceScenario.splice(k-1, 1);
				// 	// 	}
				// 	// }

				// 	var mshareTrend = {"weekNum": "", "mshare": ""};
				// 	mshareTrend.weekNum = i;//priceS_data[i].$TI_TimeLabel;
				// 	mshareTrend.mshare = priceS_data[i].Share_Sum;

				// 	marketshareForecasts.mshareTrend[k++] = mshareTrend;

				// 	tabledata.marketshareForecasts.push(marketshareForecasts)

				// }
			}
		}
		
			tabledata.marketshareForecasts.push(marketshareForecasts)
		// for(var i in marketshareForecasts.priceScenario){
		// 	if(marketshareForecasts.priceScenario[i]!= undefined){
		// 		marketshareForecasts.priceScenario[m++] = marketshareForecasts.priceScenario[i];
		// 	}
		// }
		
		


		viewData.Data = tabledata;

	} catch (err) {
		console.log("Error in getTableDetails :: "
				+ JSON.stringify(err));
		throw err;
	}
	return viewData;
};


