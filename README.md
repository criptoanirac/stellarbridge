# 🌉 StellarBridge

**Sua ponte para a liberdade profissional**

StellarBridge é uma plataforma inovadora de recrutamento blind (às cegas) com validação blockchain, projetada para conectar talentos femininos verificados a empresas comprometidas com diversidade e inclusão. A plataforma elimina vieses inconscientes no processo de recrutamento através de perfis pseudonimizados, validação de habilidades em blockchain e matchmaking inteligente baseado em competências técnicas.

---

## 🎯 Missão

Promover a empregabilidade feminina através de capacitação profissional, validação transparente de competências e conexões justas entre talentos e oportunidades, criando uma ponte digital que transforma vidas e impulsiona a diversidade no mercado de trabalho.

---

## 📸 Screenshots

### Página Inicial

![Página Inicial](docs/screenshots/01-home.webp)

*Tela de boas-vindas com opções de login rápido para talentos e empresas, além de acesso ao dashboard de impacto social.*

### Dashboard da Empresa

![Dashboard da Empresa](docs/screenshots/02-employer-dashboard.webp)

*Dashboard empresarial com matches automáticos, scores de compatibilidade e acesso ao banco de talentos verificados.*

### Bridge - Banco de Talentos

![Bridge](docs/screenshots/03-bridge.webp)

*Página Bridge com listagem de talentos, filtros avançados por localização, experiência e skills, e cards informativos com perfis pseudonimizados.*

### Dashboard de Impacto Social

![Dashboard de Impacto Social](docs/screenshots/04-impacto-social.webp)

*Painel público com métricas transparentes de impacto: mulheres capacitadas, vagas preenchidas, taxa de empregabilidade e gráficos interativos.*

---

## ✨ Funcionalidades Principais

### 🔐 Recrutamento Blind (Às Cegas)

A StellarBridge implementa um sistema de recrutamento blind que garante processos seletivos justos e livres de vieses. Os perfis das candidatas são apresentados com pseudônimos até que ocorra um match, permitindo que empresas avaliem exclusivamente as competências técnicas, experiência profissional e certificações verificadas. Este modelo promove inclusão genuína e decisões baseadas puramente em mérito.

### 🎓 Sistema de Capacitação e Desenvolvimento

A plataforma oferece um ecossistema completo de desenvolvimento profissional com parcerias estratégicas com instituições renomadas como Mulheres que Codam, Sebrae e Let's Cocreate. O sistema inclui trilhas de aprendizado personalizadas, recomendações inteligentes de cursos baseadas em gaps de habilidades e metas de carreira, além de um dashboard de desenvolvimento profissional que acompanha a evolução de cada talento.

### 🏆 Gamificação e Conquistas

Para engajar e motivar o desenvolvimento contínuo, implementamos um sistema robusto de gamificação com pontos de experiência (XP), níveis progressivos de 1 a 10, badges de conquistas e certificações verificadas. Cada talento pode visualizar sua evolução através de gráficos interativos e desbloquear novas oportunidades conforme avança em sua jornada profissional.

### 📊 Dashboard de Impacto Social

Um painel analítico público demonstra o impacto social da plataforma através de métricas transparentes: número de mulheres capacitadas, taxa de empregabilidade, distribuição geográfica dos talentos, evolução salarial e histórias de sucesso inspiradoras. Os dados podem ser filtrados por período (últimos 30 dias, 3 meses, 6 meses, 1 ano ou todos os períodos) para análises temporais detalhadas.

### 🤝 Matchmaking Inteligente

O algoritmo de matchmaking da Bridge analisa compatibilidade entre vagas e talentos considerando habilidades técnicas, experiência, localização e preferências de ambas as partes. O sistema calcula scores de compatibilidade percentuais e apresenta matches automáticos para empresas, facilitando a descoberta de candidatas ideais para cada posição.

### 🔍 Busca Avançada de Talentos

Empresas têm acesso a ferramentas poderosas de busca e filtros incluindo pesquisa por skills específicas, localização geográfica, anos de experiência, indústria de atuação e nível de senioridade. A interface apresenta cards informativos com pseudônimos, habilidades verificadas, certificações e links para portfolios públicos.

---

## 🛠️ Stack Tecnológica

A StellarBridge foi construída com tecnologias modernas e robustas para garantir performance, escalabilidade e experiência de usuário excepcional.

### Frontend

**React 19** serve como base da interface do usuário, aproveitando os recursos mais recentes do framework para criar componentes reativos e eficientes. **TypeScript** adiciona tipagem estática ao código JavaScript, reduzindo bugs e melhorando a manutenibilidade. **Tailwind CSS 4** proporciona um sistema de design consistente através de classes utilitárias, permitindo estilização rápida e responsiva. **Shadcn/UI** fornece componentes acessíveis e customizáveis que seguem as melhores práticas de design.

O design visual adota uma estética cyberpunk dark mode com gradientes cyan e magenta, criando uma identidade visual única e moderna que reflete a inovação tecnológica da plataforma.

### Backend

**tRPC 11** estabelece comunicação type-safe entre frontend e backend, eliminando a necessidade de definições manuais de contratos de API. **Express 4** gerencia o servidor HTTP e middleware. **Drizzle ORM** facilita interações com o banco de dados através de queries type-safe em TypeScript. **MySQL** armazena todos os dados relacionais da plataforma com integridade e performance.

A arquitetura utiliza **Superjson** para serialização automática de tipos complexos como Date, permitindo que objetos retornados do banco de dados mantenham seus tipos nativos no frontend sem conversões manuais.

### Autenticação

O sistema implementa autenticação fictícia para facilitar testes e demonstrações através do endpoint `/api/dev-login`. Este sistema cria usuários de teste automaticamente com perfis completos, permitindo exploração imediata de todas as funcionalidades sem necessidade de configuração OAuth real. Em produção, a plataforma pode ser integrada com Manus OAuth ou outros provedores de identidade.

### Visualização de Dados

**Recharts** gera gráficos interativos e responsivos para dashboards analíticos, incluindo gráficos de linha para tendências temporais, gráficos de barras para comparações e gráficos de pizza para distribuições percentuais. Todos os gráficos seguem a paleta de cores da plataforma e incluem tooltips informativos.

---

## 📦 Instalação

### Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

- **Node.js** versão 22.13.0 ou superior
- **pnpm** gerenciador de pacotes
- **MySQL** versão 8.0 ou superior

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/yanirac/stellarbridge.git
cd stellarbridge
```

### Passo 2: Instalar Dependências

```bash
pnpm install
```

### Passo 3: Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DATABASE_URL=mysql://usuario:senha@localhost:3306/stellarbridge
JWT_SECRET=sua_chave_secreta_jwt
NODE_ENV=development
```

Substitua `usuario`, `senha` e `sua_chave_secreta_jwt` pelos valores apropriados para seu ambiente.

### Passo 4: Configurar Banco de Dados

Execute as migrações para criar as tabelas necessárias:

```bash
pnpm db:push
```

### Passo 5: Popular Banco com Dados Fictícios

Para facilitar testes e demonstrações, execute o script de seed que cria 7 talentos fictícios completos, 4 empresas, 7 vagas, 8 matches e 3 histórias de sucesso:

```bash
node server/seed-db.mjs
```

### Passo 6: Iniciar Servidor de Desenvolvimento

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:3000`

---

## 🚀 Como Usar

### Para Talentos

**Acesso Rápido para Testes:** Na página inicial, clique em "Login Rápido como Talento" para criar automaticamente um usuário de teste e acessar o dashboard.

**Dashboard de Desenvolvimento:** Visualize seu nível atual, pontos XP, badges conquistados e progresso em trilhas de aprendizado. Defina metas de carreira e receba recomendações personalizadas de cursos baseadas em gaps de habilidades identificados pelo sistema.

**Perfil Profissional:** Complete seu perfil com informações sobre educação, certificações, experiência profissional e habilidades técnicas. Adicione links para portfolio, GitHub e LinkedIn para aumentar sua visibilidade.

**Capacitação:** Explore cursos disponíveis de instituições parceiras, filtre por categoria e nível de dificuldade, e inscreva-se em trilhas de aprendizado alinhadas com seus objetivos profissionais.

### Para Empresas

**Acesso Rápido para Testes:** Na página inicial, clique em "Login Rápido como Empresa" para criar automaticamente um usuário de teste e acessar o dashboard empresarial.

**Dashboard Empresarial:** Visualize matches automáticos entre suas vagas e talentos verificados, com scores de compatibilidade percentuais e filtros por skills específicas.

**Bridge - Banco de Talentos:** Acesse a página Bridge para explorar todos os talentos disponíveis na plataforma. Utilize filtros avançados por localização, experiência, indústria e skills para encontrar candidatas ideais.

**Visualização de Perfis:** Clique em "Ver Candidata" para acessar informações detalhadas incluindo educação, certificações (AWS, Scrum, Google Cloud), experiência profissional e links para trabalhos anteriores.

**Publicação de Vagas:** Publique novas oportunidades com descrição detalhada, requisitos técnicos, faixa salarial e localização. O sistema automaticamente identifica talentos compatíveis e gera matches.

### Dashboard de Impacto Social

**Acesso Público:** Qualquer visitante pode acessar o dashboard de impacto social através do botão na página inicial para visualizar métricas transparentes sobre o impacto da plataforma.

**Métricas Disponíveis:** Total de mulheres capacitadas, taxa de empregabilidade, distribuição geográfica, evolução salarial média, histórias de sucesso e tendências temporais.

**Filtros de Período:** Selecione períodos específicos (últimos 30 dias, 3 meses, 6 meses, 1 ano ou todos os períodos) para análises temporais detalhadas.

---

## 📁 Estrutura do Projeto

```
stellarbridge/
├── client/                      # Frontend React
│   ├── src/
│   │   ├── pages/              # Páginas da aplicação
│   │   │   ├── Onboarding.tsx  # Página inicial com login rápido
│   │   │   ├── Bridge.tsx      # Listagem de talentos para empresas
│   │   │   ├── TalentDashboard.tsx          # Dashboard do talento
│   │   │   ├── EmployerDashboard.tsx        # Dashboard da empresa
│   │   │   ├── ImpactoSocial.tsx            # Dashboard público de impacto
│   │   │   ├── ProfessionalDevelopment.tsx  # Desenvolvimento profissional
│   │   │   └── TrainingHub.tsx              # Hub de capacitação
│   │   ├── components/         # Componentes reutilizáveis
│   │   │   └── ui/            # Componentes Shadcn/UI
│   │   ├── lib/               # Utilitários e configurações
│   │   │   └── trpc.ts        # Cliente tRPC
│   │   ├── App.tsx            # Rotas e layout principal
│   │   ├── main.tsx           # Entry point do React
│   │   └── index.css          # Estilos globais e tema
│   └── public/                # Assets estáticos
├── server/                     # Backend Express + tRPC
│   ├── routers.ts             # Endpoints tRPC
│   ├── db.ts                  # Funções de banco de dados
│   ├── seed-db.mjs            # Script de seed com dados fictícios
│   └── _core/                 # Infraestrutura do servidor
├── drizzle/                    # Schema e migrações do banco
│   └── schema.ts              # Definição de tabelas
├── shared/                     # Tipos e constantes compartilhadas
└── package.json               # Dependências e scripts
```

---

## 🗄️ Modelo de Dados

A plataforma utiliza um modelo relacional robusto com as seguintes tabelas principais:

### Tabela `talents`

Armazena informações dos talentos cadastrados incluindo dados pessoais, pseudônimo para recrutamento blind, biografia profissional, localização, anos de experiência, cargo atual, sistema de gamificação (XP, nível, badges) e timestamps de criação e atualização.

### Tabela `talent_skills`

Relacionamento muitos-para-muitos entre talentos e habilidades técnicas, permitindo que cada talento tenha múltiplas skills associadas ao seu perfil.

### Tabela `talent_education`

Registra histórico educacional dos talentos incluindo instituição de ensino, curso/grau obtido, campo de estudo e período de conclusão.

### Tabela `talent_certifications`

Armazena certificações profissionais verificadas como AWS, Scrum, Google Cloud, incluindo nome da certificação, instituição emissora, data de obtenção e URL de verificação.

### Tabela `employers`

Dados das empresas cadastradas incluindo nome, indústria de atuação, tamanho da empresa, localização, website e descrição institucional.

### Tabela `job_postings`

Vagas publicadas pelas empresas com título, descrição detalhada, requisitos técnicos, faixa salarial (mínimo e máximo), localização, tipo de contrato e status da vaga.

### Tabela `matches`

Registra matches entre talentos e vagas incluindo score de compatibilidade percentual, status do match (pending, accepted, rejected, hired) e timestamps de criação e atualização.

### Tabela `success_stories`

Histórias de sucesso de talentos que foram contratados através da plataforma, incluindo depoimento, cargo conquistado, empresa contratante e data de publicação.

### Tabela `career_plans`

Planos de carreira personalizados dos talentos com meta profissional, cargo desejado, prazo para alcançar o objetivo e skills necessárias para atingir a meta.

### Tabela `achievements`

Sistema de conquistas e badges desbloqueados pelos talentos através de marcos como completar cursos, receber matches, ser contratado ou atingir níveis específicos.

### Tabela `talent_progress`

Histórico de evolução dos talentos registrando ganhos de XP, mudanças de nível e progresso em trilhas de aprendizado ao longo do tempo.

### Tabela `course_recommendations`

Recomendações personalizadas de cursos baseadas em análise de gaps de habilidades e metas de carreira de cada talento.

---

## 🎨 Design System

A StellarBridge adota uma identidade visual cyberpunk dark mode que reflete inovação tecnológica e inclusão digital.

### Paleta de Cores

**Cores Primárias:** Cyan (#00d4ff) representa tecnologia e inovação, enquanto Magenta (#ff00ff) simboliza criatividade e empoderamento feminino. Estas cores formam a base da identidade visual e são utilizadas em gradientes, destaques e elementos interativos.

**Cores de Fundo:** A paleta de slate (950, 900, 800) cria profundidade e hierarquia visual através de diferentes tons de cinza escuro, garantindo legibilidade e conforto visual em sessões prolongadas.

**Cores de Texto:** Slate 400 para textos secundários, Slate 300 para textos primários e White para títulos e destaques, garantindo contraste adequado e acessibilidade.

### Tipografia

**Fonte Principal:** Inter é utilizada para todo o conteúdo textual, oferecendo excelente legibilidade em telas digitais e suporte completo a caracteres especiais do português brasileiro.

**Hierarquia Tipográfica:** Títulos principais (3xl, 2xl), subtítulos (xl, lg), corpo de texto (base) e textos auxiliares (sm, xs) criam hierarquia clara e facilitam a escaneabilidade do conteúdo.

### Componentes

Todos os componentes seguem o design system do Shadcn/UI com customizações para a paleta cyberpunk. Botões utilizam variantes outline com bordas cyan/magenta, cards possuem backgrounds translúcidos com blur effect, e inputs seguem o tema dark com bordas sutis.

---

## 🧪 Testes

O projeto utiliza **Vitest** para testes unitários e de integração. Para executar os testes:

```bash
pnpm test
```

Testes de exemplo estão disponíveis em `server/auth.logout.test.ts` demonstrando como testar endpoints tRPC.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Se você deseja melhorar a StellarBridge, siga estes passos:

**Fork o Repositório:** Crie uma cópia do projeto em sua conta do GitHub clicando no botão Fork.

**Clone sua Fork:** Baixe o código para sua máquina local usando `git clone`.

**Crie uma Branch:** Desenvolva suas alterações em uma branch separada com nome descritivo como `feature/nova-funcionalidade` ou `fix/correcao-bug`.

**Faça Commit das Alterações:** Utilize mensagens de commit claras e descritivas seguindo o padrão conventional commits quando possível.

**Envie um Pull Request:** Submeta suas alterações para revisão descrevendo detalhadamente as mudanças implementadas e o problema que elas resolvem.

### Diretrizes de Contribuição

**Código Limpo:** Mantenha o código legível, bem documentado e seguindo as convenções do projeto. Utilize TypeScript para tipagem estática e evite uso de `any`.

**Testes:** Adicione testes para novas funcionalidades e garanta que todos os testes existentes continuem passando antes de submeter o pull request.

**Documentação:** Atualize o README e outros documentos relevantes quando adicionar ou modificar funcionalidades significativas.

**Acessibilidade:** Garanta que novos componentes de interface sejam acessíveis seguindo as diretrizes WCAG 2.1 nível AA.

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License**. Consulte o arquivo `LICENSE` para mais detalhes.

---

## 👥 Autores

**Yanira C.** - Idealizadora e desenvolvedora principal da StellarBridge

---

## 🌟 Agradecimentos

Agradecimentos especiais às instituições parceiras que tornam possível a missão de capacitação profissional feminina:

**Mulheres que Codam** - Organização dedicada a ensinar programação para mulheres, promovendo inclusão no mercado de tecnologia através de bootcamps intensivos e mentoria especializada.

**Sebrae** - Serviço Brasileiro de Apoio às Micro e Pequenas Empresas, oferecendo capacitação empreendedora e desenvolvimento de habilidades de gestão para mulheres que desejam empreender.

**Let's Cocreate** - Plataforma de inovação colaborativa que conecta talentos a projetos reais, proporcionando experiência prática e networking profissional.

---

## 📞 Contato

Para dúvidas, sugestões ou parcerias, entre em contato através do GitHub ou abra uma issue no repositório.

---

## 🔮 Roadmap Futuro

**Sistema de Favoritos:** Permitir que empresas salvem candidatas de interesse para revisão posterior com lista dedicada no dashboard empresarial.

**Busca por Múltiplas Skills:** Implementar filtro de tags removíveis para buscar candidatas que possuam combinações específicas de habilidades técnicas.

**Página de Vagas para Talentos:** Criar interface onde talentos possam visualizar oportunidades disponíveis e se candidatar diretamente pela plataforma.

**Paginação Avançada:** Adicionar paginação na listagem de talentos para melhorar performance com grandes volumes de dados.

**Sistema de Match Score Detalhado:** Expandir algoritmo de compatibilidade para considerar soft skills, cultura organizacional e preferências de trabalho remoto.

**Integração Blockchain Real:** Implementar validação de certificações em blockchain público para garantir autenticidade e imutabilidade de credenciais.

**Chat Interno:** Sistema de mensagens diretas entre empresas e talentos após match confirmado, mantendo anonimato até decisão mútua.

**Analytics Avançado:** Dashboard para empresas com métricas detalhadas sobre processo seletivo, tempo médio de contratação e diversidade do pipeline.

---

**Construído com 💜 para promover inclusão e empoderar talentos femininos no mercado de trabalho.**
