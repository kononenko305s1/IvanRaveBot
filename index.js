const { Telegraf, Markup } = require('telegraf')
const { message } = require('telegraf/filters')
require('dotenv').config()
const text = require("./const")


const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => {
  ctx.reply(`Привет ${ctx.message.from.first_name ? ctx.message.from.first_name : 'Странник'}`)
  console.log(ctx.message)
})

bot.help((ctx) => ctx.reply(text.commands))

bot.hears(
  [
    'ты гей?',
    'Ты гей?',
    'ты гей',
    'Ты гей',
    'гей?',
    'Гей?',
    'гей',
    'Гей',
    'а ты гей?',
    'А ты гей?',
    'А ты гей',
    'а ты гей',
  ],
  (ctx) => {
    ctx.reply('Сама гей ' + ctx.message.from.first_name)
  })

bot.command('gey', async (ctx) => {

  try {
    await ctx.replyWithHTML('<u>Или может ты гей? сашечка</u>', Markup.inlineKeyboard(
      [
        [Markup.button.callback('кнопка_1', 'btn_1'), Markup.button.callback('кнопка_2', 'btn_2')],
        [Markup.button.callback('кнопка_3', 'btn_3')]
      ]
    ))


    function actionButton(name, href, text) {
      bot.action(name, async (ctx) => {
        try {

          await ctx.answerCbQuery()

          if (href !== false) {
            await ctx.replyWithPhoto({
              source: href
            })
          }

          if (text !== false) {
            await ctx.replyWithHTML(text, {
              disable_web_page_preview: true
            })
          }
          docu

        } catch (e) {
          console.error(e)
        }
      })
    }

    actionButton('btn_1', 'img/1.jpg', text.text1)
    actionButton('btn_2', 'img/2.jpg', false)
    actionButton('btn_3', false, text.text3)


  } catch (e) {
    console.error(e)
  }


})

bot.launch()



process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))


