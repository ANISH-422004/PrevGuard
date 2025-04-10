const emailModel = require("../models/email.model.js");

module.exports.reciveEmail = async (req, res) => {
    try {
      console.log(req.body)

      const { to, from, subject, text, html } = req.body;
  
      const email = new emailModel({ to, from, subject, text, html });
      await email.save();
  
      res.status(200).json({ message: "Email stored successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to store email" });
    }
  }

module.exports.getEmails = async (req, res) => {
    try {
        
        const emails = await emailModel.find().sort({ receivedAt: -1 });
        res.status(200).json(emails);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch emails" });
    }
}