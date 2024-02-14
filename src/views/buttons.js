const { Markup } = require('telegraf');
require('dotenv').config({ silent: true, allowEmptyValues: true })

function menuPrincipal() {
    const mainMenu = [[
        Markup.button.callback('🔍 Buscar', 'search')
    ], [
        Markup.button.callback('🎣 Nova Analise', 'new'),
        Markup.button.callback('📢 Dicas', 'tips')
    ], [
        Markup.button.callback('🚨 Ajuda', 'help'),
        Markup.button.url('🔗 Web API', 'google.com'),
    ], [
        Markup.button.callback('📞 Entre em contato', 'contact'),
        Markup.button.callback('📈 Dados', 'data')
    ]]
    return mainMenu;
}


function webAPIData() {
    const webButton = [[
        Markup.button.url('🔗 Último dia', 'google.com'),
        Markup.button.url('🔗 Última hora', 'google.com')
    ], [
        Markup.button.callback('🏡 Menu Principal', 'start')
    ]
    ]
    return webButton
}

function docButton() {
    const docButton = [[
        Markup.button.url('🔗 API Documentation', 'https://app.swaggerhub.com/home'),
        Markup.button.url('🔗 GitHub Project', 'https://github.com/blackALT/URL_Watcher-bot/blob/main/README.md  ')
    ], [
        Markup.button.callback('🏡 Menu Principal', 'start')
    ]]
    return docButton
}

function startMenu() {
    const mainMenu = [
        Markup.button.callback('🏡 Menu Principal', 'start')
    ]
    return mainMenu
}

function retornoBuscaError() {
    const mainMenu = [[
        Markup.button.callback('🔍 Buscar novamente', 'search'),
        Markup.button.callback('🎣 Nova Analise', 'new')
    ], [
        Markup.button.callback('🏡 Menu Principal', 'start')
    ]
    ]
    return mainMenu

}

function menuDicas() {
    const mainMenu = [[
        Markup.button.callback('🔴 Senhas', 'senhas'),
        Markup.button.callback('🟠 Software', 'software')
    ], [
        Markup.button.callback('🟡 Redes Sociais', 'social'),
        Markup.button.callback('🔵 Links suspeitos', 'links')
    ], [
        Markup.button.callback('🟢 Wi-Fi público', 'wifi'),
        Markup.button.callback('🟣 Mobile', 'mobile')
    ], [
        Markup.button.callback('⚫️ Golpes online', 'golpes'),
        Markup.button.callback('⚪️ Eduque-se', 'educacao')
    ], [
        Markup.button.callback('🏡 Menu Principal', 'start')]
    ]
    return mainMenu;
}

module.exports = {
    menuPrincipal,
    startMenu,
    retornoBuscaError,
    menuDicas,
    docButton,
    webAPIData
}