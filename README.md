# Expense Tracker

A full-stack expense tracking application built with Next.js, emphasizing clean architecture, comprehensive testing, and maintainable code practices.

## Overview

Expense Tracker is a learning project designed to demonstrate modern full-stack development techniques. The application allows users to track personal expenses with a focus on clean code architecture and thorough testing coverage.

Currently, the project implements user authentication (sign-in and sign-up) as the foundation for the expense management features.

## Features

- **User Authentication**: Secure sign-in and sign-up functionality using Better Auth
- **Clean Architecture**: Separation of concerns with API routes, service layer, and repository layer
- **Comprehensive Testing**: Unit tests for utilities and component tests for UI elements
- **Modern UI**: Built with TailwindCSS and shadcn/ui components

## Technology Stack

- **Frontend**: Next.js (App Router) with React 19
- **Backend**: Next.js API routes with Better Auth for authentication
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: TailwindCSS with shadcn/ui component library
- **Testing**: Vitest for unit tests, Testing Library for component tests
- **Development Tools**: ESLint, Prettier, Husky for code quality

## Architecture

The project follows a clean architecture pattern to ensure testability and maintainability:

```
API Route → Service Layer → Repository Layer → Database
```

- **API Routes**: Handle HTTP requests and responses
- **Service Layer**: Contains business logic and orchestrates operations
- **Repository Layer**: Abstracts database operations using Prisma
- **Database**: PostgreSQL managed through Prisma ORM

This separation allows for easy testing of each layer independently and promotes code reusability.

## Project Status

🚧 **Active Development** - This project is currently under active development and is not feature complete. The authentication system is implemented and tested, with expense management features planned for future releases.

## Roadmap

- [ ] Expense CRUD operations (Create, Read, Update, Delete)
- [ ] Expense categorization system
- [ ] Monthly expense analytics and reporting
- [ ] Budget tracking and alerts

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd expense-tracker
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/expense_tracker"
   # Add other required environment variables for Better Auth
   ```

4. Set up the database:

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

### Running Tests

Run the test suite using Vitest:

```bash
npm test
```

Tests include unit tests for utility functions and component tests for authentication forms.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (main)/            # Main application routes
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   └── ui/                # shadcn/ui components
├── lib/                   # Utility libraries and configurations
│   ├── auth/              # Authentication utilities
│   └── schema/            # Validation schemas
├── prisma/                # Database schema and migrations
├── tests/                 # Test files
│   ├── components/        # Component tests
│   └── unit/              # Unit tests
└── generated/             # Generated Prisma client
```

## Contributing

This is a learning project focused on demonstrating best practices in full-stack development. While contributions are welcome, please note that the project is primarily educational.

## License

This project is open source and available under the [MIT License](LICENSE).
