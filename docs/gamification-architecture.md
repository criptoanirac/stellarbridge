# Arquitetura do Sistema de Gamificação Financeira

## Visão Geral

Sistema Learn-to-Earn que recompensa talentos com XLM (Stellar Lumens) conforme completam módulos de capacitação. Totalmente anônimo, com valores fictícios para demonstração.

---

## Estrutura de Dados

### **Tabela: courses**
```sql
id: int (PK)
title: string
description: text
category: enum('web3', 'ia', 'vendas', 'design')
difficulty: enum('básico', 'intermediário', 'avançado')
total_reward_xlm: decimal(10,2)
duration_hours: int
created_at: timestamp
```

### **Tabela: modules**
```sql
id: int (PK)
course_id: int (FK → courses)
title: string
description: text
order: int
reward_xlm: decimal(10,2)
content_url: string (opcional)
created_at: timestamp
```

### **Tabela: user_course_progress**
```sql
id: int (PK)
user_id: int (FK → user)
course_id: int (FK → courses)
status: enum('not_started', 'in_progress', 'completed')
started_at: timestamp
completed_at: timestamp (nullable)
```

### **Tabela: user_module_completion**
```sql
id: int (PK)
user_id: int (FK → user)
module_id: int (FK → modules)
completed_at: timestamp
xlm_earned: decimal(10,2)
transaction_hash: string (nullable, para futuro)
```

### **Tabela: user_wallet**
```sql
id: int (PK)
user_id: int (FK → user)
stellar_address: string (nullable)
total_earned_xlm: decimal(10,2)
available_xlm: decimal(10,2)
locked_xlm: decimal(10,2)
last_updated: timestamp
```

### **Tabela: xlm_transactions**
```sql
id: int (PK)
user_id: int (FK → user)
type: enum('earn', 'withdraw', 'bonus')
amount_xlm: decimal(10,2)
description: string
module_id: int (FK → modules, nullable)
transaction_hash: string (nullable)
created_at: timestamp
```

---

## Fluxo de Dados

### **1. Usuária se Inscreve em Curso**
```
User → tRPC.courses.enroll({ courseId })
  ↓
Cria registro em user_course_progress (status: 'in_progress')
  ↓
Calcula XLM total disponível no curso
  ↓
Atualiza user_wallet.locked_xlm
  ↓
Retorna curso com módulos e recompensas
```

### **2. Usuária Completa Módulo**
```
User → tRPC.modules.complete({ moduleId })
  ↓
Valida se módulo pertence a curso inscrito
  ↓
Cria registro em user_module_completion
  ↓
Calcula XLM do módulo
  ↓
Atualiza user_wallet:
  - locked_xlm -= module.reward_xlm
  - available_xlm += module.reward_xlm
  - total_earned_xlm += module.reward_xlm
  ↓
Cria registro em xlm_transactions (type: 'earn')
  ↓
Verifica se todos os módulos foram concluídos
  ↓
Se sim: atualiza user_course_progress (status: 'completed')
  ↓
Emite Badge NFT (futuro)
```

### **3. Usuária Visualiza Ganhos**
```
User → tRPC.wallet.getBalance()
  ↓
Retorna user_wallet:
  - total_earned_xlm (histórico total)
  - available_xlm (disponível para saque)
  - locked_xlm (em cursos ativos)
  ↓
tRPC.wallet.getTransactions()
  ↓
Retorna xlm_transactions ordenado por data
```

### **4. Usuária Conecta Carteira Stellar**
```
Frontend → Freighter.requestAccess()
  ↓
Obtém stellar_address
  ↓
User → tRPC.wallet.connectStellar({ address })
  ↓
Atualiza user_wallet.stellar_address
  ↓
Retorna confirmação
```

### **5. Usuária Saca XLM (Futuro)**
```
User → tRPC.wallet.withdraw({ amount })
  ↓
Valida available_xlm >= amount
  ↓
Cria transação Stellar (Smart Contract)
  ↓
Envia XLM para stellar_address
  ↓
Atualiza user_wallet.available_xlm -= amount
  ↓
Cria registro em xlm_transactions (type: 'withdraw')
  ↓
Retorna transaction_hash
```

---

## Valores Fictícios (Demonstração)

### **Cursos Disponíveis:**

| Curso | Categoria | Dificuldade | Duração | Recompensa Total |
|-------|-----------|-------------|---------|------------------|
| Introdução ao Web3 | web3 | Básico | 40h | 100 XLM |
| Desenvolvimento React | web3 | Intermediário | 80h | 250 XLM |
| IA Generativa | ia | Avançado | 120h | 500 XLM |
| Vendas Consultivas | vendas | Básico | 30h | 75 XLM |
| UI/UX Design | design | Intermediário | 60h | 200 XLM |

### **Exemplo de Módulos (Curso: Introdução ao Web3)**

| Módulo | Recompensa | Conteúdo |
|--------|-----------|----------|
| 1. O que é Blockchain | 20 XLM | Conceitos fundamentais |
| 2. Rede Stellar | 20 XLM | Arquitetura e casos de uso |
| 3. Smart Contracts | 30 XLM | Desenvolvimento básico |
| 4. Projeto Final | 30 XLM | Criar DApp simples |

---

## Privacidade e Segurança

### **Princípios:**
1. **Zero Exposição de Identidade:** Nenhum dado pessoal vinculado a transações públicas
2. **Dados Agregados para Patrocinadores:** Apenas métricas totais, nunca individuais
3. **Carteira Opcional:** Usuária pode acumular XLM sem conectar carteira
4. **Auditoria Interna:** Apenas admin vê transações individuais para suporte

### **Implementação:**
- Endereços Stellar nunca expostos publicamente
- Transações internas (fictícias) não vão para blockchain até saque
- Dashboard mostra apenas dados da própria usuária
- Sem ranking ou comparação entre usuárias

---

## Integração Stellar (Futuro)

### **Fase 1: Simulação (Atual)**
- Valores fictícios em banco de dados
- Interface completa funcionando
- Sem transações reais na blockchain

### **Fase 2: Testnet**
- Integração com Stellar Testnet
- Transações reais mas sem valor monetário
- Testes de Smart Contracts

### **Fase 3: Mainnet**
- Produção com XLM real
- Smart Contracts auditados
- Sistema de patrocínio ativo

---

## Próximos Passos

1. ✅ Criar schemas no banco de dados
2. ✅ Implementar tRPC procedures
3. ✅ Criar página "Meus Ganhos"
4. ✅ Criar dashboard de cursos
5. ✅ Integrar Freighter wallet
6. ⏳ Implementar Smart Contracts (Stellar)
7. ⏳ Sistema de patrocínio
8. ⏳ Badges NFT

---

**Documento criado em:** 2026-01-30  
**Versão:** 1.0  
**Status:** Em Desenvolvimento
