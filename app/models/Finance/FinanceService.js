var exports = module.exports = {};
var express = require('express');
var db = require('../../Config/database.js')
var mysql = require('mysql');
var connection = mysql.createConnection(db.dbConfig);
connection.connect(function(err) {
	if (!err) {
		console.log("Database is connected ... ");
	} else {
		console.log("Error connecting database ... ",+err);
	}
});



exports.InsertFinance = function (req, res, next) {
    console.log("Finance Service:", req.body)
    var query = connection.query("INSERT INTO `doctorapp`.`finance_amount`(`idfinance_Amount`,`CustomerId`,`PaidDate`,`Amount`) VALUES ('" + req.body.Amount + "','" + req.body.CustomerId + "','" + req.body.PaidDate + "','" + req.body.PaidAmount  + "')", function (error, rows, fields) {
		if (error) {
			res.send(error.message);
		} else {
			res.send("success");
		}
	
	});
};

exports.SearchFinance = function(req, res, next) {
	var post = {
		CustomerId : req.body.CustomerId	
	};
	var data = [];
	var CustomerId = req.body.CustomerId
	var query="SELECT * FROM doctorapp.finance_amount Am where 1=1";
	var whereclause = "";
	var Orderbyclause = "";

	    if (req.body.CustomerId != "")
	        whereclause = " AND AM.CustomerId='" + req.body.CustomerId + "'";
	
	Orderbyclause = " Order by PaidDate Asc;";
	console.log("dynamic query:", query + whereclause + Orderbyclause)
	var query = connection.query(query + whereclause + Orderbyclause, function (error, rows, fields) {
		if (error) {
			res.send(error.message);
		} else {
			if(rows.length>0){
				console.log(rows);
				res.json({
					"statuscode":0,
					"data":rows,
					"statusmessage":"success"
				})
			}else{
				res.json({
					"statuscode":-1,
					"data":rows,
					"statusmessage":"User Not Found"
				})
			}
			res.json(rows)
		}
	
	});
};