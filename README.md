# Organizaê - Gerenciador de Tarefas

O **Organizaê** é uma aplicação web interativa desenvolvida como Trabalho Prático Individual para a disciplina de Desenvolvimento Web (2026). A aplicação permite aos usuários gerenciar suas tarefas diárias de forma simples e eficiente, rodando inteiramente no navegador.

## 🔗 Link do Projeto (GitHub Pages)
[Acesse a Aplicação Aqui](https://evangelistacaio.github.io/organizae)

## 🚀 Funcionalidades Implementadas
- **Cadastrar:** Adição de novas tarefas.
- **Listar:** Exibição das tarefas salvas.
- **Editar:** Alteração do texto de uma tarefa existente.
- **Concluir:** Marcação de tarefas como feitas, com mudança visual (riscado).
- **Excluir:** Remoção de tarefas da lista.
- **Filtros:** Visualização segmentada (Todas, Pendentes, Concluídas).
- **Contadores:** Estatísticas em tempo real do status das tarefas.
- **Persistência de Dados:** Uso do `localStorage` para que os dados não sejam perdidos ao recarregar a página.

## 🛠️ Tecnologias Utilizadas
- **HTML5:** Semântica e estruturação da página.
- **CSS3:** Estilização com Flexbox, variáveis CSS e design responsivo (Mobile First), sem uso de frameworks externos.
- **JavaScript Puro (Vanilla JS):** Manipulação de DOM, escuta de eventos, lógica de arrays (map, filter) e persistência de dados.
- **Git & GitHub:** Versionamento de código e deploy via GitHub Pages.

## ⚙️ Instruções para Executar
1. Clone este repositório: `https://evangelistacaio.github.io/organizae`
2. Navegue até a pasta do projeto.
3. Abra o arquivo `index.html` em qualquer navegador web moderno.
*(Não é necessária instalação de dependências ou servidores locais).*

## 🧠 Decisões de Implementação
- **Estrutura de Dados:** Optei por salvar as tarefas como um Array de Objetos `{ id, text, completed }`. O uso de um ID gerado via `Date.now()` garante que cada tarefa seja única, facilitando as operações de edição e exclusão.
- **Renderização Dinâmica:** A função `renderTasks()` limpa o DOM e reconstrói a lista baseada no estado atual do array de tarefas e no filtro selecionado, garantindo uma fonte única de verdade ("Single Source of Truth").
- **CSS Modular:** Utilizei variáveis CSS (`:root`) para centralizar o controle do tema e das cores, facilitando futuras manutenções e uma possível implementação de "Dark Mode".