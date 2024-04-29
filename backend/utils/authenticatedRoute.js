const express = require("express");
const CognitoExpress = require("cognito-express")

const authenticatedRoute = express.Router();

//Initializing CognitoExpress constructor
const cognitoExpress = new CognitoExpress({
    region: "ap-northeast-1",
    cognitoUserPoolId: "ap-northeast-1_bK5UKG4ze",
    tokenUse: "access", //Possible Values: access | id
    tokenExpiration: 3600000 //Up to default expiration of 1 hour (3600000 ms)
});

//Our middleware that authenticates all APIs under our 'authenticatedRoute' Router
authenticatedRoute.use(function (req, res, next) {
    console.log(req.headers);
    //I'm passing in the access token in header under key accessToken
    let accessTokenFromClient = req.headers['authorization'];

    //Fail if token not present in header. 
    if (!accessTokenFromClient) return res.status(401).json({ message: "Access Token missing from header", success: false });

    cognitoExpress.validate(accessTokenFromClient, function (err, response) {

        //If API is not authenticated, Return 401 with error message. 
        if (err) return res.status(401).json({ message: err, success: false });

        //Else API has been authenticated. Proceed.
        res.locals.user = response;
        next();
    });
});

module.exports = authenticatedRoute;