# TalkSession

Aplicação simples de compartilhamento de "talks" (comentários) construída com Express, Handlebars e Sequelize.

## Resumo rápido

- Rodando em Node.js + Express
- Templates com Handlebars
- Persistência com Sequelize (MySQL)
- Sessões com `express-session` + `session-file-store`
- Mensagens flash disponíveis (ex.: erros e sucessos)

## Tecnologias

- Node.js
- Express
- express-handlebars
- Sequelize + mysql2
- express-session, session-file-store
- express-flash / connect-flash
- bcryptjs (hash de senhas)

## Estrutura principal

- `index.js` — ponto de entrada / configuração do servidor
- `controllers/` — controladores (AuthController, TalksController)
- `routes/` — definições de rotas (authRoutes, talksRoutes)
- `models/` — modelos Sequelize (User, Talk)
- `views/` — templates Handlebars (layouts, auth, talks)
- `public/` — assets (CSS, imagens)
- `db/conn.js` — inicialização do Sequelize / configuração do banco

## Instalação (Windows PowerShell)

1. Instale dependências:

   ```bash
   npm install
   ```

2. Configure o banco de dados:

   - Abra `db/conn.js` e ajuste as credenciais (host, usuário, senha, database) conforme seu ambiente.
   - Se preferir usar variáveis de ambiente, substitua as strings diretamente no arquivo e carregue via `process.env`.

3. Inicie a aplicação:
   ```bash
   npm start
   ```

A aplicação iniciará em `http://localhost:3000` (por padrão).

## Rotas principais (resumo)

- `GET /` — lista de talks (home)
- `GET /login` — formulário de login
- `POST /login` — autenticação
- `GET /register` — formulário de registro
- `POST /post/user` — cria usuário
- `/talks/*` — CRUD de talks (rotas agrupadas em `routes/talksRoutes.js`)
- `/logout` — encerra sessão

## Testes rápidos

- Registro: tente enviar senhas diferentes — deverá ver a mensagem flash de erro.
- Login: credenciais inválidas devem gerar flash com erro.

## Implementações futuras

- Sistema de respostas a comentários (threads) — permitir respostas encadeadas por talk.
- Reações (like / dislike) por usuário em cada talk, impedindo múltiplos votos por usuário.
