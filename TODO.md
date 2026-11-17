# TODO — Geri60+ Saúde

## [x] Experiência web do painel de cuidados
- A interface deve oferecer um painel principal para centralizar as informações do idoso em um único sistema.
- O painel deve permitir acompanhar rotina, atividades realizadas, alertas e próximos cuidados.
- A navegação deve ser simplificada, responsiva e adequada a familiares, cuidadores e administradores.
- O sistema deve oferecer os modos visuais claro holo e escuro cyber, com contraste adequado.

## [x] Controle médico e agenda
- O sistema deve contemplar dosagens e horários de medicamentos, quantidade/validade, registros administrados e não administrados e responsável pela administração.
- O sistema deve contemplar consultas, exames, internações, receitas, comorbidades, alergias, tipo sanguíneo e indicadores de pressão, glicose e peso.
- O sistema deve oferecer calendário de consultas, atividades e programação de medicamentos, além de alertas.

## [x] Controle físico e rotina
- O sistema deve contemplar alimentação, hidratação, restrições e alergias alimentares, aceitação das refeições, higiene, banho, troca de fralda, cuidado com a pele, exercícios, fisioterapia, caminhadas, mobilidade, quedas, acidentes e tarefas pendentes.
- O sistema deve permitir registrar a rotina do dia e acompanhar o histórico de cuidados.

## [x] Diário e acompanhamento familiar
- O sistema deve permitir registrar como foi o dia do idoso, comportamento, disposição, alterações de rotina, alimentação, higiene, sono e ocorrências.
- Familiares devem poder visualizar informações e atividades realizadas, com estrutura para controle de permissões e atualizações em tempo real.

## [ ] Acessibilidade e segurança — base entregue, autenticação e auditoria completas ficam para a próxima iteração
- O sistema deve oferecer aumento do tamanho das letras, navegação simplificada, leitura de textos em voz alta e cores neutras/com bom contraste.
- O backend deve prever cadastro individual, login e senha, controle de acesso, registro de alterações, backup e adequação à LGPD.
- O projeto deve conter estrutura Spring Boot + PostgreSQL, com migrações e endpoints REST coerentes com os módulos do frontend.

## [x] Entrega técnica
- O projeto deve usar Vite, TanStack e Nitro no frontend, com manifesto de rotas e build funcional.
- O Preview deve iniciar na porta configurada, apresentar conteúdo útil e manter o estado demonstrativo após ações do usuário.
