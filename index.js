import express from "express";

const app = express();
app.use(express.json());

// ضع التوكن و ID الخاص بك هنا
const TELEGRAM_BOT_TOKEN = "ضع_توكن_البوت_هنا";
const CHAT_ID = "ضع_رقم_المحادثة_هنا";

// استقبال الرسائل من TradingView
app.post("/tradingview-webhook", async (req, res) => {
  try {
    const { symbol, price, action, time } = req.body;

    const message = `
🔔 إشارة جديدة من TradingView:
رمز: ${symbol || "غير معروف"}
السعر: ${price || "غير معروف"}
الإجراء: ${action || "N/A"}
الوقت: ${time || new Date().toISOString()}
`;

    // إرسال الرسالة إلى Telegram
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
    });

    res.sendStatus(200);
  } catch (error) {
    console.error("خطأ أثناء إرسال الرسالة:", error);
    res.sendStatus(500);
  }
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 السيرفر يعمل على المنفذ ${PORT}`);
});
