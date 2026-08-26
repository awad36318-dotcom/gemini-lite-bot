const { Telegraf } = require('telegraf');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const http = require('http');

// قراءة المفاتيح بأمان من إعدادات السحاب
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => ctx.reply('أهلاً بك في Gemini Lite! اسألني أي سؤال وسأجيبك بذكاء.'));

bot.on('text', async (ctx) => {
  try {
    const userMessage = ctx.message.text;
    await ctx.sendChatAction('typing');

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(userMessage);
    const response = await result.response;

    await ctx.reply(response.text());
  } catch (error) {
    console.error(error);
    ctx.reply('عذراً، حدث خطأ أثناء معالجة طلبك.');
  }
});

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Gemini Lite Bot is running!\n');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

bot.launch();
console.log('Gemini Lite Bot is running online 24/7!');
