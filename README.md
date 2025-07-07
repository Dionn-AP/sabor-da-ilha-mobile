## Sabor da Ilha - Mobile (Frontend)

Este é o repositório da aplicação mobile "Sabor da Ilha", desenvolvida em React Native e TypeScript para atuar como uma comanda digital em restaurantes e lanchonetes. Esta aplicação é a interface que os usuários interagem para visualizar cardápios, fazer pedidos e acompanhar o status.

### Sobre o Projeto

"Sabor da Ilha" Mobile é a interface do usuário que permite a clientes e funcionários de restaurantes/lanchonetes gerenciar pedidos de forma eficiente. Através desta aplicação, é possível navegar pelo cardápio, adicionar itens ao pedido, enviar requisições ao backend e visualizar o status dos pedidos em tempo real.

### Tecnologias Utilizadas

Esta aplicação mobile foi desenvolvida com as seguintes tecnologias:

* **React Native:** Framework para construção de aplicativos móveis nativos utilizando JavaScript e React.
* **TypeScript:** Superset de JavaScript que adiciona tipagem estática, proporcionando maior robustez e manutenibilidade ao código.

### Figma do Projeto
* **Link:** https://www.figma.com/design/IjWEedSWDjb4Gi12tewpLU/Sabor-da-Ilha?node-id=0-1&t=eVpNmXw0zgjNE9d9-1

### Estrutura do Repositório

O repositório possui a seguinte estrutura principal:

* `assets/`: Contém recursos estáticos como imagens, ícones, etc.
* `src/`: Contém todo o código-fonte da aplicação React Native, incluindo componentes, telas, hooks, etc.
* `App.tsx`: Componente raiz da aplicação.
* `app.json`: Configurações globais do Expo/React Native.
* `babel.config.js`: Configurações do Babel para transpilação de código.
* `metro.config.js`: Configurações do Metro Bundler.
* `.gitignore`: Define os arquivos e diretórios a serem ignorados pelo controle de versão Git.
* `package.json`: Informações do projeto e dependências.
* `package-lock.json`: Garante que as mesmas versões das dependências sejam instaladas.
* `tsconfig.json`: Configurações do compilador TypeScript.

### Instalação e Configuração (Local)

Para configurar e rodar o projeto mobile localmente, siga os passos abaixo:

1.  **Pré-requisitos:**
    * Node.js (LTS recomendado)
    * Expo CLI (instalado globalmente: `npm install -g expo-cli`)

2.  **Clone o repositório:**

    ```bash
    git clone https://github.com/Dionn-AP/sabor-da-ilha-mobile.git
    cd sabor-da-ilha-mobile
    ```

3.  **Instale as dependências:**

    ```bash
    npm install
    ```

4.  **Configure a conexão com o Backend:**
    Certifique-se de que o backend esteja rodando e acessível. Pode ser necessário configurar a URL da API no código da aplicação mobile, geralmente em um arquivo de configuração ou variável de ambiente específica para o frontend.

5.  **Inicie a aplicação Expo:**

    ```bash
    npm start
    ```

    Isso iniciará o Expo Development Server. Você pode então escanear o código QR com o aplicativo Expo Go no seu dispositivo mobile, ou usar um emulador Android/iOS.

### Contribuição

Se você deseja contribuir com o projeto, siga os seguintes passos:

1.  Faça um fork deste repositório.
2.  Crie uma nova branch para sua feature (`git checkout -b feature/minha-feature`).
3.  Faça suas alterações e commit-as (`git commit -m 'feat: Adiciona minha nova feature'`).
4.  Envie suas alterações para o seu fork (`git push origin feature/minha-feature`).
5.  Abra um Pull Request para a branch principal deste repositório.

### Licença

MIT

### Autor

* **Dionn-AP** - [Perfil do GitHub](https://github.com/Dionn-AP)
