const { Telegraf } = require('telegraf');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI('AQ.Ab8RN6IC70gtYmCvREtHAEzKG53vJSnjQjbRyxPB2xSe7osxxw');
const bot = new Telegraf('8685172412:AAENhsvFg_jfKbn9VJkFO6T4jNrHfu-jxhA');

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

bot.launch();
console.log('Gemini Lite Bot is running online 24/7!');
