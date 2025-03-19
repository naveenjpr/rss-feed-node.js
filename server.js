const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
let Parser = require("rss-parser")
let parser = new Parser()
const server = express()
server.use(cors())

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.get("/", (request, response) => {
  response.send("Server Working Fine.....")
})

server.get("/rss", async (req, res) => {
  try {
    // RSS फीड URLs
    const feedUrls = [
      "https://www.gsmarena.com/rss-news-reviews.php3",
      "https://www.espncricinfo.com/rss/content/story/feeds/6.xml",
      "https://feeds.feedburner.com/TechCrunch/",
      "https://www.indiatv.in/rssnews/topstory.xml",
    ]

    let allItems = []

    // सभी RSS फीड्स को प्रोसेस करें
    for (const url of feedUrls) {
      try {
        const feed = await parser.parseURL(url)
        // console.log("Fetching Feed:", feed.title)

        const items = feed.items.map((item) => {
          let imageUrl = ""

          // Check different possible sources for image URL
          if (item.enclosure && item.enclosure.url) {
            imageUrl = item.enclosure.url
          } else if (item["media:content"] && item["media:content"].url) {
            imageUrl = item["media:content"].url
          } else {
            // Extract image from description HTML
            const regex = /<img[^>]+src="([^">]+)"/g
            const match = regex.exec(item.content || item.description)
            if (match) {
              imageUrl = match[1] // Extracted image URL
            }
          }

          return {
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            source: feed.title, // Feed का नाम जोड़ें
            imageUrl: imageUrl || "https://via.placeholder.com/150",
          }
        })

        allItems = [...allItems, ...items] // सभी आर्टिकल्स को मर्ज करें
      } catch (feedError) {
        console.error(`Error fetching ${url}:`, feedError)
      }
    }

    // console.log("Processed Items:", JSON.stringify(allItems, null, 2)) // Debugging

    // JSON फॉर्मेट में डेटा भेजें
    res.json({ items: allItems })
  } catch (err) {
    console.error("Error fetching RSS feeds:", err)
    res.status(500).json({ error: "Failed to fetch RSS feeds" })
  }
})

// server.get("/rss", async (req, res) => {
//   try {
//     // RSS फीड URL
//     const feed = await parser.parseURL(
//       "https://www.gsmarena.com/rss-news-reviews.php3"
//     )

//     console.log("Feed Title:", feed.title)

//     // सभी आर्टिकल्स को एक्सट्रैक्ट करें
//     const items = feed.items.map((item) => {
//       let imageUrl = ""

//       // Check different possible sources for image URL
//       if (item.enclosure && item.enclosure.url) {
//         imageUrl = item.enclosure.url
//       } else if (item["media:content"] && item["media:content"].url) {
//         imageUrl = item["media:content"].url
//       } else {
//         // Extract image from description HTML
//         const regex = /<img[^>]+src="([^">]+)"/g
//         const match = regex.exec(item.content || item.description)
//         if (match) {
//           imageUrl = match[1] // Extracted image URL
//         }
//       }

//       return {
//         title: item.title,
//         link: item.link,
//         pubDate: item.pubDate,
//         imageUrl: imageUrl || "https://via.placeholder.com/150", // Default image
//       }
//     })

//     console.log("Processed Items:", JSON.stringify(items, null, 2)) // Debugging

//     // JSON फॉर्मेट में डेटा भेजें
//     res.json({ title: feed.title, items })
//   } catch (err) {
//     console.error("Error fetching RSS feed:", err)
//     res.status(500).json({ error: "Failed to fetch RSS feed" })
//   }
// })

server.get("*", (request, response) => {
  response.send("Page not found.....")
})

mongoose
  .connect(
    "mongodb+srv://naveensainijpr:Gionee123@cluster0.fdq1d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    server.listen("5000", () => {
      console.log("Database Connected!")
    })
  })
  .catch((error) => {
    console.log("Database Not Connected!" + error)
  })

//naveensainijpr
//Gionee123
