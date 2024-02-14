const wellcomeMessage = `
   
Bem-vindo(a) ao URL Watcher Bot!

📌 Comandos disponíveis:
`;

const urlNotFound = `
🚨 URL não encontrada em nossa Base de Dados.

📌 Verifique se a URL foi digitada corretamente.

OU            

📌 Submeta a URL para análise. 

📢 OBS: A análise leva cerca de 15 minutos. Verifique a URL novamente após este prazo).

 `

const helpMessage = `
AJUDA
 
📌 Como usar este bot?

/start inicia uma 

 
 `

const contactMessage = `
Deseja falar com o desenvolvedor?

💬 Envie um e-mail para js2bqdb8m@mozmail.com

`

module.exports = {
    helpMessage,
    contactMessage,
    wellcomeMessage,
    urlNotFound
}
