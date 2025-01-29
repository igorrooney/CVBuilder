# CV Builder

Welcome to **CV Builder**, an open-source project designed to help users create professional CVs tailored to specific country rules. This project is currently in development, starting with an MVC version, and will later include advanced features like AI assistance and premium functionalities.

## Features

### Current Features (MVC Version)
- **User Authentication**: Register and log in to manage your CVs.
- **CV Creation**: Create and edit CVs with sections for personal information, work experience, education, and more.
- **Export to PDF**: Export your CV to a PDF file following British CV rules.
- **Database Integration**: Save and retrieve CVs using Entity Framework Core.

### Planned Features
- **AI Assistance**: Get AI-driven suggestions to improve your CV content.
- **Premium Features**:
  - Advanced CV templates.
  - AI-powered CV optimization.
  - Multi-language support.
- **Country-Specific Rules**: Support for CV formats tailored to different countries (e.g., EU, US).

## Getting Started

### Prerequisites
- [.NET 7.0 SDK](https://dotnet.microsoft.com/download/dotnet/7.0)
- [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/) (or any code editor with .NET support)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (or SQL Server Express)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/CVBuilder.git
2. Navigate to the project directory:
	```bash
	cd CVBuilder
3. Restore dependencies:
	```bash
	dotnet restore
4. Run the application:
	```bash
	dotnet run
5. Open your browser and navigate to https://localhost:5078.

## How to Collaborate

We welcome contributions from the community! Here’s how you can help:

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
5. Open a pull request (PR) to the main branch of the original repository.

### Development Guidelines
- Follow the existing code style and naming conventions.
- Write clear and concise commit messages.
- Ensure your code is well-documented and includes unit tests where applicable.

## Roadmap
- **Phase 1**: MVC version with basic CV creation and PDF export (current phase).
- **Phase 2**: Add AI assistance for CV content improvement.
- **Phase 3**: Implement premium features (e.g., advanced templates, multi-language support).
- **Phase 4**: Support for country-specific CV rules (e.g., EU, US).

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/igorrooney/CVBuilder/blob/main/LICENSE) file for details.

## Acknowledgments

- Thanks to the .NET community for providing excellent tools and resources.
- Special thanks to all contributors who help improve this project.