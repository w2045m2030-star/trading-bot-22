const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(bodyParser.json());

// بيانات بوت التلجرام
const TELEGRAM_BOT_TOKEN = "8492077880:AAH8YiNnJswolfkF9S_md_qXseX9iXFI3bY";
const TELEGRAM_CHAT_ID = "8080222077";

// دالة إرسال الرسائل إلى تلجرام
async function sendToTelegram(message) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    }),
  });
}

// Webhook endpoint
app.post("/webhook", async (req, res) => {
  console.log("Received signal:", req.body);

  // نص الرسالة للتلجرام
  const signalMessage = `🚨 إشارة جديدة 🚨
الرمز: ${req.body.symbol || "غير محدد"}
العملية: ${req.body.action || "?"}
السعر: ${req.body.price || "?"}`;

  // إرسالها للتلجرام
  await sendToTelegram(signalMessage);

  res.status(200).send("Signal received and sent to Telegram ✅");
});

// تشغيل السيرفر
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
