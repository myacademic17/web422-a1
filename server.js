/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Humaira Shaikh Student ID: 139877203 Date: Jan 24, 2024
*  Cyclic Link: 
*
********************************************************************************/ 


const express = require("express");
const cors = require("cors");

require('dotenv').config();

var app = express();

app.use(express.json());
app.use(cors());


const CompaniesDB = require("./modules/companiesDB.js");
const db = new CompaniesDB();

const HTTP_PORT = process.env.PORT || 8080;



// connecting to the server
db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});

// create a new company 
app.post("/api/companies", (req,res) => {
    myData.addNewCompany(req.body)
    .then(() => {
            res.status(201).json(`new company successfully added`);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

//  GET// route accepts the numeric query parameters "page" and "perPage"
app.get("/api/companies", (req,res) => {
    myData.getAllCompanies(req.query.page, req.query.perPage)
        .then((company) => {
            res.status(200).json(company);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

// GET // route accepts a route parameter that represents the id of the desired company object
app.get("/api/companies/:id", (req,res) => {
    myData.getSaleByCompany(req.params.id)
        .then((companies) => {
            res.status(200).json(companies);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

// PUT // route accepts a route parameter that represents the id of the desired company object
app.put("/api/companies/:id", (req,res) => {
    myData.updateCompanyById(req.body, req.params.id)
        .then(() => {
            res.status(200).json(`Company ${req.body._id} successfully updated`);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

// DELETE // route must accept a route parameter that represents the id of the desired company object
app.delete("/api/companies/:id", (req,res) => {
    myData.deleteCompanyById(req.params.id)
        .then(() => {
            res.status(200).json(`Company ${req.params.id} successfully deleted`);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

// Initialize the Service & Start the Server

myData.initialize().then(()=>{
    app.listen(HTTP_PORT,()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});

