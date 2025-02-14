# CV Builder

## Project Overview
CV Builder is an AI-powered platform designed to help users create professional CVs and cover letters. The platform follows British CV rules and offers advanced features like ATS compatibility analysis, localized templates, and AI-powered content suggestions.

## Features

- **Frontend**: Hosted on [Vercel](https://vercel.com), with support for branch-specific preview deployments. The production environment is automatically built and deployed for the `main` branch, while the `test` branch has a dedicated staging environment.
- **Backend**: Deployed to Azure App Service. Separate app services are used for production and staging environments.
- **CI/CD Workflows**:
  - **Frontend**: Deployments are managed directly through Vercel's GitHub integration.
  - **Backend**: GitHub Actions builds and deploys changes to Azure App Service when changes are made in the `backend/` directory.

## Project Setup

### Prerequisites
1. Node.js (version 18 or higher)
2. .NET SDK (version 8 or higher)


### Running the Project Locally

#### Frontend
1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
2. Install dependencies:
	```bash
	npm ci
3. Start the development server:
	```bash
	npm run dev
4. Open http://localhost:3000 in your browser to view the application.

#### Backend
1. Navigate to the backend/ directory:
	```bash
	cd backend
2. Add a appsettings.json file to configure the database connection string. Example:
	```bash
	"ConnectionStrings": {
		"DefaultConnection": "Server=localhost;Database=CVBuilder;User Id=your-username;Password=your-password;"
	}
		
3. Run the application:
	```bash
	dotnet run
4. The backend will be available at http://localhost:7165 (or the default port configured in your project).

## How to Collaborate

We welcome contributions from the community! Here�s how you can help:

### Reporting Issues
- If you find a bug or have a feature request, please open an issue on the [GitHub Issues page](https://github.com/igorrooney/CVBuilder/issues).
- Provide detailed information about the issue, including steps to reproduce it.

### Contributing Code
1. Fork the repository.
2. Create a new branch for your feature or bugfix:
	```bash
	git checkout -b feature/your-feature-name
3. Make your changes and commit them:
	```bash
	git commit -m "Add your commit message here"
4. Push your changes to your fork:
	```bash
	git push origin feature/your-feature-name
5. Open a pull request (PR) to the test branch of the original repository.

### Development Guidelines
- Follow the existing code style and naming conventions.
- Write clear and concise commit messages.
- Ensure your code is well-documented and includes unit tests where applicable.

## Roadmap
1. **Core Features (Current Status)**: 
- Implement basic CV and cover letter generation functionality .
- Set up CI/CD workflows for frontend and backend.
- Configure branch-specific deployments.
2. **Phase 1: Premium Features:**: 
- AI-powered CV scoring and improvement suggestions (Planned).
- Real-time ATS compatibility analysis (Planned).
- Industry-specific CV templates (Planned).
3. **Phase 2: Collaboration Tools:**:
- Add collaborative editing capabilities (Planned).
- Introduce job application tracking and reminders (Planned).
- Provide an interview preparation guide with mock interview simulations (Planned).
4. **Phase 3: Advanced Integrations:**: 
- LinkedIn profile import for auto-filling CV fields (Planned).
- AI-powered job matching suggestions based on user CVs (Planned).

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/igorrooney/CVBuilder/blob/main/LICENSE) file for details.

## Acknowledgments

- Thanks to the .NET community for providing excellent tools and resources.
- Thanks to the Next.js community for their outstanding framework and documentation.
- Thanks to AWS RDS for providing a reliable database management system.
- Special thanks to all contributors who help improve this project.