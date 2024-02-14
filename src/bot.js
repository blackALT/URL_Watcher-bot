// ===============================================================
// Author: Wanessa Souza
// Email: js2bqdb8m@mozmail.com
// GitHub: blackALT
// ===============================================================

require('dotenv').config({ silent: true, allowEmptyValues: true })
const { TELEGRAM_TOKEN } = require('./.env');
const { Telegraf, Markup } = require('telegraf');
const { message } = require('telegraf/filters');
const { menuPrincipal, startMenu, retornoBuscaError, docButton, menuDicas } = require('./views/buttons');
const { getDataBaseURL } = require('./controller/botController');
const bot = new Telegraf(TELEGRAM_TOKEN);

/**
 * Mensagens
 */

const { contactMessage, helpMessage, wellcomeMessage } = require('./views/messages.js');


bot.start(async content => {
    const from = content.update.message.from
    console.log(from)
    await content.reply(`Olá! ${from.first_name} (${from.username})`)
    await content.reply(wellcomeMessage, Markup.inlineKeyboard(menuPrincipal()))
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

/**
 * Help FAQ
 */

bot.action('help', (content) => {
    content.reply(helpMessage, Markup.inlineKeyboard(docButton()))
})

/**
 * Security tips
 */

const { wifiDicas, senhasDicas, softwareDicas, linksDicas, mobileDicas, golpesDicas, socialDicas, educacaoDicas, backupDicas } = require('./views/tipsMessages.js');


bot.action('tips', async (content, next) => {
    content.reply('Dicas sobre?', Markup.inlineKeyboard(menuDicas()))
    next();
})

bot.on(message('text'), async (content, next) => {
    const dica = await getDica()
    console.log("Dica: ", dica.id, "Descricao:", dica.descricao)
    content.replyWithMarkdown(`Dica de serurança: ${dica.descricao}`)
    next()
})

bot.action('senhas', async (content, next) => {
    content.replyWithMarkdown(senhasDicas, Markup.inlineKeyboard(menuDicas()))
    next();
})

bot.action('wifi', async (content, next) => {
    content.replyWithMarkdown(wifiDicas, Markup.inlineKeyboard(menuDicas()))
    next();
})

bot.action('software', async (content, next) => {
    content.replyWithMarkdown(softwareDicas, Markup.inlineKeyboard(menuDicas()))
    next();
})

bot.action('links', async (content, next) => {
    content.replyWithMarkdown(linksDicas, Markup.inlineKeyboard(menuDicas()))
    next();
})

bot.action('mobile', async (content, next) => {
    content.replyWithMarkdown(mobileDicas, Markup.inlineKeyboard(menuDicas()))
    next();
})

bot.action('golpes', async (content, next) => {
    content.replyWithMarkdown(golpesDicas, Markup.inlineKeyboard(menuDicas()))
    next();
})

bot.action('social', async (content, next) => {
    content.replyWithMarkdown(socialDicas, Markup.inlineKeyboard(menuDicas()))
    next();
})

bot.action('educacao', async (content, next) => {
    content.replyWithMarkdown(educacaoDicas, Markup.inlineKeyboard(menuDicas()))
    next();
})

bot.action('backup', async (content, next) => {
    content.replyWithMarkdown(backupDicas, Markup.inlineKeyboard(menuDicas()))
    next();
})


bot.action('contact', async (content, next) => {
    content.reply(contactMessage, Markup.inlineKeyboard(bottonPrincipal()))
    next()
})

/**
 * Sair
 */

bot.action('quit', async (content) => {
    content.reply('Volte sempre!', Markup.inlineKeyboard(startMenu()))
    process.once('SIGINT', () => bot.stop('SIGINT'))
})

/**
 * Voltar
 */

bot.action('start', async (content) => {
    content.reply("Bem vindo! 🏡", Markup.inlineKeyboard(menuPrincipal()))
})

module.exports = bot
