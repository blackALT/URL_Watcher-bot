const app = require("./src/app")
const bot = require("./src/bot")
const port = 8080;

app.listen(port, () => {
    console.log(`API está rodando na porta ${port} do guest e 8000 no host`);
    console.log(`Telegram bot ativo!`);
});

bot.startPolling();
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))