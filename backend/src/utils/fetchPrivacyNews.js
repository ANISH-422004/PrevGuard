const cron = require("node-cron");
const axios = require("axios");
const blogModel = require("../models/blog.model");
const { NEWS_API_KEY } = require("../config/config");

const fetchAndSaveNews = async () => {
  try {
    const res = await axios.get(`https://newsapi.org/v2/everything?q=privacy&sortBy=publishedAt&pageSize=1&apiKey=${NEWS_API_KEY}`);
    const article = res.data.articles[0];

    const blog = new blogModel({
      title: article.title,
      content: article.description,
      source: article.url,
      image: article.urlToImage,
      datePublished: new Date(article.publishedAt),
      tags: ["privacy", "news"],
    });

    await blog.save();
    console.log("✅ blogModel post saved!");
  } catch (error) {
    console.error("❌ Error fetching/saving blog:", error.message);
  }
};

// Schedule: every Monday at 9 AM
cron.schedule("0 9 * * 1", fetchAndSaveNews);
