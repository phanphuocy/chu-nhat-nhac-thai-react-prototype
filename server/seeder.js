const dotenv = require("dotenv");
const contentful = require("contentful");
const mongoose = require("mongoose");

dotenv.config({ path: "./configs/config.env" });

const SongWithTags = require("./songModel");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const Client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTUL_TOKEN,
});

const getData = async () => {
  var songEntries = [];

  const res = await Client.getEntries();

  res.items.forEach((item) => {
    if (item.sys.contentType.sys.id === "songs") {
      var artists = [];
      item.fields.artists.forEach((artist) => artists.push(artist.fields.name));
      songEntries.push({
        title: item.fields.titleVi || item.fields.titleEn,
        slug: item.fields.slug,
        tags: [item.fields.titleEn, ...artists],
      });
    }
  });

  return songEntries;
};

// Import into DB
const importData = async () => {
  try {
    const songs = await getData();
    await SongWithTags.create(songs);
    console.log(`Data populated...`);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// Delete DB
const deleteData = async () => {
  try {
    await SongWithTags.deleteMany();
    console.log(`Data destroyed...`);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};
if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
