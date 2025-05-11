## ✅ Pré-requisitos

Antes de iniciar o projeto, certifique-se de que os seguintes softwares estão instalados em sua máquina:

- [Node.js](https://nodejs.org/) (versão recomendada: 18.x ou superior)
- [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) (para rodar o banco de dados localmente)
- [Git](https://git-scm.com/) (para clonar o repositório)

Você pode verificar as versões instaladas com os comandos abaixo:

  ```bash
  node -v
  npm -v
  git --version
  ```

## 🔧 Instalação

Siga os passos abaixo para rodar o projeto localmente:

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/aeroporto-backend.git
2. Acesse a pasta do projeto:
   ```bash
   cd aeroporto-backend
3. Instale as dependências:
   ```bash
   npm install
4. Configure as variáveis de ambiente criando um arquivo .env na raiz do projeto:
   ```bash
   DATABASE=mongodb://localhost:27017/Aeroporto
   PORT=3030
5. Inicie o servidor:
   ```bash
   npm run dev
