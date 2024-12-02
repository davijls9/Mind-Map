# Mind Map

## Descrição do Projeto
O **Mind Map** é uma plataforma interativa projetada para ajudar os usuários a gerenciar sua saúde mental, organizar lembretes, acessar dicas personalizadas, visualizar relatórios e responder quizzes para monitoramento pessoal. A interface é intuitiva e moderna, com integração dinâmica e funcionalidades baseadas nas interações do usuário.

## Funcionalidades
- **Quiz Interativo**: Ajuda os usuários a monitorar seu humor, atividades físicas, disposição e descanso.
- **Relatórios**: Visualize os resultados dos quizzes em gráficos detalhados.
- **Dicas Personalizadas**: Baseadas nos resultados mais recentes do quiz, oferecemos sugestões para melhorar o bem-estar.
- **Notificações**: Mensagens motivacionais e lembretes para manter o foco no autocuidado.
- **Lembretes**: Gerencie tarefas e compromissos, com notificações configuráveis.
- **Mapa de Instituições**: Localize instituições de apoio relacionadas à saúde mental.
- **Perfil Personalizável**: Gerencie informações pessoais e visualize estatísticas do seu progresso.
- **Pré-Carregamento Dinâmico**: Todas as páginas são pré-carregadas para melhorar a experiência do usuário.

## Estrutura do Projeto
```
/
├── index.html                 # Página inicial
├── login.html                 # Login geral
├── login_profissional.html    # Login para profissionais
├── login_usuario.html         # Login para usuários
├── map.html                   # Página com mapa de instituições
├── notifications.html         # Página de notificações
├── profile.html               # Página de perfil
├── quiz.html                  # Página do quiz
├── register.html              # Página de registro
├── reminders.html             # Página de lembretes
├── reports.html               # Página de relatórios
├── tips.html                  # Página de dicas personalizadas
├── css/                       # Estilos
│   ├── auth.css
│   ├── login.css
│   ├── map.css
│   ├── notifications.css
│   ├── profile.css
│   ├── quiz.css
│   ├── reminders.css
│   ├── reports.css
│   ├── style.css
├── img/                       # Imagens
│   ├── logo.png
├── assets/                    # Arquivos de apoio
│   ├── instituicoes.json
├── js/                        # Scripts
│   ├── app.js
│   ├── index.js
│   ├── login.js
│   ├── login_profissional.js
│   ├── login_usuario.js
│   ├── map.js
│   ├── notifications.js
│   ├── profile.js
│   ├── quiz.js
│   ├── register.js
│   ├── reminders.js
│   ├── report.js
│   ├── tips.js
│   ├── utils.js
```

## Como Executar
1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/mind-map.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd mind-map
   ```
3. Abra o arquivo `index.html` no seu navegador preferido.

## Tecnologias Utilizadas
- **HTML5**: Estrutura das páginas.
- **CSS3**: Estilização e responsividade.
- **JavaScript**: Funcionalidades interativas e dinâmicas.
- **Bootstrap**: Componentes prontos para design responsivo.
- **Chart.js**: Visualização de dados em gráficos.
- **JSON**: Armazenamento de dados locais.

## Funcionalidades em Destaque
### Quiz
- Perguntas categorizadas para capturar o estado emocional do usuário.
- Resultados armazenados localmente para consulta futura.

### Relatórios
- Gráficos interativos que mostram o progresso do usuário ao longo do tempo.

### Dicas Personalizadas
- Sugestões baseadas nos últimos resultados do quiz.
- Atualização dinâmica com dicas motivacionais.

### Lembretes e Notificações
- Sistema de lembretes configuráveis.
- Notificações automáticas com mensagens encorajadoras.

## Contribuição
Contribuições são bem-vindas! Siga os passos abaixo para contribuir:
1. Faça um fork do repositório.
2. Crie uma nova branch:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
3. Faça commit das suas alterações:
   ```bash
   git commit -m "Adiciona nova funcionalidade"
   ```
4. Envie suas alterações:
   ```bash
   git push origin feature/nova-funcionalidade
   ```
5. Abra um Pull Request.

## Licença
Este projeto está licenciado sob a [MIT License](LICENSE).

## Contato
- **Equipe Mind Map**
- Email: suporte@mindmap.com
- GitHub: [github.com/seu-usuario/mind-map](https://github.com/seu-usuario/mind-map)

