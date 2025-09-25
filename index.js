import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// ضع هنا بياناتك
const TELEGRAM_TOKEN = "8492077880:AAEYjMKo6iWM6UwQCMN583catJ0kdhVBgHg";
const CHAT_ID = "8080222077";

// استقبال إشارات من TradingView
app.post("/webhook", async (req, res) => {
  const signal = req.body;

  try {
    const text = `📢 إشارة جديدة:\n${JSON.stringify(signal, null, 2)}`;
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    });

    res.json({ ok: true, message: "تم إرسال الإشارة إلى التليجرام ✅" });
  } catch (err) {
    console.error("خطأ في الإرسال إلى التليجرام:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// صفحة تجريبية للرابط الرئيسي
app.get("/", (req, res) => {
  res.send("✅ Trading Bot Server is running and ready for signals!");
});

// تشغيل السيرفر
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
