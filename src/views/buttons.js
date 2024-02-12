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
        Markup.button.callback('📞 Contact Us', 'contact'),
        Markup.button.callback('❌ Sair', 'quit')
    ]]
    return mainMenu;
}

function startMenu() {
    const mainMenu = [
        Markup.button.callback('🏡 Iniciar', 'start')
    ]
    return mainMenu
}

function retornoBuscaError() {
    const mainMenu = [
        Markup.button.callback('🔍 Buscar novamente', 'search'),
        Markup.button.callback('🎣 Nova Analise', 'new')
    ]
    return mainMenu

}

module.exports = {
    menuPrincipal,
    startMenu,
    retornoBuscaError
}