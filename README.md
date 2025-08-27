# PrototiposDeChamados

# Portal eSocial - Sistema de Solicitações

## 📁 Estrutura do Projeto

```
portal-esocial/
├── index.html          # Página principal com estrutura HTML
├── css/               # Arquivos de estilo separados por funcionalidade
│   ├── base.css       # Estilos base, header, footer, componentes gerais
│   ├── login.css      # Estilos específicos da tela de login
│   ├── dashboard.css  # Estilos do painel administrativo e dashboards
│   ├── forms.css      # Estilos de formulários e inputs
│   ├── modals.css     # Estilos dos modais/popups
│   └── responsive.css # Media queries e responsividade
├── js/                # Arquivos JavaScript modulares
│   ├── data.js        # Dados do sistema (usuários, órgãos, solicitações)
│   ├── auth.js        # Sistema de autenticação e login
│   ├── dashboard.js   # Funcionalidades do painel administrativo
│   ├── forms.js       # Gestão de formulários e validações
│   ├── modals.js      # Sistema de modais e popups
│   ├── utils.js       # Funções utilitárias (máscaras, validações, etc.)
│   └── app.js         # Arquivo principal que integra todos os módulos
└── README.md          # Este arquivo
```


**Responsável por:**
- **CSS:** Todos os arquivos em `/css/`
  - `base.css` - Layout geral, header, footer
  - `login.css` - Interface de login
  - `dashboard.css` - Painéis administrativos
  - `forms.css` - Formulários
  - `modals.css` - Modais
  - `responsive.css` - Responsividade móvel

- **JavaScript UI:**
  - `modals.js` - Sistema de modais
  - `utils.js` - Funções utilitárias (máscaras, validações)
  - Partes do `app.js` relacionadas à UI


- **JavaScript Logic:**
  - `data.js` - Estrutura de dados e modelos
  - `auth.js` - Sistema de autenticação
  - `dashboard.js` - Lógica do dashboard
  - `forms.js` - Processamento de formulários
  - Partes do `app.js` relacionadas à lógica de negócio

- **HTML:** 
  - `index.html` - Estrutura e integração

## 🔧 Como Trabalhar Sem Conflitos

### 1. **Configuração Inicial**
```bash
# Clone o repositório
git clone <url-do-repositorio>
cd portal-esocial

# Crie sua branch de trabalho
git checkout -b feature/nome-da-funcionalidade
```

### 2. **Fluxo de Trabalho**

#### **Para Desenvolvedor 1 (Frontend/UI):**
```bash
# Trabalhe nos arquivos CSS e modais/utils JS
git add css/ js/modals.js js/utils.js
git commit -m "feat: atualizar estilos do dashboard"
git push origin feature/ui-melhorias
```

#### **Para Desenvolvedor 2 (Backend Logic):**
```bash
# Trabalhe na lógica de negócio e dados
git add js/data.js js/auth.js js/dashboard.js js/forms.js index.html
git commit -m "feat: adicionar validação de usuários"
git push origin feature/auth-validation
```

### 3. **Integração e Merge**
- Sempre faça **pull requests** ao invés de merge direto
- Teste localmente antes de fazer push
- Comunique mudanças que possam afetar o outro desenvolvedor

## 📋 Convenções do Código

### **CSS:**
- Use nomes de classes descritivos em inglês
- Mantenha consistência com as cores: `#dc2626` (vermelho), `#1f2937` (azul escuro)
- Responsive-first: mobile primeiro, depois desktop

### **JavaScript:**
- Use `camelCase` para variáveis e funções
- Comente funções complexas
- Mantenha funções pequenas e específicas
- Use `const` e `let` ao invés de `var`

### **Commits:**
```
feat: nova funcionalidade
fix: correção de bug
style: mudanças de estilo/CSS
refactor: refatoração de código
docs: documentação
```

## 🚀 Executando o Projeto

1. **Desenvolvimento Local:**
   - Abra `index.html` diretamente no navegador, ou
   - Use um servidor local: `python -m http.server 8000` ou Live Server no VS Code

2. **Usuários de Teste:**
   - Admin: `admin` / `admin123`
   - Divisão: `divisao` / `divisao123`
   - Usuário: `46484317828` / `123456`

## 🎯 Principais Funcionalidades

### **Sistema de Perfis:**
- **Admin:** Gestão completa de usuários e órgãos
- **Divisão eSocial:** Gestão de chamados e equipes
- **Gestores:** Cadastro de usuários do próprio órgão
- **Equipes:** Visualização de chamados atribuídos
- **Usuários:** Criação de solicitações

### **Módulos Principais:**
1. **Autenticação** (`auth.js`)
2. **Dashboard Administrativo** (`dashboard.js`)
3. **Gestão de Formulários** (`forms.js`)
4. **Sistema de Modais** (`modals.js`)
5. **Dados e Modelos** (`data.js`)

## 🐛 Resolução de Conflitos

### **Se houver conflito nos arquivos compartilhados:**

1. **app.js** - Arquivo principal compartilhado:
   - Desenvolvedor 1: modificar apenas seções marcadas como `// UI SECTION`
   - Desenvolvedor 2: modificar apenas seções marcadas como `// LOGIC SECTION`

2. **index.html** - Principalmente Desenvolvedor 2:
   - Desenvolvedor 1: comunicar antes de alterar estrutura HTML
   - Fazer mudanças incrementais e testar

### **Comunicação:**
- Use comentários TODO no código: `// TODO: implementar validação`
- Documente mudanças importantes no commit
- Comunique alterações que afetem a integração

## 📱 Responsividade

O sistema é totalmente responsivo com breakpoints:
- **Desktop:** > 768px
- **Tablet:** 481px - 768px  
- **Mobile:** < 480px

## 🔒 Segurança

- Validação client-side (educativa)
- Sanitização de dados de entrada
- Controle de acesso por perfil
- Senhas são armazenadas em texto plano (apenas para demonstração)

---

**Desenvolvido por:** Egliane da Costa Santos Silva e Luciana Silveira - Equipe RH Estruturante