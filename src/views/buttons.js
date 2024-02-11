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
        Markup.button.callback('❓ FAQ', 'faq')
    ], [
        Markup.button.callback('📞 Contact Us', 'contact'),
        Markup.button.callback('❌ Sair', 'quit')
    ]]
    return mainMenu;
}

module.exports = {
    menuPrincipal
}