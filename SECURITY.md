# Security Policy

## Supported Versions
The following versions of CVBuilder receive security updates:

| Version | Supported          |
|---------|------------------|
| 1.x     | ✅ (Active Support) |
| 0.x     | ❌ (No longer maintained) |

If you are using an unsupported version, please upgrade to the latest release to ensure security updates.

---

## Reporting Security Vulnerabilities
We take security issues seriously and appreciate your efforts in reporting vulnerabilities.

If you discover a security issue in this project, **please do not open a public issue**. Instead, follow these steps:

1. **Email us privately** at `igorrooney@gmail.com` with:
   - A detailed description of the vulnerability.
   - Steps to reproduce the issue.
   - Potential impact and severity assessment.
   
2. We will acknowledge your report within **48 hours** and work on a fix.

3. A security advisory will be published after the fix is released.

---

## Security Best Practices

To help protect users of this project, we enforce the following security measures:

### 🔒 **Authentication & Authorization**
- **Uses JWT-based authentication** with signed tokens.
- **Role-based access control (RBAC)** to limit permissions.
- **OAuth integration planned** for secure third-party logins.

### 🔑 **Secrets Management**
- Never hardcode credentials in the repository.
- Store secrets in **GitHub Actions Secrets** or `.env` files (ignored by Git).
- Use **environment variables** for sensitive configurations.

### 🔥 **Code Security**
- Runs **GitHub Dependabot** to check for dependency vulnerabilities.
- Uses **automated security scans** via GitHub CodeQL.

### 🛡️ **Infrastructure Security**
- Enforces **HTTPS** and HSTS in all environments.
- Deploys updates with **GitHub Actions CI/CD**.
- Uses **automatic database encryption** for sensitive data.

---

## Responsible Disclosure
We appreciate responsible disclosure of security vulnerabilities. If you report a valid issue, we will:
- Credit you in the security advisory (unless anonymity is requested).
- Collaborate to resolve the issue in a timely manner.
- Apply patches as soon as possible.

---

## Contact Information
For security-related inquiries, please reach out via:

- **Email**: `igorrooney@gmail.com`
- **GitHub Security Advisories**: [https://github.com/igorrooney/cvbuilder/security/advisories](https://github.com/igorrooney/cvbuilder/security/advisories)

We appreciate your help in keeping **CVBuilder** secure! 🚀
