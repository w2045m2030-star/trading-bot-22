import express from 'express';
import fetch from 'node-fetch'; // لو Node.js قديم ممكن تستخدم axios بدل fetch

const app = express();
const PORT = process.env.PORT || 3000;

// إعدادات بوت التليجرام
const TELEGRAM_BOT_TOKEN = '8492077880:AAH8YiNnJswolfkF9S_md_qXseX9iXFI3bY';
const CHAT_ID = '8080222077';

app.use(express.json()); // مهم: قراءة JSON من TradingView

// نقطة استقبال إشارات TradingView
app.post('/webhook', async (req, res) => {
  try {
    const data = req.body;
    console.log('وصلت الإشارة من TradingView:', data);

    // نص الرسالة المرسل للتليجرام
    const message = data.message || JSON.stringify(data);

    // إرسال الرسالة إلى التليجرام
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
    });

    res.status(200).send('تم استلام الإشارة ✅');
  } catch (err) {
    console.error('خطأ في استقبال الإشارة:', err);
    res.status(500).send('حدث خطأ');
  }
});

// نقطة اختبار البوت (اختياري)
app.get('/test', (req, res) => {
  res.send('البوت يعمل بنجاح ✅');
});

// تشغيل السيرفر
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
