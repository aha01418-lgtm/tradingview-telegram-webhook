const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const TELEGRAM_BOT_TOKEN = "حط_توكن_البوت";
const CHAT_ID = "حط_ايدي_التليجرام";

app.post("/webhook", async (req, res) => {
  const message = JSON.stringify(req.body);

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    await axios.post(url, {
      chat_id: CHAT_ID,
      text: message
    });

    res.send("Sent to Telegram");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/", (req, res) => {
  res.send("TradingView Telegram Webhook Running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.get("/test-option", async (req, res) => {
  try {
    const symbol = "QQQ";
    const side = "call";

    res.json({
      success: true,
      symbol: symbol,
      side: side,
      message: "Option search test ready"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});
