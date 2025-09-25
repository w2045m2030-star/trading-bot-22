
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

// إعدادات بوت التليجرام
const TELEGRAM_BOT_TOKEN = '8492077880:AAH8YiNnJswolfkF9S_md_qXseX9iXFI3bY';
const CHAT_ID = '8080222077';

app.use(express.json());

let queue = [];
let isSending = false;

app.post('/webhook', (req, res) => {
  const data = req.body;
  const message = data.message || JSON.stringify(data);
  queue.push(message);
  res.status(200).send('تم استلام الإشارة ✅');
  processQueue();
});

async function processQueue() {
  if (isSending || queue.length === 0) return;
  isSending = true;

  while (queue.length > 0) {
    const msg = queue.shift();
    await sendToTelegram(msg);
    await delay(1500);
  }

  isSending = false;
}

async function sendToTelegram(message) {
  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  await fetch(telegramUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.get('/test', (req, res) => {
  res.send('البوت يعمل بنجاح ✅');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
