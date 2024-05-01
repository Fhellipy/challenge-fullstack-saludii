# Desafio Full-Stack: Lista de Tarefas

## Requisitos

Neste desafio, você irá construir um app web de uma aplicação de lista de tarefas. Nesse desafio, você deve utilizar as seguintes tecnologias:

- RedwoodJS
- Material UI (@mui/material)
- dndkit
- tiptap (ou uma biblioteca similar)
- socket.IO ou SSE


## Instruções de entrega

Você deve subir o código fonte em um repositório git privado e adicionar o usuário `@matheusAle` como um colaborador.


## Desafio

Este aplicativo tem como objetivo permitir que os usuários gerenciem suas tarefas diárias, podendo adicioná-las, atualizá-las, marcá-las como concluídas e excluí-las conforme necessário. Cada tarefa deve ter um texto descritivo e um status indicando se está pendente ou concluída bem como a data de quando foi criada e a data de da ultima modificação, caso tenha sido editada.

Todas as tarefas cadastradas são públicas, portanto, qualquer pessoa pode criar ou mudar algo na lista de tarefas. Para uma melhor experiência, devemos replicar qualquer atualização nas tarefas para todos os usuários conectados.

### Funcionalidades

- Lista de Tarefas: Permite que o usuário veja todas as suas tarefas cadastradas. Deve mostrar o conteúdo bem como o status dessa tarefa.
- Filtrar Lista de Tarefas: Permite que o usuário visualize apenas as tarefas marcadas como concluídas.
- Criar Tarefa: O usuário pode criar uma nova tarefa. O conteúdo da tarefa pode ser em markdown suportando links, títulos, texto em itálico e negrito.
- Editar Tarefa: O usuário pode dar dois cliques em qualquer tarefa na lista e editar o seu conteúdo.
- Reordenar Tarefas: O usuário é livre para ordenar as tarefas como bem entender utilizando drag and drop.

### Instruções Gerais

- O campo de texto para criar/editar uma tarefa deve suportar edição de texto. Utilize o tiptap para implementar essas funcionalidades.
- Você está livre para usar qualquer outra biblioteca React no seu projeto.
- Você deve utilizar o máximo possível dos componentes e recursos do Material UI.
- *Dica*: Não salve a ordem das tarefas como um valor inteiro sequencial. Use um float ou dê um intervalo numérico arbitrário entre a última tarefa e a nova.


### Instruções para rodar o projeto

> **Pré-requisitos**
>
> - Redwood requer [Node.js](https://nodejs.org/en/) (=20.x) and [Yarn](https://yarnpkg.com/)


Comece instalando as dependências:

```
yarn add
```

Em seguida, inicie o servidor de desenvolvimento:

```
yarn redwood dev
```

Seu navegador deve abrir automaticamente em http://localhost:8910, onde você verá a página com o To-do-list.

## Prisma and the database

Primeiro crie um arquivo ```.env``` no seu projeto e adicione essas duas variáveis de ambiente com as credencias para o seu banco de dados.

```
DATABASE_URL=file:./dev.db
SESSION_SECRET=file:**************
```


E para evitar problemas com as migrações dos bancos, use o schema do  [Prisma](https://www.prisma.io/) [Migrate](https://www.prisma.io/migrate) para faze-lás livremente.

```
yarn rw prisma migrate dev

# ...

? Enter a name for the new migration: › create posts
```

> `rw` é uma abreviação para `redwood`

Agora é só aproveitar dessa aplicação!
