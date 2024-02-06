# crudizer-core

crudizer-core is a fullstack CRUD web app kickstarter which one is includes common essentials:

- E2E data listing (w/ pagination) (Mongo database => Node.js backend => Nuxt 3 & Axios API requests => UI)
- Ready to use E2E base64 image dataflow
- Create/Update/Delete transactions for items
- Ready to use UI for essentials (w/ tailwind config based primary, secondary color usage)

<br>
<hr>
<br>

## Data Structure & App Scope

Structure builded upon an example data with common fields of many applications datas:

```js
{
    id: String,
    name: String,
    imgSource: String, // base64
    price: {
      amount: Number,
      currency: String,
    },
    info: String,
}
```

but that doesn't mean you must build your app with this data, you can customize the data & related UI parts as you wish.

You can also add new components/pages new api endpoint connections (of course after adding it to backend)

<br>
<hr>
<br>

## API Environment Declaration

You need to update your api base url from environment.js to make your app working with your backend. Take care of this especially when you deploying the app.

NOTE: Default is adjusted to **localhost:3001** because default port is **3001** on backend of crudizer-core.

<br>
<hr>
<br>

_This is **frontend** repo of crudizer-core, you can reach to **backend** from here:_ [crudizer-core-server](https://github.com/SerhatPolat/crudizer-core-server)

<br>
<hr>

# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
