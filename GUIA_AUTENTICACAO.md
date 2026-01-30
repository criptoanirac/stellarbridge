# 🔐 Guia de Autenticação - StellarBridge

## Como Funciona a Autenticação

A plataforma StellarBridge utiliza **Manus OAuth** para autenticação segura. Isso significa que você precisa ter uma conta Manus para acessar as funcionalidades da plataforma.

---

## 📋 Criando um Perfil de Talento

### Passo 1: Acessar a Plataforma
1. Acesse a página inicial da StellarBridge
2. Você verá três opções:
   - **👩‍💻 Sou Talento** (requer login)
   - **🏢 Sou Empresa** (requer login)
   - **🌍 Ver Impacto Social** (público, sem login)

### Passo 2: Fazer Login
1. Clique no botão **"👩‍💻 Sou Talento"**
2. Você será redirecionado para a página de login do Manus
3. Faça login com sua conta Manus ou crie uma nova conta
4. Após o login bem-sucedido, você será automaticamente redirecionado para o formulário de cadastro

### Passo 3: Preencher o Formulário de Cadastro
O formulário possui 3 etapas:

#### Etapa 1: Informações Pessoais
- Nome *
- Sobrenome *
- Email *
- Telefone *
- Localização
- Bio (breve descrição sobre você)

#### Etapa 2: Informações Profissionais
- Cargo Atual *
- Anos de Experiência *
- Indústria
- Habilidades * (adicione pelo menos uma)

#### Etapa 3: Formação e Certificações
- Educação (escola, curso, ano)
- Certificações
- Links de portfólio (portfolio, GitHub, LinkedIn)

*Campos obrigatórios

### Passo 4: Finalizar Cadastro
1. Revise todas as informações preenchidas
2. Clique em **"Finalizar Cadastro"**
3. Aguarde a confirmação de sucesso
4. Você será redirecionado para seu dashboard pessoal

---

## 🚀 Atalho para Testes

Para facilitar os testes, existe um botão **"✨ Preencher Automaticamente"** no canto superior direito do formulário que preenche todos os campos com dados fictícios realistas.

---

## 🏢 Criando um Perfil de Empresa

O processo é similar ao de talento:

1. Clique em **"🏢 Sou Empresa"** na página inicial
2. Faça login com sua conta Manus
3. Você será redirecionado para o dashboard da empresa
4. Complete o cadastro da empresa conforme solicitado

---

## ❓ Problemas Comuns

### "Não consigo finalizar o cadastro"
- **Causa**: Você não está autenticado
- **Solução**: Certifique-se de que fez login antes de acessar o formulário de cadastro

### "Sou redirecionado para a página inicial após login"
- **Causa**: O redirecionamento pós-login pode não estar funcionando
- **Solução**: Após fazer login, navegue manualmente para `/talent-signup` ou `/employer-dashboard`

### "Minha sessão expira rapidamente"
- **Causa**: Cookies de sessão não estão sendo salvos
- **Solução**: Verifique se seu navegador permite cookies de terceiros

---

## 🔒 Segurança

- Todas as credenciais são gerenciadas pelo Manus OAuth
- A plataforma StellarBridge **nunca** armazena senhas
- Suas informações pessoais são protegidas e criptografadas
- Você pode fazer logout a qualquer momento clicando no botão "Sair" no dashboard

---

## 📞 Suporte

Se você continuar tendo problemas com autenticação ou cadastro, entre em contato com o suporte através do email: suporte@stellarbridge.com
