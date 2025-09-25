import express from "express";
import fetch from "node-fetch"; // Node 22+ يمكن الاستغناء عنها إذا fetch مدمج

const app = express();
app.use(express.json()); // لتحليل JSON من TradingView

// === 1️⃣ بياناتك ===
const TELEGRAM_TOKEN = "8492077880:AAFO6r_G-bWcpGrY2R49Iyz5V-jDQuTyTXM"; // توكن جديد
const CHAT_ID = "8080222077"; // chat_id الصحيح للبوت

// === 2️⃣ استقبال إشارات من TradingView ===
app.post("/webhook", async (req, res) => {
  const signal = req.body;
  console.log("وصلت إشارة جديدة:", signal);

  // فحص البيانات الأساسية
  if (!signal || !signal.symbol || !signal.action) {
    return res.status(400).json({ ok: false, error: "الإشارة غير صحيحة أو ناقصة" });
  }

  try {
    // إعداد رسالة قابلة للقراءة
    const text = `📢 إشارة جديدة من TradingView:\n` +
                 `زوج: ${signal.symbol}\n` +
                 `نوع العملية: ${signal.action}\n` +
                 `السعر: ${signal.price}\n` +
                 `TP: ${signal.tp}\n` +
                 `SL: ${signal.sl}`;

    // إرسال الرسالة للبوت
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text })
    });

    const data = await response.json();
    if (!data.ok) throw new Error(JSON.stringify(data));

    console.log("تم إرسال الإشارة للتليجرام ✅");
    res.json({ ok: true, message: "تم إرسال الإشارة إلى التليجرام ✅" });

  } catch (err) {
    console.error("خطأ في الإرسال للتليجرام:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// === 3️⃣ صفحة اختبار رئيسية ===
app.get("/", (req, res) => {
  res.send("✅ Trading Bot Server is running and ready for signals!");
});

// === 4️⃣ تشغيل السيرفر ===
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
