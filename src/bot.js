// ===============================================================
// Author: Wanessa Souza
// Email: js2bqdb8m@mozmail.com
// GitHub: blackALT
// ===============================================================

require('dotenv').config({ silent: true, allowEmptyValues: true })
const { TELEGRAM_TOKEN } = require('./.env');
const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf(TELEGRAM_TOKEN);
const { menuPrincipal } = require('./views/buttons');
const { getDataBaseURL } = require('./controller/botController');
const { message } = require('telegraf/filters');

bot.start(content => {
    const from = content.update.message.from
    console.log(from)
    content.reply(`Olá! ${from.first_name} (${from.username})`)
    content.reply("Bem vindo!", Markup.inlineKeyboard(menuPrincipal()))
})

/**
 * Busca no Banco de Dados
 */

bot.action('search', async (content, next) => {
    content.reply('Digite ou cole a URL a ser analisada')
    let url = content.message.text;
    console.log(url)
    const response = await getDataBaseURL(url)
    console.log(response)
    content.reply(`
            Resultado:
            URL consultada: ${response.data.url}
            Status da Análise: ${response.data.analysisStatus}
            Malicioso: ${response.data.maliciousRate} %
            Suspeito: ${response.data.suspiciousRate} %
            Inofensivo: ${response.data.harmlessRate} %
        `);
    next()
})

module.exports = bot


bot.on(message('text'), async (content, next) => {
    let url = content.message.text;
    console.log("Depois de declarar a var", url)
    const response = await getDataBaseURL(url)
    console.log("Depois de receber a resposta", response)

    content.reply(`
            Resultado:
            🔍 URL consultada: ${response}

            🔴 Malicioso: ${response[1].maliciousRate} %
            🟡 Suspeito: ${response[1].suspiciousRate} %
            🔵 Inofensivo: ${response[1].harmlessRate} %

            
        `);
    next()
})