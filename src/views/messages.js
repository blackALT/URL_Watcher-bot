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
 
📌 *Como usar este bot?*

/start inicia uma *nova conversa* com o bot apresentando o Menu principal


📌 *Opções do Menu principal:*

🔍 *Buscar* - Busca por uma URL no DB

🎣 *Nova Analise* - Caso a URL _não seja encontrada_ com a opção anterior, use esta opção para realizar uma *nova análise*. 

*OBS:* _*Esta opção consome recursos de APIs externas e pode demorar até 15 minutos para ter um resultado conclusivo.*_

📢 *Dicas* - Dicas diversas sobre cibersegurança.

🔗 *Web API* - Acesse os recursos da API web.

📈 *Dados* - Veja estatísticas de uso do chatbot.


📌 *Como interpretar os resultados?*

Os campos exibidos são os atributos da resposta da análise submetida à API do VirusTotal e representam 
o número de mecanismos de *Antivírus* que julgaram a URL como maliciosa, suspeita ou inofensiva.

📌 *Estrutura da API*

Acesso aos endpoints web:

*api/v3/search?url=$* - Busca por URL específica
*api/v3/* - retorna todas as URLs cadastradas
*api/v3/latestday* - retorna todas as URLs cadastradas no último dia
*api/v3/latesthour* - retorna todas as URLs cadastradas na última hora
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
