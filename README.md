[![CI/CD](https://codecov.io/gh/mathrtd/desafio-front/workflows/build-and-deploy/badge.svg)](https://codecov.io/gh/mathrtd/desafio-front)

[![gh-pages](https://codecov.io/gh/mathrtd/desafio-front/workflows/pages/pages-build-deployment/badge.svg)](https://codecov.io/gh/mathrtd/desafio-front)

# Marvel App

Projeto desenvolvido utilizando [React](https://pt-br.reactjs.org/) onde se é consumida uma [API pública](https://developer.marvel.com/docs) com a finalidade de apresentar os seus conteúdos de maneira amigável ao usuário comum.

## Confirugações Iniciais

### Pré-requisitos

1.  [Git](https://git-scm.com/downloads)
1.  [Node](https://nodejs.org/en/download/)
1.  [NPM](https://www.npmjs.com/)

### Instalação

1.  `cd desafio-front` para acessar o projeto
1.  Rode o comando `npm install` para instalar todas as dependências

### Acesso à API

1.  Siga as instruções [nesse link](https://developer.marvel.com/signup) para obter acesso à API utilizada
1.  Faça uma cópia do arquivo `.env.sample` e renomeie a cópia para `.env.local`
1.  Altere o arquivo `.env.local` para utilizar as credenciais que foram providenciadas após concluir o cadastro na [API](https://developer.marvel.com/account)
1.  As variáveis são auto explicativas, `REACT_APP_ENDPOINT_PUBLIC_KEY` se refere à chave pública e `REACT_APP_ENDPOINT_PRIVATE_KEY` à chave privada

## Executando o projeto

### `npm start`

O aplicativo é executado em modo de desenvolvimento, para utiliza-lo em seu browser basta acessar [http://localhost:3000](http://localhost:3000)

### `npm test`

Execução de testes

### `npm run build`

É criado um diretório `build` na raiz do projeto contendo o aplicativo compilado