<div align="center">
  <img width="100" src="src/assets/logo.svg" align="center">
</div>

<div align="center">
    <h1>
      Notícia para todos - Site
    </h1>
</div>

<div align="center">
  Site de notícias com acessibilidade para pessoas com deficiência.
</div>

<div align="center">

• [Arquitetura](#arquitetura)
• [Bibliotecas](#bibliotecas)
• [Abrir e rodar](#abrir-e-rodar)

</div>
<div align="center">

[![Status](https://img.shields.io/badge/Status-Desenvolvimento-green)]()
[![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)](https://vuejs.org/guide/quick-start.html)

</div>

## Sobre

O projeto [Notícia para Todos](https://noticias-para-todos.netlify.app), é utilizado para acessar notícias com acessibilidade para pessoas com deficiência. O sistema possui integração com a [API do The New York Times](https://developer.nytimes.com) para listagem das notícias, além da integração com [nossa própria API](https://github.com/Kelvinpedroza/NoticiasNT-api)

### Arquitetura

**Estrutura de arquivos:**

<table>
<tr>
<td>

**src/**<br/>
**├── assets/**<br/>
**├── components/**<br/>
**├── plugins/**<br/>
**├── router/**<br/>
**├── service/**<br/>
**├── store/**<br/>
**├── utils/**<br/>
**├── views/**<br/>
**├── App.vue**<br/>
**└── main.js**<br/>

</td>
</tr>
</table>

### Bibliotecas

**Essenciais Core:**

- [Vue.js 2](https://vuejs.org/guide/quick-start.html) - Framework utilizado para desenvolvimento web.
- [Core JS](https://www.npmjs.com/package/core-js) - Fornece polyfills para recursos modernos do JavaScript.
- [Axios](https://www.npmjs.com/package/axios) - Framework para integração com API.
- [Vue Router](https://router.vuejs.org/guide/) - Gerenciamento das rotas de navegação.
- [Vuex](https://vuex.vuejs.org/guide/#the-simplest-store) - Gerencia e armazenamento dos dados durante a navegação.
- [JS Cookie](https://www.npmjs.com/package/js-cookie) - Gerenciamento dos cookies.

**Essenciais UI:**

- [Bootstrap Vue](https://bootstrap-vue.org/) - Framework para criar projetos responsivos, voltados para dispositivos móveis e acessíveis por ARIA na web.
- [SweetAlert2](https://sweetalert2.github.io/) - Componente estilizado, responsivo, personalizável e acessível (WAI-ARIA) para caixas pop-up e alertas de JavaScript.

## Abrir e rodar

**Para executar este projeto você precisa:**

1. Ter o [Node.js](https://nodejs.org/en) instalado na sua máquina. <br/>
2. Ter alguma IDE como o [Visual Studio Code](https://code.visualstudio.com/). <br/>
3. Baixar e instalar o [Git](https://git-scm.com/downloads). <br/>
4. Abrir o Git e clonar o projeto do [GitHub](https://github.com/remolli/tcc_project)
    usando o comando `git clone <HTTPS disponível no GitLab>`. <br/>
5. Ao abrir o projeto, execute o comando `npm install --global yarn` para instalar o 
    gerenciador de pacotes [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable), 
    apos instalar o gerenciador de pacotes, execute o comando `yarn` na raiz do projeto e em seguida 
    aguarde baixar as dependências do projeto. <br/>
6. O processo de execução do aplicativo funcionará através da execução de linha de comandos. Utilize o
    comando `yarn run serve` para rodar a aplicação. Lembre-se, antes de executar o comando, navegar até 
    a pasta do projeto antes.

[Voltar ao topo]()<br>
