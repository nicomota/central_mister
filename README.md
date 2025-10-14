# Central de Ajuda - Mister Contador

Sistema de ajuda e documentação para o Mister Contador, incluindo o **Mister Academy** - plataforma de educação integrada.

## 📋 Requisitos

### Node.js
Este projeto requer **Node.js versão 16.4.2**

#### Verificar versão atual:
```bash
node --version
```

#### Instalar Node.js 16.4.2

**Opção 1: Usando NVM (Recomendado)**

Windows:
```bash
nvm install 16.4.2
nvm use 16.4.2
```

Linux/Mac:
```bash
nvm install 16.4.2
nvm use 16.4.2
```

Com NVM, basta entrar na pasta do projeto e executar:
```bash
nvm use
```
O arquivo `.nvmrc` já está configurado com a versão correta.

**Opção 2: Download direto**
- Baixe em: https://nodejs.org/download/release/v16.4.2/

### NPM
- Versão mínima: **7.0.0**
- Geralmente já vem com o Node.js

## 🚀 Instalação

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd central_mister
```

2. **Garanta que está usando Node.js 16.4.2:**
```bash
nvm use 16.4.2
```

3. **Instale as dependências:**
```bash
npm install
```

4. **Inicie o servidor de desenvolvimento:**
```bash
npm start
```

5. **Acesse no navegador:**
```
http://localhost:4200
```

## 📦 Scripts Disponíveis

- `npm start` - Inicia servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run watch` - Build com watch mode
- `npm test` - Executa testes

## 🎓 Módulos Principais

### Central de Ajuda
Sistema de suporte e documentação com tutoriais, FAQs e tickets.

**Documentação completa:** [README-CENTRAL-AJUDA.md](./README-CENTRAL-AJUDA.md)

### Mister Academy
Plataforma de educação com cursos sobre o Mister Contador.

**Documentação completa:** [src/main/webapp/app/entities/mister-academy/mister_academy.md](./src/main/webapp/app/entities/mister-academy/mister_academy.md)

## 🛠️ Tecnologias

- **Angular** 15.2.0
- **TypeScript** 4.9.0
- **Bootstrap** 5.3.0
- **RxJS** 7.8.0
- **Node.js** 16.4.2
- **NPM** >=7.0.0

## 📝 Estrutura do Projeto

```
central_mister/
├── src/
│   ├── main/
│   │   └── webapp/
│   │       └── app/
│   │           └── entities/
│   │               ├── mister-academy/          # Plataforma de cursos
│   │               ├── mister-academy-landing/  # Landing page do Academy
│   │               ├── mister-academy-navbar/   # Navbar do Academy
│   │               ├── home/                    # Página inicial
│   │               ├── duvidas-frequentes/      # FAQs
│   │               ├── ticket/                  # Sistema de tickets
│   │               └── ...                      # Outros módulos
│   └── assets/
│       └── img/                                 # Imagens e vídeos
├── .nvmrc                                       # Versão do Node.js
├── package.json                                 # Dependências
└── README.md                                    # Este arquivo
```

## 🔐 Autenticação

O sistema possui autenticação integrada com backend:
- Login via modal (Mister Academy)
- Login via página tradicional (outras rotas)
- JWT token armazenado em LocalStorage/SessionStorage
- Suporte a "Lembrar de mim"

## 🌐 Rotas Principais

- `/` - Home da Central de Ajuda
- `/academy-intro` - Landing page do Mister Academy
- `/mister-academy` - Lista de cursos
- `/mister-academy/journey` - Jornada do Contador
- `/mister-academy/curso/:id` - Curso individual
- `/duvidas-frequentes` - FAQs
- `/ticket` - Sistema de tickets

## 🐛 Troubleshooting

### Erro de versão do Node.js
```bash
Error: The engine "node" is incompatible with this module
```

**Solução:** Certifique-se de estar usando Node.js 16.4.2
```bash
nvm use 16.4.2
```

### Porta 4200 em uso
```bash
Port 4200 is already in use
```

**Solução:** Encerre o processo ou use outra porta:
```bash
ng serve --port 4201
```

### Erro ao instalar dependências
```bash
npm ERR! peer dependency
```

**Solução:** Limpe cache e reinstale:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 👨‍💻 Desenvolvedor

**Nícolas da Mota Monteiro dos Santos**
- LinkedIn: [linkedin.com/in/nicomota](https://www.linkedin.com/in/nicomota/)

## 📄 Licença

© 2025 Mister Contador - Todos os direitos reservados

---

**Última atualização:** Janeiro 2025
