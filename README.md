<p align="center">
    <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" align="center" width="30%">
</p>
<p align="center"><h1 align="center">BINARY GAME</h1></p>
<p align="center">
	<em>Master the art of binary conversion in this exciting web game!</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js">
	<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
	<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
	<img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma">
</p>
<p align="center">
	<a href="https://binary.unk-pn.ru" target="_blank">
		<img src="https://img.shields.io/badge/🚀_Live_Demo-binary.unk--pn.ru-blue?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo">
	</a>
</p>
<br>

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [Contributing](#contributing)
- [Screenshots](#screenshots)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

## Overview

**Binary Game** is an interactive web application that challenges players to master binary number conversion in a fun, competitive environment. The app features a real-time binary clock and an engaging game where users race against time to convert decimal numbers to their binary equivalents.

🎮 **[Try it live at binary.unk-pn.ru →](https://binary.unk-pn.ru)**

### 🎯 What makes it special?

- **Interactive Learning**: Learn binary conversion through gameplay
- **Real-time Binary Clock**: Watch time displayed in beautiful binary patterns
- **Competitive Gaming**: Race against time with scoring system
- **Global Leaderboard**: Compete with players worldwide
- **Multi-language Support**: Available in English and Russian
- **Modern UI**: Responsive design with dark/light theme support

## Features

### 🕒 **Binary Clock**

- Real-time display of current time in binary format
- Visual representation using interactive circles
- Hours, minutes, and seconds converted to binary
- Beautiful animations and smooth transitions

### 🎮 **Binary Conversion Game**

- Fast-paced decimal-to-binary conversion challenges
- Progressive difficulty system
- Real-time scoring and timer
- Personal best tracking

### 🏆 **Leaderboard System**

- Global ranking system
- Personal statistics tracking
- Score comparison with other players

### 🔐 **Authentication & User Management**

- Secure user authentication via Clerk
- Progress saving across sessions
- User profile management
- Social sign-in options

### 🌍 **Internationalization**

- Multi-language support (English/Russian)
- Automatic language detection
- Seamless language switching
- Localized content and UI

### 🎨 **Modern UI/UX**

- Responsive design for all devices
- Dark and light theme support
- Smooth animations and transitions
- Accessibility-focused components
- Mobile-optimized interface

## Project Structure

```sh
└── binary/
    ├── README.md
    ├── eslint.config.mjs
    ├── lib
    │   ├── checkUser.ts
    │   └── db.ts
    ├── next.config.ts
    ├── package-lock.json
    ├── package.json
    ├── prisma
    │   ├── migrations
    │   └── schema.prisma
    ├── public
    │   └── vercel.svg
    ├── src
    │   ├── @types
    │   │   └── i18next.d.ts
    │   ├── app
    │   │   ├── api
    │   │   ├── favicon.ico
    │   │   ├── game
    │   │   ├── globals.css
    │   │   ├── layout.tsx
    │   │   ├── leaderboard
    │   │   ├── not-found.module.css
    │   │   ├── not-found.tsx
    │   │   ├── page.module.css
    │   │   └── page.tsx
    │   ├── components
    │   │   ├── ClientI18nProvider.tsx
    │   │   ├── GameOver
    │   │   ├── Header
    │   │   ├── HowToPlay
    │   │   ├── LeaderboardPlace
    │   │   ├── PleaseSignIn
    │   │   ├── RadioCircle
    │   │   ├── Settings
    │   │   └── SignInButton
    │   ├── hooks
    │   │   ├── useClock.ts
    │   │   └── useStorage.ts
    │   ├── lib
    │   │   └── i18n.ts
    │   ├── locales
    │   │   ├── en
    │   │   └── ru
    │   └── middleware.ts
    ├── tsconfig.json
    └── yarn.lock
```

## Getting Started

### Prerequisites

Before getting started with Binary Game, ensure your runtime environment meets the following requirements:

- **Node.js:** Version 18+
- **Package Manager:** npm, yarn, or pnpm
- **Database:** PostgreSQL (for production) or SQLite (for development)

### Installation

Install Binary Game using one of the following methods:

**Build from source:**

1. Clone the binary repository:

```sh
git clone https://github.com/unk-pn/binary
```

2. Navigate to the project directory:

```sh
cd binary
```

3. Install the project dependencies:

**Using `npm`**

```sh
npm install
```

**Using `yarn`**

```sh
yarn install
```

**Using `pnpm`**

```sh
pnpm install
```

4. Set up environment variables:

```sh
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Database`
DATABASE_URL="your_database_url"

# Optional: Prisma Accelerate
PULSE_API_KEY="your_pulse_api_key"
```

5. Set up the database:

```sh
npx prisma migrate dev
npx prisma generate
```

---

### Usage

**🌐 Quick Start:** You can try the game immediately at **[binary.unk-pn.ru](https://binary.unk-pn.ru)** without any installation!

**🛠️ Local Development:** Run Binary Game locally using the following command:

**Using `npm`**

```sh
npm run dev
```

**Using `yarn`**

```sh
yarn dev
```

**Using `pnpm`**

```sh
pnpm dev
```

The application will be available at `http://localhost:3000`

### 🚀 **Production Build**

To build for production:

```sh
npm run build
npm start
```

## Contributing

- **💬 [Join the Discussions](https://github.com/unk-pn/binary/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/unk-pn/binary/issues)**: Submit bugs found or log feature requests for the `binary` project.
- **💡 [Submit Pull Requests](https://github.com/unk-pn/binary/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/unk-pn/binary
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

## Screenshots

<p align="center">
  <img src="https://via.placeholder.com/800x400/2563eb/ffffff?text=Binary+Clock" alt="Binary Clock" width="45%">
  <img src="https://via.placeholder.com/800x400/059669/ffffff?text=Game+Interface" alt="Game Interface" width="45%">
</p>

<p align="center">
  <img src="https://via.placeholder.com/800x400/dc2626/ffffff?text=Leaderboard" alt="Leaderboard" width="45%">
  <img src="https://via.placeholder.com/800x400/7c3aed/ffffff?text=Mobile+View" alt="Mobile View" width="45%">
</p>

## Acknowledgments

- **Clerk** for providing excellent authentication services
- **Vercel** for hosting and deployment platform
- **Prisma** for the amazing database toolkit
- **Next.js** team for the incredible React framework
- The open-source community for inspiration and resources

## Contact

For questions, suggestions, or collaboration opportunities:

- **Live Demo**: [binary.unk-pn.ru](https://binary.unk-pn.ru)
- **GitHub Issues**: [Create an issue](https://github.com/unk-pn/binary/issues)
- **Discussions**: [Join the discussion](https://github.com/unk-pn/binary/discussions)

<p align="center">
  <strong>⭐ Star this repository if you find it helpful!</strong>
</p>

<p align="center">
  Made with ❤️ for the binary learning community
</p>
