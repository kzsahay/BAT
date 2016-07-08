
var daoConst = require('./constants.js');




exports.getTableDetails = function(conn, viewData, req) {
	try {

		var tabledata = {"accountName": "", "marketshareForecasts": []};
		var marketshareForecasts = {"scenario":"", "priceScenario": [], "mshareTrend": []};
		var pricescenario = {"brandName": "", "brandPrice": ""};
		var mshareTrend = {"weekNum": "", "mshare": ""};
		var arraynew = [];

		var stmt1 = "select BrandSegment, Price_Mean from FPSI2 where Account = 'VALORA' and TYPE = 'B'";
		var priceS = conn.querySync(stmt1);
		var priceS_data = JSON.parse(JSON.stringify(priceS));
		 console.log("pricescenario -->" + JSON.stringify(priceS_data));
		
//		marketshareForecasts.scenario = "Base";
//		for (var i in priceS_data) {
//			pricescenario.brandName = priceS_data[i].BrandSegment;
//			pricescenario.brandPrice = priceS_data[i].Price_Mean;
//			
//			console.log(pricescenario)
//			arraynew.push(pricescenario);
//			// if(i>0){
//			// 	if(arraynew[i].brandName == arraynew[i-1].brandName){
//			// 		arraynew.splice(i);
//			// 	}
//			// }
//			
//		}
//			console.log(arraynew)
//			marketshareForecasts.priceScenario = arraynew;
//		
//		tabledata.accountName = "VALORA";
//		tabledata.marketshareForecasts.push(marketshareForecasts)


		// for (var i in locationdetail_data) {
		// 	detailsobj.Location[i] = locationdetail_data[i].CITY;
		// }
		
		viewData.Data = priceS_data;

	} catch (err) {
		console.log("Error in getTableDetails :: "
				+ JSON.stringify(err));
		throw err;
	}
	return viewData;
};


