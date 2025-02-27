# 🛠️ Contributing to CVBuilder

Thank you for your interest in contributing to **CVBuilder**! 🚀  
This guide will help you get started with submitting bug fixes, feature improvements, and documentation updates.

---

## 📌 Getting Started

### **1️⃣ Fork the Repository**
Click the **"Fork"** button in the top-right of this repo to create your own copy.

### **2️⃣ Clone Your Fork Locally**
```sh
git clone https://github.com/igorrooney/CVBuilder.git
cd CVBuilder
```

### **3️⃣ Set Up the Environment**
#### **🔹 Backend Setup (ASP.NET Core)**
```sh
cd backend
dotnet restore
dotnet build
dotnet run
```
- Ensure **.NET 7.0+** is installed.
- Set up **MySQL database** and configure `appsettings.json`.

#### **🔹 Frontend Setup (Next.js)**
```sh
cd frontend
npm install
npm run dev
```
- Ensure **Node.js 16+** is installed.
- The frontend runs at `http://localhost:3000`.

---

## 🚀 How to Contribute

### **🔹 Reporting Bugs**
- **Check existing issues** to avoid duplicates.
- Create a new issue **[here](https://github.com/igorrooney/CVBuilder/issues)**.
- Provide **clear steps to reproduce** the bug.

### **🔹 Suggesting Features**
- Open a **Feature Request** **[here](https://github.com/igorrooney/CVBuilder/issues/new?template=feature_request.md)**.
- Clearly describe **why** the feature is needed.

### **🔹 Submitting Code Changes**
1. **Switch to the `test` branch before creating a new branch:**
   ```sh
   git checkout test
   ```
2. **Create a new branch from `test` (`feature-branch`, `bugfix-branch`).**
   ```sh
   git checkout -b feature-my-feature
   ```
3. **Commit your changes** with clear messages.
   ```sh
   git commit -m "✨ Added AI-powered resume formatting feature"
   ```
4. **Push to your fork** and create a Pull Request (PR) **to the `test` branch**.
   ```sh
   git push origin feature-my-feature
   ```
5. **Submit a PR** via GitHub and request a review.

---

## 🛠 Code Style & Best Practices
- **Follow ASP.NET Core & Next.js best practices**.
- **Use C# naming conventions** for backend.
- **Use ESLint & Prettier** for frontend formatting.
- **Format code properly** (use `dotnet format` and `npm run lint`).
- **Document functions & components** where necessary.

---

## 🔐 Security Guidelines
- **Do NOT share sensitive information** (API keys, passwords, etc.).
- **Report vulnerabilities privately** via [GitHub Security Advisories](https://github.com/igorrooney/CVBuilder/security/advisories).

---

## 📜 License
By contributing, you agree that your code will be licensed under the **MIT License**.

---

## 🤝 Need Help?
- Open a discussion in **[GitHub Discussions](https://github.com/igorrooney/CVBuilder/discussions)**.
- Ping **@igorrooney** in a comment.

We appreciate your contributions! 🎉🚀  
Happy coding! 🖥️💡

