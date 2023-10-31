# Dashboard Web

NodeJS/ReactJS/NextJS web frontend for the dashboard project.

## Setup

- Install [nvm](https://github.com/nvm-sh/nvm).
- Use [Visual Studio Code](https://code.visualstudio.com/) with the following extensions:
  - [GraphQL](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql)
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)


```bash
nvm use
npm ci
npm run codegen
```

Create a `.env` file as below. Get these from [@nginyc](https://github.com/nginyc).

```bash
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

## Development

### Running in development mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Updating GraphQL schema

Whenever the GraphQL schema is changed:

```bash
npm run codegen
```

### Running in production mode

```bash
npm run build
npm start
```

### Running Storybook

```bash
npm run storybook
```

## Deployment

Install [Docker](https://docs.docker.com/desktop/install/mac-install/).

Manually run the Github Action "Deploy" to build & push the image to AWS ECR.

### Building Image

```bash
docker build -t dashboard_web .
```

### Running Image

```bash
docker run --rm -it --env-file .env -p 3000:3000 dashboard_web
```

## How It Works

- Root path is rendered by `app/page.tsx`
- All user data is saved to his/her GDrive:
  - `argento.clients.csv` stores all clients data
  - `argento.settings.json` stores all settings (client form, client report, etc)
  - Feel free to delete any of those files to do a hard reset

## Technologies

- [Next.js (V13)](https://nextjs.org/docs)
- [Ant Design (V5)](https://ant.design/) 
- [Storybook](https://storybook.js.org/)