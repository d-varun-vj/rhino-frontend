# Rhino Frontend

A monorepo web application built with React, TypeScript, and Lerna.

## Project Structure

```
project-root/
├── apps/
│   └── webapp/           # Main React web application
├── packages/             # Shared packages (@rhino/*)
│   └── apis/             # API Calls
│   └── utils/            # Common utils
├── lerna.json            # Lerna configuration
└── package.json          # Root package.json
```

## Prerequisites

- Node.js (v16 or higher)
- npm
- Git

<hr/>

## Setup (Springboot Side)

1. Add variables in `secrets.properties`
   ```bash
   cors.allowed.origin=http://localhost:5173,https://app.stg.rhino.energy/
   webapp.base.url=http://localhost:5173 (react running url)
   webapp.base.jwtCookieSetSecure=false
   ```
2. Enable Feature Flags

   ```bash
   Feature.java

     ENABLE_REACT_DASHBOARD("enable_react_dashboard", true),
     ENABLE_REACT_DASHBOARD_FOR_SUPER_ADMIN("enable_react_dashboard_for_super_admin", true),
     ENABLE_PERIODIC_ALARM("enable_periodic_alarm", true)
   ```

3. Run Applications
   - GUI
   - API

## Setup (React Side)

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-name>
```

2. Install dependencies:

```bash
npm install
```

3. Environment Variables

Create a `.env` file in the root directory with necessary environment variables.

```bash
VITE_API_BASE_URL=<BASE_API_APPLICATION_URL>   (eg: http://localhost:8090/api/app/) [API]
VITE_WICKET_BASE_URL=<BASE_APPLICATION_URL>    (eg: http://localhost:8080/) [GUI]
VITE_TERMS_OF_USER_URL=
VITE_STATIC_ASSET_URL=
VITE_UNLEASH_API_URL=
VITE_UNLEASH_API_CLIENT_KEY=
```

4. Run application

```bash
npm run app:webapp:dev
```

<hr/>

## Available Commands

### Development

```bash
# Start webapp in development mode
npm run app:webapp:dev

```

### Building

```bash
# Build all packages and apps
npm run build

# Build only webapp
npm run build:webapp

# Build only shared packages
npm run build:packages

```

### Testing

```bash
# Run UI tests for all packages
npm run test:ui

# Run UI tests for shared packages only
npm run test:ui:packages

# Update UI test snapshots for shared packages
npm run test:ui:packages:update-snapshot

# Prepare UI tests for shared packages
npm run test:ui:prepare:packages
```

### Code Quality

```bash
# Format all files using Prettier
npm run format

# Run linting
npm run lint
```

### Utility Commands

```bash
# Clean build artifacts
npm run clean

# Watch mode - rebuilds on changes
npm run watch
```

## Development Workflow

1. Start the development server:

```bash
npm run app:webapp:dev
```

2. Before committing changes:
   - Code will be automatically formatted and linted (pre-commit hooks are configured)
   - Run tests to ensure everything works

## Using Libraries and tools

- React (https://18.react.dev/)
- React icons (http://react-icons.github.io/react-icons/)
- Mantain UI Kit (https://mantine.dev/getting-started/)
- Tanstack table (https://tanstack.com/table/latest)
- Tanstack Query (https://tanstack.com/query/latest)
- Tailwind CSS (https://tailwindcss.com/)
- React hook form (https://react-hook-form.com/)
- React toastify (https://fkhadra.github.io/react-toastify/introduction/)
- Zod (https://zod.dev/)

## Contributing

1. Create a new branch
2. Make your changes
3. Ensure all tests pass
4. Submit a pull request
