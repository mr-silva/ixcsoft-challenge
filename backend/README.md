# IXC Soft Challenge - Backend

### Desafio

Implementar uma aplicação completa de front-end e back-end de chat de mensagens.

### Como utilizar

Para iniciar você deve instalar as dependências:

```zsh
foo@bar:~$ npm i
ou
foo@bar:~$ yarn
```

Em seguida você poderá executar exemplos de utilização do sistema criado através do comando:

```zsh
foo@bar:~$ npm run start
ou
foo@bar:~$ yarn start
```

### Rotas da aplicação

Abaixo uma breve explicação de como utilizar as rotas disponíveis na aplicação:

- **`POST /login`**: A rota realiza o login de um usuário.

_Retorno esperado_

```json
{
  "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNmY0NGI1NGMtYmQ0Yi00NzRkLThmM2EtNTJiZTA3MmVkYmJiIiwidXNlcm5hbWUiOiJqRG9lIiwicm9sZSI6IkNMSUVOVCJ9LCJpYXQiOjE2OTQxMzMxNDMsImV4cCI6MTY5NDMwNTk0M30.SRoYW5vfNTsXCIh7pifhdIOHP904d7UpxAhzzIB1pjrryph_ZQIasT3itaPeueEVYOiNm4EGoQHyu1JItdYClg"
}
```

- **`POST /logout`**: A rota realiza o logout de um usuário.

_Retorno esperado_

```json
{}
```

- **`GET /user/list`**: Essa rota deve retornar uma listagem dos usuários da plataforma. Apenas usuários autenticados podem executar esta rota:

_Retorno esperado_

```json
[
  {
    "id": "6f44b54c-bd4b-474d-8f3a-52be072edbbb",
    "name": "Jonh Doe",
    "username": "jDoe",
    "isOnline": true,
    "createdAt": "2023-09-06T20:41:00.153Z",
    "updatedAt": "2023-09-07T15:43:10.096Z"
  },
  {
    "id": "da51dab0-d3f1-4f2b-819c-2d4ea115f1d2",
    "name": "IXC Soft Admin",
    "username": "ixc_admin",
    "isOnline": false,
    "createdAt": "2023-09-06T18:33:10.055Z",
    "updatedAt": "2023-09-06T18:33:10.055Z"
  }
]
```

- **`POST /user`**: Essa rota deve criar um novo usuário. Apenas usuários administradores podem executar essa ação:

_Payload de Criação_

```json
{
  "name": "string | required | Nome do usuário",
  "username": "string | required | Alias do usuário",
  "password": "string | required | Senha do usuário"
}
```

_Retorno esperado_

```json
{
  "id": "6f44b54c-bd4b-474d-8f3a-52be072edbbb",
  "name": "Jonh Doe",
  "username": "jDoe",
  "isOnline": true,
  "createdAt": "2023-09-06T20:41:00.153Z",
  "updatedAt": "2023-09-07T15:43:10.096Z"
}
```

_Retorno de Erro (Usuário que NÃO é um admin)_

```json
{
  "code": "403.notAllowedException",
  "message": "You are not allowed to do it.",
  "details": []
}
```

- **`POST /message`**: Essa rota deve criar uma nova mensagem. Apenas usuários autenticados podem executar essa rota:

_Payload de criação_

```json
{
  "toUserId": "string | required | Id do usuário para enviar a mensagem",
  "message": "string | required | Conteúdo da mensagem"
}
```

_Retorno esperado_

```json
{
  "fromUserId": "6f44b54c-bd4b-474d-8f3a-52be072edbbb",
  "toUserId": "da51dab0-d3f1-4f2b-819c-2d4ea115f1d2",
  "message": "Olá admin, tenho uma dúvida.",
  "createdAt": "2023-09-07T18:05:45.785Z"
}
```

_Retorno de Erro (Usuário a enviar a mensagem NÃO existe)_

```json
{
  "code": "404.userNotFoundException",
  "message": "User not found.",
  "details": []
}
```

- **`GET /message/chat/from/:userId`**: Essa rota deve retornar todas as mensagens trocadas com um usuário específico:

_Retorno esperado_

```json
[
  {
    "direction": "IN",
    "message": "Ola fulaninho",
    "createdAt": "2023-09-07T16:56:24.199Z"
  },
  {
    "direction": "IN",
    "message": "Tudo bem por ai?",
    "createdAt": "2023-09-07T16:56:35.820Z"
  },
  {
    "direction": "OUT",
    "message": "Opa!",
    "createdAt": "2023-09-07T16:57:25.165Z"
  },
  {
    "direction": "OUT",
    "message": "Aqui tudo bem sim",
    "createdAt": "2023-09-07T16:57:55.115Z"
  },
  {
    "direction": "OUT",
    "message": "E por ai?",
    "createdAt": "2023-09-07T16:58:32.150Z"
  }
]
```

- **`GET /message/chat/active`**: Essa rota deve retornar todos os usuários em que o usuário autenticado trocou mensagens:

_Retorno esperado_

```json
[
  {
    "id": "6f44b54c-bd4b-474d-8f3a-52be072edbbb",
    "name": "Jonh Doe",
    "username": "jDoe",
    "isOnline": true,
    "createdAt": "2023-09-06T20:41:00.153Z",
    "updatedAt": "2023-09-07T15:43:10.096Z"
  }
]
```
