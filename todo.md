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
