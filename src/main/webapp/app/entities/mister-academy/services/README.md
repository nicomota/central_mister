# Sistema de Progresso do Usuário - Mister Academy

## Visão Geral

Este sistema gerencia o progresso dos usuários nos cursos da Mister Academy, salvando automaticamente o estado de conclusão de cada aula e módulo em arquivos JSON individuais.

## Como Funciona

### 1. Login do Usuário

Quando um usuário faz login:
- O sistema verifica se existe um arquivo JSON com o progresso do usuário
- O nome do arquivo é o email do usuário com `@` substituído por `_`
- Exemplo: `nicolas@gmail.com` → `nicolas_gmail.com.json`

### 2. Criação Automática

**Se o usuário for novo:**
- Um arquivo JSON é criado automaticamente em `assets/data/user-progress/`
- O arquivo contém todos os 10 módulos com suas respectivas aulas
- Todas as aulas começam marcadas como `completado: false`

**Se o usuário já existir:**
- O sistema carrega o arquivo existente
- O progresso é restaurado exatamente como estava

### 3. Estrutura do JSON

```json
{
  "login": "nicolas@gmail.com",
  "modulos": [
    {
      "id": 1,
      "nome_modulo": "Cadastros Inteligentes",
      "completado": false,
      "cursos": [
        {
          "id": 1,
          "nome": "Cadastro de usuários",
          "url": "https://www.youtube.com/embed/DLaeMsJ3qdg",
          "completado": true
        },
        {
          "id": 2,
          "nome": "Cadastro do plano de contas",
          "url": "",
          "completado": false
        }
      ]
    }
  ]
}
```

### 4. Atualização de Progresso

- Quando um usuário completa uma aula, o sistema atualiza automaticamente:
  - A propriedade `completado` da aula é marcada como `true`
  - Se todas as aulas de um módulo forem completadas, o módulo também é marcado como `completado: true`
- O progresso é salvo automaticamente após cada alteração

## Arquivos Criados

### Serviços

1. **user-progress.model.ts** - Define as interfaces TypeScript
   - `Curso`: Representa uma aula individual
   - `Modulo`: Representa um módulo com suas aulas
   - `UserProgress`: Representa todo o progresso do usuário

2. **user-progress.service.ts** - Serviço principal
   - `loadOrCreateProgress(email)`: Carrega ou cria progresso
   - `saveProgress(progress)`: Salva o progresso
   - `markCourseCompleted(moduleId, courseId)`: Marca aula como completa
   - `markCourseIncomplete(moduleId, courseId)`: Marca aula como incompleta
   - `calculateOverallProgress()`: Calcula percentual de conclusão
   - `getCurrentProgress()`: Retorna progresso do cache

### Integrações

**account.service.ts** (modificado)
- Carrega automaticamente o progresso após login bem-sucedido
- Método `loadUserProgress()` chama o serviço de progresso

**journey.component.ts** (modificado)
- Exibe o progresso do usuário
- Permite marcar/desmarcar aulas como completas
- Calcula estatísticas de progresso

## Módulos Disponíveis

1. **Módulo 1**: Cadastros Inteligentes (5 aulas)
2. **Módulo 2**: Importação de Documentos Simplificada (2 aulas)
3. **Módulo 3**: Notas Fiscais (5 aulas)
4. **Módulo 4**: Comprovantes de Pagamentos (3 aulas)
5. **Módulo 5**: Extratos Bancários (3 aulas)
6. **Módulo 6**: Integração Bancária Automática (3 aulas)
7. **Módulo 7**: Registros Contábeis (3 aulas)
8. **Módulo 8**: Regras de Conciliação (2 aulas)
9. **Módulo 9**: Exportação de Dados (2 aulas)
10. **Módulo 10**: Importação de Planilhas (2 aulas)

**Total**: 30 aulas

## Uso no Componente

```typescript
// Carregar progresso
this.userProgressService.loadOrCreateProgress('usuario@email.com')
  .subscribe(progress => {
    console.log('Progresso carregado:', progress);
  });

// Marcar aula como completa
this.userProgressService.markCourseCompleted(1, 1) // Módulo 1, Aula 1
  .subscribe(progress => {
    console.log('Aula completada!');
  });

// Calcular progresso geral
const percentual = this.userProgressService.calculateOverallProgress();
console.log(`Progresso: ${percentual}%`);
```

## Observações Importantes

### Desenvolvimento vs Produção

**No desenvolvimento atual:**
- Os arquivos JSON ficam em `assets/data/user-progress/`
- O salvamento é simulado (mantido em memória/cache)
- Para persistência real, é necessário implementar um backend

**Para produção (recomendado):**
- Criar endpoints no backend para:
  - `GET /api/user-progress/:email` - Carregar progresso
  - `POST /api/user-progress` - Salvar progresso
  - `PUT /api/user-progress/:email` - Atualizar progresso
- Armazenar os JSONs em banco de dados ou sistema de arquivos do servidor
- Adicionar autenticação e validação de permissões

### Segurança

- Cada usuário só deve ter acesso ao seu próprio arquivo de progresso
- Implementar validação no backend para evitar acesso não autorizado
- Considerar criptografar informações sensíveis

### Performance

- O sistema usa cache em memória para evitar requisições desnecessárias
- O progresso é carregado apenas uma vez no login
- Atualizações são feitas localmente e sincronizadas com o servidor

## Próximos Passos

1. Implementar endpoints no backend (Spring Boot/Java)
2. Criar tabela no banco de dados para armazenar progresso
3. Adicionar validações de segurança
4. Implementar sincronização em tempo real (WebSocket)
5. Adicionar analytics e relatórios de progresso
