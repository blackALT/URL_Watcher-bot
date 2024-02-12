// ===============================================================
// Author: Wanessa Souza
// Email: js2bqdb8m@mozmail.com
// GitHub: blackALT
// ===============================================================

require('dotenv').config({ silent: true, allowEmptyValues: true })
const { TELEGRAM_TOKEN } = require('./.env');
const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf(TELEGRAM_TOKEN);
const { menuPrincipal, startMenu, retornoBuscaError } = require('./views/buttons');
const { getDataBaseURL } = require('./controller/botController');
const { message } = require('telegraf/filters');

bot.start(async content => {
    const from = content.update.message.from
    console.log(from)
    await content.reply(`Olá! ${from.first_name} (${from.username})`)
    await content.reply("Bem vindo! 🏡", Markup.inlineKeyboard(menuPrincipal()))
})

/**
 * Busca no Banco de Dados
 */

bot.action('search', async (content, next) => {
    content.reply('Digite a URL ...')
    next()
    bot.on(message('text'), async (content) => {
        let url = content.message.text;
        console.log(url)

        const response = await getDataBaseURL(url)
        console.log(response)

        if (response.length === 0) {
            content.reply(`
            🚨 URL não encontrada em nossa Base de Dados.
            
            1) Verifique se a URL está correta e tente novamente.            
                                OU            
            2) Submeta a URL para análise. (Tempo de análise dura até 15 minutos)

             `, Markup.inlineKeyboard(retornoBuscaError()))
        } else {
            for (let i in response) {
                content.reply(`

                🔗 *URL analisada:* ${response[i].url}
    
                Resultado baseado em *sandbox online:*
    
                🔴 *Malicioso:* ${response[i].maliciousRate} %
                🟡 *Suspeito:* ${response[i].suspiciousRate} %
                🔵 *Inofensivo:* ${response[i].harmlessRate} %
    
                > Fique atento aos golpes na Internet!
                `, { parse_mode: 'Markdown' });

            }
            content.reply('Voltar ao menu principal 🏡', Markup.inlineKeyboard(startMenu()))
        }
    })
})

bot.action('quit', async (content) => {
    content.reply('Volte sempre!', Markup.inlineKeyboard(startMenu()))
    process.once('SIGINT', () => bot.stop('SIGINT'))
})

bot.action('start', async (content) => {
    content.reply("Bem vindo! 🏡", Markup.inlineKeyboard(menuPrincipal()))
})

module.exports = bot

/*/
bot.on(message('text'), async (content, next) => {
    let url = content.message.text;
    console.log("Depois de declarar a var", url)
    const response = await getDataBaseURL(url)
    console.log("Depois de receber a resposta", response)
    console.log(typeof (response))

    content.reply(`
            Resultado:
            🔗 *URL consultada:* ${url}

            🔴 #Malicioso: ${maliciousRate} %
            🟡 #Suspeito: ${response} %
            🔵 #Inofensivo: ${response} %

            
        `);
    next()
})
*/