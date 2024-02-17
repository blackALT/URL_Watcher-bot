// ===============================================================
// Author: Wanessa Souza
// Email: js2bqdb8m@mozmail.com
// GitHub: blackALT
// ===============================================================

require('dotenv').config({ silent: true, allowEmptyValues: true })
const { TELEGRAM_TOKEN } = require('../.env');
const { Telegraf, Markup } = require('telegraf');
const { message } = require('telegraf/filters');
const { menuPrincipal, startMenu, retornoBuscaError, docButton, menuDicas, webAPIData } = require('./views/buttons');
const { getDataBaseURL, getLatestHour, getLatestDay, postAnalisysVT, getAnalysisVT } = require('./controller/botController');
const { contactMessage, helpMessage, wellcomeMessage, urlNotFound } = require('./views/messages.js');
const bot = new Telegraf(TELEGRAM_TOKEN);

/**
 * Início
 */

bot.start(async content => {
    const from = content.update.message.from
    console.log(from)
    content.reply(`Olá! ${from.first_name} (${from.username}`)
    content.reply(wellcomeMessage, Markup.inlineKeyboard(menuPrincipal()))
})

/**
 * Busca VirusTotal
 */

bot.action('new', async (content, next) => {
    stopEaring = false;
    if (!stopEaring) {
        content.reply('🔍 Digite a URL ...')

        let url = content.message.text;

        const encodedParams = new URLSearchParams();
        encodedParams.set('url', url);

        stopEaring = true;
        next();
    }
    // 1st request to VT
    const idAnalise = await postAnalisysVT(encodedParams)

    // 2nd request to VT
    const response = await getAnalysisVT(idAnalise);
    const maliciousRate = response.data.data.attributes.stats.malicious;
    const url = response.data.meta.url_info.url;
    const suspicious = response.data.data.attributes.stats.suspicious;
    const harmless = response.data.data.attributes.stats.harmless;

    content.reply(`
                *Resultado da busca*

                🔗 *URL:* ${url}
    
                *Resultado:*
                ══════════════    
                🔴 *Malicioso:* ${maliciousRate}
                
                🟡 *Suspeito:* ${suspicious}
                
                🔵 *Inofensivo:* ${harmless}               
                ══════════════
                
                📌 Fique atento aos golpes na Internet!
                `, { parse_mode: 'Markdown' });

})

/**
 * Busca no Banco de Dados
 */

bot.action('search', async (content, next) => {
    stopEaring = false;
    content.reply('🔍 Digite a URL ...')
    next()
    bot.on(message('text'), async (content) => {
        if (!stopEaring) {
            let url = content.message.text;
            console.log(url)

            const response = await getDataBaseURL(url)
            console.log(response)

            if (response.length === 0) {
                content.reply(urlNotFound, Markup.inlineKeyboard(retornoBuscaError()))
            } else {
                for (let i in response) {
                    content.reply(`
                *Resultado da busca*

                🔗 *URL:* ${response[i].url}
    
                *Resultado:*
                ══════════════    
                🔴 *Malicioso:* ${response[i].maliciousRate}
                
                🟡 *Suspeito:* ${response[i].suspiciousRate}
                
                🔵 *Inofensivo:* ${response[i].harmlessRate}                
                ══════════════
                
                📌 Fique atento aos golpes na Internet!
                `, { parse_mode: 'Markdown' });

                }
                content.reply('Voltar ao menu principal 🏡', Markup.inlineKeyboard(startMenu()))
            }
            stopEaring = true;
        }
    });
})

/**
 * Busca últimas URLs analisadas 
 */

bot.action('data', async (content) => {
    try {
        const countHours = await getLatestHour();
        const urlsHour = []
        for (let i in countHours) {
            urlsHour.push(countHours[i].url)
        }

        const countDays = await getLatestDay();
        const urlsDaily = []
        for (let j in countDays) {
            urlsDaily.push(countDays[j].url)
        }

        content.reply(`
        *Dados:*

            🔗 *URLs analisadas na última hora:*
            Quantidade: *${urlsHour.length}*

            🔗 *URLs analisadas no ultimo dia:*
            Quantidade: *${urlsDaily.length}*       
                  
            `, { parse_mode: 'Markdown' });
        content.reply("Acesse a API via Web para mais detalhes", Markup.inlineKeyboard(webAPIData()))

    } catch (error) {
        console.log(error);
        content.reply("Sem análises!", Markup.inlineKeyboard(startMenu()))
    }
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
    content.reply(contactMessage, Markup.inlineKeyboard(startMenu()))
    next();
})

/**
 * Voltar
 */

bot.action('start', async (content, next) => {
    content.reply("Bem vindo! 🏡", Markup.inlineKeyboard(menuPrincipal()))
    next();
})

module.exports = bot
