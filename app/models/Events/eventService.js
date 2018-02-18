var exports = module.exports = {};
var express = require('express');
var db = require('../../Config/database.js')
var mysql = require('mysql');
var connection = mysql.createConnection(db.dbConfig);

exports.eventList = function(req, res, next) {
	var query = connection.query("SELECT * FROM doctorapp.doc_events", function(error, rows, fields) {
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
					"statusmessage":"Data Not Found"
				})
			}
			res.json(rows)
		}	
	});

};

exports.CreateEventList = function(req, res, next) {
	//console.log(req);
	console.log("INSERT INTO doctorapp.doc_events(EvenName,StartDate,EndDate,EventDescription,CreatedBy,CreatedDate,ModifiedBy,ModifiedDate) VALUES('"+ req.body.EventName+"','"+ req.body.StartDate+"','"+ req.body.EndDate+"','"+ req.body.EventDescription+"','"+ req.body.CreatedBy+"''"+ req.body.CreatedDate+"''"+ req.body.ModifiedBy+"''"+ req.body.ModifiedDate+"')");
	var query = connection.query("INSERT INTO doctorapp.doc_events(EvenName,StartDate,EndDate,EventDescription,CreatedBy,CreatedDate,ModifiedBy,ModifiedDate) VALUES('"+ req.body.EventName+"','"+ req.body.StartDate+"','"+ req.body.EndDate+"','"+ req.body.EventDescription+"','"+ req.body.CreatedBy+"','"+ req.body.CreatedDate+"','"+ req.body.ModifiedBy+"','"+ req.body.ModifiedDate+"')", function(error, rows, fields) {
		if (error) {
			res.send(error.message);
		} else {
			res.json({
					"statuscode":0,
					"statusmessage":"success"
				})
		}	
	});

};