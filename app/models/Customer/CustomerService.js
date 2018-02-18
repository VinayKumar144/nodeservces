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



exports.CreateCustomer = function (req, res, next) {
    console.log("CreateCustomer Service:", req.body)
    var query = connection.query("INSERT INTO finance_customer (`finance_CustomerName`, `AadharCard`, `RationCard`, `Gender`, `Mobile`, `TotalAmount`, `PaymentType`, `NoOfMorW`, `MorWAmount`) VALUES ('" + req.body.Name + "','" + req.body.AadharID + "','" + req.body.RationCard + "','" + req.body.gender + "','" + req.body.mobile + "','" + req.body.totalamount + "','" + req.body.paytype + "','" + req.body.noofWorM + "','" + req.body.weekormonthamount + "')", function (error, rows, fields) {
		if (error) {
			res.send(error.message);
		} else {
			res.send("success");
		}
	
	});
};

exports.SearchCustomer = function(req, res, next) {
	var post = {
		CustomerId : req.body.CustomerId	
	};
	var data = [];
	var CustomerId = req.query.CustomerId
	var query="SELECT * FROM doctorapp.finance_customer where 1=1";
	var whereclause = "";
	var Orderbyclause = "";
	if (req.query.CustomerId) {
	    if (req.query.CustomerId != "")
	        whereclause = " AND idfinance_Customer='" + req.query.CustomerId + "'";
	}
	Orderbyclause = " Order by CreatedDate desc;";
	console.log("dynamic query:", query + whereclause + Orderbyclause)
	var query = connection.query(query + whereclause + Orderbyclause, function (error, rows, fields) {
		if (error) {
			res.send(error.message);
		} else {
			if(rows.length>0){
				
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