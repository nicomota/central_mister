# 🎨 CSS Global - Central de Ajuda

## ✅ **O que foi criado:**

1. **`/assets/global-styles.css`** - CSS global com todos os estilos necessários
2. **`template-clean.html`** - Template limpo sem estilos inline
3. **Exemplos de páginas limpas** (index-clean.html, comprovantes-clean.html)

## 🚀 **Como usar para criar novas páginas:**

### Estrutura Básica (copie e cole):
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Título da Página - Central de Ajuda</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet">
    <link href="/assets/global-styles.css" rel="stylesheet">
</head>
<body>
    <!-- SIDEBAR (copiar do template-clean.html) -->
    
    <!-- HERO SECTION -->
    <div class="hero">
        <h1>Título da Página</h1>
        <p class="text-primary">Descrição da página</p>
    </div>

    <!-- CONTENT -->
    <div class="content">
        <!-- SEU CONTEÚDO AQUI -->
        
        <div class="footer">© 2025 Nícolas da Mota Monteiro dos Santos.</div>
    </div>

    <!-- SCRIPTS (copiar do template-clean.html) -->
</body>
</html>
```

## 📋 **Componentes Disponíveis:**

### 1. **Grade de Botões:**
```html
<div class="btn-grid">
    <a href="/link1.html" class="btn-dark-outline">Botão 1</a>
    <a href="/link2.html" class="btn-dark-outline">Botão 2</a>
    <a href="/link3.html" class="btn-dark-outline">Botão 3</a>
</div>
```

### 2. **Grade de Cards (página inicial):**
```html
<div class="card-box">
    <a href="/link1.html">
        <div class="card p-3 h-100">
            <i class='bx bx-icon bx-lg text-primary'></i>
            <h5>Título do Card</h5>
        </div>
    </a>
</div>
```

### 3. **Seções de Conteúdo:**
```html
<div class="section">
    <h4>Título da Seção</h4>
    <p>Conteúdo da seção...</p>
    <ol>
        <li>Item 1</li>
        <li>Item 2</li>
    </ol>
</div>
```

### 4. **Blocos de Imagem:**
```html
<div class="img-block">
    <img src="/caminho/imagem.png" class="img-fluid rounded">
</div>
```

### 5. **Vídeos:**
```html
<div class="video-wrapper">
    <iframe src="https://youtube.com/embed/VIDEO_ID"></iframe>
</div>
```

### 6. **FAQ/Accordion:**
```html
<div class="accordion" id="faqAccordion">
    <div class="accordion-item">
        <h2 class="accordion-header" id="heading1">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1">
                Pergunta 1
            </button>
        </h2>
        <div id="collapse1" class="accordion-collapse collapse">
            <div class="accordion-body">Resposta 1</div>
        </div>
    </div>
</div>
```

### 7. **Página "Aprenda" (botões pequenos):**
```html
<div class="section">
    <div class="section-title">
        <i class='bx bx-icon'></i> Título da Seção
    </div>
    <div class="btn-group-custom">
        <div class="btn-dark-outline">Botão 1</div>
        <div class="btn-dark-outline">Botão 2</div>
        <div class="btn-dark-outline">Botão 3</div>
    </div>
</div>
```

## 🎨 **Classes CSS Disponíveis:**

### Layout:
- `.sidebar` - Barra lateral
- `.hero` - Seção principal do topo
- `.content` - Área de conteúdo
- `.footer` - Rodapé

### Componentes:
- `.btn-grid` - Grade de botões
- `.btn-dark-outline` - Botão escuro padrão
- `.card-box` - Grade de cards
- `.section` - Seção de conteúdo
- `.section-title` - Título de seção (página Aprenda)
- `.btn-group-custom` - Grupo de botões pequenos
- `.img-block` - Bloco para imagens
- `.video-wrapper` - Container para vídeos

### Utilitários:
- `.text-center` - Centralizar texto
- `.mt-3, .mt-4, .mt-5` - Margem superior
- `.mb-3, .mb-4, .mb-5` - Margem inferior
- `.underline` - Remove sublinhado

## 🔄 **Migração das Páginas Atuais:**

Para converter uma página existente:

1. **Remover** toda a tag `<style>` e seu conteúdo
2. **Adicionar** `<link href="/assets/global-styles.css" rel="stylesheet">`
3. **Simplificar** o HTML removendo classes inline desnecessárias
4. **Testar** se a aparência continua igual

## ✨ **Vantagens do Sistema:**

- ✅ **Uma única fonte de estilos** - mudanças afetam todas as páginas
- ✅ **HTML limpo** - fácil de ler e manter
- ✅ **Consistência visual** - todas as páginas iguais
- ✅ **Performance** - CSS é carregado uma vez e cache pelo navegador
- ✅ **Manutenibilidade** - mudanças de design em um só lugar
- ✅ **Responsividade** - funciona em mobile automaticamente

## 🎯 **Próximos Passos:**

1. Use `template-clean.html` como base para novas páginas
2. Para páginas existentes, remova os `<style>` e use `/assets/global-styles.css`
3. Copie o conteúdo dos exemplos (`index-clean.html`, `comprovantes-clean.html`)
4. Todas as páginas agora são apenas HTML + conteúdo!

---

**🚀 Agora você tem um sistema profissional onde só precisa focar no conteúdo, não mais no layout!**