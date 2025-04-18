# CV Builder

A modern web application for creating professional CVs and resumes.

## Features

- 🎨 Modern and responsive UI with MaterialUI and Tailwind CSS
- 🔒 Secure authentication and authorization
- 📝 Easy CV creation and management
- 🎯 Multiple CV templates
- 📱 Mobile-first design
- 🌙 Dark/Light mode support
- 🚀 Optimized performance
- 📊 SEO friendly

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [MaterialUI](https://mui.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [React Query](https://tanstack.com/query) - Data fetching
- [Zod](https://zod.dev/) - Schema validation
- [Jest](https://jestjs.io/) - Testing
- [Storybook](https://storybook.js.org/) - Component documentation
- [Husky](https://typicode.github.io/husky/) - Git hooks
- [Commitlint](https://commitlint.js.org/) - Commit message linting
- [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager

## Getting Started

### Prerequisites

- Node.js 18.x or later
- pnpm 8.x or later

### Installation

1. Install pnpm globally (if not already installed):

   ```bash
   npm install -g pnpm
   ```

2. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/cv-builder.git
   cd cv-builder
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Create a `.env.local` file in the root directory and add your environment variables:

   ```env
   NEXT_PUBLIC_API_URL=your_api_url
   NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   ```

5. Start the development server:

   ```bash
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run Jest tests
- `pnpm test:watch` - Run Jest tests in watch mode
- `pnpm test:coverage` - Run Jest tests with coverage
- `pnpm storybook` - Start Storybook
- `pnpm build-storybook` - Build Storybook

### Code Style

- Use TypeScript for all code
- Follow ESLint and Prettier configurations
- Use functional components with hooks
- Follow the project's file structure
- Write meaningful commit messages following conventional commits

### Testing

- Write unit tests for components and utilities
- Write integration tests for features
- Maintain test coverage above 80%

## Deployment

The application can be deployed to any platform that supports Next.js applications. Some popular options include:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [MaterialUI Documentation](https://mui.com/getting-started/installation/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [pnpm Documentation](https://pnpm.io/motivation)
