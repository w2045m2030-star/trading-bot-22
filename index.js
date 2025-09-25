// index.js
import express from "express";

const app = express();

// لإرسال JSON بسهولة
app.use(express.json());

// مسار رئيسي للاختبار
app.get("/", (req, res) => {
  res.send("🚀 السيرفر شغال 100% على Render!");
});

// بورت السيرفر (Render يمرره في process.env.PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
