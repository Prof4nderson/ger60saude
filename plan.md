# Plano de implementação — Geri60+ Saúde

## Escopo e abordagem

O Geri60+ Saúde será entregue como um dashboard responsivo para centralizar os cuidados diários de idosos, com foco inicial em acompanhamento, medicamentos, agenda, alimentação/hidratação, higiene, atividades e diário do cuidador. A interface funcionará imediatamente com dados de demonstração e persistência local para o Preview, enquanto o repositório já conterá o backend Spring Boot + PostgreSQL preparado para conectar os mesmos módulos por API REST.

A camada web usará Vite + React + TypeScript, TanStack Query para estado assíncrono e cache, e TanStack Router para navegação tipada. Nitro será configurado como camada de runtime/API auxiliar do frontend, mantendo o contrato de endpoints e health check separado do backend Java. O backend ficará em `backend/`, com Spring Boot, Spring Web, Spring Data JPA, Validation, Security preparada, Flyway e driver PostgreSQL.

## Design visual

### Direções consideradas

- **Clínico sereno** (0,06): linguagem hospitalar acolhedora, muito espaço em branco e tons neutros.
- **Holo-care** (0,07): dashboard de cuidado humano com superfícies translúcidas, gradientes aurora e sinais de presença em tempo real.
- **Cyber health** (0,05): contraste alto, neon funcional e linguagem operacional inspirada em interfaces de monitoramento.

**Direção escolhida: Holo-care com alternância Cyber.** O modo claro será “holo”, leve e luminoso; o modo escuro será “cyber”, profundo e de alto contraste, sem transformar o produto em uma interface fria.

- **Movimento:** uma fusão de design de produto de saúde digital com glassmorphism editorial; camadas translúcidas dão profundidade sem esconder informação.
- **Princípios:** cuidado antes de controle; leitura em poucos segundos; sinais de prioridade sem alarmismo; acessibilidade como parte do visual.
- **Filosofia de cor:** o claro usa marfim azulado, teal e violeta suave para transmitir confiança e proximidade. O escuro usa carvão, teal elétrico e violeta-laser para evidenciar ações e estados críticos.
- **Paradigma de layout:** navegação lateral persistente, faixa de contexto no topo e conteúdo em trilhas horizontais/assimétricas; o painel principal combina um bloco de prioridade com cartões compactos, evitando uma grade genérica centralizada.
- **Elementos de assinatura:** marca em forma de pulso + halo; chips de status em forma de pílula; linha de atividade com pontos luminosos e “agora” destacado.
- **Interação:** cada ação importante responde com confirmação visível e linguagem humana; estados vazios explicam o próximo passo; cliques no resumo levam ao módulo correspondente.
- **Animação:** entrada suave dos cartões (150–220 ms), pulso discreto em alertas novos, transições de tema sem flash, sem animação contínua que prejudique leitura ou acessibilidade.
- **Tipografia:** Manrope para títulos e Inter para dados e microcopy; hierarquia baseada em peso e contraste, com números de métricas em fonte tabular.
- **Essência da marca:** “um só lugar para cuidar melhor, mesmo à distância”; humana, clara, confiável.
- **Voz:** direta, acolhedora e orientada a ação. Exemplos: “O cuidado de hoje começa por aqui.” / “Tudo certo com a manhã de Dona Lúcia.”
- **Wordmark/logo:** símbolo de um pulso que envolve um pequeno halo, acompanhado do nome Geri60+ em peso forte e “SAÚDE” em tracking amplo.
- **Cor proprietária:** `#2BB9A8` (teal cuidado), usada em progresso, foco e ações primárias.

## Arquitetura e estrutura

```text
/
├── src/
│   ├── app/                 # shell, rotas e navegação
│   ├── components/          # componentes reutilizáveis de UI
│   ├── data/                # dados demo e contratos do dashboard
│   ├── lib/                 # tema, storage, formatação e utilidades
│   ├── pages/               # páginas de painel, agenda, saúde e diário
│   ├── styles/              # tokens, temas e CSS global
│   └── main.tsx             # entrada Vite
├── server/                  # endpoints Nitro auxiliares e health
├── backend/
│   ├── pom.xml
│   └── src/main/java/br/com/geri60saude/...
│   └── src/main/resources/db/migration/
├── public/manus-routes.json # manifesto de rotas do Preview
├── package.json             # Vite, TanStack Query/Router e Nitro
├── vite.config.ts
├── nitro.config.ts
└── Dockerfile               # build do frontend; backend tem Dockerfile próprio
```

### Frontend

- Shell com sidebar colapsável, seletor de idoso, alternância holo/cyber, controle de tamanho do texto e leitura em voz alta.
- Dashboard com saudação contextual, “próximo cuidado”, métricas do dia, alertas de medicamentos, agenda, adesão de hidratação e timeline de atividades.
- Rotas de navegação para `dashboard`, `saude`, `rotina`, `agenda`, `diario` e `configuracoes`, todas com estado selecionável e respostas de ação demonstráveis.
- Persistência local para tema, tamanho de fonte, idoso selecionado e registros alterados no Preview.

### Backend

- Domínio inicial: `User`, `Elder`, `Medication`, `MedicationLog`, `CareActivity`, `Appointment`, `CareDiaryEntry`.
- Flyway cria tabelas base e índices; PostgreSQL é configurado via `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME` e `SPRING_DATASOURCE_PASSWORD`.
- Controllers REST iniciais para idosos, medicamentos, agenda e atividades; DTOs de entrada/saída e validação.
- Segurança preparada com Spring Security e roles `ADMIN`, `FAMILY`, `CAREGIVER`; a autenticação completa fica como próxima iteração do MVP, sem bloquear o fluxo demonstrável do frontend.

## Build e operação

- `pnpm install` e `pnpm build` geram o frontend em `dist/`.
- `pnpm dev` inicia o Preview na porta 3000.
- `mvn spring-boot:run` inicia o backend local na porta 8080 quando um PostgreSQL estiver disponível.
- O Vite usa `/api` como contrato do backend; no Preview, o dashboard usa fallback demo quando a API não está disponível.
- O manifesto `public/manus-routes.json` acompanha as rotas reais do SPA.
