var express = require('express');
var UserApisRouter  = express.Router();
var loginservice = require("./models/User/UserService.js")
var eventservice = require("./models/Events/eventService.js")
var customerservice = require("./models/Customer/CustomerService.js")
var Financeservice = require("./models/Finance/FinanceService.js")
module.exports = function(app) {
	
	app.use(function(err, req, res, next) {
		if (err) {
			res.status(err.status || 500);
			res.send('error', {
				message : err.message,
				error : err.body,
				statuscode : err.status
			});
		}
	});

	app.all('/*', function(req, res, next) {
		// CORS headers
		res.header("Access-Control-Allow-Origin", "*");
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
		if (req.method == 'OPTIONS') {
			res.status(200).end();
		} else {
			next();
		}
	});

	//UsersAPI
	UserApisRouter.post("/UserSettings/Login", loginservice.Login);
	UserApisRouter.post("/UserSettings/CreateUsers", loginservice.CreateUsers);
	UserApisRouter.post("/Events/eventList", eventservice.eventList);
	UserApisRouter.post("/Events/CreateEventList", eventservice.CreateEventList);
	UserApisRouter.post("/Customer/CreateCustomer", customerservice.CreateCustomer);
	UserApisRouter.post("/Customer/SearchCustomer", customerservice.SearchCustomer);
	UserApisRouter.post("/Finance/InsertFinance", Financeservice.InsertFinance);
	UserApisRouter.post("/Finance/SearchFinance", Financeservice.SearchFinance);
	/*Moule wise Main Routers */
	app.use('/DoctorsApis/API/', UserApisRouter);
	

}