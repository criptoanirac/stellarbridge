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
