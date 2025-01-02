# Spectre CTF Registration Portal

A modern registration portal for the Spectre CTF competition built with React, Vite, and Tailwind CSS.

## Features

- User registration with comprehensive form validation
- Secure authentication system
- Responsive design with modern UI
- Toast notifications for user feedback
- Protected routes and session management

## Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Notifications:** React Toastify

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd spectre-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── api/          # API configuration and endpoints
├── components/   # Reusable UI components
├── context/      # React context providers
├── lib/          # Utility functions
├── pages/        # Page components
└── main.jsx      # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.