const { Telegraf } = require('telegraf');
const { GoogleGenAI } = require('@google/genai');

// ضع مفتاحك هنا بين القوسين
const ai = new GoogleGenAI({ apiKey: 'AQ.Ab8RN6IC70gtYmCvREtHAEzKG53vJSnjQjbRyxPB2xSe7osxxw' });
const bot = new Telegraf('8685172412:AAENhsvFg_jfKbn9VJkFO6T4jNrHfu-jxhA'); // بوتك على تليجرام

bot.start((ctx) => ctx.reply('أهلاً بك في Gemini Lite! اسألني أي سؤال وسأجيبك بذكاء.'));

bot.on('text', async (ctx) => {
  try {
    const userMessage = ctx.message.text;
    await ctx.sendChatAction('typing');

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
    });

    await ctx.reply(response.text);
  } catch (error) {
    console.error(error);
    ع ctx.reply('عذراً، حدث خطأ أثناء معالجة طلبك.');
  }
});

bot.launch();
console.log('Gemini Lite Bot is running online 24/7!');
