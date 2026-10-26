# Front-end Angular

Interface web desenvolvida em Angular para consumir a API REST de gerenciamento de usuários e cartões.

## Tecnologias utilizadas

- Angular
- TypeScript
- HTML e CSS

## Como executar o projeto

### Pré-requisitos

- Node.js
- Angular CLI
- API Java em execução [ acessar a API  ](https://github.com/ViniciusS4ntos/desafio-tecnico-back-end.git)

### 1. Instalar as dependências

```bash
npm install
```

### 2. Iniciar a aplicação

```bash
ng serve
```

### 3. Acessar a aplicação

Abra o navegador em:

http://localhost:4200/register

## Principais endpoints da API

| Endpoint | Funcionalidade |
|---|---|
| `/register` | Cadastro de ADMIN |
| `/login` | Autenticação e obtenção do token JWT |
| `/usuarios` | Gerenciamento de usuários |
| `/cartoes` | Gerenciamento de cartões |

**Observação:** Após realizar o login, o token JWT é utilizado para autenticar as requisições que exigem autorização.

