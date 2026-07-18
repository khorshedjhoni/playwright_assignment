# DMoney Playwright Automation Assignment

## Project Overview

This project automates an end-to-end user workflow for the **DMoney Portal** using **Playwright** with **TypeScript** following the Page Object Model (POM) design pattern.

The automation covers the complete lifecycle of an Agent account, including registration, activation, deposit, OTP verification, balance validation, and cash-in transaction.

---

## Technology Stack

- Playwright
- TypeScript
- Node.js
- Gmail API (for OTP verification)
- GitHub Actions (CI/CD)

---

## Test Scenario

The automated test performs the following steps:

1. Visit the DMoney Portal
2. Click on **Sign Up**
3. Register a new **Agent**
4. Login as **Admin**
5. Activate the newly created Agent account
6. Login as **System**
7. Deposit **2000 Tk** to the Agent
8. Login as the newly created Agent
9. Read OTP from Gmail using Gmail API
10. Verify OTP
11. Assert Agent balance is **2000 Tk**
12. Cash In **500 Tk** to an existing customer
13. Verify the transaction is successful

---

## Project Structure

```text
├── pages/
│   ├── AdminPage.ts
│   ├── AgentPage.ts
│   ├── LoginPage.ts
│   ├── SignUpPage.ts
│   └── SystemPage.ts
│
├── services/
│   └── gmailAuth.ts
│
├── utils/
│   └── extractOtp.ts
│
├── tests/
│   └── allTest.spec.ts
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── playwright.config.ts
├── package.json
└── README.md
```

---

## Prerequisites

Before running the project, make sure you have:

- Node.js (v18 or later)
- npm
- Playwright
- Gmail API Access Token
- Git

---

## Installation

Clone the repository

```bash
git clone https://github.com/khorshedjhoni/playwright_assignment.git
```

Go to the project directory

```bash
cd playwright_assignment
```

Install dependencies

```bash
npm install
```

Install Playwright browsers

```bash
npx playwright install --with-deps
```

---

## Environment Variables

Create a `.env` file in the project root.

Example:

```env
GMAIL_ACCESS_TOKEN=YOUR_ACCESS_TOKEN
```

> **Note:**  
> `.env` is excluded from Git using `.gitignore`.

---

## Running the Test

Run all tests

```bash
npx playwright test
```

Run with UI

```bash
npx playwright test --headed
```

Run only Chromium

```bash
npx playwright test --project=chromium
```

---

## Playwright Report

Generate and open the HTML report

```bash
npx playwright show-report
```

---

## CI/CD

GitHub Actions has been configured to automatically execute the Playwright test on:

- Push to `main`
- Pull Request
- Manual workflow dispatch

Workflow file:

```text
.github/workflows/playwright.yml
```

> **Note:**  
> The DMoney website uses Cloudflare security verification. GitHub-hosted runners may encounter Cloudflare verification, which can prevent the automation from accessing the application successfully. The test executes successfully in the local environment.

---

## Features

- Page Object Model (POM)
- End-to-End automation
- Gmail OTP verification
- Balance validation
- Cash In transaction validation
- HTML Report
- Retry on CI
- GitHub Actions integration

---

## Test Data

### Admin

```
Email: admin@dmoney.com
Password: 1234
```

### System

```
Email: system@dmoney.com
Password: 1234
```

### Agent

Generated dynamically during test execution.

---

## Reports

- Playwright HTML Report
- Trace on first retry
- Screenshots on failure (optional)
- GitHub Actions Artifacts

---

## Repository

GitHub Repository:

```
https://github.com/khorshedjhoni/playwright_assignment
```

---

## Author

**Md Khorshedul Alam**

Automation Testing Assignment using Playwright with TypeScript.
