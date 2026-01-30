# StellarBridge TODO

## Dashboard de Candidatas
- [x] Criar página TalentDashboard com navegação lateral
- [x] Adicionar seção de perfil com badges e habilidades
- [x] Adicionar seção de matches recebidos
- [x] Adicionar seção de vagas salvas
- [x] Adicionar endpoints de API para buscar matches
- [x] Integrar dashboard com backend via tRPC
- [x] Testar fluxo completo do dashboard

## Edição de Perfil
- [x] Criar modal de edição de perfil no TalentDashboard
- [x] Adicionar formulário para editar bio e informações básicas
- [x] Adicionar seção para adicionar/remover habilidades
- [x] Adicionar seção para adicionar/remover educação
- [x] Adicionar seção para adicionar/remover certificações
- [x] Adicionar endpoint de API para atualizar perfil
- [x] Integrar modal com backend via tRPC
- [x] Testar fluxo completo de edição

## Página de Capacitação e Desenvolvimento
- [x] Criar página TrainingHub com listagem de cursos
- [x] Adicionar seção de instituições parceiras (Mulheres que Codam, Sebrae, Let's Cocreate)
- [x] Adicionar filtros por categoria, nível e instituição
- [x] Criar cards de cursos com informações detalhadas
- [ ] Adicionar schemas de banco de dados para cursos e inscrições
- [ ] Implementar sistema de inscrição em cursos
- [ ] Adicionar rastreamento de progresso de cursos
- [ ] Integrar com dashboard de candidatas
- [ ] Testar fluxo completo de capacitação

## Seed de Dados Fictícios
- [x] Criar script seed-db.mjs para popular banco de dados
- [x] Adicionar dados fictícios de candidatas (5-10 perfis)
- [x] Adicionar dados fictícios de empresas (3-5 empresas)
- [x] Adicionar dados fictícios de vagas (5-10 vagas)
- [x] Adicionar dados fictícios de matches (10-15 matches)
- [x] Executar seed e validar dados no banco

## Correção de Validação do Formulário de Cadastro
- [x] Adicionar validação de campos obrigatórios com mensagens específicas
- [x] Marcar visualmente campos com erro (borda vermelha)
- [x] Adicionar mensagens de erro abaixo de cada campo
- [x] Adicionar botão de preenchimento automático com dados fictícios
- [x] Testar validação em todos os passos do formulário

## Correção de Erro de Insert na Tabela Talents
- [x] Investigar erro de insert na tabela talents
- [x] Verificar schema da tabela e campos obrigatórios
- [x] Corrigir mutation createProfile no backend
- [x] Testar criação de perfil após correção

## Correção de Tema Dark Mode
- [x] Verificar todas as páginas com fundo branco
- [x] Aplicar tema dark em TalentDashboard
- [x] Aplicar tema dark em TrainingHub
- [x] Aplicar tema dark em ManageJobs
- [x] Aplicar tema dark em PostJob
- [x] Testar visual em todas as páginas

## Correção Final de Tema Dark Mode
- [x] Verificar e corrigir tela inicial (Onboarding)
- [x] Verificar e corrigir página de Capacitação (TrainingHub)
- [x] Verificar e corrigir Área da Empresa (EmployerDashboard)
- [x] Verificar e corrigir todas as demais páginas
- [x] Aplicar bg-dark-bg ou bg-[#0a0e27] onde necessário
- [x] Testar visual em todas as páginas

## Correção de Sobreposição na Página Inicial
- [x] Ajustar espaçamento entre botões e texto descritivo
- [x] Aumentar margem inferior dos botões
- [x] Testar responsividade em diferentes tamanhos de tela

## Dashboard de Impacto Social
- [x] Atualizar schema: adicionar campos salaryMin, salaryMax, location em jobPostings
- [x] Atualizar schema: adicionar campo status em matches
- [x] Criar tabela successStories para depoimentos
- [x] Adicionar campo birthDate em talents (opcional)
- [x] Criar endpoints tRPC para métricas de impacto social
- [x] Atualizar seed-db.mjs com dados de salário, localização e histórias de sucesso
- [x] Implementar página SocialImpact.tsx com visualizações
- [x] Adicionar gráficos: KPIs, mapas, tendências, histórias de sucesso
- [x] Integrar dashboard ao menu de navegação
- [x] Testar todas as métricas e visualizações

## Filtro de Período no Dashboard de Impacto Social
- [x] Atualizar endpoints tRPC para aceitar parâmetros de período (dateFrom, dateTo)
- [x] Modificar funções do banco de dados para filtrar por data
- [x] Adicionar componente Select para escolha de período na interface
- [x] Implementar lógica de cálculo de datas (últimos 30 dias, 3 meses, 6 meses, 1 ano, todos)
- [x] Integrar filtros com todas as queries (métricas, gráficos, histórias)
- [x] Testar filtros e validar atualização dinâmica dos dados

## Dashboard de Desenvolvimento Profissional para Talentos
- [x] Criar tabela careerPlans (meta de carreira, cargo desejado, prazo)
- [x] Criar tabela achievements (conquistas/badges desbloqueados)
- [x] Criar tabela talentProgress (pontos XP, nível, histórico de progresso)
- [x] Criar tabela courseRecommendations (cursos recomendados baseados em gaps)
- [x] Adicionar campos de gamificação em talents (xp, level, badges)
- [x] Criar endpoints tRPC para gerenciar plano de carreira
- [x] Criar endpoints para sistema de conquistas e recompensas
- [x] Implementar lógica de recomendação de cursos baseada em skills gap
- [x] Criar página TalentDashboard com métricas pessoais
- [x] Adicionar visualizações de evolução (gráficos de progresso)
- [x] Implementar formulário de definição de meta de carreira
- [x] Criar componente de roadmap visual da trilha de aprendizado
- [x] Implementar sistema de badges e conquistas
- [x] Criar componente de exibição de nível e XP
- [x] Atualizar seed com dados de exemplo
- [x] Testar todas as funcionalidades

## Expansão de Dados Fictícios Realistas
- [x] Expandir seed com 30+ talentos diversos (diferentes níveis, localizações, áreas)
- [x] Adicionar 15+ empresas de diversos portes e setores
- [x] Criar 40+ vagas detalhadas com requisitos e salários variados
- [x] Gerar 50+ matches em diferentes estágios
- [x] Adicionar 10+ histórias de sucesso inspiradoras
- [x] Criar 15+ planos de carreira diversos
- [x] Adicionar 30+ conquistas distribuídas entre talentos
- [x] Gerar 40+ recomendações de cursos
- [x] Executar seed e testar visualização

## Navegação - Botão Home
- [x] Adicionar botão "Voltar para Home" no header da página SocialImpact

## Correção de Autenticação - Tela Inicial
- [x] Investigar fluxo de autenticação na página Home
- [x] Verificar se botões "Sou Talento" e "Sou Empresa" estão funcionando
- [x] Adicionar instruções claras de login ou corrigir navegação
- [x] Testar fluxo completo de autenticação

## Correção de Cadastro e Autenticação
- [x] Investigar página TalentSignup e fluxo de cadastro
- [x] Verificar integração com Manus OAuth
- [x] Implementar redirecionamento correto pós-login
- [x] Testar criação de perfil completo
- [x] Criar documentação do processo de autenticação

## Debug de Autenticação
- [ ] Verificar logs do servidor para erros de OAuth
- [ ] Testar fluxo completo de login manualmente
- [ ] Verificar configuração de variáveis de ambiente
- [ ] Corrigir problema identificado

## Autenticação Fictícia para Testes
- [x] Criar endpoint /api/dev-login para autenticação fictícia
- [x] Adicionar botão "Login Rápido" na página inicial
- [x] Implementar criação automática de usuário de teste
- [x] Testar fluxo completo de login fictício

## Correção de Erro - Criação de Perfil
- [x] Investigar endpoint talent.createProfile no routers.ts
- [x] Corrigir retorno de insertId
- [x] Testar criação completa de perfil com skills e education

## Correção de Erro - Inserção no Banco
- [x] Investigar logs do servidor para identificar causa raiz
- [x] Verificar se userId já existe na tabela talents
- [x] Corrigir lógica de inserção ou adicionar verificação de duplicatas
- [x] Testar criação de perfil completa

## Página Bridge - Conexão Empresas x Talentos
- [x] Criar endpoint talent.list com filtros (skills, localização, experiência)
- [x] Popular banco com 7 candidatas fictícias diversas (seed já executado)
- [x] Criar página Bridge.tsx com listagem de cards
- [x] Implementar filtros de busca (skills, localização, experiência)
- [x] Adicionar funcionalidade de match/interesse
- [x] Testar listagem e filtros

## Correção - SelectItem com valor vazio
- [x] Substituir value="" por value="all" nos SelectItem da página Bridge
- [x] Verificar se endpoint talent.list está funcionando corretamente
- [x] Garantir que talentos sejam carregados na página Bridge
- [x] Corrigir seed para associar skills aos talentos corretamente

## Melhorias na Página Bridge
- [x] Remover botão "Explorar Talentos" da página inicial (Onboarding)
- [x] Criar modal de detalhes da candidata na página Bridge
- [x] Popular modal com informações fictícias completas (educação, certificações, experiência)

## Integração Bridge com Dashboard Empresa
- [x] Verificar se existe página EmployerDashboard
- [x] Adicionar link/botão para Bridge no dashboard da empresa
- [x] Testar carregamento de dados fictícios na página Bridge

## Melhoria de Navegação - Bridge
- [x] Substituir botão "Home" por "Voltar" na página Bridge

## Bug - Botão Voltar não Funciona
- [x] Investigar por que botão Voltar não está funcionando na página Bridge
- [x] Corrigir implementação do botão
- [x] Testar navegação completa

## Configuração GitHub
- [ ] Autenticar no GitHub CLI
- [ ] Criar repositório stellarbridge
- [ ] Enviar código para GitHub
- [ ] Fornecer instruções de acesso ao usuário

## Documentação
- [x] Criar README.md profissional para o repositório GitHub

## Screenshots para Documentação
- [x] Criar pasta docs/screenshots
- [x] Capturar screenshot da página inicial (Onboarding)
- [x] Capturar screenshot da página Bridge
- [x] Capturar screenshot do Dashboard da Empresa
- [x] Capturar screenshot do Dashboard de Impacto Social
- [x] Atualizar README.md com seção de screenshots

## Landing Page
- [x] Criar página Landing.tsx com seções: Hero, Funcionalidades, Impacto, Depoimentos, CTA
- [x] Adicionar animações e efeitos visuais
- [x] Garantir responsividade mobile
- [x] Adicionar rota /landing no App.tsx
- [x] Testar em diferentes resoluções

## Bug - Tags <a> Aninhadas na Landing Page
- [x] Corrigir tags <a> aninhadas no footer da landing page
- [x] Testar página sem erros no console

## Gamificação Financeira com XLM
- [x] Planejar estrutura de dados (cursos, módulos, recompensas, transações)
- [x] Criar schema no banco de dados para cursos e módulos
- [x] Criar schema para transações XLM e saldos
- [x] Implementar tRPC procedures para gerenciar ganhos
- [x] Criar página "Meus Ganhos" com saldo XLM (versão MVP com dados fictícios)
- [ ] Integrar Freighter wallet (carteira Stellar) - Adiado para próxima fase
- [x] Criar dashboard de cursos com recompensas visíveis (MVP simplificado)
- [ ] Implementar sistema de liberação de XLM por módulo concluído
- [ ] Adicionar histórico de transações
- [ ] Criar badges NFT para certificados de conclusão
- [ ] Testar fluxo completo de gamificação
