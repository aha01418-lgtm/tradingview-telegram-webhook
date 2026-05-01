

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.text({ type: "*/*" }));

// قراءة البيانات من Render Environment Variables
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// Webhook من TradingView
app.post("/webhook", async (req, res) => {
  try {

    const data = typeof req.body === "string"
      ? JSON.parse(req.body)
      : req.body;

    const {
      symbol,
      action,
      price,
      contracts,
      stop_loss_percent,
      target1_percent,
      target2_percent,
      time
    } = data;
  

const message = `
🚨 Signal Alert

${action} - ${symbol}
Price: ${price}

Contracts: ${contracts}
Stop Loss: ${stop_loss_percent}%
TP1: ${target1_percent}%
TP2: ${target2_percent}%

Time: ${time}
`;
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
