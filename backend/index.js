const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const CognitoExpress = require("cognito-express")

const unsplashSearch = require("./functions/unsplashSearch.js");
const pixabaySearch = require("./functions/pixabaySearch.js");
const storyBlockSearch = require("./functions/storyBlockSearch.js");

const app = express();
const authenticatedRoute = express.Router();

app.use(cors());

app.use("/api", authenticatedRoute);

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

authenticatedRoute.get("/photo/search", async (req, res) => {
    const { keyWord } = req.query;

    // Check if keyWord is missing
    if (!keyWord) {
        return res.status(400).json({ message: "Missing keyWord parameter", success: false });
    }

    // Using Promise.all to run all functions concurrently
    // and then flatten the array of arrays into a single array
    const results = await Promise.all([
        unsplashSearch(keyWord),
        pixabaySearch(keyWord),
        storyBlockSearch(keyWord),
    ]);

    // Return the response
    return res.status(200).json({
        message: "success",
        success: true,
        data: results.flat(),
    });
});

// Ping route
app.get("/", (_req, res) => {
    return res.status(200).json({
        message: "Hello from root!",
    });
});

module.exports.handler = serverless(app);
