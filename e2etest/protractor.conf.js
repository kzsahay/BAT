//protractor.conf.js
exports.config = {

  allScriptsTimeout: 51000,

  specs: [
    '*-bat-spec.js'
  ],

  multiCapabilities: [{
    'browserName': 'chrome',
	'name': ' BAT Login Test -Chrome'
  },
{
    'browserName': 'firefox',
	'name': ' BAT Login Test Firefox'
  }],
sauceUser: 'shaileshagarwal',
sauceKey: '54e88738-b884-443f-844e-4b5fe95f23d5',

  baseUrl: 'http://batobacco.mybluemix.net/',

  framework: 'jasmine',
  onPrepare: function() {
    var JasmineConsoleReporter = require('jasmine-console-reporter');
	var reporter = new JasmineConsoleReporter({
		colors: 1,           // (0|false)|(1|true)|2 
		cleanStack: 1,       // (0|false)|(1|true)|2|3 
		verbosity: 4,        // (0|false)|1|2|(3|true)|4 
		listStyle: 'indent', // "flat"|"indent" 
		activity: false
	});
    jasmine.getEnv().addReporter(reporter);
	},

  jasmineNodeOpts: {
    defaultTimeoutInterval: 50000
  }

};