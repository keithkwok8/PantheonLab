const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");

const authenticatedRoute = require("./utils/authenticatedRoute.js");
const unsplashSearch = require("./functions/unsplashSearch.js");
const pixabaySearch = require("./functions/pixabaySearch.js");
const storyBlockSearch = require("./functions/storyBlockSearch.js");

const app = express();

app.use(cors());
app.use("/api", authenticatedRoute);

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
