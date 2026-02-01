# Celavie Frontend

A single-page React application for a food ordering system. This frontend communicates with a backend food-ordering API and was built with React Query, Context API, React Hook Form, Tailwind CSS, and Headless UI.

Table of contents
- [Features](#features)
- [Tech stack](#tech-stack)
- [Folder structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Available scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

Features
- Browse restaurants and menus
- Add items to cart and manage cart contents
- Place orders and view order status (depends on backend)
- Responsive UI built with Tailwind CSS and Headless UI components
- Forms handled by React Hook Form with client-side validation
- Data fetching and caching with React Query

Tech stack (with icons)
- ⚛️ React — UI library
- 🔁 React Query — server-state fetching & caching
- 🌐 Context API — global app state
- 🪝 React Hook Form — form handling & validation
- 🎨 Tailwind CSS — utility-first styling
- 🧩 Headless UI — accessible unstyled UI primitives
- 📦 Axios / fetch �� HTTP client (adjust if your project uses a different client)
- 🧪 Jest / React Testing Library — testing (if present)

Folder structure (suggested / based on common layout)
- public/
  - index.html
  - favicon.ico
  - assets/ — static images and icons
- src/
  - api/ 🔁
    - client.ts | apiClient.js — API client configuration (axios/fetch)
    - endpoints.ts — endpoint helpers
  - assets/ 🖼️
    - images/
    - icons/
  - components/ 🧩
    - ui/ — small reusable UI components (Button, Input, Modal)
    - layout/ — Header, Footer, Nav
  - context/ 🌐
    - AuthContext.tsx
    - CartContext.tsx
  - hooks/ 🪝
    - useAuth.ts
    - useCart.ts
    - useQueryHelpers.ts
  - pages/ 📄
    - Home/
      - Home.tsx
      - Home.styles.css
    - Menu/
      - Menu.tsx
    - Checkout/
      - Checkout.tsx
  - routes/ — route configuration
  - styles/ 🎨
    - index.css — Tailwind import + global styles
    - tailwind.css
  - utils/ — helpers and utilities
  - App.tsx / App.jsx
  - index.tsx / index.jsx
- .env.example
- package.json
- tailwind.config.js
- postcss.config.js
- README.md

Notes about this structure
- Folders marked with small icons correspond to major responsibilities:
  - 🔁 api: server communication and React Query hooks
  - 🌐 context: context providers and state
  - 🧩 components: small, reusable UI pieces
  - 🪝 hooks: custom hooks built on top of React Query / Context
  - 🎨 styles: Tailwind and global CSS
- If your repo uses TypeScript, filenames will be .ts / .tsx. If not, .js / .jsx.

Prerequisites
- Node.js (LTS recommended, e.g. >= 16)
- npm or yarn

Getting started (development)
1. Clone the repository
   - git clone https://github.com/dayOneAbu/celavie-frontend.git
2. Install dependencies
   - npm install
3. Create an environment file
   - cp .env.example .env (or create .env)
4. Start the development server
   - npm start
5. Open the app
   - Visit http://localhost:3000

Environment variables
Create a .env file in the project root and set values used by the app. Example:
- REACT_APP_API_URL=https://api.example.com
- REACT_APP_MAP_KEY=your_map_api_key

(Scan the codebase for `process.env.` to confirm exact names.)

Available scripts
- npm start — Run the app in development mode (http://localhost:3000)
- npm run build — Build the app for production to the `build` folder
- npm test — Run tests (if configured)
- npm run lint — Run linters (if configured)

Contributing
- Open issues for bugs and feature requests.
- To contribute:
  - Fork the repo
  - Create a branch: git checkout -b feat/your-feature
  - Make changes and test locally
  - Open a pull request describing your changes

Suggestions / next improvements
- Add small badges for build status / npm version / license at the top.
- Add one or two screenshots or a short demo GIF inside the README (place images in `public/assets/` or `docs/`).
- Add a .env.example with all required variables and short descriptions.
- Add a LICENSE file (MIT recommended for small projects) if missing.

License
- See the LICENSE file for details (or add one if missing).