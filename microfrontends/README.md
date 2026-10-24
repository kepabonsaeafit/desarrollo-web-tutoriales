# Microfrontends

Four independent Vite apps composed with Module Federation (`@module-federation/vite`).

| Folder | Role | Stack | Port |
| --- | --- | --- | --- |
| `host` | Shell: header, empty body, footer | Vue | 5173 |
| `calculator` | Add and subtract | React | 5174 |
| `news` | Four news items | Vue | 5175 |
| `currency` | COP to USD converter | Vanilla JavaScript | 5176 |

The host loads the remotes at runtime:

- **Home** renders the Vue news app, then the currency converter below it.
- **Calculator** renders the React calculator in the body.

Each remote can also be opened on its own port.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173.

`npm run build` then `npm run preview` serves the production builds on the same ports.
