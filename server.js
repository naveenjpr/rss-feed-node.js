const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
let Parser = require("rss-parser");
let parser = new Parser();
const server = express();
server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/uploads/javascript", express.static("uploads/javascript"));
const adminModel = require("./src/models/AdminModel.Schema");

//backend Api
require("./src/routes/backend/QuizApp.routes")(server);
require("./src/routes/backend/Javascript.routes")(server);
require("./src/routes/backend/ReactNotes.routes")(server);
require("./src/routes/backend/Node_js.routes")(server);
require("./src/routes/backend/WordPress.routes")(server);
require("./src/routes/backend/HTML_CSS.routes ")(server);
require("./src/routes/backend/English.routes")(server);
require("./src/routes/backend/livewebsite.routes")(server);
require("./src/routes/backend/adminAuth.routes")(server);
require("./src/routes/backend/Menka.routes")(server);
require("./src/routes/backend/Nextjs.routes")(server);
require("./src/routes/backend/AWS.routes")(server);
require("./src/routes/backend/TypeScript.routes")(server);
require("./src/routes/backend/Github.routes")(server);
require("./src/routes/backend/SQL.routes")(server);
require("./src/routes/backend/Angular.routes")(server);

// frontend api
require("./src/routes/frontend/Javascript.routes")(server);
require("./src/routes/frontend/ReactNotes.routes")(server);
require("./src/routes/frontend/Node_js.routes")(server);
require("./src/routes/frontend/WordPress.routes")(server);
require("./src/routes/frontend/authentication.routes")(server);
require("./src/routes/frontend/HTML_CSS.routes")(server);
require("./src/routes/frontend/English.routes")(server);
require("./src/routes/frontend/livewebsite.routes")(server);

server.get("/", (request, response) => {
  response.send("Server Working Fine.....");
});

// server.get("/rss", async (req, res) => {
//   try {
//     // RSS फीड URLs
//     const feedUrls = [
//       "https://nsearchives.nseindia.com/content/RSS/Corporate_action.xml",
//       "https://nsearchives.nseindia.com/content/RSS/Daily_Buyback.xml",
//       "https://nsearchives.nseindia.com/content/RSS/Voting_Results.xml",
//       "https://www.indiatv.in/rssnews/topstory.xml",
//     ]

//     let allItems = []

//     // सभी RSS फीड्स को प्रोसेस करें
//     for (const url of feedUrls) {
//       try {
//         const feed = await parser.parseURL(url)
//         // console.log("Fetching Feed:", feed.title)

//         const items = feed.items.map((item) => {
//           let imageUrl = ""

//           // Check different possible sources for image URL
//           if (item.enclosure && item.enclosure.url) {
//             imageUrl = item.enclosure.url
//           } else if (item["media:content"] && item["media:content"].url) {
//             imageUrl = item["media:content"].url
//           } else {
//             // Extract image from description HTML
//             const regex = /<img[^>]+src="([^">]+)"/g
//             const match = regex.exec(item.content || item.description)
//             if (match) {
//               imageUrl = match[1] // Extracted image URL
//             }
//           }

//           return {
//             title: item.title,
//             link: item.link,
//             pubDate: item.pubDate,
//             source: feed.title, // Feed का नाम जोड़ें
//             imageUrl: imageUrl || "https://via.placeholder.com/150",
//           }
//         })

//         allItems = [...allItems, ...items] // सभी आर्टिकल्स को मर्ज करें
//       } catch (feedError) {
//         console.error(`Error fetching ${url}:`, feedError)
//       }
//     }

//     // JSON फॉर्मेट में डेटा भेजें
//     res.json({ items: allItems })
//   } catch (err) {
//     console.error("Error fetching RSS feeds:", err)
//     res.status(500).json({ error: "Failed to fetch RSS feeds" })
//   }
// })

server.get("*", (request, response) => {
  response.send("Page not found.....");
});

mongoose
  .connect(
    "mongodb+srv://naveensainijpr:Gionee123@cluster0.fdq1d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(async () => {
    const checkAdmin = await adminModel.find();
    if (checkAdmin.length == 0) {
      let admin = await adminModel({
        adminName: "admin",
        adminPassword: "admin123",
      });
      await admin.save();
    }

    server.listen("5000", () => {
      console.log("Database Connected!");
    });
  })
  .catch((error) => {
    console.log("Database Not Connected!" + error);
  });

//naveensainijpr
//Gionee123
