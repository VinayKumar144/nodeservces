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
exports.Login = function(req, res, next) {
	var post = {
		username : req.body.username,
		password : req.body.password
	};
	var data = [];
	var username = req.query.username
	var password = req.query.password;
	
	var query = connection.query("select * from doc_userslogin where UserName= '"+ req.body.username+"' AND Password='"+req.body.password+"'", function(error, rows, fields) {
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


exports.CreateUsers = function(req, res, next) {
	
	var query = connection.query("CALL GetTodayDate('"+req.body.firstName+"','"+req.body.lastName+"','"+req.body.imagePath+"','"+req.body.specilization+"','"+req.body.qualification+"','"+req.body.experience+"','"+req.body.paddress+"','"+req.body.mobile+"','"+req.body.phone+"','"+req.body.email+"','"+req.body.createdBy+"','"+req.body.dob+"','"+req.body.modifiedBy+"','"+req.body.OrgID+"','"+req.body.gender+"','"+req.body.username+"','"+req.body.password+"','"+req.body.role+"')", function(error, rows, fields) {
		if (error) {
			res.send(error.message);
		} else {
			res.send("success");
		}
	
	});
};