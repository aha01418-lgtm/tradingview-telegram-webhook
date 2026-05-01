const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

// قراءة البيانات من Render Environment Variables
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// Webhook من TradingView
app.post("/webhook", async (req, res) => {
  try {
    const message = JSON.stringify(req.body, null, 2);

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    await axios.post(url, {
      chat_id: CHAT_ID,
      text: message
    });

    res.send("Sent to Telegram");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// صفحة اختبار
app.get("/", (req, res) => {
  res.send("TradingView Telegram Webhook Running");
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
