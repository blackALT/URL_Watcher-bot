[![Deploy on heroku](https://img.shields.io/badge/deploy-heroku.com-blueviolet)](/) [![](https://img.shields.io/badge/database-mongodb-green)](https://www.mongodb.com/) [![](https://img.shields.io/badge/documentation-swagger-informational)]()
# URL Watcher Bot
**Resumo**

Este trabalho propõe a criação de um chatbot para verificação de URLs compartilhadas através da Internet, de modo a colaborar com a comunidade trazendo uma solução de fácil acesso. Com a popularização do acesso a Internet, as pessoas passaram a fazer compras online, trabalhar remotamente e se comunicar com outras pessoas em várias partes do mundo. Essa hiperconectividade também trouxe consequências, com os criminosos digitais vendo uma oportunidade para realizar diversos ataques baseados, principalmente, na disseminação de URLs maliciosas. Para implementar a solução, foram usados servidores virtuais e plataformas de código aberto como Telegraf (chatbot), Cuckoo Sandbox (análise) e MongoDB (armazenamento). O projeto também inclui serviços de backend com o desenvolvimento de uma API (Application Programming Interface) para gerenciar a interação entre os microsserviços.

**Palavras-chave:** Chatbot; Phishing; REST API; Cuckoo Sandbox; Ciberataques

- Para ler a proposta completa, clique [aqui](#Proposta-do-Projeto).

## Principais funcionalidades da API

- [X] Consultar e cadastrar URLs relacionadas a golpes na Internet;
- [X] Fazer filtros por URL a partir de strings específicas
- [x] Filtrar apenas as URLs classificadas como maliciosas (only via Web API);
- [x] Coletar estatísticas sobre campanhas maliciosas;

## Tecnologias utilizadas

- **Node.js**
- **npm**
- **MongoDB**
- **Telegram API**
- **Telegraf**
- **Cuckoo Sandbox**
- **Virus Total**

### Dependencias:
- **express**
- **mongoose**
- **axios**
- **dotenv-safe**
- **telegraf**
- **body-parser**

## Estrutura do projeto

```
App
├───src
│   ├───controller
│   ├───models
│   ├───views
│   └───routes
└───vagrant
    └───provisioner  
```
### Json

```json
{
  "_id": Number,
  "url": String,
  "analysisDate":Date,
  "analysisStatus": "Completed",
  "maliciousRate": 50,
  "suspiciousRate": 30,
  "harmlessRate": 10
}
```

## Instruções de uso

Visite o bot em https://t.me/EnvWatcherBot e navegue pelos comandos disponíveis.

## Para colaborar com este projeto

- *Instalação*

1. Faça um Fork desse repositório para seu GitHub;
2. Clone seu repositório para seu ambiente local;
3. Instale o Vagrant
4. Abra o console e digite os comandos:

```
$ vagrant init 
$ vagrant up
```

- *Inicialiazação dentro da máquina virtual*

```
npm start (use o nodemon se preferir)
```

5. Crie uma branch para sua modificação (git checkout -b feature/any)
6. Faça o commit (git commit -am 'Add some any')
7. Push (git push origin feature/any)
8. Crie um novo Pull Request

## Rotas disponíveis via web

### Endpoints

# Obter urls cadastradas (filtro por período)

```
router.get("/urls", controller.getURL);
```

# Cadastrar urls (Solicite uma chave JWT ao desenvolvedor do projeto @blackALT)

Apenas via Postman
```
router.post("/urls", controller.postURLweb);
```

# Acesso ao Elasticsearch/Kibana (Avançado)

** Em construção **


## Proposta do Projeto

A popularização da Internet causou uma profunda mudança nos meios de comunicação e nas interações humanas, trazendo consigo o conceito de hiperconectividade, no qual todo mundo está conectado à Internet o tempo todo. Essa hiperconectividade tornou a vida dos usuários mais cômoda, entretanto, os criminosos digitais viram um terreno fértil para realizar diversos ataques, como phishing, malware e fraudes diversas.

O processo cognitivo aplicado ao julgamento da legitimidade da informação é um dos fatores que impulsionam a suscetibilidade de usuários a golpes na Internet (JONES et al., 2019). Dado isto, uma grande dificuldade enfrentada pelos usuários é o conhecimento e o acesso a recursos de análise que possam determinar se um conteúdo é malicioso ou não.

O objetivo geral deste trabalho é o desenvolvimento de uma arquitetura de chatbot para verificação de URLs maliciosas, ou seja, de endereços (links, domínios, websites) recebidos por meio de mensagens SMS ou de e-mails de origem duvidosa, de modo a indicar ao usuário o potencial malicioso associado ao endereço.

### Breve introdução

A hiperconectividade tornou a vida dos usuários mais cômoda com a possibilidade de fazer compras online, trabalhar remotamente e se comunicar com pessoas em várias partes do mundo. Os criminosos digitais viram um terreno fértil para realizar diversos ataques através de dispositivos móveis conectados à Internet, com pedidos urgentes de transferências de familiares ou amigos para conta de terceiros (SILVA, 2023).

Com a popularização das plataformas de e-commerce, as fraudes de lojas falsas online também cresceram nos últimos anos, assim como a criação de perfis falsos em redes sociais (ALMEIDA, 2019).

Para MITNICK e SIMON (2003), a Engenharia Social é a persuasão para enganar as pessoas e convencê-las de que o engenheiro social é alguém que ele não é. Mitnick define o engenheiro social como alguém que se vale da fraude, da influência e da persuasão para obter informações.

Nos ciberataques mais comuns, como o envio de e-mails ou mensagens SMS, os adversários empregam temas baseados em engenharia social para obter vantagem sobre as vítimas, sobretudo fingindo ser pessoas ou instituiçẽos reais.
