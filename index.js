import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
app.use(bodyParser.json());

const TELEGRAM_TOKEN = "8492077880:AAH8YiNnJswolfkF9S_md_qXseX9iXFI3bY";
const CHAT_ID = "8080222077";

app.post("/webhook", async (req, res) => {
  try {
    const alertMessage = JSON.stringify(req.body, null, 2);

    // إرسال الرسالة إلى التلجرام
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: `🚨 تنبيه من TradingView:\n\n${alertMessage}`,
      }),
    });

    res.status(200).send("Alert received and sent to Telegram ✅");
  } catch (error) {
    console.error("Error sending alert:", error);
    res.status(500).send("Error");
  }
});

app.get("/", (req, res) => {
  res.send("🚀 Bot server is running!");
});

app.listen(10000, () => {
  console.log("Server is running on port 10000");
});
