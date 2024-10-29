# Project Name

A monorepo web application built with React, TypeScript, and Lerna.

## Project Structure

```
project-root/
├── apps/
│   └── webapp/          # Main React web application
├── packages/            # Shared packages (@rhino/*)
├── lerna.json          # Lerna configuration
└── package.json        # Root package.json
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-name>
```

2. Install dependencies:

```bash
npm install
```

## Available Commands

### Development

```bash
# Start webapp in development mode
npm run app:webapp:dev

# Start Storybook development server
npm run storybook
```

### Building

```bash
# Build all packages and apps
npm run build

# Build only webapp
npm run build:webapp

# Build only shared packages
npm run build:packages

# Build Storybook
npm run storybook:build
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

2. For component development, run Storybook:

```bash
npm run storybook
```

3. Before committing changes:
   - Code will be automatically formatted and linted (pre-commit hooks are configured)
   - Run tests to ensure everything works

## Environment Variables

Create a `.env` file in the root directory with necessary environment variables.

## Contributing

1. Create a new branch
2. Make your changes
3. Ensure all tests pass
4. Submit a pull request
