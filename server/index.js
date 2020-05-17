const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./configs/db");
const SongWithTags = require("./songModel");

// Loading env vars
dotenv.config({ path: "./configs/config.env" });

connectDB();

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.get("/getrelevantsongs", async function handleGetRelevantSongs(req, res) {
  const { query } = req.body;

  try {
    const songs = await SongWithTags.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });
    res.status(200).json(songs);
  } catch (err) {
    console.log(err);
    res.send("ERROR");
  }
});

const server = app.listen(PORT, () => {
  console.log(
    `Server is runnng at port ${PORT} in ${process.env.NODE_ENV} mode`
  );
});

// Handle unhandled rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
