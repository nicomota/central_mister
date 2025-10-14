# 🆘 Central de Ajuda - Mister Contador

## Visão Geral

A **Central de Ajuda** é o sistema de suporte e documentação integrado do Mister Contador. Oferece tutoriais em vídeo, FAQs, documentação técnica e sistema de tickets para auxiliar os usuários na utilização da plataforma.

---

## 🗂️ Estrutura do Projeto

```
central_mister/
├── src/main/webapp/app/entities/
│   ├── home/                        # Página inicial da Central
│   ├── aprenda-utilizar/            # Tutoriais e guias
│   ├── duvidas-frequentes/          # FAQs
│   ├── ticket/                      # Sistema de tickets
│   ├── plano-de-contas/             # Docs sobre Plano de Contas
│   ├── integracoes-bancarias/       # Docs sobre Integrações
│   ├── notas-fiscais/               # Docs sobre NF-e
│   ├── extratos/                    # Docs sobre Extratos
│   ├── comprovantes/                # Docs sobre Comprovantes
│   ├── registro/                    # Docs sobre Registros
│   ├── regras/                      # Docs sobre Regras
│   ├── concilia/                    # Docs sobre Conciliação
│   ├── exportacao/                  # Docs sobre Exportação
│   ├── cadastros/                   # Docs sobre Cadastros
│   ├── planilhas/                   # Docs sobre Planilhas
│   ├── edicao-avancada/            # Docs sobre Edição Avançada
│   ├── mister-academy/             # Plataforma de Cursos
│   ├── mister-academy-landing/     # Landing page do Academy
│   └── mister-academy-navbar/      # Navbar do Academy
└── src/assets/
    └── img/                         # Imagens e vídeos
```

---

## 📚 Módulos Principais

### 1. Home (Página Inicial)
**Rota:** `/`

Página inicial da Central de Ajuda com:
- Cards de navegação para cada módulo
- Busca rápida
- Acesso ao Mister Academy
- Links para FAQs e Tickets

---

### 2. Aprenda Utilizar
**Rota:** `/aprenda-utilizar`

Seção com tutoriais e guias práticos:
- Vídeos tutoriais
- Passo a passo ilustrado
- Casos de uso comuns
- Dicas e boas práticas

---

### 3. Dúvidas Frequentes
**Rota:** `/duvidas-frequentes`

Sistema de FAQs com:
- Perguntas mais comuns
- Respostas detalhadas
- Categorização por módulo
- Busca por palavra-chave

---

### 4. Sistema de Tickets
**Rota:** `/ticket`

Sistema de suporte com tickets:
- Criar novo ticket
- Acompanhar status
- Histórico de atendimentos
- Upload de anexos
- Categorias de problemas

---

## 💡 Módulos de Documentação

### Plano de Contas
**Rota:** `/plano-de-contas`

Documentação sobre:
- Estrutura do plano de contas
- Como criar e editar contas
- Importação de planos
- Melhores práticas contábeis

### Integrações Bancárias
**Rota:** `/integracoes-bancarias`

Documentação sobre:
- Conexão com bancos via Open Finance
- Sincronização de extratos
- Conciliação automática
- Troubleshooting de integrações

### Notas Fiscais
**Rota:** `/notas-fiscais`

Documentação sobre:
- Importação de NF-e
- Leitura de XML
- Validação de dados
- Lançamento automático

### Extratos Bancários
**Rota:** `/extratos`

Documentação sobre:
- Upload de extratos OFX
- Importação manual
- Classificação de lançamentos
- Conciliação bancária

### Comprovantes
**Rota:** `/comprovantes`

Documentação sobre:
- Upload de comprovantes
- Anexação a lançamentos
- Organização de documentos
- OCR e leitura automática

### Registro Contábil
**Rota:** `/registro`

Documentação sobre:
- Lançamentos manuais
- Lançamentos automáticos
- Edição de registros
- Histórico de alterações

### Regras de Automação
**Rota:** `/regras`

Documentação sobre:
- Criar regras de classificação
- Regras de lançamento automático
- Priorização de regras
- Testes e validação

### Conciliação
**Rota:** `/concilia`

Documentação sobre:
- Conciliação bancária
- Conciliação de cartões
- Módulo Premium
- Recebíveis de rede

### Exportação
**Rota:** `/exportacao`

Documentação sobre:
- Exportar para contabilidade
- Formatos suportados
- Layouts personalizados
- Integração com ERPs

### Cadastros
**Rota:** `/cadastros`

Documentação sobre:
- Cadastro de empresas
- Cadastro de fornecedores
- Cadastro de clientes
- Categorias e tags

### Planilhas
**Rota:** `/planilhas`

Documentação sobre:
- Importação de planilhas
- Templates disponíveis
- Mapeamento de colunas
- Validação de dados

### Edição Avançada
**Rota:** `/edicao-avancada`

Documentação sobre:
- Edição em massa
- Filtros avançados
- Operações em lote
- Scripts personalizados

---

## 🎓 Mister Academy

### Visão Geral
Plataforma de educação integrada com cursos sobre o Mister Contador.

**Documentação Completa:** Ver `src/main/webapp/app/entities/mister-academy/README.md`

### Rotas
- `/academy-intro` - Landing page
- `/mister-academy` - Lista de cursos
- `/mister-academy/journey` - Jornada do Contador
- `/mister-academy/curso/:id` - Curso individual

---

## 🎨 Padrões de Design

### Estrutura de Página Padrão

Cada módulo de documentação segue a estrutura:

```html
<div class="help-page">
  <header class="page-header">
    <h1>Título do Módulo</h1>
    <p class="subtitle">Descrição breve</p>
  </header>

  <section class="content">
    <!-- Conteúdo com vídeos, textos, imagens -->
  </section>

  <aside class="related-topics">
    <!-- Links para tópicos relacionados -->
  </aside>

  <footer class="page-footer">
    <!-- Feedback, links úteis -->
  </footer>
</div>
```

### Componentes Comuns

#### Card de Vídeo Tutorial
```html
<div class="video-card">
  <iframe src="youtube-url" allowfullscreen></iframe>
  <h3>Título do Tutorial</h3>
  <p>Descrição</p>
  <span class="duration">5:30</span>
</div>
```

#### Card de Documentação
```html
<div class="doc-card">
  <i class="icon fas fa-file-alt"></i>
  <h3>Título</h3>
  <p>Descrição</p>
  <a href="#" class="btn-read-more">Ler mais</a>
</div>
```

---

## 🔍 Sistema de Busca

A Central de Ajuda possui busca integrada que indexa:
- Títulos de páginas
- Conteúdo de artigos
- Perguntas frequentes
- Transcrições de vídeos (quando disponível)

---

## 📱 Responsividade

### Breakpoints
- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px

### Adaptações Mobile
- Menu hamburguer
- Cards em coluna única
- Vídeos em formato 16:9 responsivo
- Tipografia reduzida
- Botões full-width

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **Angular 13+**
- **TypeScript**
- **SCSS**
- **Bootstrap** (components)
- **Font Awesome** (ícones)

### Backend
- **Spring Boot**
- **JHipster**
- **PostgreSQL**

### Integrações
- **YouTube API** (vídeos)
- **Open Finance** (integrações bancárias)
- **Tawk.to** (chat de suporte)

---

## 🔐 Autenticação e Autorização

### Rotas Públicas
- Landing pages
- FAQs básicas
- Página inicial da Central

### Rotas Protegidas
- Sistema de tickets
- Mister Academy (cursos)
- Área do usuário
- Documentação avançada

### Níveis de Acesso
1. **Visitante:** Acesso limitado
2. **Usuário:** Acesso completo à documentação
3. **Premium:** Acesso ao Academy + recursos avançados
4. **Admin:** Acesso total + gestão de conteúdo

---

## 📊 Analytics e Métricas

### Métricas Acompanhadas
- Páginas mais visitadas
- Vídeos mais assistidos
- Buscas mais comuns
- Taxa de resolução de dúvidas
- NPS (Net Promoter Score)
- Tempo médio de resolução de tickets

---

## 🛠️ Manutenção

### Adicionar Nova Página de Documentação

1. **Criar componente:**
```bash
ng generate component entities/novo-modulo
```

2. **Configurar rota:**
```typescript
// app-routing.module.ts
{
  path: 'novo-modulo',
  loadChildren: () => import('./entities/novo-modulo/...')
}
```

3. **Adicionar link na navegação:**
- Atualizar menu principal
- Adicionar card na home
- Incluir em busca

### Atualizar Conteúdo

1. Editar o HTML do componente
2. Adicionar/atualizar vídeos
3. Revisar links relacionados
4. Atualizar screenshots se necessário
5. Testar responsividade

### Adicionar Vídeo Tutorial

1. Upload no YouTube
2. Obter URL de embed
3. Adicionar iframe no componente
4. Incluir título e descrição
5. Adicionar às transcrições (SEO)

---

## 🐛 Troubleshooting

### Vídeos não carregam
- Verificar URL do YouTube
- Confirmar que o vídeo não é privado
- Testar em navegador anônimo
- Verificar bloqueadores de conteúdo

### Imagens quebradas
- Confirmar caminho em `src/assets/img/`
- Verificar se arquivo existe
- Confirmar formato suportado (jpg, png, svg)
- Verificar .gitignore para arquivos grandes

### Rotas não funcionam
- Verificar configuração em `app-routing.module.ts`
- Confirmar lazy loading
- Verificar AuthGuard se aplicável
- Limpar cache do navegador

---

## 📞 Suporte Técnico

### Canais de Atendimento
- **Chat:** Tawk.to integrado
- **Email:** suporte@mistercontador.com.br
- **Tickets:** Sistema interno
- **WhatsApp:** (em desenvolvimento)

### Horário de Atendimento
- Segunda a Sexta: 9h às 18h
- Sábado: 9h às 13h
- Domingo e Feriados: Fechado

---

## 📝 Contribuindo

### Como Contribuir com Documentação

1. Identifique área que precisa de melhoria
2. Crie branch: `git checkout -b docs/melhoria-xyz`
3. Faça alterações
4. Teste localmente
5. Commit: `git commit -m "docs: melhoria em xyz"`
6. Push e crie Pull Request

### Padrões de Escrita

- Linguagem clara e objetiva
- Use exemplos práticos
- Inclua screenshots quando possível
- Adicione vídeos para processos complexos
- Revise ortografia e gramática

---

## 🔄 Changelog

### Versão 2.0 (2025)
- ✨ Mister Academy integrado
- ✨ Sistema de login via modal
- ✨ Novo design futurista
- 🎨 Redesign completo da interface
- 📱 100% responsivo
- 🚀 Performance otimizada
- 📊 Analytics integrado

### Versão 1.5 (2024)
- Integração com Open Finance
- Sistema de tickets melhorado
- Busca aprimorada
- Mais vídeos tutoriais

### Versão 1.0 (2023)
- Lançamento inicial
- Documentação básica
- FAQs
- Primeiros tutoriais

---

## 📄 Licença

© 2025 Mister Contador - Todos os direitos reservados

**Desenvolvido por:** Nícolas da Mota Monteiro dos Santos
**LinkedIn:** [linkedin.com/in/nicomota](https://www.linkedin.com/in/nicomota/)

---

## 🗺️ Roadmap

### Próximas Funcionalidades
- [ ] Chat com IA para suporte
- [ ] Busca por voz
- [ ] Modo escuro
- [ ] Offline mode (PWA)
- [ ] Mais cursos no Academy
- [ ] Certificações oficiais
- [ ] Comunidade de usuários
- [ ] Fórum de discussões
- [ ] Base de conhecimento colaborativa

---

**Última atualização:** Janeiro 2025
