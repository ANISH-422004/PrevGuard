const express  =  require("express");
const axios = require("axios");

const router = express.Router();

// GET /api/proxy-breach?email=your@email.com
router.get("/proxy-breach", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email query parameter is required" });
  }

  try {
    const response = await axios.get(`https://api.xposedornot.com/v1/breach-analytics?email=${email}`);

    // Send back the exact same response
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error proxying request:", error.message);

    // If XposedOrNot fails, forward the error status and message
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

module.exports = router;
