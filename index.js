import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
app.use(bodyParser.json());

// Webhook من TradingView
app.post("/webhook", async (req, res) => {
  console.log("📩 Received signal:", req.body);

  let action = req.body.action || "";
  if (["BUY", "SELL", "CLOSE"].includes(action)) {
    fs.writeFileSync("signals.txt", action); // نكتب الإشارة في ملف
    console.log(`✅ Signal saved to file: ${action}`);
  } else {
    console.log("⚠️ Invalid signal, ignored.");
  }import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("🚀 السيرفر شغال 100%، مستعد يستقبل الإشارات!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


  res.status(200).send("Signal processed ✅");
});

// تشغيل السيرفر
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
