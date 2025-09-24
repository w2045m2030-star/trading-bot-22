import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// التوكن والـ ID
const TELEGRAM_TOKEN = "8492077880:AAFLY_UAzKSWunVkocwS5M-Sr49v1XA85B8";
const CHAT_ID = "8080222077"; // ID حقك

// دالة إرسال رسالة إلى تليجرام
async function sendToTelegram(message) {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
    }),
  });
}

// صفحة اختبار
app.get("/", (req, res) => {
  res.send("🚀 البوت شغال ومربوط بـ Telegram");
});

// Webhook من TradingView
app.post("/webhook", async (req, res) => {
  console.log("📩 Webhook received:", req.body);

  try {
    let msg = "📊 إشارة جديدة من TradingView:\n" + JSON.stringify(req.body, null, 2);
    await sendToTelegram(msg);
    res.status(200).send("تم الإرسال ✅");
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).send("فشل الإرسال ❌");
  }
});

// تشغيل السيرفر
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 السيرفر يعمل على المنفذ ${PORT}`);
  sendToTelegram("✅ السيرفر بدأ ويستقبل الإشارات الآن");
});
