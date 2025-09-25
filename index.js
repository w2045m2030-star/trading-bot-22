import express from "express";
import fetch from "node-fetch"; // إذا Node 22+ تقدر تحذفه

const app = express();
app.use(express.json()); // مهم جدًا لتحليل JSON من TradingView

// 1️⃣ ضع هنا بياناتك
const TELEGRAM_TOKEN = "8492077880:AAEYjMKo6iWM6UwQCMN583catJ0kdhVBgHg";
const CHAT_ID = "8080222077";

// 2️⃣ استقبال إشارات من TradingView
app.post("/webhook", async (req, res) => {
  const signal = req.body;
  console.log("وصلت إشارة جديدة:", signal); // مهم جدًا للتأكد من وصول البيانات

  if (!signal || !signal.symbol || !signal.action) {
    return res.status(400).json({ ok: false, error: "الإشارة غير صحيحة" });
  }

  try {
    // تحويل الإشارة إلى رسالة مقروءة
    const text = `📢 إشارة جديدة من TradingView:\n` +
                 `زوج: ${signal.symbol}\n` +
                 `نوع العملية: ${signal.action}\n` +
                 `السعر: ${signal.price}\n` +
                 `TP: ${signal.tp}\n` +
                 `SL: ${signal.sl}`;

    // إرسال الرسالة للتليجرام
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text })
    });

    const data = await response.json();
    if (!data.ok) throw new Error(JSON.stringify(data));

    res.json({ ok: true, message: "تم إرسال الإشارة إلى التليجرام ✅" });
  } catch (err) {
    console.error("خطأ في الإرسال للتليجرام:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// 3️⃣ صفحة تجريبية للرابط الرئيسي
app.get("/", (req, res) => {
  res.send("✅ Trading Bot Server is running and ready for signals!");
});

// 4️⃣ تشغيل السيرفر
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
